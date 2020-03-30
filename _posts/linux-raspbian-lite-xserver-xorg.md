---
title: Xserver Xorg, Raspbian lite, and the blackbox desktop environment
date: 2020-03-27 19:04:00
tags: [linux,js]
layout: post
categories: linux
id: 637
updated: 2020-03-30 11:21:57
version: 1.7
---

When setting up a [Rasbian Linux OS](https://en.wikipedia.org/wiki/Raspbian) lite install I might just want to set up a server, or do somthing from the command line only. However often I might want at least some kind of desktop environment. So In this post I will be going over installing the [x window system](https://en.wikipedia.org/wiki/X_Window_System#Limitations_and_criticism), and setting up a very simple desktop for X called blackbox in Rasbian lite.

<!-- more -->


## 1 - Start with a clean Raspbian lite Image

the first step is to start with a clean Raspbian lite image to run on the raspberry pi. I will not be getting into that here [because I wrote a post on getting started with Raspbian lite before hand](/2020/03/25/linux-raspbian-lite-getting-started/). If you have a desktop image there is no need to read this post because you have xorg installed all ready. However at that point you might be interested in installing another desktop environment, in that case it might make sense to read this post because I will be getting into setting up blackbox desktop. So then it would only make sense to continue reading if you want to just for the heck of it, or to catch something else in this post that might be of interest to a problem of some kind.

## 2 - install xserver-xorg

The first package I would start with is xserver-xorg, This will just install the xserver itself, and not a whole bunch of other stuff that I might not use which would be the case if I where to install the xorg package.

```
$ sudo apt-get install xserver-xorg
```

## 3 - install xinit

I will want to install the xinit package so that I can start the xserver. This package will give me commands like startx, and xinit.

```
$ sudo apt-get install xinit
```

## 4 - install x11-xserver-utils

```
$ sudo apt-get install x11-xserver-utils
```


## 6 - install blackbox, and xterm

Now to install a desktop environment, in this post I will be going over blackbox, but if you want to use a different desktop the setup, and additional packages to install might be different.

```
$ sudo apt-get install blackbox
$ sudo apt-get install xterm
```

## 6.1 - blackbox setup


## 6.2 - lightDM

If I want to rRaspbian to boot right into a display manager, and then from there start blackbox. Or If I want to install more than one desktop environment, I will want to install a display manager. One solution for this world be [lightDm](https://wiki.debian.org/LightDM). There are other options when it comes to display managers, and there is of course just using startx and xinit to start and desktop from the command line once I am logged in. So this like many things when starting with a Raspbian lite install is totally optional.

```
$ sudo apt-get install lightdm
```