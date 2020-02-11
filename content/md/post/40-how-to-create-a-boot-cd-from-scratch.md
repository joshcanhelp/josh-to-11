---
title: "How to create a boot CD from scratch."
layout: post
excerpt: ""
date: 2008-09-26 00:20:38
modified: 2016-10-20 16:44:20
permalink: how-to-create-a-boot-cd-from-scratch/index.html
tags: ["boot cd", "windows xp", "hardware"]
featured_img: 
wpid: 284
---

# How to create a boot CD from scratch.

I’m just posting this here so I don’t lose it. From Tom’s Hardware forums:

> 1. Create a “New” folder on your “C” drive, and name it drdos.
> 2. Go to http://www.devedia.com/dosghost/dos/downl\_2.asp#drdos
> 3. Scroll down until you find v703drdos Beta – click on that. You will find yourself at an ftp download site of all the drdos utilities.
> 4. You can download them all to the new drdos folder, but you only need debug.exe; fdisk.com &amp; format.com.
> 5. Download by right-clicking each one – choose “Save Target As” – and direct the download to the drdos folder.
> 6. Next, go to Program FilesAheadNero and locate Dosbootimage.ima and copy and paste it to the drdos folder.
> 7. Fire up Nero – choose Nero Burning Rom. Should get New Compilation. On the left side, scroll down to CD-ROM (Boot) and highlight it.
> 8. Over on the right side, click the radio button for Image File &amp; browse to the drdos folder to locate it so that it shows in the address space.
> 9. On the bottom half, under Enable Expert Settings, make sure the four categories are: Floppy Emulation 1.44; Nero Boot Loader v6.0; 07c0; 1.
> 10. Go up to the Burn tab and make sure that Write and Finalize cd are checked. Change the Write Speed to half of what your burner is capable of, then click New at the upper right corner.
> 11. On the right side, third pane over, locate the drdos folder and click it so that all of its’ files show up in the fourth pane. Drag and drop them all to the second pane. Locate the grayish cd disc with the flame on it near the top under the word Window. Click this to return to the Burn page; insert a blank cd-r disc into your burner; change Copies to two; then click burn. Quickly check off Verify Written Data at the bottom left.
> 12. OK the Data Verify success (second copy should start) – click Done (bottom left) – Exit out whereupon Nero will ask you to save this. I would, and call it drdos; for you to have in the future. Then back to your desktop.
> 13. You now have a bootable cd with which you can invoke debug. You will find it on the “D” drive after the cd boots up. Follow the routine I gave you in a previous post.
> 14. Print out this one and the debug routine to work easier.
> 15. If the laptops’ hard drive is okay, XP will install fresh &amp; clean.