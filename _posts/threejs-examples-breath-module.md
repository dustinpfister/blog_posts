---
title: A Breath Module threejs project example
date: 2023-03-03 08:45:00
tags: [three.js]
layout: post
categories: three.js
id: 1030
updated: 2023-03-03 09:01:51
version: 1.0
---

I made a javaScript module that can be used as a core tool in the process of making a number of video projects that can be used as tools for controlled breathing exercises. The core idea of these kinds of videos is to have a number of objects update in such a way that they are in sycn with a rate at which people watching the video breath. So there is a lot of little details that come up when making a javaScript module to update things such as how many breaths per minute, how many minutes, and also other details about each breath cycle. Details for each breath cycle are things like what is the ratio of time for each opening reset, breath in, high rest, and breath out part. There are also a lot of things that come to mind when it comes to having an expression for the alpha values that will be used to position objects along curves, and also update just about everything else.

<!-- more -->
