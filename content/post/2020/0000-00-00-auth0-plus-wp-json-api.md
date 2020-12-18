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

{"code":"rest_cookie_invalid_nonce",
"message":"Cookie nonce is invalid",
"data":{"status":403}}
```

2. Log into the admin as someone who can create posts
3. View your cookies in the developer panel and copy the cookie starting with `wordpress_logged_in_`
4. Add that and a nonce using `wp_rest` as the action to a curl request to the same endpoint:

```bash
❯ curl --data "" --cookie "wordpress_logged_in_XXX=cookie_value" -H "X-WP-Nonce: 0d0a0906e4" https://auth0sdk.wpengine.com/wp-json/wp/v2/posts

{"code":"empty_content",
"message":"Content, title, and excerpt are empty.",
"data":{"status":400}}
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

{% info %}
If you want to learn more about how scopes and permissions interact, check out <a href="https://auth0.com/blog/on-the-nature-of-oauth2-scopes/">Vittorio Bertocci's post on OAuth2 scopes on the Auth0 blog</a>. Don't be afraid to read it more than once, there is a lot to unpack, especially if you're learning this stuff for the first time!
{% endinfo %}

The rest of the API settings can be left as their defaults for now.

## Build your Application

If you're reading this post and securing your WP REST API with Auth0 access tokens then it's likely that you already have or are building an application to take these actions. Requesting and using the access token is part of this tutorial but building the whole application to do that is beyond the scope. 

The summary of what we need to do here is:

1. Build a login URL including the API identifier as an `audience` parameter and the permissions we are requesting in a `scope` parameter
1. Redirect to Auth0 to perform the login and API consent (more on that later)
1. Receive an authorization code back and exchange that for an access token
1. Use that access token to call the WP REST API

We're not going to do all that, instead I'll direct you to Auth0 documentation to help you do this in your application:

* [How to get an access token](https://auth0.com/docs/tokens/access-tokens/get-access-tokens) - general information on requesting access tokens and links to more information.
* [Auth0 Quickstarts](https://auth0.com/docs/quickstarts/) - many of these include a section on how to request access tokens during login. If not, check out the documentation for the SDK being used.

We do, however, need a way to get an access token so we can test that the WP REST API is being protected correctly. To do that, we'll create a throw-away testing application that can get access tokens directly and a throw-away user to simulate a login. 

1. [Get a Management API token for testing](https://auth0.com/docs/tokens/management-api-access-tokens/get-management-api-access-tokens-for-testing)
2. Click **Set API Token** on the [Management API Explorer page](https://auth0.com/docs/api/management/v2) and enter that token
3. Go to the [Create Client](https://auth0.com/docs/api/management/v2#!/Clients/post_clients) endpoint on that page and send the following:

```json
{
  "name": "WP REST API Testing Application",
  "jwt_configuration": {
    "alg": "RS256",
    "lifetime_in_seconds": 36000
  },
  "token_endpoint_auth_method": "none",
  "app_type": "regular_web",
  "grant_types": [
    "password"
  ]
}
```

{% warning %}
The application we're creating here is for testing purposes only. If you create this application as part of the tutorial here, delete it when you're through!
{% endwarning %}

4. In the [Applications screen of the dashboard](https://manage.auth0.com/#/applications), click the **WP REST API Testing Application** we just created. 
5. Click on the **Connections** tab and turn on `Username-Password-Authentication`
6. Finally, in the [Users screen of the dashboard](https://manage.auth0.com/#/users), click **Create User** and create a test user for the `Username-Password-Authentication` connection; make note of the email and password used

Once this is complete, you should be able to send your email and password to the token endpoint for 

```bash
❯ curl --request POST \
  --url 'https://YOUR_DOMAIN/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=password&username=USERNAME&password=PASSWORD&audience=API_IDENTIFIER&scope=SCOPE&client_id=YOUR_CLIENT_ID"
 }'

{"code":"empty_content",
"message":"Content, title, and excerpt are empty.",
"data":{"status":400}}
```

Again, all of these steps are to create an application that can generate access tokens. You can configure your exernal app as explained in the links above and skip these steps.
 