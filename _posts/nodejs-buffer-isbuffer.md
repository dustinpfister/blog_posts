---
title: Node is buffer native method basics and more
date: 2019-10-30 16:21:00
tags: [node.js]
layout: post
categories: node.js
id: 553
updated: 2019-11-20 08:38:02
version: 1.4
---

The [node is buffer](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_isbuffer_obj) method is the standard way to find out if something is a buffer or not in a nodejs project. The standard is buffer method is right there as part of the Buffer global, and can be used by just passing a value as the first argument. The resulting value that the node is buffer method will return is then a boolean value that will be true if the value is a Buffer, or not if it is not a buffer.

In addition there is also the [is-buffer npm package](https://www.npmjs.com/package/is-buffer) as well, which is a user space option for this kind of task. One might thing that there is no need for such a package, but oddly enough there are often some extending situations in which there might actually need to be some additional logic, or the same task needs to be done a different way.

One might think that a task such as this would be a trivial matter, and in most cases it is, but in other cases it is not. There is a long history of having to make user space solutions for native methods in javaScript, such is the case with the native isNaN method returning true for values other than NaN. So lets take a look at this one real quick to find out if this is the case with the is Buffer method in nodejs..

<!-- more -->

## 1 - node is buffer basic example

In nodejs the Buffer.isBuffer method is fairly easy to use. Just call it off of the Buffer global and pass a value that is to be tested if it is a buffer or not.

```js

let buff = Buffer.from('0a0b0c0d', 'hex');
 
console.log(Buffer.isBuffer(buff)); // true
```

Simple enough so far, but lets throw a whole bunch of other values to see if there is anything weird going on.

## 2 - Throw all kinds of values at it time

So when it comes to other naive methods like this there are some times some weird situation in which there is a need to write my own solution, or use another methods that does the same thing in a user space framework. To find out if that is the case I just need to trow all kinds of values at the method to see if it returns true for something other than a Buffer.

```js
console.log( Buffer.isBuffer(Buffer.alloc(4)) ); // true
 
// some other possible values
console.log( Buffer.isBuffer(4) ); // false
console.log( Buffer.isBuffer('foo') ); // false
console.log( Buffer.isBuffer(0) ); // false
console.log( Buffer.isBuffer('') ); // false
console.log( Buffer.isBuffer(undefined) ); // false
console.log( Buffer.isBuffer(null) ); // false
console.log( Buffer.isBuffer(NaN) ); // false
console.log( Buffer.isBuffer([]) ); // false
console.log( Buffer.isBuffer({}) ); // false
console.log( Buffer.isBuffer( new Uint8Array()) ); // false
 
// looks good
// in fact even if I do something like this is still works
let buff = Buffer.alloc(5);
let obj = {};
obj.constructor = buff.constructor;
console.log(obj.constructor.name); // 'Buffer'
console.log( Buffer.isBuffer(obj) ); // false
```

So that works out okay, I guess the native node is buffer method works just fine, so why bother with a user space module with this? Well there is the fact that the Buffer.isBuffer method is part of the node Buffer global, so there is the idea of making the method portable between node and a browser environment. Aside from that maybe I cant thing of any reason to bother with making a user space solution for this.