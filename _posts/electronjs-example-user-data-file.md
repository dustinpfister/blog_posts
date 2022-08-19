---
title: User Data File Electronjs application example
date: 2022-08-19 07:59:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1001
updated: 2022-08-19 08:26:43
version: 1.2
---

While working on my electronjs application that I use to make videos for my you tube channel, and thus also video embeds for my blog posts on threejs I ran into a situation in which I needed to share state data between the renderer and main process. The way of typically doing this is a little convoluted as it requires [IPC](https://en.wikipedia.org/wiki/Inter-process_communication) messaging between the render and main process my way of using the send methods and defining event handers with the on methods of the IPC Main and IPC Renderer classes.

So then for the most part the way that this needs to happen is just my way of IPC and for many situations that might be the best way to go about doing this. However for some things I might want to create a user data folder in the proper standard location and use that as a means to store user data that I can access from the main or render process.

<!-- more -->

## The user data file elecronjs example and what to know first

This is a post on an electronjs application in which I am just creating and viewing a simple user data file that is to be found in the current user folder of the operating system in which the application is running. In Windows and macOS systems this would be the Users folder and on Linux systems there is the home folder. Although I will be keeping this example fairly simple this is still not really any kind of [hello world or getting started type example with electronjs](/2022/02/07/electronjs-hello-world/). There is also a lot to know about nodejs, and client side javaScipt as well in order to get into making applications with electron that I will not be getting into detail here. However I do often open these posts with a few things that you might want to read up on that are related to the over all content of this post.

## Full Source code on Github

The full source code for this election example, as well as many others can be found in my [electronjs example Github repository](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-user-data-file).
