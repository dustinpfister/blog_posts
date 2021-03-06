---
title: Using The Buffer slice method in nodejs
date: 2021-03-19 14:22:00
tags: [node.js]
layout: post
categories: node.js
id: 827
updated: 2021-03-19 15:18:59
version: 1.6
---

When it comes to working with [buffers in nodejs](/2018/02/07/nodejs-buffer) there is the [nodejs buffer slice](https://nodejs.org/api/buffer.html#buffer_buf_slice_start_end) method that works more or less just like the [Array slice](/2018/12/08/js-array-slice/) method that will create a new array from an array without mutating the source array.

The slice method is often what I would use when it comes to creating a sub array from an array because of the nature of not mutating the array in place. There is however the array splice method that will mutate the array in place, so then the question might arise as to how to go about doing that with a buffer in nodejs. When looking at the nodejs docs it would seem that there is no such method in the Buffer class, however there is the [Buffer write](/2019/08/06/nodejs-buffer-write/) method. When it comes to the write method that is what can be used to mutate a buffer in place, much like that of the Array splice method.

So in this post I will be going over a few quick examples of the Buffer slice method. However in the process of doing so I guess I might also want to go over a few more examples of the write method when it comes to mutating a buffer in place, and other ways to go about creating a new buffer from a buffer.

<!-- more -->

## 1 - Basic example of the nodejs Buffer Slice method

First off how about a basic example of the buffer slice method. Here I am using the Buffer from method as a way to create a new buffer from a hex encoded string. I then end up with a buffer that is three bytes long with th string, and encoding that I used. Say that later in some source code I want to get a new buffer that is the last two bytes of this 3 byte buffer, without changing the source buffer. To do so I can call slice off of the source buffer, and pass a zero relative starting index, followed by a zero relative ending index. The returned result is then a new buffer that is the last two byes of the source buffer.

```
let buff = Buffer.from('afbfcf', 'hex');
let a = buff.slice(1, 3);
 
console.log(a.toString('hex')); // bfcf
// the source buffer is not changed
console.log(buff.toString('hex')); // afbfcf
```

## 2 - The write method for mutating a buffer in place

So then the buffer slice is a great little buffer equivalent to the array slice method. However what if I do want to mutate a buffer in place? Well for that there is the write method. The Array splice method will take a starting index, and a number or elements to inject into the array at that point. Buffers are a little different from arrays in javaScript though. For one thing a buffer is a fixed size of bytes and the length of a buffer can not just be increased and reduces like with arrays. The way that it must be done is by creating a new buffer often.

However the write method of a buffer is a little like splice in that it can be used to mutate a buffer in place. If I have a source string I can set a buffer index location, and a number of bytes to write at that location. But it will not increase the size of the buffer of course, and that is the way that it should be. These are buffers after all.

```js
let buff = Buffer.from('afbfcf', 'hex');

// the write method can be used to write in place
// just like array splice
var start = 1,
count = 1;
buff.write('001a', start, count, 'hex');
console.log(buff.toString('hex')); // af00cf
```

## 3 - Just use array methods and Buffer.from

I like the array methods a lot in javaScript, I am just really used to how to work with them. So one thing that comes to mind is just working with arrays to create what I need for a buffer in terms or arrays of bytes values as hex strings. I can then used the Array.join method with an empty string to create a solid hex string that I can then pass to the Buffer.from method to create a buffer that way.

```js
// have a bytes array
let bytes = ['ff', 'af', '00', 'cf'];
 
// do whatever I want with array methods
bytes.splice(1, 0, '00');
bytes.splice(0, 0, '00');
 
// create a hex string
let hexString = bytes.join('')
 
// create a buffer from the hex string using Array.from
let buff = Buffer.from(hexString, 'hex');
console.log(buff.length); // 6
 
// The toString method of a buffer is then how to create
// a hex string from a buffer
console.log(buff.toString('hex')); // 00ff00af00cf
```

By doing something like this I can just work with my array methods to do whatever I need to do with binary data. WHen I am done it is just a matter of creating a Buffer from a final hex string.

## 4 - Conclusion

That is all that I have for the buffer slice method for now at least today. If You find buffers to hard to work with, but like javaScript arrays here is one tip that might work okay. Just work with javaScript arrays and hex strings. Do whatever you need to do when  it comes to sorting, injecting, slicing and splicing, and then just join the arrays into a string and use Buffer.from to create a buffer.

