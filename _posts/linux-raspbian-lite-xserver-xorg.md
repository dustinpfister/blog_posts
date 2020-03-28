---
title: Xserver Xorg and Raspbian lite
date: 2020-03-27 19:04:00
tags: [linux,js]
layout: post
categories: linux
id: 637
updated: 2020-03-28 09:38:43
version: 1.3
---

When setting up a [Rasbian Linux OS](https://en.wikipedia.org/wiki/Raspbian) lite install I might just want to set up a server, or do somthing from the command line only. However often I might want at least some kind of desktop environment. So In this post I will be going over installing xserver xorg, and setting up a very simple desktop for xorg called blackbox.

<!-- more -->


## 1 - Start with a clean Raspbian lite Image

the first step is to start with a clean Raspbian lite image to run on the raspberry pi. I will not be getting into that here [because I wrote a post on getting started with Raspbian lite before hand](/2020/03/25/linux-raspbian-lite-getting-started/). If you have a desktop image there is no need to read this post because you have xorg installed all ready. However at that point you might be interested in installing another desktop environment, in that case it might make sense to read this post because I will be getting into setting up blackbox desktop. So then it would only make sense to continue reading if you want to just for the heck of it, or to catch something else in this post that might be of interest to a problem of some kind.