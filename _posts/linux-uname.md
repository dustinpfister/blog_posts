---
title: Linux uname command to find out info about the client OS
date: 2021-07-08 10:54:00
tags: [linux]
layout: post
categories: linux
id: 906
updated: 2023-07-25 12:35:43
version: 1.19
---

Todays post will be on the [Linux uname](https://linux.die.net/man/1/uname) command which can be used to gain some information about the client system that I am dealing with when working in a Linux or bash system that has the uname command to work with. This command should be there to work with in just about any posix system, but it might not be the best starting point to know what one is working with. Another command that one should look into would be the [lsb_release command](/2023/07/25/linux-lsb-release/) which should be there to work with in most of not all Linux Systems at least that will give more detailed info about the specific Linux Distribution that is being used.

When writing some kind of client system in which I can find out at least some details about what kind of OS my application is running on there may be a need to gain some additional details about that system. Often I can find out enough when it comes to certain built in modules of a given programing environment, but there should be ways of gaining more information if I know that I am dealing with a Linux system. 

Also when it comes to writing [bash scripts](/2020/11/27/linux-bash-script/) that I know will always run on a Linux system I will still want to know certain details about that system such as if a given command is there or not, and also things like what the version of the Linux kernel is. So in this post I will be going over just the basics of this uname command, there is not much to write about when it comes to the command itself, but there might be more to write about when it comes to some things that branch off from the uname command, as well as some alternatives.

<!-- more -->

## 1 - Basic example of Linux uname command

To start off with there is just typing the uname command into the command line of a bash window to see what the default result is. When I do so I get the name of the kernel name of the operating system. When I wrote this post I was using [Raspberry PI OS](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) which is of course a Linux based system.

```
$ uname
Linux
```

## 2 - The all option

The all option will give me a string that will be all the information of the system that I can get by way of the uname command. All the other options are ways to just go about getting one value from this string rather than the whole string.

```
$ uname -a
Linux raspberrypi 5.10.17-v7l+ #1421 SMP Thu May 27 14:00:13 BST 2021 armv7l GNU/Linux
```

So then when I called this I was doing so on Raspbbery PI OS, which is a Linux based system, so of course the kernel name is Linux. Just the kernel name alone can be ascertained with the -s option, but I will be getting more into those details in the nest section. The additional values in the string have to do with thinks like the host name of the system, the kernel release and version number, the system architecture an so forth. However not everything will show up all the time, I have noticed that some options will returned an undefined value, and as such they will not show up in this string.

## 3 - Other options

There is then a whole bunch of other options, but these will just give string values that are parts of what I can get with the all option. Some of the most impotent though might include the -s option that will just return the name of the kernel, which on all Linux systems should return Linux, and the -r option that gives me a release version number of the kernel.

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

That will be it for now when it comes to the uname command in Linux, in time I might expand this post more with additional examples that do the same thing. I do not think that there is much more to write about when it comes to the uname command alone, but there sure is more to write about when it comes to getting more detail information about a Linux system beyond just that of what is given by way of the uname command. 

One thing that comes to mind as a starting point is to stick to using some kind of built in module of a programing environment like that of python, or JavaScript by way of nodejs. For example in [nodejs there is the os module](/2019/11/19/nodejs-os/) that would be a good staring point to find out of the client system is a Linux system to begin with when it comes to javaScript. In [Python there is also an started library called os](/2021/01/06/python-standard-library-os/) that also contains methods and properties that can be used to gain information about the underlaying os, including a uname method that seems to work more or less the same as this uname command which is great.
