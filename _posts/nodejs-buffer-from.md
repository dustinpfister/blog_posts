---
title: New Buffer from strings arrays and more in nodejs
date: 2019-07-19 14:33:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 505
updated: 2019-07-19 14:46:52
version: 1.1
---

The [Buffer from](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array) method in nodejs can be used to create a new Buffer from a string, or array of numbers, or object in general. In many cases it might be one of th best ways to create a new Buffer, but there are [other options as well of course](/2019/06/17/nodejs-buffer-new/). In any case when creating a nodejs project buffers do come up now and then, and the from method of the [Buffer global](/2018/02/07/nodejs-buffer/) comes in handy when there is a desire to quickly create a buffer with an initial value derives from a hex string for example. So lets take a quick look at some examples of the buffer from method in action in nodejs.

<!-- more -->

