---
title: Node is buffer native method basics and more
date: 2019-10-30 16:21:00
tags: [node.js]
layout: post
categories: node.js
id: 553
updated: 2019-10-30 16:26:59
version: 1.0
---

The [node is buffer](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_isbuffer_obj) method is the standard way to find out if something is a buffer or not in a nodejs project. The standard is buffer method is right there as part of the Buffer global, and can be used bu just passing a value as the first argument. The resulting value that the node is buffer method will return is then a boolean value that will be true if the value is a Buffer, or not if it is not. In addition there is also the is the [is-buffer npm package](https://www.npmjs.com/package/is-buffer) as well which is a user space option for this kind of task.

<!-- more -->

