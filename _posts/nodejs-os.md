---
title: Node os module examples
date: 2019-11-19 14:19:00
tags: [node.js]
layout: post
categories: node.js
id: 566
updated: 2019-11-19 14:25:37
version: 1.1
---

So you might be wondering if there is a node built in way to access all kinds of data about the host operating system that your nodejs project is running on top of. Maybe you want to work out some logic where you want to handle things a little differently if the project is running on top of windows rather than linux of another posix system. 

Well there is the idea of using the child process module as a way to just go ahead and see if a command of one sort or another works or not and figure it out that way. However maybe the node os core module is what you would rather start with. This node build in module contains many properties and methods than are helpful for gaining at least some basic information about what you are dealing with. 
<!-- more -->
