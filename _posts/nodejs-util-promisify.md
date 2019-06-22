---
title: node util promisify method in nodejs 8
date: 2019-06-22 09:25:00
tags: [node.js]
layout: post
categories: node.js
id: 485
updated: 2019-06-22 09:29:48
version: 1.0
---

In versions of node before that of 8.x if I wanted to make a node js method return a promise rather than having to deal with callbacks I would have to use some kind of user land module to promisify that method, do so manually with the Promise constructor, or use a depednacy that does so out of the box such as with fs-extra for example.

<!-- more -->

