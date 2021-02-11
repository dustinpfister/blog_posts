---
title: Linux change directory bash built in command
date: 2021-02-10 16:24:00
tags: [linux]
layout: post
categories: linux
id: 800
updated: 2021-02-10 21:15:44
version: 1.8
---

The [linux cd](https://www.tecmint.com/cd-command-in-linux/) command is what is used to change the current working directory when working in a terminal. To know the current working directory there is also the pwd command. This is one of the first commands to become aware of when laerning bash for the first time, however there are still a few things to cover when it comes to using it. For example there is how to go about changing to a folder that has spaces in the name, and also how to quikly jump the the home folder of the current user. Still this should prove to be a fairly quick basic post though.

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

One might think that there is not much to write about when it comes to the cd command. For the most part that is true, just type the command and pass a single argument that is the folder that you want to change to. How much more can there be to it then that? Well there are a few little things here and there actually, so lets get to them.

### 2.1 - Folders with spaces in the name

One thing that I had to learn that comes up once in a while is how to go about changing to a folder that has spaces in the name. This can prove to be a problem becuase without knowing how it will result in passing more than one positional argument to cd. This can easily be fixed though by using quotes.

```
mkdir "./foo folder/"
cd "./foo folder/"
```

### 2.2 - switch the the parent folder

If I want to switch the the parent folder that is just one level below the current folder than I can just use two dots for the argument.

```
#!/bin/bash
cd /usr/local
cd ..
pwd
# /usr
```

## 3 - Conclusion

The linux cd command is one of many commands that are [built into the bash command](http://manpages.ubuntu.com/manpages/bionic/man7/bash-builtins.7.html). There are many other basic built in commands that a new linux user should be aware of, in this post I also covered the pwd command which is yet another bash built in command. Other bash built in commands that will come up often are echo, and test just to name a few. Many of these built in commands are also basic tools that are used to create bash scripts.
