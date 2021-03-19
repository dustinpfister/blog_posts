---
title: Using The Buffer slice method in nodejs
date: 2021-03-19 14:22:00
tags: [node.js]
layout: post
categories: node.js
id: 827
updated: 2021-03-19 14:43:45
version: 1.2
---

When it comes to working with [buffers in nodejs](/2018/02/07/nodejs-buffer) there is the [nodejs buffer slice](https://nodejs.org/api/buffer.html#buffer_buf_slice_start_end) method that works more or less just like the [Array slice](/2018/12/08/js-array-slice/) method that will create a new array from an array without mutating the source array.

The slice method is often what I would use when it comes to creating a sub array from an array because of the nature of not mutating the array in place. There is however the array splice method that will mutate the array in place, so then the question might arise as to how to go about doing that with a buffer in nodejs. When looking at the nodejs docs it would seem that there is no such method in the Buffer class, however there is the [Buffer write](/2019/08/06/nodejs-buffer-write/) method. When it comes to the write method that is what can be used to mutate a buffer in place, much like that of the Array splice method.

So in this post I will be going over a few quick examples of the Buffer slice method. However in the process of doing so I guess I might also want to go over a few more examples of the write method when it comes to mutating a buffer in place, and other ways to go about creating a new buffer from a buffer.

<!-- more -->

## 1 - Basic example of the nodejs Buffer Slice method

```
let buff = Buffer.from('afbfcf', 'hex');
 
let a = buff.slice(1, 3);
 
console.log(a.toString('hex')); // bfcf
```