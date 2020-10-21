---
title: The node exec child process method
date: 2020-10-21 16:13:00
tags: [node.js]
layout: post
categories: node.js
id: 726
updated: 2020-10-21 16:17:37
version: 1.0
---

The exec method of the nodejs built in child process module is one way to go about running an external command from a nodejs script written in javaScript. The other method os interest in the child process module would be the spawn method. Both the exec method and the spawn method work in a similar way with one significant difference and that is how the methods are called. With the exec method the command can be called with a single string, where the spawn method just the command is given as the first argument, and then any additional options much be given as elements in an array as the second argument.


<!-- more -->
