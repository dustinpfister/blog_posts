---
title: New Buffers in nodejs do and do not
date: 2019-06-17 10:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 480
updated: 2019-06-17 16:07:40
version: 1.4
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

In older versions of node before 8.x a Buffer that is created with the new keyword would return a buffer that is not initialized with zeros when created by calling the Buffer constrcutor with the new keyword.