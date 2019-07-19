---
title: New Buffer from strings arrays and more in nodejs
date: 2019-07-19 14:33:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 505
updated: 2019-07-19 14:59:48
version: 1.2
---

The [Buffer from](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array) method in nodejs can be used to create a new Buffer from a string, or array of numbers, or object in general. In many cases it might be one of th best ways to create a new Buffer, but there are [other options as well of course](/2019/06/17/nodejs-buffer-new/). In any case when creating a nodejs project buffers do come up now and then, and the from method of the [Buffer global](/2018/02/07/nodejs-buffer/) comes in handy when there is a desire to quickly create a buffer with an initial value derives from a hex string for example. So lets take a quick look at some examples of the buffer from method in action in nodejs.

<!-- more -->

## 1 - Buffer from basic example

```js
// from ascii string
let buff = Buffer.from('a', 'ascii');
 
// as expected this results in a 
// one byte sized buffer
console.log(buff.length); // 1
 
// The value of the byte
// is 97 as expected
console.log(buff[0]); // 97
```

## 2 - Creating Buffers from strings with buffer from

### 2.1 - Utf8 and ascii encoding

```js
// a string with char 80 in hex
// or 128 in decimal
const str = '\u0080';
 
// the default encoding is utf8
// so this will result in two bytes
let buff = Buffer.from(str);
console.log(buff.length); // two bytes
 
// it is still one byte if ascii encoding
// is used
buff = Buffer.from(str, 'ascii');
console.log(buff.length); // one byte
```

### 2.2 - Hex encoding

```js
let hex = '010203fffefd';
 
let buff = Buffer.from(hex, 'hex');
 
console.log(buff.length); // 6 bytes
 
buff.forEach((byt) => {
    console.log(byt);
});
// 1 2 3 255 254 253
```

## 3 - Creating Buffers from arrays with buffer from

### 3.1 - An array of numbers

```js
// array of numbers
let arr = [1, 2, 3, 4, 255, 254, 253];
 
let buff = Buffer.from(arr);
console.log(buff.length); // 7 bytes
buff.forEach((byt) => {
    console.log(byt);
});
// 1 2 3 4 255 254 253
```

### 3.2 - An array of hex strings

```js
// array of numbers
let arr = ['0a','0b','0c'];
 
let buff = Buffer.from(arr.join(''),'hex');
console.log(buff.length); // 3 bytes
buff.forEach((byt) => {
    console.log(byt);
});
// 10 11 12
```