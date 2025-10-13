---
title: "Do we need 'agentic identity'"
featured_img: /_images/2025/sammy_sandwich_robot_THUMB.jpeg
excerpt: "Agents are here, there, and everywhere, growing in numbers at a pace between fast and breakneck, generating or completing work at some other velocity, and poised to change the world entirely or, like, not much at all. Something must be done."
tags: ["Digital Identity", "Software Engineering"]
---

If you're working in, around, near, or within earshot of the AI world or the identity and security world, you have absolutely heard the term "agentic identity." You will find that some folks have a clear picture of what this means while others feel like there is still much to be discovered and defined. 

What is consistent between everyone close to this topic is the pressure to have an opinion on it. Agents are here, there, and everywhere, growing in numbers at a pace between fast and breakneck, generating or completing work at some other velocity, and poised to change the world entirely or, like, not much at all. Something must be done.

Regardless of your general opinion on AI and where it's going, it seems like there are new and interesting challenges in the identity space that are begging for a considered approach. I've been a part of some truly fascinating conversations about AI and identity with a very wide-ranging set of people in the last month and I'm here to say: **I've solved it**.

Just kidding. But I do have an opinion and I'd love to share it with you.

## The words that we use

The word "agent" is very overloaded right now, maybe approaching in load to the word "client." We, as an industry, have been able to navigate "client" pretty well by being deliberate and I think we can do the same here.

But I want to start with the other word: **identity**. This is also a very challenging word to use consistently, especially in the year 2025. We contain multitudes and, as such our identity is complex and layered and multifaceted and ... 

Not at all relevant to this discussion. 

The way identity was described to me early on in this stage of my career is as such (paraphrased):

> Identity is the set of attributes used in the context of a business transaction.

So, when we're talking about software and systems and applications, this is an identity:

```json
{
  "email": "josh@joshmighthelp.com",
  "name": "Josh M",
  "wheel_size": "29"
}
```

... and this:

```json
{
  "client_id": "4bc595344de773a886380989bfbed228",
  "iso6391": "fr-ca",
  "tvvr": "12-AA"
}
```

... and even this:

```json
{
  "theme": "light"
}
```

... but it's *information* about *an entity* that's trying to *do something*. The recipient determines whether or not it understands the information, if it trusts the information, and if the information is what is needed to let said entity do the thing it wants to do.

There are decades of work created by smart and dedicated people to describe this down to the bit level but I wanted to centralize my opinion on, what I hope, is a simple concept that we can all agree on. **Identity is trusted information representing an actor in a transaction.**

I think it's very important to be deliberate about this word because the other word is much less well defined. Identity *can* be such a squishy word in the real world but, in the digital world, it's not. Let's lock one of these terms down so we can focus on the other. If you've ever had a pair of 5 year old twins try to steal everything out of your pockets at the same time, you will understand why this is important.

## ✨ Agentic ✨

Here is where things get tricky and the reason why, in my estimation, is that we all have a slightly different concept in our head when we hear or say the word "agent." And because we're potentially talking about a different thing, we can't quite agree on what to do about "agent identity."

Regardless of your worldview and AI optimism level, these two concepts are quite different. So when you take the word **agent(ic)** and tack it on to any other world, that ambiguity comes along for the ride:

- Agent intelligence
- Agent capabilities
- Agent restrictions
- Agent morality
- Agent awareness
- Agentic reasoning
- **Agentic identity**

When we try and define the terms like the ones above, we start talking in different directions and get caught up in what an agent is instead of the problem we're trying to solve: what identity should be used in what context?

At this current moment in time, it seems like we have 3 options for an identity of an agent:

- **A user identity.** The agent is an extension of a person with an existing set of attributes to use and is acting on their commands. If something goes wrong, the person will correct it immediately. The agent is being used in a similar way as a UI, with unintended consequences being similar to a bug.
- **A machine/service identity or NHI.** The agent is able to take a limited set of actions based on inputs and has it's own set of attributes to use. The actions that are allowed are based on what we expect that agent to do and can be revoked immediately, either by turning the agent off or disabling the credential. The agent is similar to a CI/CD pipeline or an IoT device or a microservice.
- **Something else.** The agent doesn't quite fall into the categories above and we need to come up with a new one.

It's that last category where this all gets hung up. Do we need to come up with a third category of identity for scenarios that don't fit the other two? Is it just one distinct category that catches everything else or is it further divided? What information do we use to make those decisions?

There are a lot of different things people are thinking about when they consider this potential new 3rd (or more) category of identity:

- Is identity defined by persistence? Autonomy? Consistency?
- What role does non-determinism play? Should agents have their own type of identity because we can't predict their outcome? Wait, should we actually introduce that lack of predictability in the first place?
- Can we measure the consistency? Measure their alignment with a person's intent? Measure their honesty? Would that matter?
- What happens when agents are making decisions faster than people can approve them? What does that look like at scale? Wait, do we want that at scale?
- What would get assigned an entity? A model? A specific agent instance? What about 2 identical agent running identical models, like load balanced servers? Is that one identity or two? 

These questions are fascinating and fun to think and talk about but, at the end of the day, I don't think any of this is relevant to the question at hand of whether we need a new concept or not.
## What is actually new here?
Let's walk through a realistic use case as it becomes more "agentic" and see if we can find the point at which it needs a new concept of identity (or not). Let's say I want to look through our CRM, identify high churn risks, and send an email check-in. Here's all the ways I can think of doing that:

1. Log into the CRM, build and pull a report, then email the customers directly.
2. Log into the CRM, use an LLM to create a report, then email the customers directly.
3. Build a service to query an API endpoint on the CRM to figure out who should be emailed, then send the emails using an API like SendGrid or SES
4. Build a service to query an endpoint that runs an LLM against the customer data to determine who should be emailed, then sends the emails via API
5. Build an agent to query the CRM and determine who should get emails and when, write the emails, then send them via API

There are probably a number of half-steps here that I missed, places where an agent could interface with another agent to separate tasks, maybe another agent to handle the replies. But I think the list above covers enough ground to determine where a new identity paradigm might be helpful.

**In short, I don't see anything new here.** 

If you replace the agent/LLM above with "business logic written in code," then you would always reach for a service account and set the permissions to exactly what you expect that service to do. In my mind, the difference between automating a process with code and automating a process with an LLM is just more non-determinism. What about that needs a different identity concept?

There are lots of ways to introduce non-determinism into the system above that can use existing specifications:

- I can YOLO a vibe-coded service directly into production. It will use a service account and I'll get fired if it goes completely sideways.
- I can email a contractor a specification and immediately deploy whatever they send back.
- I can pipe internal data to some unvetted service, hand it some credentials, and see what happens.

I think the important thing to ask, especially, when you're starting to think about a whole new branch of identity, is ... **should we be doing it this way in the first place?**
