---
title: "Scratching an Itch: Command Line Budgeting"
meta_title: "Command Line Budgeting Tool in TypeScript"
tags: ["Money", "JavaScript", "Personal Data", "Best Of"]
featured_img: /_images/2023/budget-cli-thumb.png
excerpt: "After over a decade of trying to budget using existing tools, I decide to write my own in TypeScript. It turned out great!"
link_to: https://github.com/joshcanhelp/budget-cli
hn_link: https://news.ycombinator.com/item?id=35269010
---

I learned a little while back that I have a funny relationship with money. I'm not a miser but I've adopted two money concepts that make me more careful than I probably need to be:

- I **hate** wasting money, even single dollar amounts
- I can't shake the idea that every dollar not spent could be worth more later

![Out of Money Experience](/_images/2023/out-of-money-experience.jpg)

These two ideas roll around in my head and cause more anxiety than they probably should. It takes me a long time to decide to buy higher quality clothes, house goods, and everything else, just because it's cheaper somewhere else.  Expensive hotels, meals, services, furniture, and everything else cause me near-paralysis of the analysis kind, debating the enjoyment ROI versus how much we'll have in the bank when we retire. I could have worse afflictions, admittedly, but the mental bandwidth required for this is tiresome.

A major symptom of this minor ailment is a need to track every penny coming in and out of our accounts. I have been using various budgeting software and systems for over a decade, trying to find a balance between caution and toil burnout. As a software engineer, I *detest* toil work on a computer, especially when it comes to data processing, so my motivation to find a system that would eliminate some of that is high. To that end, I've tried Mint, You Need a Budget, Xero, CLI tools, and multiple iterations of spreadsheets to get it just right ... and just haven't.

During this process, I leaned a few things:

- Regardless of the system I use, our spending patterns don't change much 
- We always spend less than we make but I worry about materialism, consumerism, lifestyle creep, waste, and the example we're setting for our kids
- I don't like the idea of all my financial transactions being stored in the cloud
- Some of my motivation here is digital ~~hoarding~~ archiving

Last year, I started talking to family and friends about what they use and how they track their money. I was a bit worried to broach this subject because talking about money, for whatever reason, is somewhat taboo in our culture. If you're not talking about actual dollar amounts, however, that hesitancy isn't there. 

After a few minutes of conversation, it's clear that I'm, overall, being a bit weird about this (I'm 🆗  with that). But I learned a few things from this as well:

- Most people look at this annually, not monthly like I do
- No one has found a personal system that works perfectly; they either care less or are struggling to find the right tool
- Managing money, like parenting, is a surprisingly personal activity

With all of this in my head (and my latest spreadsheet system causing me mental distress), I started to think deeply about why I do what I do and whether the juice is worth the squeeze. Starting a couple of years ago, I stopped categorizing expenses into granular categories like "groceries" and "clothing" and such. I started just tracking "allowance" purchases for my wife and I (a certain amount per month we're allowed to spend without spousal approval) and everything else in one main category. This helped a lot but the toil of downloading, copying, pasting, adjusting, sorting, and tinkering with a spreadsheet was still making it so that I only did it once a month ... or two. The time in between made it hard to remember who made that $47 purchase for "STRIPE TNKER MOBIUS SHOP INC, WA 223" 5 weeks ago. The juice/squeeze ratio was still not great.

I was also sitting with this annoying underlying feeling that all the work to track individual transactions was just not worth the effort. Even with only 4 categories to pick from, the process was an absolute slog and it wasn't influencing our choices in any real way. Was I just doing this out of paranoia? *Could I just get away with making sure we don't dip below a certain buffer amount in our checking account?* **Was I spending my limited time on this planet correctly??** **WHAT DOES IT ALL MEAN!?**

![Great Minds Overthink Alike](/_images/2023/great-minds-overthink-alike.jpg)

I'd had a little seed in my head, inspired by [Plain Text Accounting](https://plaintextaccounting.org), to build my own tool to do this but it always seemed a bit ... *crazy*. I would spend many hours building a thing with a fraction of the features of the software I tried in the past and it would somehow be better? Slim chance. 

**But there was a chance.**

So I put my product manager hat on and interviewed the single customer that this tool would have to satisfy. The features necessary were:

- I needed to be able to import CSVs from the various financial institutions we use and skip  transactions that had already been inputted
- I needed everything to be stored locally
- I needed to be able to tinker with it (or a copy of it) in spreadsheet software
- I needed to be able to keep track of monthly allowances
- I needed to be able to split transactions
- I needed to be able to output a report of some kind to show monthly or YTD progress

As I worked through all of these things in my head, it occurred to me that there were a number of benefits that came with writing your own tool like this:

- It would be fun!
- I would have total control over storage, reporting, searching, and exporting
- Using my tool tool might reduce some of the annoyance around required toil
- If any of our banks allowed API access in the future, I'd be ready to start using it

This felt like enough to give it a try so I gave myself a weekend to see how far I could get. Long story short, **I now have a budgeting tool that works and that I love using!**

{% info %}[Budget CLI on GitHub »](https://github.com/joshcanhelp/budget-cli){% endinfo %}

Can I tell you about it? Please let me tell you about it. I mean, you can just click the link above and try it out but I'd really like to talk about it if you don't mind.

The workflow here, detailed in the repo README is:

1. Run the import script on a single CSV file or directory of files and answer the prompts for each transaction. Transactions that have an existing ID in the local CSV database are automatically skipped. Prompts can change based on previous answers, reducing unnecessary questions when possible.

![](/_images/2023/budget-cli-import-prompt.png)

2. When the import is complete, run the report script to see a previous year, single month, or year-to-date. This will tally expenses and income, show a break-down of need-want-save (see below), and show how much of your allowances have been used. 
3. When you want to see transactions for a specific year, month, or category/sub-category, run that script with the necessary arguments and viola!

What this helps you (me) to do is to make reviewing transactions simple and provide a concise but helpful output. The "simple budget" portion of this uses the concept of a [50-30-20 budget](https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator) where you shoot for 50% of your expenses to be a need (mortgage/rent, utilities, healthcare, etc), 30% a want (vacations, bicycles, eating out, etc), and 20% saved. I found this to be a much more powerful motivator and a much simpler way to look at things. Knowing that we spent an extra $200 on groceries this month just did not have enough impact to change our behavior. But seeing that "fun" spending was ticking up over 30% was enough to clamp down for a month and get back on track.

The main toil now is logging into the various banks and downloading the CSVs. This is annoying but I don't have to align each sheet with the last transaction and make sure I didn't miss anything or duplicate anything. And I don't have to deal with formatting differences when copy-pasting. 

I discovered a surprise benefit when working on the spending report. In my last spreadsheet iteration I had a "dashboard" sheet that did a bunch of compiling on a monthly basis. I wanted to recreate the monthly reporting in the CLI tool, because I was used to it, but, along the way, I realized it was defaulting to year-to-date. I begin to find this far more useful and it made me stop semi-obsessing about months that we went off the budget. If 1 out of 4 months is off but the other 3 are OK, I can stop giving a dirty look to that one off month and, instead, feel fine that, in aggregate, we're on-track.

The whole thing is written in TypeScript, a language I've been using for about 3 years without a deep understanding. I wanted to get this project fully typed with no `@ts-ignore` and I got there without too much headache or any icky hacks. The TS docs are truly fantastic and I found, in the vast majority of cases, the parts where I had the most trouble were parts that I didn't understand until I spent the time to learn and read.

Overall, this whole thing was a **great** success! I had fun, I leveled up on TypeScript, and I now have a tool for budgeting that doesn't annoy me. 

If you give this a spin, like it, and have an issue or want to add a translator, please see the [contributing](https://github.com/joshcanhelp/budget-cli#contributing) section on the README.



