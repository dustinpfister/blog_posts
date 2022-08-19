---
title: User Data File Electronjs application example
date: 2022-08-19 07:59:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1001
updated: 2022-08-19 08:37:53
version: 1.4
---

While working on my [electronjs](https://www.electronjs.org/) application that I use to make videos for my you tube channel, and thus also video embeds for my blog posts on threejs I ran into a situation in which I needed to share state data between the renderer and main process. The way of typically doing this is a little convoluted as it requires [IPC](https://en.wikipedia.org/wiki/Inter-process_communication) messaging between the render and main process my way of using the send methods and defining event handers with the on methods of the [IPC Main](https://www.electronjs.org/docs/latest/api/ipc-main) and [IPC Renderer](https://www.electronjs.org/docs/latest/api/ipc-renderer) classes.

So then for the most part the way that this needs to happen is just my way of IPC and for many situations that might be the best way to go about doing this. However for some things I might want to create a user data folder in the proper standard location and use that as a means to store user data that I can access from the main or render process.

<!-- more -->

## The user data file elecronjs example and what to know first

This is a post on an electronjs application in which I am just creating and viewing a simple user data file that is to be found in the current user folder of the operating system in which the application is running. In Windows and macOS systems this would be the Users folder and on Linux systems there is the home folder. Although I will be keeping this example fairly simple this is still not really any kind of [hello world or getting started type example with electronjs](/2022/02/07/electronjs-hello-world/). There is also a lot to know about [nodejs](/2017/04/05/nodejs-helloworld/), and client side [javaScipt](/2018/11/27/js-getting-started/) as well in order to get into making applications with electron that I will not be getting into detail here. However I do often open these posts with a few things that you might want to read up on that are related to the over all content of this post.

### The homedir method of the os module in nodejs, and native nodejs features

In this example I am using the [home dir method of the os module](/2020/05/20/nodejs-os-homedir/) in nodejs as a way to know where the starting point should be to park user data and any and all application data on a user by user basis. I am also using a lot of other native nodejs modules and features with the [path module](/2017/12/27/nodejs-paths/), as well as the [file system module](/2018/02/08/nodejs-filesystem/) and so forth.

### Full Source code on Github

The full source code for this election example, as well as many others can be found in my [electronjs example Github repository](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-user-data-file).
