---
title: "Published: Federation and Single Sign-On with OpenID Connect"
meta_title: "Federation and Single Sign-On with OpenID Connect"
meta_description: "After over a year's worth of work and a number of delays (on my end), I finally published my first liveProject with Manning!"
featured_img: /_images/2022/manning-oidc-diagram-thumb.png
excerpt: "After a years worth of work and a number of delays (on my end), I finally published my first liveProject with Manning!"
tags: ["Software Engineering", "Digital Identity", ]
link_to: https://www.manning.com/liveprojectseries/federation-and-sign-on-ser
hn_link:
---

In March of 2021, I received an email out of the blue from Manning Publications asking about my interest in developing an online course that teaches developers skills through real-world use cases. I was in the midst of continued pandemic life with children and finding it difficult to manage what I had already had going on so I was hesitant but interested. Flash forward through 17 months of continued [pandemic life](/how-we-are-teaching-right-now/), lost summer childcare, and a [major family medical emergency](/stroke/), I was finally able to complete this project and get it out into the world!

*Presenting*: **[Federation and Single Sign-On with OpenID Connect](https://www.manning.com/liveprojectseries/federation-and-sign-on-ser)**!

I have written many development tutorials throughout my career and I enjoy the process greatly but I was not prepared for just how much work this involved. All told, I spent over 220 hours and over 200 commits across 11 repositories getting this ready for publishing. This work spanned 4 separate projects, each with 4 milestones containing an average of about 1,800 words each. The final project had 3 separate, functional applications that interacted with each other. Each of the 16 milestones had a full and partial solution containing one, two, or three of the applications, along with a video showing the state of the current solution. It was **A LOT**.

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

Without the following, this project would have probably never made it across the line. 

### The Manning team

At every point, the Manning editorial and administrative team was a complete joy to work with. Everyone was positive and supportive, even when deadlines were slipping and revisions were extensive. Their attention to detail and thorough communication was a blessing. 

One great aspect of working with them was the beta period where developers in the target audience built and tested their project according to the instructions. They called out plenty of mistakes and unclear instructions which lead to a much more accurate and easy-to-follow project. 

### Open source

While I used a number of different libraries to put this project together, there were two in particular that made this take probably half as much time as it would have without them. The authorization server uses [`oidc-provider`](https://github.com/panva/node-oidc-provider) and the web application uses [`openid-client`](https://github.com/panva/node-openid-client), both provided by the fantastic [Filip Skokan](https://github.com/panva). It was my first time working with the former but I'm familiar with the latter, having helped to bring the [Auth0 Express SDK ](https://github.com/auth0/express-openid-connect) to general availability. These two libraries are well-documented, fervently maintained, and do a great job at abstracting what could be very complicated engineering work. 

In an effort to give back and continually show my work, I open-sourced [a few tools](https://github.com/joshcanhelp/oidc-tools) that are helpful working in this space as well as the starting point for [a simple in-browser application](https://github.com/joshcanhelp/vanilla-spa). For the capabilities expose via API, I published an npm package that provides [basic content editing routes in Express](https://www.npmjs.com/package/@joshcanhelp/express-utility-routes). I also published a few of my [automation tools](https://github.com/joshcanhelp/manning-oidc-project), which are explained below.

### Automation

As it always is with automation, I wish I had been thinking about this far earlier in the project than I did. 

As I mentioned above, there were a total of 32 solutions, each of which composed of 1 to 3 applications, half of which needed to be functional (the other half were partial solutions meant to guide learners to a solution). All is mostly well and good as you're building the project but, during the beta testing and editorial review phases, changes need to be made that must be propagated through all future solutions. In addition, dependencies need to be updated regularly in all solutions and starter repos (used when someone buys a single project) need to be kept up to date with the latest solution from the previous project. This work ended up slowing me down a lot at the end making each minor update a complete slog. 

I finally got smart and wrote a few simple scripts to help me with these mind-numbingly boring tasks:

- [Check out and zip up all the solutions](https://github.com/joshcanhelp/manning-oidc-project/blob/main/make_project.sh)
- [Search all solutions for specific packages or methods](https://github.com/joshcanhelp/manning-oidc-project/blob/main/search_all_code.sh)
- [Switch between projects](https://github.com/joshcanhelp/manning-oidc-project/blob/main/switch_project.sh)
- [Update dependencies, commit, and push](https://github.com/joshcanhelp/manning-oidc-project/blob/main/update_deps.sh)
- [Sync and update all starter repos](https://github.com/joshcanhelp/manning-oidc-project/blob/main/update_starter_repos.sh)

## 👎👎 The lows

Without the following, this project would have probably been published several months earlier.

### Writing in two places

The Manning content management system (CMS) was fully-featured but difficult to work with in a number of ways. It accepted Markdown (thank god) but each step was it's own text box and moving these boxes around was quite painful. I'm used to writing [drafts and notes locally in Obsidian](/notes/) and then copying somewhere else, like Confluence. This helps me keep all my writing in one place, link topics and documents together, and use a competent Markdown editor. 

Because of how the CMS worked, though, I would have to copy and paste individual blocks of text and code, adding a lot of time to the writing process. Changing a few words throughout a milestone meant minutes of time copying back into the editor. At times I would forget if I copied it or not or which version was newer. I held on tight to this creation flow, though, hoping that the extra effort would be worth the trouble (I'm still on the fence). 

If I did it all over again, I would have thought through the process a bit more and probably relied on outlines more than I did. I would have also built the entire project from start to finish and then written out the steps to avoid some of the rewriting that was necessary when things didn't work as expected. Lastly, I would have waited until the whole project was complete before uploading all the content. 

### Complexity

The complexity of this project came from the nature of what we were building: 3 separate applications, each with their own set of dependencies, that need to operate together at 16 different points of development. Each of the 16 solutions then needed to be edited to remove functional code and leave behind hints in the form of comments. All of this had to sync up with the steps and sample code within the tutorials. 

I think my main headache here was how many times I had to go back and revise things based on new understanding of how the project would work. I should have spent more time in the beginning understanding the entire deliverable instead of just diving in. More time spent planning here would have reduced a lot of rework and probably have prompted me to write the automation discussed above earlier in the process. 

### Life

*Oh life.*

My main goal with this project was less about income and more about getting my name out there in the digital identity world. I was surprised to have been contacted by Manning initially, not because I didn't have the knowledge required but because most of my in-depth identity work has not been out in the public. I was excited to put my name on something in this industry, backed by a trusted publisher's name.

But life has a funny way of laughing in the face of your plans. The pandemic continued to continue, leaving us with anxious and bored children around constantly. Our child care for the summer dropped out at the last minute. I was flirting with burnout at work during the whole time I was working on this project. And, at the last minute (days before I would complete the final steps to get this published), my mom had a stroke and my life changed drastically. This made the project take 3/4 of a year longer than we expected. 

But, it's done and out there and the hardest parts of life during that time have retreated to "mostly maintainable" status. It does, however, beg the question ...

## 🤔 Would I do it all over again?

Yes! I think so! Probably!

If I knew what life had in store for me during that time, I would have definitely said "thank you but let's talk in 1.5 years when things are in better shape." As I mentioned above, the Manning team was supportive, kind, and flexible while I shot way, way past our contracted date. But the pressure of getting this out at a quality level I could be proud of combined with all the externalities made me consider quitting it many times. 

I guess a more salient question is: will I make another one of these? That answer is a whole-hearted "I really hope so!" I learned so, so much during this process and am proud of how it came out. Understanding the format and work required would help design a project that was less complex and easier to maintain. On top of that, I love technical writing and teaching engineers.

So, yes, I hope to do another one of these in the near future. My question for you is: any ideas?
