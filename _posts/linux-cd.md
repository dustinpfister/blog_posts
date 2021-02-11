---
title: Linux change directory bash built in command
date: 2021-02-10 16:24:00
tags: [linux]
layout: post
categories: linux
id: 800
updated: 2021-02-10 21:01:02
version: 1.2
---

The linux cd command is what is used to change the current working directory when working in a terminal. To know the current working directory there is also the pwd command. This is one of the first commands to become aware of when laerning bash for the first time, however there are still a few things to cover when it comes to using it. For example there is how to go about changing to a folder that has spaces in the name, and also how to quikly jump the the home folder of the current user. Still this should prove to be a fairly quick basic post though.

<!-- more -->

## 1 - Basic linux cd and pwd command example

The linux cd command works by just typeing cd follwed by a path that I want to chnage two. There is giving and asbolute path by starting with a forward slash or using a relative path. More opn relative and absolute paths later, but for now there is just doing something like going to the etc folder, and knowing that the current working folder is the etc folder by typing pwd.

```
$ cd /etc
$ pwd
/etc
```

So there is the cd command for chanding to a folder, and there is the pwd command for knwoing what the current folder is.