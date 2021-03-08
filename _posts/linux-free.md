---
title: Linux free command
date: 2021-03-08 12:20:00
tags: [linux,js]
layout: post
categories: linux
id: 818
updated: 2021-03-08 12:37:43
version: 1.2
---

The [Linux free](https://linuxize.com/post/free-command-in-linux/) command is how to go about getting an idea as to how much memory is being used by the system at a given moment in the command line and when creating bash scripts. WHen it comes to getting an idea of how much memeory is beging used there is not just knowing how much there is installed, and how much is being used. There is knowing how much physical memory there is, knowing how much swap space there is on the hard drive in terms of a file or partation. There is then also know what the diference is between free, and available when it comes to using the Linux free command.

When it comes to knwoing how much free space I have with something the Linux free command is just a simple tool that helps me keep an eye on how much physical ram and spawn space I have. However it will not help me when it comes to creating or resziing a spawn file or spawn partition. It will also not help me to find out how much free space I have on any hard drives or other deviceses in which I am storing files. When it comes to checking a file system to know how much free space i have there I will want to use the df command. Also the linux free command will not give me a break down when it comes to how much memeory a certain process is using, the free command will just give me over all totals.

So in this post I will be going over a few quick examples of the Linux Free command, but I will also be touching base on a few other topics when it comes to not just checking how much free spacfe I have in general with things, and also some other realted topics when it comes to taking a look at processes and so forth.

<!-- more -->


## 1 - Basic Linux free examples

```js
free
#              total        used        free      shared  buff/cache   available
#Mem:         946392      374608       54864       45020      516920      474404
#Swap:       1048572       90880      957692
 
free -h
#              total        used        free      shared  buff/cache   available
#Mem:          924Mi       377Mi        47Mi        43Mi       499Mi       451Mi
#Swap:         1.0Gi        90Mi       933Mi
```