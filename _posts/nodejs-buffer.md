---
title: Buffers in node.js
date: 2018-02-07 22:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 147
updated: 2018-02-12 20:02:37
version: 1.3
---

When [node.js](https://nodejs.org/en/) was first developed there where no typed arrays such as [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) to help work with binary data. As such [Buffer](https://nodejs.org/dist/latest-v8.x/docs/api/buffer.html) was introduced to help work with binary data in a server environment.

<!-- more -->

## Simple example of Buffer in node.js

As of late (node 8.x+) it is advised to not use the Buffer constructor directly, in fact doing so is depreciated, instead when dealing with buffers the various methods of Buffer are what should be used in order to work with buffers.

```js
let buff = Buffer.from('hello buffer!');
 
console.log(buff);
// <Buffer 68 65 6c 6c 6f 20 62 75 66 66 65 72 21>
 
console.log(buff.toString());
// 'hello buffer!'
```

Buffer.from is one such method and in most cases will work just find, allowing for the creating of a buffer from a string value, as well as other types such as arrays of .

## Encoding

```js
//let dp = [0xe2, 0x82, 0xaf];
 
// text containing Drachma sign
let text = '\u20af';
 
// ascii encoding
let ascii = Buffer.from(text,'ascii');
 
// utf-8 encoding
let utf8 = Buffer.from(text,'utf-8');
 
console.log(ascii);
// <Buffer af>
 
console.log(utf8);
// <Buffer e2 82 af>
```