---
title: Buffer fill in nodejs
date: 2019-07-11 18:07:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 503
updated: 2019-07-11 18:12:51
version: 1.1
---

Todays post will be a few quick examples on the [buffer fill](https://nodejs.org/api/buffer.html#buffer_buf_fill_value_offset_end_encoding) method in nodejs. The buffer fill method can be used to fill a buffer with a pattern. There is also other methods like the buffer write method also that might be more appropriate when it comes to just writing data to a certin location and length of a buffer. So this post will be mostly on the buffer fill method, but also on filling a buffer with data in general, so lets get to some examples.

<!-- more -->

