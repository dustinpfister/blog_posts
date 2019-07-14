---
title: Buffer fill in nodejs
date: 2019-07-11 18:07:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 503
updated: 2019-07-13 20:14:35
version: 1.3
---

Todays post will be a few quick examples on the [buffer fill](https://nodejs.org/api/buffer.html#buffer_buf_fill_value_offset_end_encoding) method in nodejs. The buffer fill method can be used to fill a buffer with a pattern. There is also other methods like the buffer write method also that might be more appropriate when it comes to just writing data to a certain location and length of a buffer. So this post will be mostly on the buffer fill method, but also on filling a buffer with data in general, so lets get to some examples.

<!-- more -->

## 1 - buffer fill basic example

In this section

```js
let buff = Buffer.allocUnsafe(4);
buff.fill('a');
console.log(buff);
```

## 2 - Fill an unsafe buffer

```js
let buff = Buffer.allocUnsafe(8);
buff.fill(Buffer.from('ff','hex'))
console.log(buff.toString('hex'));
// ffffffffffffffff
```

## 3 - Write to a buffer

```js
let buff = Buffer.allocUnsafe(8);
 
buff.fill('f1', 'hex');
 
console.log(buff.toString('hex'));
// f1f1f1f1f1f1f1f1
 
buff.fill('00','hex');
console.log(buff.toString('hex'));
// 0000000000000000
 
buff.write('f1a8', 1, 2, 'hex');
console.log(buff.toString('hex'));
// 00f1a80000000000
```