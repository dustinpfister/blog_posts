---
title: New Buffers in nodejs the good bad and ugly
date: 2019-06-17 10:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 480
updated: 2021-03-19 13:54:47
version: 1.15
---

So when making a [new Buffer](https://nodejs.org/api/buffer.html#buffer_new_buffer_array) in nodejs there are some things to be aware of. There is making a new buffer with the new keyword and what result that gives compared to the other options available in late versions of node.js. The quick and simple answer is that from what I have studied the use of the new keyword is something that should be avoided when creating buffers in nodejs, and other methods provided are what should be used to create them. However in order to really know why that is, some additional context is required.

In this post I will be going over in detail what the deal is with making a new buffer with the new keyword in nodejs, and why it is that you might want to not do that if you have the option to do so.

<!-- more -->

## 1 - New buffer basic example.

So in many code examples the Buffer constructor is used as a way to create a new Buffer. Just like any other constructor function in javaScript this involves the use of the new keyword, followed by calling the constructor function, passing any arguments that I might want to add in the process of doing so.

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

There is then also the option  of using Buffer.allocUnsafe as well, this results to a similar effect with new Buffer in versions of node before 8.x. When using it the reason why it is called unsafe is because old data in memory is not written over out of the box when it is used. However because of that it is a littler faster to get a blank buffer.

```js
let buff = Buffer.allocUnsafe(512);
let safe  = buff.every((b) => b === 0);
console.log(safe); // false
```

### 2.3 - New buffers can also be created with Buffer.from as well.

Then there are a number of ways to create a new buffer with some data it it right away such as using the Buffer.from method for example.

```js
let buff = Buffer.from('ABCD');
console.log(buff.toString()); // 'ABCD'
```

In this sub section I am just creating a new buffer from a string and the default encoding is utf8. It is also possible to set the encoding as well as create buffers from arrays and objects also. For more on the buffer from method check out my post on [Buffer.from](/2019/07/19/nodejs-buffer-from/) in which I get into this method in detail.

## 3 - Conclusion

SO then the first step in working with buffers is knowing how to create one to begin with. In this post we looks at a few ways to go about creating them. There is the way of making them by using the buffer constructor which should be avoided. In place of the constructor there is the allocUnsafe, and alloc methods that are generally a better choice for creating a buffer.
