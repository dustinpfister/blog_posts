---
title: Using The Buffer slice method in nodejs
date: 2021-03-19 14:22:00
tags: [node.js]
layout: post
categories: node.js
id: 827
updated: 2021-03-19 14:28:55
version: 1.0
---

When it comes to working with [buffers in nodejs](/2018/02/07/nodejs-buffer) there is the [nodejs buffer slice](https://nodejs.org/api/buffer.html#buffer_buf_slice_start_end) method that works more or less just like the [Array slice](/2018/12/08/js-array-slice/) method that will create a new array from an array without mutating the source array.

<!-- more -->

## 1 - Basic example of the nodejs Buffer Slice method

```
let buff = Buffer.from('afbfcf', 'hex');
 
let a = buff.slice(1, 3);
 
console.log(a.toString('hex')); // bfcf
```