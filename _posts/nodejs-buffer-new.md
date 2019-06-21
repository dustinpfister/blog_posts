---
title: New Buffers in nodejs do and do not
date: 2019-06-17 10:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 480
updated: 2019-06-21 10:43:14
version: 1.8
---

So when making a [new Buffer](https://nodejs.org/api/buffer.html#buffer_new_buffer_array) in nodejs there are some things to be aware of. There is making a new buffer with the new keyword and what result that gives compared to the other options available in late versions of node.js. In this post I will be going over in detail what the deal is with making a new buffer with the new keyword in nodejs, and why it is that you might want to not do that if you have the option to do so.

<!-- more -->

## 1 - New buffer basic example.

So in many code examples the Buffer constructor is used as a way to create a new Buffer.

```js
let buff = new Buffer('ABCD');
console.log(buff[0]); // 65
console.log(String.fromCharCode(buff[0])); // 'A'
```

In late versions of nodejs 8.x and later a buffer that is created this way will be initialized. That is that the byte values will all be set to zero, and will therefrom not contain any old data that was in memory some of which might be sensitive. In older versions of node before 8.x this was not the case.

## 2 - Other ways to create a new Buffer in nodejs

In older versions of node before 8.x a Buffer that is created with the new keyword would return a buffer that is not initialized with zeros when created by calling the Buffer constructor with the new keyword.

### 2.1 - Create a new buffer with Buffer.alloc

If you want to create a new empty buffer then Buffer.alloc is generally a better choice compared to calling the Buffer constructor with the new keyword. Although the security concern has been addressed in nodejs 8.x, it is still helps to make things more clear. Generally there is the Buffer.alloc, and Buffer.allocUnsafe that helps to better represent what the approach is compared to using new Buffer.

```js
let buff = Buffer.alloc(512);
let safe  = buff.every((b) => b === 0);
console.log(safe); // true
```

### 2.2 - Create a new buffer with Buffer.allocUnsafe if performance is of concern
```js
let buff = Buffer.allocUnsafe(512);
let safe  = buff.every((b) => b === 0);
console.log(safe); // false
```

### 2.3 - New buffers can also be created with Buffer.from as well.

```js
let buff = Buffer.from('ABCD');
console.log(buff.toString()); // 'ABCD'
```