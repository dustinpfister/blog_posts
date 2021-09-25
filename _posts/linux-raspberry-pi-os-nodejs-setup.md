---
title: More than one version of nodejs in Raspberry PI OS
date: 2021-09-24 06:37:00
tags: [linux]
layout: post
categories: linux
id: 930
updated: 2021-09-24 21:05:17
version: 1.5
---

Today I would like to write about a topic that I have been putting off for too long which is how to go about having more than one binary of [nodejs](/2017/04/05/nodejs-helloworld/) to work with in [Raspberry Pi OS](/2020/03/25/linux-raspbian-lite-getting-started/). When first setting up a clean image of raspberry pi os one of the first things I would like to do is install nodejs, and the typical way of doing so would be to just install whatever version of nodejs there is to work with by way of apt. The problem with doing this though is that the version of nodejs is often very out of date, in fact as of this writing it is a version of nodejs that is no longer supported. Also often I might want to have more than one version of nodejs installed actually, and have a way to switch between them. For example I might want to write a script that I want to work on a wide range of nodejs versions, going as far back as say maybe nodejs 8.x. So then I would want to test out the script on nodejs 8.x, 9.x, 10.x, ..., 16.x as such I would need to have some way to not just have an up to date version of nodejs when it comes to the latest version, I would also want the latest version of each major release going back to whatever point I want to push backward compatibility to.

So then in this post I will be going over one way to go about having two or more nodejs binaries to work with in a Raspberry pi os environment.

<!-- more -->


## Using the arch command to confirm what arch the PI is using

If you use the arch command like this.

```
$ arch
armv7l
```

The result is armv7l which means [ARM7](https://en.wikipedia.org/wiki/ARM7) actually even though the original raspberry pi has newer arm11 processor, and the pi4 has ARM Cortex-A72 processor. This is because the result that the arch command gives reflects what is being used by the kernel, and not what the actual physical hardware is. For example when it comes to Intel Linux distributions I can run an i385 kernel image on a 64bit processor, but I can not run a 64 bit OS on a old i386 computer. Anyway on just about all raspberry pis I should get this kind of result for system architecture, and as such that is what I need to look for when it comes to downloading pre compiled binaries from nodejs.org.