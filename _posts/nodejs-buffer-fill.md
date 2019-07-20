---
title: Buffer fill in nodejs
date: 2019-07-11 18:07:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 503
updated: 2019-07-19 20:16:57
version: 1.5
---

Todays post will be a few quick examples on the [buffer fill](https://nodejs.org/api/buffer.html#buffer_buf_fill_value_offset_end_encoding) method in nodejs. The buffer fill method can be used to fill a buffer with a pattern. There is also other methods like the buffer write method also that might be more appropriate when it comes to just writing data to a certain location and length of a buffer. So this post will be mostly on the buffer fill method, but also on filling a buffer with data in general, so lets get to some examples.

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

## 2 - Fill an unsafe buffer

```js
let buff = Buffer.allocUnsafe(8);
buff.fill(Buffer.from('ff','hex'))
console.log(buff.toString('hex'));
// ffffffffffffffff
```

## 3 - Write to a buffer

```js
let buff = Buffer.allocUnsafe(8);
 
buff.fill('f1', 'hex');
 
console.log(buff.toString('hex'));
// f1f1f1f1f1f1f1f1
 
buff.fill('00','hex');
console.log(buff.toString('hex'));
// 0000000000000000
 
buff.write('f1a8', 1, 2, 'hex');
console.log(buff.toString('hex'));
// 00f1a80000000000
```