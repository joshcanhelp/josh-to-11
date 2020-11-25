---

title: "Testable Documentation Spike #1: \"It's Just Code\""
permalink: false
layout: post
tags: [ "Documentation", "Development", "Testing", "Technical Research"]
date: 2020-11-19 10:05:00
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

## Sample Code

First, we need some code examples to test, lint, and document. We don't need anything complex, just enough to make sure we know we're representing the real world. 

For the "use a module" code, we'll pull in a library, make up some data, and use that library to do something. I'll use this as the code for all the spikes to keep things consistent. [Code is here](https://github.com/joshcanhelp/testable-documentation/blob/master/0-starting-point/sample-1-use-module.js).

I wrote the above out in an editor and ran `prettier`. Then I wrote [a simple test](https://github.com/joshcanhelp/testable-documentation/blob/master/0-starting-point/__tests__/sample-1-use-module.test.js) that would simply require the code above, making sure it ran properly. If you look close at the code above, you'll see that it caught something right away:

```text
"expiresIn" should be a number of seconds or string representing a timespan    
   7 | };    
   8 | 
>  9 | jwt.sign(payload, "TOKEN_SECRET", {      
>    |     ^   
  10 |   expiresIn: this.tokenExpiresIn,   
  11 | });   
  12 |
```

I copy-pasted that block from a running module and accidentally left in the class reference. Turns out, I could benefit from a system that helps prevent dumb mistakes. Who knew?

Next, I needed a sample for the other type of code samples we use ... TODO

## Write the Docs

We now have the testable, linted code samples, now it's time to write the actual documentation. In this case, we're writing it as in-line code comments that are Markdown-capable. I did not dig enough to find the exact Markdown flavor or specifics on how the comments are parsed beyond the library that's used (Marked). So we'll just give it a shot and see what happens.

I made a copy of the sample code above and started commenting away. I give almost every line a comment to see how the documentation flow worked. Sample 1, the "use a module" code, is [here](https://github.com/joshcanhelp/testable-documentation/blob/master/1-code-only/sample-1-use-module.js). TODO functional sample.

Writing the documentation was not a *terrible* experience but the multi-line comments were not as natural as the single-line ones. I could definitely see this process interrupting the writing flow quite a bit if there needed to be a lot of explanation. I tried with the `//` at the beginning of each line but VS Code was not auto-adding that on new lines (probably a setting somewhere). I switched to doc-block style and that did the trick.

## Building the HTML

I've got two well-documented blocks of code, now it's time to see what processing looks like. 

I installed Docco as directed and ran it on the code written in the section above:

```bash
❯ npm i -g docco
+ docco@0.8.0
updated 3 packages in 2.449s

❯ docco *.js
docco: sample-1-use-module.js -> docs/sample-1-use-module.html
docco: sample-2-functional.js -> docs/sample-2-functional.html
```

That was easy! Without passing any options, we generated something that looked like the Backbone docs from above. [You can see that here](/_html/testable-documentation-defaults/sample-1-use-module.html).

While this looked good for a first pass, I was writing the comments visualizing the code and documentation all being the in same column so I added `--layout linear` and tried again. 

![Docco in linear layout](/_images/2020/11/testable-documantation-linear-layout.png)

That's a bit more like it but I'm not sure about the design details. This method of generation also came with 590 KB of fonts, images, and CSS. The final HTML generated from this process will be included or concentenated somehow with an existing site so the less included the better.

Docco allows for a `--template` flag that will accept a `.jst` template file, a format I'm not familiar with. Not really interested to dig too deep into a templating language that time has forgotten, I looked for and found [the `.jst` file used in the "linear" style](https://github.com/jashkenas/docco/blob/master/resources/linear/docco.jst) and stripped that down to [the bare minimum](https://github.com/joshcanhelp/testable-documentation/blob/master/1-code-only/docco.jst). The command complained that I did not indicate a CSS sheet so I added a dummy value.

```bash
❯ docco --template docco.jst --css none *.js   
docco: sample-1-use-module.js -> docs/sample-1-use-module.html
```

That was finally outputting something that could be included somewhere. [You can see the output here](/_html/testable-documentation-custom/sample-1-use-module.html). I was a bit worried that the build process for this would involve stripping or parsing HTML but, thankfully, it does not look like that will be necessary.

## Trying it out

{% include html/sample-1-use-module.html %}

## Analysis

- I see a lot of value with documentation naturally sitting next to the code that it is explaining. Maybe the writing process is a bit harder and the flow not quite as natural but you now have another place that people can look to find documentation. Some might start with the code and be plesantly surprised and some might start on the documentation page and also be happy.
- The order of the comments and code is a limitation. You might find yourself structuring the code in order to make the documentation more clear. That *seems* like the wrong way to think about it but, who knows, maybe it works well over time? This test did not go deep enough to decide. 
- The library I'm using here does the trick but it is quite old. Would we need to adopt it at some point? Would PRs be responded to? It's not abandoned entirely but it's worth considering.



