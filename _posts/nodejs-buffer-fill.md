---
title: Buffer fill method and filling buffers completely in nodejs
date: 2019-07-11 18:07:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 503
updated: 2019-11-20 10:08:17
version: 1.15
---

Todays post will be a few quick examples on the [buffer fill](https://nodejs.org/api/buffer.html#buffer_buf_fill_value_offset_end_encoding) method in nodejs. The buffer fill method can be used to fill a buffer with a data pattern, so it similar to buffer write but is not a replacement for it, in fact that method is a more robust alternative to buffer fill. The buffer fill method is just a convenience method for something that can be done with buffer write that can be used to write to a buffer in general, rather than just filling a buffer with a pattern.

There is also other methods like the buffer write method also that might be more appropriate when it comes to just writing data to a certain location and length of a buffer. So this post will be mostly on the buffer fill method, but also on filling a buffer with data in general, so lets get to some examples.

<!-- more -->

## 1 - buffer fill basic example

So a basic example of the buffer fill method might be to just pass a single character string to the fill method when calling if off an instance of a buffer. The default encoding is utf8 so if the character is the letter a this will result in the value 61 being set for all bytes in the buffer.

```js
let buff = Buffer.alloc(4);
buff.fill('a');
console.log(buff.toString('hex'));
// 61616161

```

If you want the byte value of ten to be used the you will want to set the encoding to something other than utf8, and that is of course one of the additional arguments for the method.

### 1.1 - Changing the encoding to hex

So then  when it comes to filling a buffer with a value from a hex string then the string needs to be in the forum a hex string characters of course and it must be sets of two characters for one or more byte values. When passing the hex string to the fill method I also just need to pass the string hex as the second argument to change the encoding from the default utf8 value tot hat of hex.

```js
let buff = Buffer.allocUnsafe(4);
buff.fill('0a', 'hex');
console.log(buff.reduce((acc, byt) => {
        return acc + ',' + byt
    }));
// 10,10,10,10
```

### 1.2 - Filling with another buffer

A string and encoding can be used to fill a buffer the the fill method, but another buffer can be used also. THis buffer can be created by and means possible such as the Buffer.from method. Once the buffer exists it just needs to be passed as the first argument when calling the fill method and the buffer will be filled wit th contents of the other buffer.

```js
let buff = Buffer.allocUnsafe(4);
buff.fill(Buffer.from([255]));
console.log(buff.toString('hex'));
// ffffffff

```

## 2 - Fill an unsafe buffer

So when using the alloc buffer method the buffer starts out filled with zeros for starters by default. It is also possible to fill with other patterns just like with the fill method as well. But for the sake of this section now say you have an Unsafe buffer allocated and you want to fill over any sensitive data that might be in it. One way to do so is to use the buffer fill method.

```js
let buff = Buffer.allocUnsafe(8);
buff.fill(Buffer.from('ff','hex'))
console.log(buff.toString('hex'));
// ffffffffffffffff
```

The allocUnsafe method does not zero fill a buffer for starters and on top of that it does not have arguments that can be used to fill the buffer as well. This is the reason why it is called allocUnsafe. So the buffer fill method can be used as one way to make it safe by zero filling the buffer, it is just that doing so is now an option, as in n some cases I might not want a buffer zero filled.

## 3 - Alteratives to buffer fill

So the buffer fill method might come in handy for quickly filling a buffer. However it comes cases the fill method might be a little redundant. There are other ways to fill a buffer of course. When using the alloc method there are options for changing the patten used so it can be filled with something other than zeros. There are other methods and ways of filling a buffer with a pattern also. So lets take a look at some other options when it comes t filling a buffer in nodejs.

### 3.1 - fill with alloc

So when using the buffer alloc method as a way to create a new buffer the buffer will be zero filed by default. It is also possible to change the patter that is to be used to fill the buffer with by passing the same arguments that are used in the buffer fill method right after the first argument that is used to set the size of the buffer.

```js
let buff = Buffer.alloc(4, '0a', 'hex');
console.log(buff.reduce((acc, byt) => {
        return acc + ',' + byt
    }));
// 10,10,10,10
```

### 3.2 - Fill a buffer with the buffer write method

So another way to fill a buffer is to use the buffer write method. This is one way to just go about putting some data into a buffer, but it cal also be used to fill it as well if the arguments are given that will do so.

```js
let buff = Buffer.allocUnsafe(4);
 
buff.write('f1a20306', 0, 8, 'hex');
console.log(buff.toString('hex'));
// f1a20306
```

So if I want to fill with the buffer write method then the byte length of the string that I am using to fill with should be as long as the buffer. I will also want to be sure to set the right values for offset, length, and make sure that the encoding match up also.

### 3.3 - Concat

So the concat method can be used to concatenate two or more buffers together and then return a new buffer that is the sum of all those buffers that will be filled with the contents of the list of buffers given to it. It can also be given another argument that can limit the size of the resulting buffer.

```js
let buff = Buffer.concat([Buffer.from('afaf','hex'),Buffer.from('2828','hex')], 3);
console.log(buff.toString('hex'));
// afaf28
```

### 3.4 - The copy method

So the copy method is yet another option that could be used as a way to fill a buffer with a pattern also.

```js
let patt = Buffer.alloc(4, 'ff', 'hex'),
buff = Buffer.allocUnsafe(4);
patt.copy(buff, 0, 0, buff.length);
console.log(buff.toString('hex'));
// ffffffff
```