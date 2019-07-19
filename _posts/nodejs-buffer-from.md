---
title: New Buffer from strings arrays and more in nodejs
date: 2019-07-19 14:33:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 505
updated: 2019-07-19 15:44:50
version: 1.5
---

The [Buffer from](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array) method in nodejs can be used to create a new Buffer from a string, or array of numbers, or object in general. In many cases it might be one of th best ways to create a new Buffer, but there are [other options as well of course](/2019/06/17/nodejs-buffer-new/). In any case when creating a nodejs project buffers do come up now and then, and the from method of the [Buffer global](/2018/02/07/nodejs-buffer/) comes in handy when there is a desire to quickly create a buffer with an initial value derives from a hex string for example. So lets take a quick look at some examples of the buffer from method in action in nodejs.

<!-- more -->

## 1 - Buffer from basic example

For starters the buffer from method can be used by just passing a string as the first argument when calling it. When doing so the default encoding observed is utf8, however and alternative encoding such as ascii can be given as the second argument.

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

When using the buffer from method this way the size and starting content of the resulting buffer depending on the length of the string and the encoding given if any. But there is must more to the buffer from method then just this so lets look at some more examples that have to do with strings, and event various kinds of objects.

## 2 - Creating Buffers from strings with buffer from

So there is more to creating a buffer from a string that just giving the string to the buffer from method and being done with it. There is the deferences between ascii and utf8 encoding, and there is also the question of hex strings and other forms of data the are sored in string form. So in this section I will be taking a look at some more examples that have to do with creating new buffers with a string value in nodejs.

### 2.1 - Utf8 and ascii encoding

So when it comes to character encoding the two main forms that come to mind for most javaScript developers might be utf8 and ascii. On the surface these two encoding might apear to be about the same, but only when it comes to byte values of 127 and lower. With utf8 encoding if any character has a value of 128 to 255 it would be two bytes in utf8 and only one is ascii.

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

What is nice about ascii is that it is a simple and easy to understand encoding in which each character is one byte, but that it not the case with utf8. The eight in utf8 does not mean eight bits per character, it just means that single byte units of data are used to represent characters. Sure it it one byte per character when it comes to sticking to the ascii range of characters, but that is not the case when going into extended ascii and beyond with utf8 of course.

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