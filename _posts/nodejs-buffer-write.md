---
title: The buffer write method for writing to buffers in nodejs.
date: 2019-08-06 11:15:00
tags: [node.js]
layout: post
categories: node.js
id: 516
updated: 2019-11-20 10:35:25
version: 1.5
---

The [buffer write](https://nodejs.org/api/buffer.html#buffer_buf_write_string_offset_length_encoding) method in the nodejs [buffer global](/2018/02/07/nodejs-buffer/) can be used to write data to a buffer that has been created before hand one way of another. There are a few basics to cover when it comes to putting data into a buffer such as encoding and buffer index values. So I thought I would writing a quick post on the buffer write prototype method in nodejs, and may branch off with some other related topics on buffers.

<!-- more -->

## 1 - buffer write basic example in nodejs.

So first we need to create a new buffer, or some across a buffer instance by whatever other means such as inside the body of a handler for a data stream of some kind. In any case once there is a buffer instance to work with the write prototype method can be used to write some data to that buffer.

A string value should be given as the first argument, and then also an encoding as the second argument for starters at least when maying around with this method for the first time. More on encoding shortly, but for now lets look at a basic example of the buffer write method in action.

```js
let buff = Buffer.alloc(4);
 
// make first byte of buffer ff
// with the buffer write method
buff.write('ff', 'hex');
 
console.log(buff.toString('hex'));
// ff000000
```

So as one would expect this writes the hex value ff as the first byte of the buffer. However what if I want the string to be treated as a different encoding, and what if I want to place it at a different byte index in the buffer. No problem there are additional arguments for the method.

## 2 - nodejs buffer write and encoding

So a second, third, or final argument can be used to set the character encoding to be used when writing the given string value to a buffer. By default the encoding is utf8, but it makes sense to always set the encoding even if it is the default to help make things more clear and readable as to what it is going on in a project of mine. 

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

So then there is the subject of having control over the index value in the buffer to start writing, and the number of bytes to write to that buffer index forward.

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