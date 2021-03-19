---
title: The buffer write method for writing to buffers in nodejs.
date: 2019-08-06 11:15:00
tags: [node.js]
layout: post
categories: node.js
id: 516
updated: 2021-03-19 14:11:49
version: 1.8
---

The [buffer write](https://nodejs.org/api/buffer.html#buffer_buf_write_string_offset_length_encoding) method in the nodejs [buffer global](/2018/02/07/nodejs-buffer/) can be used to write data to a buffer that has been created before hand one way of another. There are a few basics to cover when it comes to putting data into a buffer such as encoding and byte index values. So I thought I would write a quick post on the buffer write prototype method in nodejs. In addition to this I  may branch off with some other related topics on buffers in general.

<!-- more -->

## 1 - buffer write basic example in nodejs.

So first we need to create a new buffer, or come across a buffer instance by whatever other means such as inside the body of a handler for a data stream for example. In any case once there is a buffer instance to work with the write prototype method can be used to write some data to that buffer.

A string value can be given as the first argument, and then also an encoding as the second argument for starters at least when it comes to a basic example of the buffer write method when playing around with this method for the first time. More on encoding shortly, but for now lets look at a basic example of the buffer write method in action by passing just a string to it, and an additional string that sets the encoding to hex rather than the default utf8 value.

```js
let buff = Buffer.alloc(4);
 
// make first byte of buffer ff
// with the buffer write method
buff.write('ff', 'hex');
 
console.log(buff.toString('hex'));
// ff000000
```

So as one would expect this writes the hex value ff as the first byte of the buffer. However what if I want the string to be treated as a different encoding, and what if I want to place it at a different byte index in the buffer. No problem there are additional arguments for the method that can be used to change the encoding an byte index values.

## 2 - nodejs buffer write and encoding

So a second, third, or final argument can be used to set the character encoding to be used when writing the given string value to a buffer. By default the encoding is utf8, but it makes sense to always set the encoding even if it is the default to help make things more clear and readable as to what it is going on in a project. 

To help show why consider the following.

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

This is an might be unexpected result, but it is what will happen because of the default encoding of utf8. Even if I want the encoding to be utf8 I still generally choose to pass a string value of utf8 anyway to make it clear that is the encoding that I want to be used when writing data to a buffer.

## 3 - Buffer write index offset and length of bytes to put in the buffer

So then there is the subject of having control over the index value in the buffer to start writing, and the number of bytes to write to that buffer index forward.

For this I can use three arguments, or four arguments. If three arguments the second argument is a starting index in the buffer to begin writing at, and then the encoding. If four argument again the second is a starting location, the third is the number of bytes to write, and then the encoding.

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

## 4 - Conclusion

The buffer write method is then the best way to go about writing to a buffer, because it gives all the options that I would want when it comes to things like setting a byte index value, and chaining the encoding of the string value that I am give as an argument. There are some other options though when it comes to just [filling a buffer](/2019/07/11/nodejs-buffer-write/) with a given data pattern for that there is a fill buffer method. In addition there is also [how I go about creating buffers to begin with](/2019/06/17/nodejs-buffer-new/) when it comes to using the alloc method over the allocUnsafe method or the buffer constructor function.
