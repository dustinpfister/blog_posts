---
title: Xserver Xorg, Raspbian lite, and the blackbox desktop environment
date: 2020-03-27 19:04:00
tags: [linux,js]
layout: post
categories: linux
id: 637
updated: 2020-03-29 12:16:38
version: 1.6
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


## 5 - install blackbox, and xterm

Now to install a desktop environment, in this post I will be going over blackbox, but if you want to use a different desktop the setup, and additional packages to install might be different.

```
$ sudo apt-get install blackbox
$ sudo apt-get install xterm
```

## 6 - blackbox setup

## 7 - Other starting apps I might go with at this point

### 7.1 - leafpad as a basic text editor

### 7.2 - thunar as a file manager

### 7.3 - Chromium as a web browser