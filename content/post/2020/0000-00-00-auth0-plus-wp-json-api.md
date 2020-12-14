---

title: "Use Auth0 to protect your WordPress REST API"
permalink: protect-wordpress-rest-api-with-auth0/index.html
layout: post
tags: [ "WordPress", "Auth0", "AuthN + AuthZ" ]
date: 2020-12-30
featured_img: /_images/2020/12/code_sample-300x300.png
excerpt: TODO

---

I maintained the [Auth0 WordPress plugin](https://github.com/auth0/wp-auth0) for several years and, in that time, the idea of using Auth0 to protect the [WP REST API](https://developer.wordpress.org/rest-api/) came up several time. I thought this would be a fun project.

If you're not familiar with this part of WordPress, it's an API built into WordPress that can be used to do just about everything you can do with WordPress. If you go to `/wp-json/` on any standard WordPress site, you should get a big block of JSON back with meta information and showing all the endpoints available. One of those endpoints, `/wp-json/wp/v2/posts`, will show the latest publish posts on the blog as JSON ([ref](https://developer.wordpress.org/rest-api/reference/posts/)).

```js
[
   {
      "id":1,
      "date":"2017-11-16T14:47:09",
      "slug":"hello-world",
      "status":"publish",
      "type":"post",
      "link":"https:\/\/auth0sdk.wpengine.com\/hello-world\/",
      "title":{
         "rendered":"Hello world!"
      }
      // ... truncated
   }
]
```

This endpoint can be read without any authentication just like a typical list of blog posts does not require authentication. If you wanted to take an action that did require an account and maybe certain privileges - deleting a post, editing a user, etc. - then you would need to authenticate (details below). 

In this post, we're going to leave the default authentication method functional and add the ability to also use Auth0-generated access tokens. 

## WP REST API Authentication

The built-in authentication method for this API uses cookies. When you log into WordPress, a cookie called `wordpress_logged_in_RANDOM` is set. If you call the REST API from the front-end of the site, that cookie is included in the call and now you're able to take the same actions you would be able to using `wp-admin`.

[![WP REST API authentication diagram](/_images/2020/12/wp-rest-api-authentication.png)](https://www.websequencediagrams.com/?lz=dGl0bGUgV1AgUkVTVCBBUEkgQXV0aGVudGljYXRpb24KCkFsaWNlLT5XUCBMb2dpbjogVmlzaXRzIGxvZ2luIGZvcm0KABQILT4AKAU6IERpc3BsYXkAGA0ANxFFbnRlciB1c2VybmFtZSArIHBhc3N3b3JkCm5vdGUgb3ZlciAAbggKICAgAHoGIHN1Y2Nlc3NmdWwKZW5kIG5vdGUAdwoAeQlzZXRjb29raWU6IHdvcmRwcmVzc19sb2dnZWRfaW4AgSASMzAxIHRvIGhvbWUgcGFnZQCBbAtIb21lOiBMb2FkcwAVCwASBwCBaglKUyBmaWxlIHdpdGgAgkMKY2FsbACCOggAghUHVGFrZSBvbi1wYWdlIGFjAIJgBQCCWgoAgn8IAEwFY2FsbHMgL3dwLWpzb24vd3AvdjIvZW5kcG9pbnQAgxIHACcPAIFZHACCSg0Ag2gIAIJVBUMAgiYFIHZlcmlmaWVkAIJMDQCEEQgAgRAPRXhlY3V0AIE5CQAcDQCDfwcyMDAAgyYICg&s=default)

You can see this in action on any standard WordPress site by doing the following:

1. Try a create post call against the posts endpoint. You'll need to include a nonce generated using `wp_rest` as the action (https://wordpress.org/plugins/wp-console/):

```bash
❯ curl --data "" -H "X-WP-Nonce: 0d0a0906e4" https://auth0sdk.wpengine.com/wp-json/wp/v2/posts

{"code":"rest_cookie_invalid_nonce","message":"Cookie nonce is invalid","data":{"status":403}}
```

2. Log into the admin as someone who can create posts
3. View your cookies in the developer panel and copy the cookie starting with `wordpress_logged_in_`
4. Add that and a nonce using `wp_rest` as the action to a curl request to the same endpoint:

```bash
❯ curl --data "" --cookie "wordpress_logged_in_XXX=cookie_value" -H "X-WP-Nonce: 0d0a0906e4" https://auth0sdk.wpengine.com/wp-json/wp/v2/posts

{"code":"empty_content","message":"Content, title, and excerpt are empty.","data":{"status":400}}
```

This works fine if the calls are being made from the same site. The cookie and the API have the same domain so your browser sends the cookie just like it would for a regular HTML page request. But if you want to call the API from a mobile app or a different application, cookies are not going to work. 

## API Authorization with Auth0

We want to use Auth0 to protect our WP REST API in a way that will allow other applications to take actions that require privileges, like creating a post in our curl examples above. So a user will log into and application that is *not* the WordPress instance and be able to take action on that WordPress site.

From the [Auth0 docs](https://auth0.com/docs/authorization):

> &ldquo;Authorization refers to the process of verifying what a user has access to. In authorization, a user or application is granted access to an API after the API determines the extent of the permissions that it should assign. Usually, authorization occurs after identity is successfully validated through authentication so that the API has some idea of what sort of access it should grant.&rdquo;

**So what does this mean for WordPress?** 

A user in WordPress is given a [role](https://wordpress.org/support/article/roles-and-capabilities/) which allows them to do certain things. If I'm an editor, for example, I can create my own posts and publish other people's posts but I can't remove a plugin. If I'm an administrator, then I can do both. 

Authorization is describing this same scenario but from a different perspective. If I'm logged into WordPress as a WordPress user taking actions on a WordPress application, then it all works like the above. But if I'm logged into, say, a mobile app as a user that has access to a WordPress site taking actions on that site, then things get a little more complicated. In that case, the mobile app has to request access to the WordPress site on behalf of that WordPress user. If that access is granted, then the mobile app can take the same actions on the WordPress site as the WordPress user can.

![Head explodey](/_images/2020/12/head-explode-emoji.png)

If your head is exploding a bit, **that's OK**. This stuff has a steep learning curve and lots of jargon (ask me how I know). That whole previous paragraph is a summary of the problem that OAuth2 was created to solve: applications calling APIs on behalf of users.

In order to get this whole OAuth2 thing working, we'll do the following:

1. Register the WordPress API in Auth0 and model what we want to allow users via this API (once)
2. Add a token validation method option to the authorization used in the WordPress site providing the API (once)
3. Configure the external application to reference the WP API during login with Auth0 to generate an access token (each login)
4. Call the WP API with that access token (each WP action taken)

Once this is complete, the authorization will look something like this (simplified):

[![WP REST API authorization with OAuth2 diagram](/_images/2020/12/wp-rest-api-authorization-with-oauth2.png)](https://www.websequencediagrams.com/?lz=dGl0bGUgV1AgUkVTVCBBUEkgYWNjZXNzIHVzaW5nIE9BdXRoMgoKQWxpY2UtPk1vYmlsZSBhcHA6IENsaWNrcyB0byBsb2dpbgoAEgotPkF1dGgwOiBSZWRpcmVjdAAcCSByZWZlcmVuY2luZyBXUCBBUEkKbm90ZSBvdmVyIAAvB1N1AH0FZnVsAFMHAEkFAG8OQQCBHwZ0b2tlbiB0byBjYWxsAD8SAIEjDFN0b3JlAIFVCAAzBQCBQBVyZWF0ZXMgcG9zdACBRQ0AgScGABkIABsFIGZvciAAghQFLCBpbmNsdWQAUQ8AgVAKADYIVmFsaWRhdAB5DwCCAwYtAIJRDgCBfwcKCg&s=default)

{% info %}If you're more interested in how this whole OAuth2 thing works, I would highly recommend <a href="https://auth0.com/docs/videos/learn-identity-series/calling-an-api">one of our Learning Identity videos</a>. But if not, I completely understand.{% endinfo %}

Let's take the first step in getting this working: adding the WP API to Auth0.

## Register the WP API with Auth0

I'm going to reference the Auth0 documentation here so I don't duplicate helpful words written by trained professionals. [Start here](https://auth0.com/docs/get-started/set-up-apis) and create an API using the following information:

- **Name**: Choose something descriptive
- **Identifer**: Use your WP API base URL like `https://auth0sdk.wpengine.com/wp-json/`

Once you create the API, click on the **Settings** tab, scroll down, and turn on **Allow Offline Access** (we'll talk about that later). 

Now click on the **Permissions** tab and we're ready to add the WordPress actions we want to allow external applications to take. We don't need to add every single WordPress capability here, just the ones that will be requested by other applications. You can map these 1:1 with [existing WordPress capabilities](https://wordpress.org/support/article/roles-and-capabilities/#capability-vs-role-table) if you're using core WP REST endpoints or create additional ones if you're exposing your own API functionality. 

In this example we're going to allow creating posts under the current user's account and editing them, so we'll add:

- `publish:posts` with a description of "Publish posts for the current user"
- `edit:posts` with a description of "Edit posts for the current user"

![WP REST API setup in Auth0](/_images/2020/12/wp-rest-api-auth0-setup.png)

Later, when we log into our external application, we'll ask for one or both of these permissions as scopes to take  action on behalf of a user (second step in the WP OAuth2 sequence above).

{% info %}If you want to learn more about how scopes and permissions interact, check out <a href="https://auth0.com/blog/on-the-nature-of-oauth2-scopes/">Vittorio Bertocci's post on OAuth2 scopes on the Auth0 blog</a>. Don't be afraid to read it more than once, there is a lot to unpack, especially if you're learning this stuff for the first time!{% endinfo %}

The rest of the API settings can be left as their defaults for now.






