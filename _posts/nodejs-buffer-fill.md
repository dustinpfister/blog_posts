---
title: Buffer fill in nodejs
date: 2019-07-11 18:07:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 503
updated: 2019-07-19 20:28:37
version: 1.7
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

So when using the alloc buffer method the buffer starts out filled with zeros for starters by default. It is also possible to fill with other patterns just like with the fill method as well. But for the sake of this section now say you have an Unsafe buffer allocated and you want to fill over any sensitive data that might be in it. One way to do so is to use the buffer fill method.

```js
let buff = Buffer.allocUnsafe(8);
buff.fill(Buffer.from('ff','hex'))
console.log(buff.toString('hex'));
// ffffffffffffffff
```

The allocUnsafe method does not zero fill a buffer for starters and on top of that it does not have arguments that can be used to fill the buffer as well. This is the reason why it is called allocUnsafe. So the buffer fill method can be used as one way to make it safe by zero filling the buffer, it is just that doing so is now an option, as in n some cases I might not want a buffer zero filled.

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