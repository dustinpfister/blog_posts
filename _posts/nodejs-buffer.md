---
title: Buffers in node.js
date: 2018-02-07 22:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 147
updated: 2018-08-15 20:40:42
version: 1.6
---

When [node.js](https://nodejs.org/en/) was first developed there where no typed arrays such as [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) to help work with binary data. As such [Buffer](https://nodejs.org/dist/latest-v8.x/docs/api/buffer.html) was introduced to help work with binary data in a node.js environment. Buffers are something that I run into when working with streams, ether file io streams, or from http requests. In any case Buffers are helpful when doing anything that involves working with raw binary data. So lets take a look at some examples of buffers in node.js.

<!-- more -->

## 1 - what to know before continuing

THis is a post on using buffers in nodejs to work with binary data in a node.js environment. There is a lot to know about when working with buffers, such as how to create them in the first place, and how it has changed compared to older versions of node.js. Anyway I hope that you have at least some background with node.js, and javaSciprt in general, as I wuill not be coving the basics of those topics here.

## 2 - Some simple examples of Buffers in node.js

So lets start out with some very basic examples of buffers. There is more than one way to make them, and in both safe, and unsface ways as well. There is also the old way of making them that you might only bother with if you are still using a real old version of node.js for some reason as well. So lets get started with some buffer hello world examples.

### 2.1 - The old way of doing it (do not do it unless for some reason you have to)

So the old way of making a buffer was to use Buffer like that of any old jaavScript constructor method like that of Date. I call Buffer with the new keyword, and pass whatever it is that I want placed in a buffer.

```js
var buff = new Buffer('this is how it once was');
 
console.log(buff);
// <Buffer 74 68 69 73 20 69 73 20 68 6f 77 20 69 74 20 6f 6e 63 65 20 77 61 73>
```

This should not be used any more unless for some reason you are using a real old version of node.js that does not support the newer ways to make a buffer, in which case I guess you have to. 

### 2.2 - Using Buffer.from to create a new buffer.

As of late (node 8.x+) it is advised to not use the Buffer constructor directly, in fact doing so is depreciated, instead when dealing with buffers the various methods of Buffer are what should be used in order to work with buffers.

```js
let buff = Buffer.from('hello buffer!');
 
console.log(buff);
// <Buffer 68 65 6c 6c 6f 20 62 75 66 66 65 72 21>
 
console.log(buff.toString());
// 'hello buffer!'
```

Buffer.from is one such method and in most cases will work just find, allowing for the creating of a buffer from a string value, as well as other types such as arrays of .

### 2.3 - Buffer.alloc can be used for safe allocation of memory for a buffer

The Buffer.alloc method is great for just setting up a buffer of a fixed byte size in a safe way that will assure that noting old in memory will end up being part of the buffer.

```js
let buff = Buffer.alloc(4);
 
console.log(buff);
// <Buffer 00 00 00 00>
 
buff = Buffer.alloc(5,'hello','ascii');
 
console.log(buff);
// <Buffer 68 65 6c 6c 6f>
```

If I want to I can also give a string to pre fill the buffer with, and give a character encoding to observe when parsing the string to a buffer.

### 2.4 - Using Buffer.allocUnsafe for faster, but unsafe buffers

So it might be fun to play around with unsafe buffers to see if I can make sense of old data in memory, and find out if they really are unsafe. I can understand why in theory at least, and it is not to hard to reproduce why. Just try out on yourself, and then look at what you get, a whole bunch of old data in memory. Compare that to what happens when you just use Buffer.alloc, and you get nothing but zeros.

```js
let oldData = Buffer.allocUnsafe(256);
 
console.log(oldData);
// <Buffer 08 00 00 00 07 00 00 00 70 6c dc 90 
// b1 02 00 00 00 00 00 00 00 00 00 00 00 00 00 
// 00 00 00 00 00 00 00 00 00 08 00 00 00 30 f0 
// b7 bd f7 7f 00 00 01 00 ... >
 
let safeBuff = Buffer.alloc(256);
 
console.log(safeBuff);
// <Buffer 00 00 00 00 00 00 00 00 00 00 00 
// 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
// 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
// 00 00 00 00 00 00 00 00 00 ... >
```

## 3 - Encoding

It is possible to set the encoding that should be used when making a buffer. This can be important when say, creating a buffer from a string that contains characters that are above the ascii range. The number of bytes that a character takes up is different depending on the character encoding. The ascii character encoding is easy to understand, because it is just a single byte per character, however that is not how Unicode works. With Unicode that number of bytes can range from one upwards depending on what the character is.

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