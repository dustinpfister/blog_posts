---
title: Linux System Base Release command lsb_release for Distribution info
date: 2023-07-25 12:24:00
tags: [linux]
layout: post
categories: linux
id: 1062
updated: 2023-07-26 08:01:38
version: 1.3
---

The [lsb_release command](https://linux.die.net/man/1/lsb_release) can be used to find out distribution info about the Linux System that you are using. This command is part of what is called the [Linux Standard Base](https://wiki.linuxfoundation.org/lsb/start) which means that it should not just simply be the kind of command that you will find in just Debian Linux Based Systems, but rather in just about any Linux Distribution as a standard command for getting basic information about what kind of Linux system I am using. There is a lot to say about LSB in general however in this post I will be focusing mainly on just the release utility tool as another option on top of that of just using the [uname command](/2021/07/08/linux-uname/) which will not always give the full range of data that one would want to see when it comes to getting to know what it is that they are dealing with from one OS Image to another.

<!-- more -->


## The description ( -d ) option

When calling the lsb\_release command with the description option \( -d \) just the Description string will be givein in the standard output. This description key gives me the name of the distrobution, and often a version number of it as well. For example when I boot to some OS imange on some sd card on one of my raspbery PI Single Board computers, and I want to know if it is a buster or bullseye based version this command can help me to figure out which.

```
$ lsb_release -d
Description:    Raspbian GNU/Linux 10 (buster)
```