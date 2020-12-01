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

1. Try a create post call against the posts endpoint. You'll need to include a nonce generated using `wp_rest` as the action:

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

That's where Auth0 comes in. 

## API Authorization with Auth0

We want to use Auth0 to protect our public WP REST API using access tokens that can be requested by another application. This will other applications to take actions that require privileges, like creating a post in our curl examples above.