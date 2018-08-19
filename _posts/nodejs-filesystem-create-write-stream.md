---
title: The fs.createWriteStream method
date: 2018-08-17 20:37:00
tags: [js,node.js]
layout: post
categories: node.js
id: 262
updated: 2018-08-18 22:08:35
version: 1.1
---

In [node.js](https://nodejs.org/en/) streams come up often, even with the most simple of examples will typically involve logging something to the standard output which is a kind of stream. In this post I will be writing about the fs.createWriteStream method in the node.js built in file system module, and why that is often a better choice for writing to a file compared to other options in that module.

<!-- more -->
