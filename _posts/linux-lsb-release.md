---
title: Linux System Base Release command lsb_release for Distribution info
date: 2023-07-25 12:24:00
tags: [linux]
layout: post
categories: linux
id: 1062
updated: 2023-08-02 09:44:46
version: 1.7
---

The [lsb_release command](https://linux.die.net/man/1/lsb_release) can be used to find out distribution info about the Linux System that you are using. This command is part of what is called the [Linux Standard Base](https://wiki.linuxfoundation.org/lsb/start) which means that it should not just simply be the kind of command that you will find in just Debian Linux Based Systems, but rather in just about any Linux Distribution as a standard command for getting basic information about what kind of Linux system I am using. There is a lot to say about LSB in general however in this post I will be focusing mainly on just the release utility tool as another option on top of that of just using the [uname command](/2021/07/08/linux-uname/) which will not always give the full range of data that one would want to see when it comes to getting to know what it is that they are dealing with from one OS Image to another.

<!-- more -->

## The deal with uname

The uname command is a good start for figuring out some basic info about the kind of OS image I am dealing with. It will tell me that I am using the Linux Kernel, and aalso give a version number. I cans also get some additional into such as what the arch of the os is as well.

```
$ uname -a
Linux raspberrypi 5.10.103-v7l+ #1529 SMP Tue Mar 8 12:24:00 GMT 2022 armv7l GNU/Linux
```

More often than not I will just know what the Distribution is, but what if I need to write a script that needs to know that. Also there is nit just knowing what distribution but also the version of it as well. For example if I am using Debian it would be nice to have a way to know what version of Debian I am using. This is where the uname command will often come up short.

## The description \( -d \) option

When calling the lsb\_release command with the description option \( -d \) just the Description string will be given in the standard output. This description key gives me the name of the distribution, and often a version number of it as well. For example when I boot to some OS image on some sd card on one of my raspberry PI Single Board computers, and I want to know if it is a buster or bullseye based version this command can help me to figure out which.

```
$ lsb_release -d
Description:    Raspbian GNU/Linux 10 (buster)
```

## The all Option \( -a \)

The all option is another typical option that one might want to use with this. However I have found that everything that I would typically want to know that is not given by uname is contained in the description.

```
 $ lsb_release -a
No LSB modules are available.
Distributor ID: Raspbian
Description:    Raspbian GNU/Linux 10 (buster)
Release:        10
Codename:       buster
```

## Conclusion

The lsb\_release command then is a great tool for figuring out some more detail about the underlaying Linux system. Also like uname this command should be there to work with in most of not all systems. I am sure that there is a whole world more to write about when it comes to Linux Standard Base, as well as other ways to pull some info about what kind of Linux system is being used. However for now I just wanted to write a quick post on this option for doing this sort of thing on top of that of uname.

