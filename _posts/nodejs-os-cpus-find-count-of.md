---
title: Find the count of cpus in a node.js environment
date: 2018-08-23 08:41:00
tags: [js,node.js]
layout: post
categories: node.js
id: 268
updated: 2018-08-23 08:46:21
version: 1.0
---

As I continue to log time working with [node.js](https://nodejs.org/en/) I start to get into things that are a little advanced such as clustering. When making a node.js project that will spawn additional instances of itself to help make some heavy lifting go faster, there is a need to know how many processors there are on the system that node is running. In this post I will be quickly writing about how to go abound finding that out very fast, and will be giving some quick examples on why this is helpful.

<!-- more -->
