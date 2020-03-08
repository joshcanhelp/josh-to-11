---
title: "Savings Calculator and Graphic in SVG"
layout: gallery
excerpt: ""
date: 2015-11-12 13:52:43
modified: 2016-11-02 22:10:59
permalink: false
tags: []
featured_img: /_images/2015/11/Screenshot-2016-10-09-15.04.49-150x150.png
wpid: 4512
---

# Savings Calculator and Graphic in SVG

This was a fun little project for a branding and marketing group out of San Francisco. They were working with a group in their area that was building a platform to increase customer retention and service call reductions and wanted a way to illustrate the potential savings. Up until that point, sales reps would schedule demos, enter the current cost information from the prospect into an Excel, and send them a graphic. Since the cost savings was a huge part of the pitch, why not add it to the website?

I parsed a complex Excel sheet down to the calculation we needed to run and wrote that in PHP to hide the business logic on the server. To make the graphic run quickly, the inputted numbers are sent to the server while the user remains on the page (AJAX). When the data is returned, the savings are mapped out on a canvas drawing to show how it all breaks down. This needed to run on a WordPress site so the whole thing is a standalone plugin with a shortcode so it could be placed on multiple pages. The whole thing is responsive, easy to use, and easy to extend so things like colors and legend text could be configured in the admin.

Scroll down to give it a try!
