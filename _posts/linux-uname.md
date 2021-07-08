---
title: Linux uname command to find out info about the client OS
date: 2021-07-08 10:54:00
tags: [linux]
layout: post
categories: linux
id: 906
updated: 2021-07-08 11:09:39
version: 1.6
---

Todays post will be on the [Linux uname](https://linux.die.net/man/1/uname) command which can be used to gain some information about the client system that I am dealing with when working in a Linux of bash system that has the uname command.

When writing some kind of client system in which I can find out at least some details about what kind of OS my application is running on there may be a need to gain some additional details about that system. Often I can find out enough when it comes to certain built in modules of a given programing environment, but there should be ways of gaining more information if I know that I am dealing with a Linux system. Also when it comes to writing bash scripts that I know will always run on a Linux system I will still want to know certain details about that system such as if a given command is there or not, and also things like what the version of the Linux kernel is.

<!-- more -->

## 1 - Basic example of Linux uname command

To start off with there is just typing the uname command into the command line of a bash window to see what the default result is. When I do so I get the name of the kernel name of the operating system. When I wrote this post I was using [Raspberry PI OS](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) which is of course a Linux based system.

```
$ uname
Linux
```

## 2 - The all option

The all option will give me a string that will be all the information of the system that I can get by way of the uname command.

```
$ uname -a
Linux raspberrypi 5.10.17-v7l+ #1421 SMP Thu May 27 14:00:13 BST 2021 armv7l GNU/Linux
```

## 3 - Other options

```
$ uname -s
Linux
$ uname -n
raspberrypi
$ uname -r
5.10.17-v7l+
$ uname -v
#1421 SMP Thu May 27 14:00:13 BST 2021
$ uname -m
armv7l
$ uname -p
unknown
$ uname -i
unknown
$ uname -o
GNU/Linux

```

## 4 - Conclusion

