---
title: The buffer length property and data length in nodejs
date: 2019-08-05 14:22:00
tags: [node.js]
layout: post
categories: node.js
id: 515
updated: 2019-08-05 20:01:07
version: 1.0
---

When working with arrays the length property is not really a good way to go about getting the data length of a string. The reason why is because of the nature of Unicode. However in nodejs when working with buffers the buffer length property of a buffer can be used to get the amount of memory that the buffer is taking up at least. In addition if buffers are used the right way buffer length can be used as a way to get the actual data size of a string. So this will be a quick post on the buffer length property in nodejs and some related topic when it comes to array length.

<!-- more -->
