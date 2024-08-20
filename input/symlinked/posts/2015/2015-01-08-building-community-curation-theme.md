---
title: "Building a Community Curation Theme: The Making of Rank It WP"
excerpt: "I’ve been working on a new theme over the last few months and, now that it’s ready for use, I wanted to walk through how it was built. This is definitely the most technically-involved theme I’ve ever built and I learned a lot (more) about WordPress in the process."
tags: ["WordPress", "Community", "Software Engineering", "Portfolio"]
featured_img: /_images/2015/01/rank-it-wp-logo-SQ-150x150.png
---


> Please note: I originally created this theme but sold the product to another company. I do not provide, support, or manage this theme.

I’ve been working on a new theme over the last few months and, now that it’s ready for use, I wanted to walk through how it was built. This is definitely the most technically-involved theme I’ve ever built and I learned a lot (more) about WordPress in the process.

At the risk of sounding like a myopic fanboy, I like WordPress more and more each time I create something new with it. I’ve been working with the platform for almost 8 years, long enough that I’ve seen it mature in a huge way over time and had the displeasure of using it before some of the really cool things were in place. WordPress is not the answer to every problem but it fits the bill 9 out of 10 items. If it’s a content site you want then it’s WordPress you should use. **Period**.

![](/_images/2015/01/rank_it_wp_product_hunt_wordpress_screenshot.png)

The theme is called Rank It WP and it’s a community curation platform to gather, rank, and discuss user-submitted content. With all of these buzzwords comes some fairly involved technical underpinnings that make it all happen. Some of the challenges here were:

- Making the user interaction simple, easy, and branded; I wanted to avoid showing wp-admin screens
- Allowing simple content submission without opening the site up to massive spam issues
- Creating a content ranking algorithm that not only worked but won’t shut the site down during processing
- Making sure everything worked just as well on mobile as on a desktop

There were a few hiccups along the way and definitely more work to do but the final product fulfilled those goals quite well, if I may.

Let’s walk through some of the code that made it all happen.

## “Front-End” Login, Register, and Profile

These 3 components took up probably the largest amount of time total but were critical to the site working as I imagined it. Everything needed to be on-page and avoid ever showing the wp-login screen.

![](/_images/2015/01/rank_it_wp_login_modal.png)

While the user interaction here was important, I didn’t want to sacrifice security in any way and I didn’t want to “break WordPress” by messing up any hooks or filters that are involved in this process.

The login process works like so:

1. A site visitor who is not logged in tries to vote up a link, submit content, or click on the **Login** link.
2. A modal appears (I used [Remodal](https://web.archive.org/web/20160624054717/http://vodkabears.github.io/remodal/), an excellent jQuery plugin) with tabbed navigation to show the login, registration, and reset password forms
3. Using AJAX, I post the visible fields, along with a honeypot and nonce field, to WordPress for validation
4. On the PHP side of things, I check for missing or invalid fields, then check the password using `wp_check_password()`
5. If there were any problems, the error message is passed back to the login form and the user is required to try again.
6. If not, the form is posted to wp-login.php to do all the cookie and session magic; the user never sees the login form but, ultimately, WordPress core handles the actual login
7. The user is redirected to where they were, logged in and ready to interact

There are a number of tutorials out that that show how to do the entire login process without wp-login.php but I wanted to make sure that nothing in core was bypassed. In my opinion, there is no better security that one that hundreds of people are working on and millions are testing. I discovered the `wp_authenticate()` function post-launch so I’ll be refactoring the login process to use that on the next go-around.

The registration process doesn’t need quite the same security, but it does need comprehensive sanitization and spam control. Similar process overall:

1. On the login form, a non-authorized user clicks the **Register** tab and enters their username, password, email, and display name
2. Using AJAX, I post the visible fields, along with a honeypot and nonce field, to WordPress for validation
3. In PHP, I validate the username, password, and email to make sure they are compliant and sanitize the display name, if one is present; I also spam-check against the blacklist
4. If everything checks out, I use `wp_insert_user()` to attempt the user account creation.
5. If there is an error, it’s posted back to the form for the user to try again
6. If not, the user is created, logged in, and redirected to where they were

The next version of this theme will allow for user moderation in the form of more granular control over what users can perform what actions. Right now, when you register, you’re able to start creating content in the form of submissions and comments. I want to tie those actions, as well as content voting, to a role and let site admins determine what roles can complete what actions.

The reset password action is the only one that does use the wp-login.php page in a way that’s visible to the user. This is also on the docket to fix in the next version.

The last part I wanted to talk about here is editing the user profile. I really wanted to implement a front-end profile editor but that turned out to be too much work to fit in the first version. Long story short, I’m hiding all the wp-admin menus and pulling in styles from the main site. This lets the user profile look like the front-end of the site but still allow for plugins (like WP User Avatar) to hook into the profile screen.

## Front-End Content Submission

This was another key function of the theme that could, potentially, open up sites to security issues and spam posts.

![](/_images/2015/01/rank_it_wp_submit_modal.png)

The basic spam controls that I’m using are:

- Users must be logged in (the next version will have a feature that will allow site admins to moderate users with roles to allow specific actions)
- Submission occurs via AJAX, which precludes spam bots
- Submissions are sent through the spam blacklist
- Submissions are moderated

These 4 things together pretty much ensure that spam posts don’t get by. Coherent sanitization avoids any security issues from malicious users.

The process here is fairly straightforward:

1. Authorized user clicks the **Submit** control
2. They are presented with the form shown above; I included filters to add fields of specific types (documentation forthcoming)
3. Title and URL are both required, the rest is optional; once the fields are filled out, the form is submitted via AJAX
4. On the PHP side, I run a number of additional validations
    1. Are the required fields there? If so, show an error
    2. Does that link already exist? If so, show a link to that submission
    3. Has the user reached their 24 hour submission limit? If so, show an error
    4. Is there any blacklisted content? If so, show an error
5. The insert post arguments are filtered and the content is saved
6. If the user is an admin or editor (and the right setting is activated), the submission automatically publishes
7. If the user is not either of those roles, the submission is added as “Pending” for review by an editor or admin

Right now, the submission is handled with vanilla jQuery AJAX POST actions but that, like, commenting, will be refactored to use BackBone for the next version.

## Content Ranking

This entire theme started with the premise of having a site that would rank content based on time, votes, and comments. [The algorithm I used is explained here](https://web.archive.org/web/20160624054717/http://rankitwp.com/docs/content-ordering/).

The voting process is simple: an authorized user clicks the vote up, this vote is counted in the user’s meta field, and a new ranking is calculated and saved.

The problem is, of course, that content in the system is constantly getting older so the ranking is changing every second. In a perfect world, we’d calculate the ranking for all content at every vote and at specific intervals in between to make sure that it’s fresh. Since this isn’t scalable at all, there is a wp-cron process that runs hourly to handle this.

Admittedly, this still isn’t a great solution. For sites with less than, say, 500 submissions, this will probably work just fine. Depending on the server, this might be good up to 1,000 submissions or more. Past that, though, users will start to see slow-downs for each run.

The answer to this came from [Eric Mann on StackOverflow](https://web.archive.org/web/20160624054717/http://stackoverflow.com/a/27279395/728480):

> Still use cron, but don’t schedule it as a cron job in WordPress. Instead, write a WP CLI routine that does the reindexing for you. Then, schedule real cron jobs to process the job.
> 
> This has the advantage of using PHP’s command line version, which can be configured to skip the timeouts and memory limits imposed on the FPM/CGI/whatever version used to serve the site. It also means you don’t have to wait for site traffic to trigger the job – and a long-running job won’t block other cron events within WordPress from firing.
> 
> If using this process, I would set the job to run hourly and, each hour, run a batch of 1/24th of the total posts in the database. You can keep track of offsets or even processed post IDs in the database, the point is just that you’re silently re-indexing posts throughout the day.

The next version (I keep saying that, it’s going to be a big job) will include a control to adjust wp-cron, or turn it off, along with documentation on how to set up an actual cron job that will process submission ratings throughout the day

## Mobile Concerns

![](/_images/2015/01/rank_it_wp_product_hunt_wordpress_mobile.png)Yet another key component of the site is the mobile experience. Responsive CSS was a given, and simple given the layout of the pages, but I wanted things to be not just _possible_ to use on a small screen but also _enjoyable_.

A few of the things the the theme does (beyond just resizing boxes):

- The navigation menu collapses all the admin-added options but leaves the submit and login controls visible
- Remodal made life very easy by creating useable, resizable modal windows for login and submission. I also used Remodal for the mobile menu, which works very well
- Click/touch targets for the menu and voting were increased to account for finger size
- Certain non-essential pieces of content are hidden in mobile to save space

More testing will certainly find a few places where this could be improved but, overall, it’s a very coherent and useable mobile experience.

## Other Components

The components above accounted for the bulk of the technical work on the theme but I wanted to draw attention to a few more things on the site that I’m proud of.

### Media Embeds

The theme uses [core oEmbeds](https://web.archive.org/web/20160624054717/http://codex.wordpress.org/Function_Reference/wp_oembed_get) to generate media on-page for [specific sites](https://web.archive.org/web/20160624054717/http://codex.wordpress.org/Embeds#Okay.2C_So_What_Sites_Can_I_Embed_From.3F). Before this feature came along however many years ago, I was writing my own wrappers, parsing the link, and building the embed code. This worked fine but only supported the sites that a client was posting from. The oEmbed feature of WordPress is honestly one of my favorite things to use, it’s so stinking easy.

### AJAX Commenting

I’ll just come right out and say it: this was annoying to get working properly. Comment submission and display isn’t too terribly hard but making it work with threaded comments and replies was tricky. Not tricky like technically involved, tricky like too many edge cases. Still, it was an important part of the theme and now it works like a charm. AJAX comment submission is smooth and easy to use on desktop or mobile. At some point I’d love to add polling of some kind to check for new comments but that’s a few versions away.