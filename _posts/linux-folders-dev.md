---
title: The Linux Dev Folder
date: 2021-11-17 14:18:00
tags: [linux]
layout: post
categories: linux
id: 939
updated: 2021-11-17 14:25:39
version: 1.1
---

As of late I have been looking into the various folders off of a root file system when it comes to typical Linux systems. One of these folders is the [Linux \/dev folder](https://tldp.org/LDP/sag/html/dev-fs.html) that contains [device files](https://en.wikipedia.org/wiki/Device_file). You see it would seem that in Linux file systems everything is treated as a file event hardware. What is nice about this is that it make the process of reading data from a device, as well as writing to it very easy. On top of device files that are ways of interacting with things like a USB mouse there are also a number of pseudo devices also. These pseudo devices are great ways to go about just getting some random data, filling something with zeros, or writing some error output from a command to a void rather than the standard error.

<!-- more -->
