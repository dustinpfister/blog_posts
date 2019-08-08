---
title: The node stream module and making custom readable and writable streams
date: 2019-08-08 10:51:00
tags: [node.js]
layout: post
categories: node.js
id: 518
updated: 2019-08-08 10:56:33
version: 1.0
---

So I have wrote a few posts on streams when it comes to the create read stream and create write stream file system module methods, as well as many other such methods in various native nodejs modules. However I have not wrote much on the node stream module by itself, and how to go about using that module to make my own custom streams. Also it is important to know a thing or two about this module and the nature of streams in general when it comes to working on nodejs projects. So I thought I would put together a piece of content in which I am focusing on the node stream module and custom made streams, rather than something else in nodejs that inherits from the base classes in this module.

<!-- more -->
