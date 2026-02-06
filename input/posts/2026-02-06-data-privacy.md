---
title: Fighting for My Data Privacy
excerpt: It feels more important now than ever to take back some control and add a layer of privacy and protection where I can. This is how I'm doing that.
tags:
  - Personal Data
  - Digital Identity
featured_img: /_images/icons/facebook-anon.png
---
I just can't help it: I desperately want some privacy on the internet!

There are a lot of things to be worried about in this world, I know this experientially. I am a worrier and, as a worrier, one of my subconscious hobbies is to come up with novel ways to paint a less-than-rosy future for myself and the ones I love. I have come to terms with this aspect of myself and do my best to challenge it where I can.

I also hate big tech. I think it's becoming popular to do so (one can hope) but I can say that I started before it was popular. I will not use Meta for anything, period, I've worked most of the Google-y bits out of my life, and now I'm working on Amazon. If you're reading this you probably had some kind of reaction to that, either feeling like a kindred spirit or maybe picturing me in a tin-foil hat. The fact is, I hate the fact that I am constantly being mined for data that may or may not be used, and, if it's used, may or may not be used in a reasonable, or even legal, way. They will always move faster the the law will evolve, they will always have little "oopsies" now and then, and they will always default to trying to get more and more. 

I don't like that. 

I have been thinking about how to fight back against this for a while but when you're working and raising kids and trying to fend off the chair shape that the middle-aged knowledge-working body is desperate to adopt, there aren't a lot of time for things like this. Pushing your friends to install the *right* [encrypted messaging app](https://signal.org) instead of the one owned by the data vampire is just one more thing. You start to become *that guy/gal*, the one your neighbors see coming and know what kind of conversation they're about to have.

But there are three things happening right now that pushed me over the edge on devoting some time and attention to this matter:

- The current US administration scares the shit out of me on a number of levels
- AI took the existing ravenous hunger for data and somehow hit the accelerator on it; I'm also guessing that it will increase the number of data breaches that we see happen
- My kids are at or reaching the "internet age"

It feels more important now than ever to take back some control and add a layer of privacy and protection where I can. This is how I'm doing that. It's my hope that I can share what I'm doing to help other folks going down this path, while also getting some feedback on my approach.

## What do I care about

At the beginning of this, I had to think about what I really care about and how far I wanted to go with all of this. The more you step outside of the mainstream apps the people use, the more isolated you become. Some of this isolation is delightful (when I see people now, I get to ask them what they've been up to instead of already knowing from scrolling on Facebook) but some of it makes life and staying connected with people harder. 

There is a sense of "those that matter don't mind," and I'm someone who relishes some of the friction that comes from de-optimization. But Facebook is a thing and there are plenty of community organizations and small businesses that only exist on Facebook because it's easy and everyone is there. I don't fault anyone at all for that. 

So, how can I operate in the world according to my values without completely cutting myself off? I thought through the things I needed and the things I didn't and here's where I landed:

- There are many, many places where you are asked for personal information that is not necessary **at all**. 20% off your first order (my phone number? really?), rewards programs, app sign ups ... so, so many things. These can be shared with the family and don't need to be real information.
- There are some places that really make it seem like they need your personal information, like Facebook, Google, etc. Yeah, yeah, spam protection and all that but no, sorry, you lost your privileges here. If I need an account on one of these platforms, I need fake information *and* to mask my location when using it (if I use it at all).
- Then there are services that don't function without my personal information. Online lab results and local parks + rec services and utilities. They are going to store very sensitive information anyways so trying to be anonymous here is not going to help much.

This takes care of the bulk of problematic services and I'll walk through how I'm solving them below. But the big, hairy, pink elephant in the room is ... **Apple**. I thought for a while that they were the "privacy company" and I think they're better than Google in this realm but Tim Cook publicly "kissing the ring" grossed me out and shook out whatever intrinsic loyalty I had for them.

But I digress ...

The point is: whether I hate your company or not, I'm going to work hard to give you as little data as I possibly can. **Sorry not sorry.** I'm working at getting as much data as I can out of Apple and encrypting what they will let me.

## Tools

I sat down and figured out what I would need for all this and then did a bit of research into different companies and how this could come together. 

First, I signed up with [Proton](https://proton.me/) Mail and moved my email and calendar from Google to there. This was a whole thing and took a while to actually get it done, mostly because it's a big, boring screen-based chore and I was worried about losing 15 years of emails (because I'm a data hoarder, which makes all of this harder). But I got it done and haven't looked back. 

Well, I mean, *mostly*. I had strong motivations to switch over - the whole privacy thing and hosting critical personal data outside of the US - so I was willing to overlook some clunkiness. The Proton Mail app is fine. Calendar app is fine as well. It all works. But, my god, the difference in search between Google, the search company, and Proton, the privacy one, is hard to swallow. I was so used to how magical email search is in Gmail that when I switched over I thought I had lost the bulk of my emails. No, it just doesn't find emails even if the word you're searching is exactly the same. **Lame.**  But I'm here and I won't switch back. 

Next, I invited my spouse to join and created a shared email address that we could both use for shared services like utilities, streaming, etc. I don't know if she's going to be able to make the jump to Proton entirely but at least the shared stuff can stay relatively private.

This covers all personal emails to people that I know, as well as emails with businesses and services that already have my real identity stored.

The next step was to create anonymous contact methods that I could use for services that absolutely don't need to know anything about me. An email alias with Proton would be fine but I also wanted a phone number. I used a service called Burner for a Craiglist posting a while and it worked great so I looked into them for a number. The price seemed fine but I wondered about their privacy policy so I fed it to Claude and the results were disappointing: 

> There's a clear tension here. For a company whose products are sold on the premise of privacy, their actual data practices include standard adtech behaviors: tracking SDKs, marketing data sharing, and inference profiling. They're not egregiously bad compared to typical apps, but they're not practicing what they preach either. If you're using Burner specifically to avoid being tracked, you should know the app itself is participating in the ad ecosystem.

[Link to complete chat](https://claude.ai/share/0b8acd71-c719-4a7a-8b76-25deb6355894), first prompt.

**Lame.** But there are other providers. I found [MySudo](https://anonyome.com/individuals/mysudo/) and that one checked all the boxes and more (they include a payment card number as well). Their privacy policy checked out (second prompt on the link above) and the price was surprisingly good, $50/year for 3 emails and 3 phone numbers. I also *really* appreciate a company that leads with the monthly price and offers an annual discount, instead of using the annual monthly price with small print about the year commitment. There's something about the latter that just smacks of gross conversation optimization and pricing psychology.

TL; DR: on the setup here ... everything worked and is working great! One slight bump in the road, I tried texting the number they provided from my phone and it came back with an error. Their support responded *very* quickly and it starting working after an hour or so. I think the number just took a bit to provision in the system.

The plan here is to have an anonymous email address for each person in the family so they can have accounts on their own, then however many phone numbers we need for validation for those accounts. We'll use this when signing up for anything new (right family? Right?!) and start swapping things over one by one as we log into things. 

## Case Study: Target

Target, in my mind, is just another big company operating in a similar way as I described Big Tech above. They will only let you download your data if you live in a state where it's required. That to me says it all: a company that does *more* work to figure out what state you're in, make you select an eligible state to submit the form, then sends you an email specifically telling you that you can't have your data. **Beyond lame.** Are you annoyed as I am yet?

We won't be buying much there going forward but it does have it's uses. 

First thing was to sign up for an account with the main anonymous account. Email and phone verification worked great and we can now shop in a store and keep track of our orders. We might be able to order online if we pick it up at the store but that might be a whole can of worms that we can't open. Most of our purchases there are in-person anyways so this is probably OK for now. 

Of course, being a data hoarder, I couldn't just not have the data from the 5 orders I've made in the past. Since they don't let *people from Washington* download their data, I had Claude Code [write up a script](https://github.com/joshcanhelp/scrape/tree/main/target) to convert browser cookies and download all of my order data. Once that was complete, I was able (thankfully) to submit a request to delete my data and account. 

> **Your request will be fulfilled within 45 days.** Your personal information will be deleted by either erasing or de-identifying it. We will keep a record of your request. If additional time is needed, we will inform you.

45 days. Sure, that makes sense for software. **Lame.** You know what, maybe I'm not shopping here anymore!

But I wanted to write all that out to give a sense of what is going into this. Including signing up for all the services and this write up (but excluding the email move to Proton), I'm about 8 hours into this. All told, I consider this a pretty good use of time and this is all the foundational work that makes it easier for each additional account.

## Up next: Facebook

My next thing to tackle is: can I make a Facebook account that doesn't tie into any of the data that they already have for me? Here's the plan:

1. Use Proton VPN to spoof my IP address but keep it in the US
2. Use one of the anonymous identities for the email and phone number
3. Only use Desktop so they can't profile my mobile device

I'm worried about this one!

## If you're privacy curious ...

Maybe you read through this and think, "wow, this is a lot." It can be, that's for sure, but there are a few great places to start:

- Never give your real birthday out unless it's your doctor or a credit check.
- Enter fake data wherever you can, default to it in fact. Very little needs your real name and the minority of the time your phone number is never used.
- Sign up for Proton Mail for your personal mail. They'll migrate everything over from Gmail seamlessly and you probably didn't need to find that old email anyways. Don't worry, it's there.
