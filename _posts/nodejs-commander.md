---
title: Using commander for option parsing, and much more
date: 2018-07-10 12:13:00
tags: [js,node.js]
layout: post
categories: node.js
id: 232
updated: 2018-07-10 12:17:42
version: 1.0
---

When making scripts that are to be called from the command line with node.js, the subject of option parsing becomes of interest. If you are in a situation in which you find yourself trying to work out your own solution for extracting arguments that are given from the command line via process,argv, you might want to stop and check out some of the npm modules that are around that help to make quick work of this such as [commander](https://www.npmjs.com/package/commander). In this post I will be writing about commander as a solution for command line option parsing, and will be giving some examples of it's use.

<!-- more -->

