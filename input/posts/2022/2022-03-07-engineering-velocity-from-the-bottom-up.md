---
title: "Engineering Velocity from the Bottom Up"
featured_img: /_images/default-thumb.png
excerpt: "When I look to increase my velocity, I&#39;m trying to deliver more work I'm proud of without burning out. I want to get the most out of my time and maximize the parts of the job that I enjoy. Here's how."
tags: ["Systems", "Team Dynamics", "Software Engineering", "Iteration", "Best Of"]
permalink: engineering-velocity/index.html
hn_link: https://news.ycombinator.com/item?id=30602432
---

What comes to mind when you hear the term "engineering velocity?"

If you take [Wikipedia's definition](https://en.wikipedia.org/wiki/Velocity_(software_development)):

> The main idea behind velocity is to help teams estimate how much work they can complete in a given time period based on how quickly similar work was previously completed.

... then you might have an urge to run away screaming. Work in this industry long enough and you'll be exposed to many misguided attempts to do more with less.

I want to take a different tack, though, and take a look at it from the bottom up. If you enjoy the technical designing, code writing, and problem solving components of software engineering then **you probably care just as much about your velocity as any product manager does**. This kind of velocity is not about how fast you can get tickets across a board; you can increase that metric by shipping garbage, working overtime, and banking technical debt.

When I look to increase my velocity, I'm trying to **deliver more work I'm proud of without burning out**. I want to get the most out of my time and maximize the parts of the job that I enjoy.

> "Working hard is not valuable." _~ Senior Engineer at Google_

Spending hours debugging issues, re-running flaky integration tests, fretting over whether or not a PR is ready to merge ... all of these things are low value tasks that slow us down and make us spend cycles on work that, frankly, we're just not that into. Clicking, typing, and talking faster might get your PR shipped but maybe it’s time to slow down and look closely at the system you are working in.

> "... velocity improves when you focus on the details.  It's usually an aggregation of interruptions and churn that are the biggest productivity threats to a team." ~ Engineering Director at Okta

I talked with a number of folks at different levels here at Auth0 and elsewhere to see where they see velocity sinks. As I compiled what I got out of those conversations, I saw a pattern of work "pooling" in different places, usually at a transition point. Depending on how your team is structured, these might be transition points between individuals or even teams, compounding the problem.

This all adds up to a simple but powerful idea: **your own day-to-day productivity is a result of a system.**

From Cal Newport's piece on the [Frustration with Productivity Culture](https://www.newyorker.com/culture/office-space/the-frustration-with-productivity-culture):

> Instead of demanding that employees individually produce more, we should instead seek systems that produce more given the same number of employees. This shift might seem subtle but its impact can be enormous, as it frees individuals from the complexity of optimizing output all on their own, and defuses the psychological torment of pitting the personal versus the professional.

Your own velocity on a team has far more contributors than just your speed in writing code and tests. Use your [beginner's mind](/we-need-your-beginners-mind/) and start asking questions about all the levels below.

Your primary job as an individual in this system to be mindful of time sinks in the pipeline described below and take the time to fix or flag them. Shift away from "_we're behind; I need to work harder/faster/more_" and towards "_it seems like we've slowed down; let's figure out what part of the system could work better._"

## Sequencing

As I was putting this together, I kept thinking about a sequence diagram. Successful, deployed changes to an application flow from the initial state to the end state. Thinking about it end-to-end acted as a good reminder that my velocity does not start or end in my editor.

<a href="https://swimlanes.io/u/KjpfVHTFT" target="_blank_"><img src="/_images/2022/engineering-velocity.png" class="aligncenter" alt="Engineering velocity sequence"></a>

The stages in the diagram above are explored below. Think of this less as a "how to do this exactly right" and more of a reminder to look for time sinks at each stage and gauge them relative to the others.

### Vision

This is where your impact as an engineer comes into focus but your influence at this stage does not have a huge effect on your velocity so I'm not going to spend much time on it here. Suffice to say, an unclear or unknown vision will cause a lot of indecision and confusion at all levels of an organization.

You might hear the word "alignment" in planning meetings and your eyes might glaze over but it turns out, in the strange game of telephone that is software development, aligning what you create with the overarching visions of your team, product, and company is one way to avoid do-overs. Double if you call out misalignment before work starts.

If you're not sure how the specific thing you're building connects to the company strategy at large, **ask the question!** Seeing the big picture of the impact your change contributed to helps you to make decisions, both large and small, more easily and with more confidence.

#### Things that can help at this stage:

-   Links to company, domain, team, and product-specific vision documents from engineering artifacts
-   Engineering participation in product meetings and documents
-   Always asking “what is the job to be done” at all stages, large and small
-   More great tips in [Working with Product Managers: Advice from PMs](https://newsletter.pragmaticengineer.com/p/working-with-product-managers-advice-from-pms)
    
### Planning

This is where your impact is getting stronger but we're still just fading in. The planning phase is typically where engineers start taking over or are, at least, heavily involved. At this point, the picture of what we are building should be much more clear. Visual designs are at or near their highest fidelity as we move from "what" to "how."

Before starting the research for this post, I was already convinced that planning was at least as important as writing code. Once I consolidated all the feedback I got, it was clear that this step might outweigh the rest in terms of proactively creating the right environment to move fast both as a team and as individuals.

In terms of velocity, planning helps us do 3 critical things:

-   **Make sure we're shipping incremental value.** This switches our thinking from "faster" to "earlier." What's the smallest piece that we can get into use?
-   **Avoid re-work and churn.** Building the wrong thing and finding bugs in production are huge time sinks and morale killers.
-   **Help reviewers to gate on the right things.** Technical aspects of a PR are important but so is shipping something correct and complete.

Easy, right?

#### Things that can help at this stage:

-   Early user research
-   Designs that cover the targeted use cases
-   Acceptance criteria for the milestone that defines done
-   Acceptance criteria for individual tasks that add up to a completed milestone
-   All-team effort on breaking down work and writing requirements

### Building Context

This is part of the this pipeline that often gets left out of the conversation. At some point, all of this vision-ing and planning and pontificating turns into functional software. There is this magical moment between planning and code at which a Jira story blossoms into a beautiful technical path forward. **That's this stage.**

Arguing about design in pull requests is expensive and inefficient. Proposing a design ahead of time for your team and/or architects to review saves time down the road and avoids the "sunk cost" pressure you might feel when someone is suggesting a rewrite in a pull request.

But building context is not just about explaining the perfect thing in your head so other people get it. Writing about and diagramming and sequencing a large and/or complex part of your system helps you develop a more complete picture yourself, including dependencies, potential security flaws, performance issues, gaps in design, etc.

From [The Biggest Mistake I See Engineers Make](https://www.thezbook.com/the-biggest-mistake-i-see-engineers-make/):

> When you work on a team, you shouldn’t be in competition ... you are working cooperatively to ship the best possible product, as quickly as possible.  And there’s a huge advantage in leveraging the team’s collective wisdom to build better and faster.

Finally, all this context-building at this stage is helpful down the road when you’re asking yourself “how does this work? why did we build it this way?”

#### Things that can help at this stage:

-   Technical design documents or diagrams and a system to organize them
-   Spikes to gauge feasibility and complexity
-   Decision-making frameworks like DACI to help weigh options
-   Up-to-date architecture documentation for the service we're creating or using
-   Clearly documented data model(s)
-   Spending time onboarding new team members
-   Protecting time needed to write the docs (internal and external)

### Writing Code

Ah, the magic land of headphones, keyboards, and caffeine ... or whatever combination gets your fingers moving.

In this section, you will not find great tips to write code faster. We're going to just assume that you write code plenty fast enough. I'm also not going to wade into any controversial waters here (TDD, OO vs functional, code comments) because that goes against the overall point I'm trying to make here.

What I suggest concentrating on are all the things that slow you down when you're _not_ writing code. Things like …  
  
… does your test suite take so long you can take a shower while waiting?  
… how often are you fighting with your local environment?  
… how much focus time can you (or do you) carve out for yourself?  
… how much time do you take searching through folder trees for a file?  
… how clear are the error messages when something goes wrong?

We all know that feeling that comes from working on something small or in the beginning. The tests run in seconds, the architecture is dead simple, and you can move at a super-human pace. Then you switch over to the app your team has been maintaining for 5 years and it's all swear words and hair pulling (ask me about the time I left vulgarities in demo content). The latter will never be the former but it's easy to find yourself regularly sinking the same 15 or 20 minutes into a task or problem in the name of "shipping."

#### Things that can help at this stage:

-   Stable unit and integration tests that can be run per file or group
-   Initial setup and onboarding documentation
-   Scout's mindset on local environment startup, performance, and issues
-   Debugging profiles, guides, pairs, and FAQs
-   Regular, protected blocks of focus time > 1 hour

### Reviewing

Love it or hate it, code reviews are a critical part of the job. You will, of course, be working in a culture as a part of a team within an organization that probably has a way of doing things, for better or worse. As such, there is likely a limit to the changes you can make to the process. Like the rest of this post, though, limitations should not stop you from proposing and talking about ways to make this stage faster and less painful.

I'm personally fascinated by this stage of the process because it's such a [sociotechnical](https://en.wikipedia.org/wiki/Sociotechnical_system) minefield! I'm submitting my hard work for review by someone I probably don't know all _that_ well with part of me hoping I don't get called out for something stupid and part of me relieved to not be held completely accountable for a potential flaw that causes a data leak that appears on the news. Even if I adore the people I work with, **I'm still gutted when they find that inevitable stupid mistake I made.**

Depending on the flexibility your team has, start with an honest, open conversation about what makes this stage difficult. Everyone should know what constitutes a complete review so reviewers aren't scared to approve (or reject) a PR and authors aren't motivated to spend an inordinate amount of time gold-plating (aka making it perfect) trying to avoid embarrassment.

#### Things that can help at this stage:

-   Automated linting, checks, and tests
-   Reducing PR sizes to encourage faster, more effective reviews
-   Consistent review criteria across team members
-   Spending more time pairing and reviewing with new team members
-   Clear success criteria for the task being worked on
-   [More tips on my notes from from "Rock Your Code Reviews"](/rock-your-code-reviews-webinar/).

### Deployment

Entire books have been written on deployment methods and strategies. I'm far from an expert in this domain but I can tell you a story about how I have come to understand the importance of a healthy deployment pipeline.

I started my development career as a freelancer. When you're building sites and applications yourself, there is not a lot of time in the budget, paid or otherwise, to worry too much about what happens after you "merge" (or, in this case, "copy to the production server via FTP") your changes. In the most critical cases, I would have a very long manual script I would maintain to test out all the various use and edge cases once that code was in production. Discover a new problem in production? Add a new block of bullet points.

Once I started working at Auth0 and seeing how it's done when the stakes are much higher and when you have teams of people worrying about these kinds of things, **my mind was blown**. I thought back to countless hours I spent debugging a critical issue in production using only haphazard logging and sparse email descriptions of the error messages. At the time, I thought "there must be a better way" but a lack of knowledge and development budget kept the system functioning at the same, sub-optimal level.

#### Things that can help at this stage:

-   Functional or E2E tests that check your changes against the entire system
-   Documentation for common pitfalls, errors, and flakiness
-   Continuous improvement of observability systems
-   Clear general and change-specific rollback plans
-   Protecting time post-merge to shepherd the change through

### Staging

Catching bugs in production is expensive and rebuilding incorrectly-implemented functionality is even worse. Your goal at this stage is general acceptance of the current trajectory of what you're building. Think of it like a vector: does the magnitude and direction look correct at this point?

What you're doing at this stage is creating a way to review that's a level higher than individual changesets of code. This higher level creates a stronger connection between the changes you're making and the vision. You can think about this kind of hands-on testing as closing the loop on what you just made.

#### Things that can help at this stage:

-   Regular demos to reviewers, the team, and stakeholders
-   Early and thorough testing by designers and stakeholders
-   Early access customer testing
-   Easy and simple issue reporting
-   Clear documentation on how to pause the promotion to production

## “Umm, this is a lot Josh”

Yeah, I feel you, this _is_ a lot.

This post was mainly an exercise to wrap my head around all of the different things I've heard, read, and implemented to help myself and my team ship well. There are a lot of things to consider and we're all going to have to be OK with this simply never being a destination we reach.

But perfection here is not the goal. Technology moves fast, we're all human, and, at some point, there is an inflection point of return on investment of time. I hope that this can be a helpful rubric for folks to use when they start getting that sinking feeling that something is wrong.

In the end, I think it's critically important for us as individuals to move beyond a mindset that puts the responsibility for our productivity solely in our hands. Pushing yourself to write faster or work longer or check more boxes in a day _might_ work in the short term but you risk burnout, dissatisfaction, and frustration. Instead, **look at the systems that you're a part of and accept that your editor window is just a small piece of the puzzle.**

## Resources

- [Debugging engineering velocity and leading high-performing teams](https://leaddev.com/productivity-eng-velocity/debugging-engineering-velocity-and-leading-high-performing-teams)
- [The Frustration with Productivity Culture](https://www.newyorker.com/culture/office-space/the-frustration-with-productivity-culture)
- [The Biggest Mistake I See Engineers Make](https://www.thezbook.com/the-biggest-mistake-i-see-engineers-make/)
- [Working with Product Managers: Advice from PMs](https://newsletter.pragmaticengineer.com/p/working-with-product-managers-advice-from-pms)
- A colleague recommends [A Philosophy of Software Design](https://www.amazon.com/Philosophy-Software-Design-2nd/dp/173210221X) if you are, in fact, interested in improving how you write code. 
