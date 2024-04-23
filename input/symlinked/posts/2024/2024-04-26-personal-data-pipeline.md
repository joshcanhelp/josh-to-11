---
title: "Imagining a Personal Data Pipeline"
excerpt: "I've been thinking a lot about personal data lately: where it's stored, how to extract it, and what to do with it. Here's where I landed."
featured_img: 
tags: ["JavaScript + TypeScript", "Software Engineering"]
hn_link: 
---

I've been thinking a lot about personal data lately. About a year ago, [I wrote down my thoughts on my own personal data](/lifelogging/), where it collects, and how it could be used. If you don't want the full introduction to this, here are the most salient parts:

> I have become somewhat obsessed with the idea of logging and archiving the many little aspects of my life in one place ... I am enamored with the idea of looking back through my life and seeing as complete of a picture as I can.
> 
> Collecting the data that was collected on me and stitching it together to be able to paint a picture of specific moments in time. My life has been mostly mundane, especially for the last 10-15 years, but there is a story there and sometimes it's just nice to go back and relive it in whatever form you have it in.

Up until the end of last year, this curiosity was limited to me finding new sources of data, downloading them, and looking through these small windows into the past. What was the first thing I bought on Amazon (2004-12-7, *The Daily Show with Jon Stewart Presents America (The Book)*, gift for a friend)? What was my longest Strava ride (2016-8-27, 118 miles from Seattle to Bellingham)? What was my first tweet (2008-3-27, "twit twit twit... nothing to say! :)")? It was fun and interesting and a nice distraction from what I was supposed to be doing on my laptop at the time, like paying bills or reading another newsletter from school.

Lately, though, I've been thinking more about just how much data I generate and what, if anything, this data could be used for in aggregate. The idea of being a "data-driven" human being, making decisions in the name of "optimization," is not appealing to me at all but there are a number of places where I would like to be able to combine my personal data without allowing companies to just read it wholesale:

- A holistic view on athletic performance across the various trackers that I use (Strava, Oura, Wahoo, and Apple Health) combined with notes I keep.
- Combine notes in Obsidian ([note taking ](/notes/)app) with calendar entries and contacts to create a kind of personal CRM.
- A collection of data surrounding a date or event: texts sent, photos taken, financial transactions, and more to augment what we already remember and trigger memories we thought were lost.
- Combine behavior (exercise, sleep and wake times, screen time, etc.) with mental state (anxiety, low mood, etc.) to find previously-unknown links between what we do and how we feel.

All of the things above could be stand-alone products on their own, and probably already exist in one form or another if I looked hard enough. But there are three big things that would stand in the way of me using something on the list above:

- By duplicating data from one or more apps to another I'm doubling the chance of the shared data leaking.
- I have to rely on whatever app I choose to give me *exactly* what I need or else I'll be tempted to pull the data out and work with it myself.
- If the app I'm using gets bought by a company I don't trust, shuts down, or just doesn't work for me anymore, I have no way of knowing that deleting my account deletes all the data that I let them have.

No mater how you cut it, trying to get all of your data into one service in order to pull insights out of it is problematic. No matter how you slice it - many apps working together or one single app that does everything - there is a fundamental problem with handing your personal data to a company and trusting them to both do the right thing and give you what you need. For me, these issues prevent me from using a lot of different services that probably could be helpful. 

The more I thought about it, the more important it felt to have my data immediately at my disposal. Maybe it's stored locally on my computer or in the cloud somewhere that won't be used without my consent, like an S3 bucket or a private git repo. Once it's downloaded, I could query it or transform it to another format or filter it and send the smaller payload to a specific app or service or even delete the data from the originating service. Not only that, I would have a backup of the original data always available in case I leave the service or it shuts down.

As I started to work through how this would work, it was sounding more and more like the ELT (extract, transform, load) data pipelines I was using at work. For those unfamiliar with the concept, the basic idea is:

1. You have a bunch of data stored in unconnected systems, some or all of which cannot be accessed directly. At work, this would be application databases containing customer-managed data, SalesForce, Slack, and various other systems. 
2. You set up a connector for each of the data sources you want to combine or examine to pull the raw data out and store it in a central location, often called a data lake. These connectors could be scripts, DBT, connection services like FiveTran, pre-built integrations, or any number of things. 
3. Once the raw data is in the central database, any number of transformations can be run at whatever interval and store the results in other tables. These could be filters, combinations, calculations, or something else. 
4. Analytics, reports, and other tools can now operate on transformed data, making it easier to reuse logic.

Putting this all together would look something like ...

{% d2 %}personal-data-pipeline-elt{% endd2 %}

The diagram above applied it to any of the personal data combinations I listed out seems to fit pretty well:

- Start with data sources that you don't have direct control over
- Extract the data into a central repository you control
- Make connections, combinations, calculations, etc.
- End up with text files or CSVs, or metrics or anything else you need, ready to review, publish, etc.

I want to pause for a moment and recognize that this particular idea is not original to me. I've been thinking about how to backup and use personal data for a few years and have, in the last year or two, been picking up ideas from various tools and blog posts I've found out there. karlicoss wrote up [their idea of a human programming interface (HPI)](https://beepb00p.xyz/hpi.html) that explains how they collect and use their data. Linus from thesephist.com created a [personal data search engine](https://thesephist.com/posts/monocle/) that collects everything he's created digitally and provides a fast search interface to it. Andrew Louis wrote about a [memex he built](https://hyfen.net/memex/) that solves some of the same problems as the other two. This is just scratching the surface but I wanted to give credit where credit is very much due.

As I started to imagine what this might look like as a complete system, I realized that what I didn't want was a complicated software system that I needed to maintain by myself for the rest off my life. There is a definitely a bit of compulsion behind this type of data hoarding and missing out on a sunny day at the park because I "have to" fix a bug with my data pipeline is not what I want my life to be. 

But this feels like an important idea and one that clearly other people are talking about ...