---
title: Linux uname command to find out info about the client OS
date: 2021-07-08 10:54:00
tags: [linux]
layout: post
categories: linux
id: 906
updated: 2021-07-08 11:00:48
version: 1.1
---

Todays post will be on the Linux uname command which can be used to gain some information about the client system that I am dealing with when working in a Linux of bash system that has the uname command.

When writing some kind of client system in which I can find out at least some details about what kind of OS my application is running on there may be a need to gain some additional details about that system. Often I can find out enough when it comes to certain built in modules of a given programing environment, but there should be ways of gaining more information if I know that I am dealing with a Linux system. Also when it comes to writing bash scripts that I know will always run on a Linux system I will still want to know certain details about that system such as if a given command is there or not, and also things like what the version of the Linux kernel is.

<!-- more -->
