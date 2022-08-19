---
title: User Data File Electronjs application example
date: 2022-08-19 07:59:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1001
updated: 2022-08-19 08:08:38
version: 1.0
---

While working on my electronjs application that I use to make videos for my you tube channel, and thus also video embeds for my blog posts on threejs I ran into a situation in which I needed to share state data between the renderer and main process. The way of typically doing this is a little convoluted as it requires [IPC](https://en.wikipedia.org/wiki/Inter-process_communication) messaging between the render and main process my way of using the send methods and defining event handers with the on methods of the IPC Main and IPC Renderer classes.

So then for the most part the way that this needs to happen is just my way of IPC and for many situations that might be the best way to go about doing this. However for some things I might want to create a user data folder in the proper standard location and use that as a means to store user data that I can access from the main or render process.

<!-- more -->
