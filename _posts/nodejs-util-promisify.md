---
title: node util promisify method in nodejs
date: 2019-06-22 09:25:00
tags: [node.js]
layout: post
categories: node.js
id: 485
updated: 2019-06-23 16:39:00
version: 1.2
---

In versions of node before that of 8.x if I wanted to make a node js method return a promise rather than having to deal with callbacks I would have to use some kind of user land module to promisify that method, do so manually with the Promise constructor, or use a dependency that does so out of the box such as with fs-extra for example. However in versions of node 8+ there is now the [util.promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) method that can be used to promisify one of these callbacks.

<!-- more -->

