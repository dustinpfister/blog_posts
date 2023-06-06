---
title: Linux sysbench command for benchmaking a file system
date: 2023-06-06 09:30:00
tags: [linux]
layout: post
categories: linux
id: 1047
updated: 2023-06-06 09:54:07
version: 1.0
---

When it comes to using a raspberry PI as a Personal Computer I do end up running into a lot of roadblocks with various things. That is of course to be expected as the Single Board Computers do very much have there limitations. One issue of concern that comes up often seems to be with the read and write speeds of the sd card that is typically used to house the operating system image that is used with the raspberry pi. Often the typical sequential read speeds clock in at around 10MBs, which is still plenty fast sense most of the software used is very light weight to begin with. Still I remember having traditional hard disk speeds that are much faster than that, and this is solid state. This then brings up the question as to if it is possible to get faster disk io pref romance by way of the USB3 Ports of a raspberry pi 4 rather than that of the SD card. With that said if I do have a USB3 drive I would like to test and compare that to a test preformed with the sd card I will need some kind of program to preform such a test such as [sysbench](https://en.wikipedia.org/wiki/Sysbench)

There are a whole lot of other options of course, I see a lot of simular posts on this topic using the [dd command as a way to gauge file io](https://www.cyberciti.biz/faq/howto-linux-unix-test-disk-performance-with-dd-command/) for example. One nice thing about using dd is that it is making use of a command that will be there in any flavor of Linux, but it is also limited as it is only good for sequential io testing. When it comes to using something to hold an OS image random io pref romance is of greater interest. Also for those of us that are still new to Linux, or still not as proficient as we would like to be the use of dd can be dangerous if we get careless with it. With that said sysbech can not only do sequential io testing, but also the random io testing that I am more interested in. Also sysbench is useful for testing other components of the raspberry pi such as CPU prefromance and so forth.

<!-- more -->
