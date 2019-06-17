---
title: New Buffers in nodejs do and do not
date: 2019-06-17 10:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 480
updated: 2019-06-17 10:27:35
version: 1.1
---

So when making a new Buffer in nodejs there are some things to be aware of. There is making a new buffer with the new keyword and what result that gives compared to the other options available in late versions of node.js. In this post I will be going over in detail what the deal is with making a new buffer with the new keyword in nodejs, and why it is that you might want to not do that if you have the option to do so.

<!-- more -->
