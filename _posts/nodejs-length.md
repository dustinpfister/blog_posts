---
title: The buffer length property and data length in nodejs
date: 2019-08-05 14:22:00
tags: [node.js]
layout: post
categories: node.js
id: 515
updated: 2019-08-05 20:40:05
version: 1.2
---

When working with arrays the length property is not really a good way to go about getting the data length of a string. The reason why is because of the nature of Unicode. However in nodejs when working with buffers the [buffer length](https://nodejs.org/api/buffer.html#buffer_buf_length) property of a buffer can be used to get the amount of memory that the buffer is taking up at least. In addition if buffers are used the right way buffer length can be used as a way to get the actual data size of a string. So this will be a quick post on the buffer length property in nodejs and some related topic when it comes to array length.
<!-- more -->

## 1 - Buffer length basic example

The length property of a buffer will give the size of the buffer in bytes. This will always be the amount of memory that is allocated for the buffer rather than the total number of elements in an array, or the number of characters in a string. So for a basic example of buffer length I just needed to create a buffer my any way possible and just use the length property to get the buffer length of that buffer.

```js
let buff = Buffer.alloc(8);
console.log(buff.length); // 8
```

## 2 - Do not set buffer length to change buffer size

```js
let buff = Buffer.alloc(8);
console.log(buff.length); // 8
buff = buff.slice(0,4);
console.log(buff.length); // 4
```

## 3 - Array length and Buffer length

```js
let str = 'jalapeno';
console.log(str); // 'jalapeno'
console.log(str.length); // 8
let buff = Buffer.from(str);
console.log(buff.length); // 8
```

```js
let str = 'jalape\u00f1o';
console.log(str); // jalapeño
 
// array length is 8
console.log(str.length); 
 
// actual data size in bytes is 9
let buff = Buffer.from(str, 'utf8');
console.log(buff.length); // 9
```