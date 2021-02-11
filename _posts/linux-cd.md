---
title: Linux change directory bash built in command
date: 2021-02-10 16:24:00
tags: [linux]
layout: post
categories: linux
id: 800
updated: 2021-02-10 21:04:54
version: 1.3
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

## 2 - Some additional examples

### 2.1 - Folders with spaces in the name

One thing that I had to learn that comes up once in a while is how to go about changing to a folder that has spaces in the name. This can prove to be a problem becuase without knowing how it will result in passing more than one positional argument to cd. This can easily be fixed though by using quotes.

```
mkdir "./foo folder/"
cd "./foo folder/"
```