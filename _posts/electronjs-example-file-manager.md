---
title: File Manager Electronjs application example
date: 2022-11-25 09:28:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1015
updated: 2022-11-26 13:29:00
version: 1.3
---

There are a lot of ideas that come to mind when it comes to making an [electronjs](https://www.electronjs.org/) project example, one of which would be to make a [file manager](https://en.wikipedia.org/wiki/File_manager). This is one of many project ideas where getting the core set of features working might not take to long, but in the long run can turn into a major project that can take months, or even years to refine if doing so is justified. The starting point I had in mind was to just have a way to navigate around a file system, and be able to start a terminal window at the current working folder. Just that alone is simple enough for sure, but then there is working on the additional basic features that one would expect of any file manager, and how to go about doing just that. There is working out javaScript solutions for everything, but then there is also the idea of using the child process module to make use of binaries that there are to work with in the underlaying OS and being done with it.

This will then be a post on the current state of an electionjs project where the aim is to start making something that is at least starting to look like a file manager program. Like many of these examples thus far I will want to keep the bar low for now unless I do start to use this all the time, or people take interest or so forth. The main goal then is to just be able to navigate around folders, and then start a terminal window or alternate file manager at the current path. On top of that there is also getting this to work on the operating system that I use most of the time which for now are windows 10 and Raspbrrey PI os.

<!-- more -->
