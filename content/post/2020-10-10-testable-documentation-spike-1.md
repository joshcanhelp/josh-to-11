---

title: "Testable Documentation Spike 1: \"Code Only\""
permalink: false
layout: post
tags: [ "Documentation", "Development", "Testing", "Technical Research"]
date: 2020-10-10 10:05:00
featured_img:
excerpt: TBD!

---

> This is the first spike for the [Testable Documentation project](/testable-documentation-intro/).

I call this first spike the "code only" concept. We're trying to combine code and documentation in a way that we can test and lint the code that we're using. 

One way to do that is to just keep everything as code with the documentation as comments. This "code only" option is not introducing any new tools but writing our code samples in a way that we could solve the rot. 

There are a number of code-only examples out there to draw inspiration from:

- The Auth0 Express OIDC SDK has [runnable examples for a number of use cases](https://github.com/auth0/express-openid-connect/tree/master/examples)
- We also have a number of runnable sample applications, [like this Ruby on Rails one](https://github.com/auth0-samples/auth0-rubyonrails-sample/tree/master/01-Login), that serve as compliments to [a Quickstart tutorial](https://auth0.com/docs/quickstart/webapp/rails)
- My [WordPress Unit Testing post](/wordpress-unit-testing-techniques/) uses a [functional, linted GitHub repo](https://github.com/joshcanhelp/wp-test-plugin)

All of the samples above have something in common: they are code written as educational tools. They are not meant to be deployed but they are fully-functional and, in some cases, under test. The only thing they are missing are the comments that turn them into more of a document than a programming artifact. 

If we added comments to these samples, keeping the code functional, we could do some kind of treatment to improve the readability. What comes immediately to mind is the annotated [jQuery](https://robflaherty.github.io/jquery-annotated-source/docs/01-core.html) and [Backbone](https://backbonejs.org/docs/backbone.html) source code. You can read through the code on the right and, as soon as you need a bit more information, the description is on the left. 

![Docco + Backbone](/_images/2020/10/docco-backbone.png)

The tool to make this happen is [Docco](http://ashkenas.com/docco/). The Docco docs themselves are generated from the [Docco source code](https://github.com/jashkenas/docco/blob/master/docco.js). The last 4 links are a little long in the tooth but, dated styling aside, I think they are still an effective learning tool.

The point here is to write code with comments that serve as the whole example, extra points if they can be compiled into something that looks nice. 

## The Code

In the [intro post](/testable-documentation-intro/), I outlined 2 types of JavaScript samples we need to handle:

- Code samples running functions from required or imported modules (like code samples for an SDK)
- Single exported functions that do discreet processing (like code samples for [Auth0 Actions](https://auth0.com/blog/introducing-auth0-actions/))

**So, let's write up a few samples!**

Turns out, these two match up with the kind of code you would use in [Netlify functions](https://www.netlify.com/products/functions/): helper code and exported functions. I've been meaning to dig into these a bit more (my site is hosted there) and this is a great excuse to try it out!








