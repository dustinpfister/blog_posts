---
title: Node is buffer native method basics and more
date: 2019-10-30 16:21:00
tags: [node.js]
layout: post
categories: node.js
id: 553
updated: 2019-10-30 16:30:44
version: 1.1
---

The [node is buffer](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_isbuffer_obj) method is the standard way to find out if something is a buffer or not in a nodejs project. The standard is buffer method is right there as part of the Buffer global, and can be used bu just passing a value as the first argument. The resulting value that the node is buffer method will return is then a boolean value that will be true if the value is a Buffer, or not if it is not. In addition there is also the is the [is-buffer npm package](https://www.npmjs.com/package/is-buffer) as well which is a user space option for this kind of task. One might think that a task such as this would be a trivial matter, and in most cases it is, but in other cases it is not such as with isNaN. So lets take a look at this one real quick so we can move on to more interesting things to write about.

<!-- more -->

## 1 - node is buffer basic example

In nodejs the Buffer.isBuffer method is fairly easy to use. Just call it off of the Buffer global and pass a value that is to be tested if it is a buffer or not.

```js

let buff = Buffer.from('0a0b0c0d', 'hex');
 
console.log(Buffer.isBuffer(buff)); // true
```

Simple enough so far, but lets throw a whole bunch of other values to see if there is anything weird going on.