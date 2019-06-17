---
title: New Buffers in nodejs do and do not
date: 2019-06-17 10:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 480
updated: 2019-06-17 16:28:28
version: 1.5
---

So when making a new Buffer in nodejs there are some things to be aware of. There is making a new buffer with the new keyword and what result that gives compared to the other options available in late versions of node.js. In this post I will be going over in detail what the deal is with making a new buffer with the new keyword in nodejs, and why it is that you might want to not do that if you have the option to do so.

<!-- more -->

## 1 - New buffer basic example.

```js
let buff = new Buffer('ABCD');
console.log(buff[0]); // 65
console.log(String.fromCharCode(buff[0])); // 'A'
```

## 2 - Why not use new Buffer to create a Buffer?

In older versions of node before 8.x a Buffer that is created with the new keyword would return a buffer that is not initialized with zeros when created by calling the Buffer constructor with the new keyword.

### 2.1 - Create a new buffer with Buffer.alloc if performance is not a concern

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