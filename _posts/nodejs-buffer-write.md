---
title: The buffer write method for writing to buffers in nodejs.
date: 2019-08-06 11:15:00
tags: [node.js]
layout: post
categories: node.js
id: 516
updated: 2019-08-06 11:21:58
version: 1.1
---

The buffer write method in nodejs can be used to write data to a buffer that has been created before hand one way of another. There are a few basics to cover when it comes to putting data into a buffer such as encoding and buffer index values. So I thought I would writing a quick post on the buffer write prototype method in nodejs, and may branch off with some other related topics on buffers.

<!-- more -->

## 1 - buffer write basic example in nodejs.

```js
let buff = Buffer.alloc(4);
 
// make first byte of buffer ff
// with the buffer write method
buff.write('ff', 'hex');
 
console.log(buff.toString('hex'));
// ff000000
```

## 2 - nodejs buffer write and encoding

```js
let buff = Buffer.alloc(4);
 
// default encoding is utf8
buff.write('ff');
// so if no encoding is given then the
// value of the buffer will be the
// Unicode value of the string 
console.log(buff.toString('hex'));
// 66660000
```

## 3 - Buffer write index offset and length of bytes to put in the buffer

```js
let buff = Buffer.alloc(4);
 
// just the starting byte index can be given
buff.write('ffff', 1, 'hex');
console.log(buff.toString('hex'));
// 00ffff00
 
// a start index and length can also be given
buff.fill('00', 'hex');
buff.write('ffff', 1, 1, 'hex');
console.log(buff.toString('hex'));
// 00ff0000
```