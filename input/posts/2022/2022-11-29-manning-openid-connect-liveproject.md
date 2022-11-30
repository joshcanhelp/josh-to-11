---
title: "Published: Federation and Single Sign-On with OpenID Connect"
meta_title: "Federation and Single Sign-On with OpenID Connect"
meta_description: "After a years worth of work and a number of delays (on my end), I finally published my first liveProject with Manning!"
featured_img: /_images/default-thumb.png
excerpt: "After a years worth of work and a number of delays (on my end), I finally published my first liveProject with Manning!"
tags: ["Software Engineering", "Digital Identity", "Best Of"]
link_to: https://www.manning.com/liveprojectseries/federation-and-sign-on-ser
hn_link:
---

In March of 2021, I received an email out of the blue from Manning Publications asking about my interest in developing an online course that teaches developers skills through real-world use cases. I was in the midst of continued pandemic life with children and finding it difficult to manage what I had going on so I was hesitant but interested. Flash forward through 17 months of continued pandemic life, lost summer childcare, and a [major family medical emergency](/stroke/), I was finally able to complete this project and get it out into the world!

I have written many development tutorials throughout my career and I enjoy the process greatly but I was not prepared for just how much work this involved. All told, I spent over 220 hours and almost 200 commits across 4 repositories getting this ready for publishing. This work spanned 4 separate projects, each with 4 milestones containing an average of about 1,800 words each. The final project had 3 separate, functional applications that interacted with each other. Each of the 16 milestones had a full and partial solution containing one, two, or three of the applications, along with a video showing the state of the current solution. It was **A LOT**.

By the end, though, I was quite happy with the outcome and proud of how it all came together. I wanted to talk through some of the challenges I had putting this project together as well as some of the high points that came along the way.

## 🗺 The project

The idea behind liveProjects is to give learners a real-life scenario they might encounter, along with a narrative, and walk them through how to build a solution that fits the need. The initial proposal was in the form of a story, followed by an outline of the proposed projects. Boiled down, it goes a little something like this:

> You’re the sole engineer for PrincipalStack, an online publication for new developers. Previously, PrincipalStack only accepted internal submissions, but its cofounder would like to improve user engagement by inviting every community member to register, log in, and post comments. Your task is to enable sharing of user identities between the web application and post creation system built as a standalone single-page application (SPA).

Simple, *right*? 

The final, completed network consisted of 3 applications: an authorization server, a Node.js application that exposes an OAuth 2 protected API, and a single-page, in-browser application. 

![](/_images/2022/manning-oidc-diagram.png)

The complete liveProject consisted of 4 individual projects, each with 4 milestones.

1. **Build an Authorization Server**
	1. **Server creation and configuration** - build a running OpenID Connect-capable authorization server using Express on Node.js.
	2. **Client registration and storage** - register a new Client (relying party) with our authorization server and test logging in.
	3. **User registration, login, and consent** - build the pages that users interact with to create their profile, prove their identity, and end their session.
	4. **Scopes, claims, and expiration** - introduce new user profile data and allow that data to be requested by and returned to an application requesting login.
2. **Login with OIDC**
	1. **Register a new web application with the authorization server** - generate client credentials and add a web application as a new client to an existing authorization server.
	2. **Install and configure an OpenID Connect library** - discover an existing authorization server and  create login, logout, and callback routes that use this data.
	3. **Implement login using authorization code with PKCE** - send request data from our web application to the authorization endpoint, then handle the response and load protected routes. 
	4. **Map the digital identity to an existing store of users and check the session** - connect an incoming digital identity with an existing user or create a new user, protect routes using authentication status and roles, and implement logout.
3. **Build an OAuth2-Protected API**
	1. **Build an API that exposes post management capabilities** - expose read and create post actions and validations in an API that accepts and responds with JSON.
	2. **Protect the API using JWT-formatted access tokens** - add protection to our API to make sure that posts are read and created by authorized users.
	3. **Register the API with the authorization server** - make our authorization server aware of the API resource we just built so it can generate JWT-formatted access tokens that our web application will accept.
	4. **Connect API calls to existing users in the app** - finish protecting our API endpoints by looking for the necessary access token scopes and checking the user permissions in the application.
4. **Modify a SPA to Use OIDC**
	1. **Register the single page app and add route protection** - make the authorization server aware of requests from our single-page app and require authentication for specific routes. 
	2. **Implement the login and logout endpoints** - implement a login route that redirects to the authorization server to login and a logout route that clears our session in both our SPA and our authorization server.
	3. **Complete the login and call a protected API** - make an authorized call from the single-page app (SPA) to the API provided by the web application. This will allow us to list and create posts using our account on the authorization server.
	4. **Refresh an access token and consent to specific scopes** - add the capability to refresh expired access tokens and request only the scopes that certain routes need.

As you can see, it was a lot of work! Throughout the project, there were things that made life easier and things that made them harder. For anyone thinking about doing a liveProject with Manning, or any other long-form course like this, hopefully this will be helpful. 

## 👍👍 The highs

### The Manning team

At every point, the Manning editorial and administrative team was a complete joy to work with. Everyone was positive and supportive, even when deadlines were slipping and revisions were extensive. Their attention to detail and thorough communication was a blessing. 

One great aspect of working with them was the beta period where developers in the target audience built and tested their project according to the instructions. They called out plenty of mistakes and unclear instructions which lead to a much more accurate and easy-to-follow project. 

### Open source



### Automation

## 👎👎 The lows

### Complexity

### Writing in two places
<img src="/_images/2022/featured_image.jpg" class="aligncenter" alt="">
{% caption %}Caption text{% endcaption %}

{% warning %}Warning panel{% endwarning %}

{% info %}Info panel{% endinfo %}

{% bigtext %}Big text{% endbigtext %}

{% h2br %}References{% endh2br %}
