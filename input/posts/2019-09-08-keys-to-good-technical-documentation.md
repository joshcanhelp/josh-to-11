---
title: Keys to Good Technical Documentation
excerpt: Summary of the best comments in a Hacker News thread about technical docs.
tags:
  - Async Communication
  - Documentation
  - Writing + Publishing
featured_img: /_images/default-thumb.png
hn_link: 'https://news.ycombinator.com/item?id=20909783'
---

This was compiled from a [Hacker News thread](https://news.ycombinator.com/item?id=20909783).

**TL; DR: Examples, glossary, and reasoning behind potential surprises:**

> * Examples. Realistic, complete, useful examples that demonstrate the software being used in the manner it is intended.
> * Glossary for any special terminology that can't just be googled - especially project specific terminology that may be confusing, and double especially terms or phrases which are used slightly differently to the way everybody else uses them (e.g. 'user' means something slightly different almost everywhere).
> * Lots of "why" describing why the software behaves in ways that seem surprising at first glance.

**TL; DR: Work with a technical writer:**

> The best technical documentation I’ve seen at a company was written by a technical writer. Most companies don’t like hearing this because it costs more than adding an additional drag on your development teams to also become solid writers (good writing is real, time-consuming work). Having someone whose job it was to start from the perspective of your users, ask questions of the dev team along the way, and document the journey yielded enormously useful docs.

**TL; DR: Consider the audience and the JTBD; explain the system as though in person:**

>I think good documentation needs to be written with a few decisions in mind: What role, what kind of person is this section written for, and what kind of task does the reader have at the moment?
>
> There should be sections on familiarizing yourself with the system - which persistence APIs are used, what are the broad dataflows, where are things dispatched into greater detail, what are active parts in the system. And I did say "sections", because a developer, a system operator, a customer supporter and a consultant implementing the system all need different kinds of information and levels of detail.
>
> There should also be sections on handling known task structures, known troubleshooting guidelines, again, with a focus on the role of the current reader. If content has to be searchable via elasticsearch, there should be focused documentation: How do I get an entity into elasticsearch? How do I connect an actuator setting on a pin with a setting on the UI page? These sections should be mostly like a todo-list.
>
> In order to write something like that, imagine just explaining the system to someone and write most of that down. I've found that this results in very effective documentation. It's usually simple to read, and it's also easy to understand if you should read this block or not. For example, if something says "This is scoped for developers", I might skip it.

**TL; DR: Create sequence diagrams:**

> ... come up with sequence diagrams for the most common flows/use cases - sequence diagrams are the killer feature of UML - everyone gets the message.

**TL; DR: Consider the maintenance required:**

> ... the trouble with good technical documentation is it can quickly become bad technical documentation. It needs constant maintenance over the long term. Every patch that's committed to the code needs to be evaluated for how it impacts the docs. Preferably changes to the docs should be done via a collaboration with the patch author(s) and a documentation expert (aka someone who is good at writing technical documentation and is familiar with the conventions of this specific document).

**TL; DR: Consider the maintenance required once more:**

> People hate to update docs so the majority of the time it's out of date even if it was the best ever at one time. I was never told this but reading a ball of undocumented code is part of the job so don't ever expect documentation when you start a job, especially at a startup.
>
> Here are a few things that would make life easier.
>
> * reduce the code's complexity.
> * easy to update
> * Summary of the software's function
> * Major sections of the code should be titled and explained as briefly as possible in code.
> * Docs should be part of the code review. I had a software package that would fail if the code was updated and the comments had not or the other way around. It was easy to disable but at least it made you think.
> * Buy in from the management on keeping docs up to date. Very hard, managers want results not docs
> * Regular review of the docs. 

**TL; DR: Documented tests, module explanation, basic docblock hygiene:**

> Well-documented tests. Why are you testing something? Why do you expect the output to be something? What is the high level purpose of the test?
>
> High level breakdown of the code structure. What is each module / package / namespace intended for? 
>
> Aside from that, then just the basics:
>
> * all functions (or all exportable functions) have consistently formatted docstrings
> * docs are concise most of the time, but overly verbose in any “danger” sections of code that rely on unusual, specific or brittle logic.
> * well documented description of project version control. What are all the usual code management tasks someone needs to do, and why? What is your strategy for hotfixes, releases, rollbacks, sharing branches, etc.

**TL; DR: Don’t do the job of code comments and keep it simple:**

> Documentation should explain why things are the way they are. With sufficient effort, you can look at a piece of code to figure out what algorithm it implements, but there is no amount of reading that will tell you why that algorithm is the right one to use. There should be a way to trace this "why" all the way up to the business reason.
>
> Documentation should provide mental shortcuts. Rather than forcing you to figure out what algorithm the code implements, it could just tell you.
>
> Documentation should tell you things that are surprising, and might accidentally miss or misinterpret.
>
> Documentation should tell you information that you can't just as easily glean from the code. 
>
> Documentation shouldn't attempt to tell you everything with one form of documentation. Documentation on a line or method or class is good for one sort of information, but it doesn't cover the overall architecture of the program. That is often best left as a separate piece of documentation.
>
> Documentation should use the easiest to follow, least technical language it can without being inaccurate. It's not an academic paper; it's an explanation to your fellow developer.
