---
title: linux grep command for finding text in files and directories
date: 2020-09-14 18:07:00
tags: [linux]
layout: post
categories: linux
id: 705
updated: 2020-09-14 18:46:55
version: 1.2
---

In a Linux environment there is the [Linux grep](https://man7.org/linux/man-pages/man1/grep.1.html) command that is useful for finding text in a file, or a bunch of files in a directory. I have been starting to write a few posts on various commands that often are part of Linux, or can be easily added to Linux, and grep is certainly one such command that I should write a quick post on because I am sure it will come in handy now and then with what I often work on when it comes to lengthly collections of text files.

<!-- more -->

## 1 - Basic grep commands

In this section I will be starting out with just a few simple basic examples of grep. There is just looking for text in a single file, and other basics that one should be aware of before looking into the many other features of grep, and what can be done with it when it comes to using it with other Linux features and commands.

### 1.1 - A simple use case example of grep

```
$ grep "id:" ./_posts/linux-grep.md
id: 705
```

### 1.2 - Know the version

First off there is know what version of grep I am using. To do so I just call grep and pass a capital V to get the version of grep that I ma using on the system.

```
$ grep -V
grep (GNU grep) 3.3
Copyright (C) 2018 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
 
Written by Mike Haertel and others; see
<https://git.sv.gnu.org/cgit/grep.git/tree/AUTHORS>.
```

## 2 - more that one file

There are several ways to go about greping over more than one file. There is just greping over files at one level in a folder, and then there is also using grep in a recursive way looking at all the files in all the folders starting as a given root path. So in this section I will be going over some examples of looking at collections of files using Linux grep.

### 2.2 - Uisng glob pattens with the file path

One way to look at more than one file is to use [glob patterns](https://en.wikipedia.org/wiki/Glob_%28programming%29) for the file path. In other words I do not need to give an absolute or relative path to a single file, but a glob pattren for a collection of files.

Say I have a number of files in a path that start with the pattern _linux-_ and say I want to find the id of each file. I can type grep followed by the text pattern for an id in a file that starts with the desired pattern, followed by the glob pattern.

```
$ grep "id:" ./_posts/linux-*
./_posts/linux-echo.md:id: 523
./_posts/linux-grep.md:id: 705
./_posts/linux-grep.md:$ grep "id:" ./_posts/linux-grep.md
./_posts/linux-grep.md:id: 705
./_posts/linux-keep-process-running.md:id: 703
./_posts/linux-nodejs-cli-tools-getting-started.md:id: 90
./_posts/linux-ps.md:id: 524
./_posts/linux-raspberry-pi-os-swap-file.md:id: 702
./_posts/linux-raspberry-pi-os-turrn-off-screen-blanking.md:id: 704
./_posts/linux-raspbian-lite-getting-started.md:id: 635
./_posts/linux-raspbian-lite-xserver-xorg.md:id: 637
```

### 2.1 - recustive flag

Another options for looking at more than one file is to use the recursive flag.

```
$ grep -r "var" ./
```