---
title: Ways to walk a file system in node.js
date: 2018-07-20 17:28:00
tags: [js,node.js]
layout: post
categories: node.js
id: 237
updated: 2018-07-20 17:34:55
version: 1.0
---

As I work to expand my content on node.js, I have come around to working out some examples on how to walk a files system. This includes both my own vanilla js solutions, as well as some walkers that other people have made for node.js, such as [klaw](https://www.npmjs.com/package/klaw), and [node-dir](https://www.npmjs.com/package/node-dir), just to name a few. In this post I will be covering some options, and if you are looking into this sort of thing for your own project hopefully you will find this post helpful.

<!-- more -->

## 1 - What to know before hand.

This is a post on some node.js options for walking a file system, or in other words looping over the contents of a path recursively to preform file io operations on a whole bunch of content. There are many projects that do this in one way or another, or porjects that make use of a file walker of some kind or another like [rimraf](/2017/05/14/nodejs-rimraf/).
