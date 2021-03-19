---
title: Buffer fill method and filling buffers completely in nodejs
date: 2019-07-11 18:07:00
tags: [js,node.js]
layout: post
categories: node.js
id: 503
updated: 2021-03-19 14:45:19
version: 1.23
---

Todays post will be a few quick examples on the [buffer fill](https://nodejs.org/api/buffer.html#buffer_buf_fill_value_offset_end_encoding) method in the [nodejs buffer](/2018/02/07/nodejs-buffer/) global. The buffer fill method can be used to fill a buffer with a data pattern, so it similar to [buffer write](/2019/08/06/nodejs-buffer-write/) but is not a replacement for it, in fact that method is a more robust alternative to buffer fill. The buffer fill method is just a convenience method for something that can be done with buffer write that can be used to write to a buffer in general, rather than just filling a buffer with a pattern.

So then the buffer write method might be more appropriate when it comes to just writing data to a certain location and length to a buffer instance. As such this post will be mostly on the buffer fill method, but also on filling a buffer with data in general, with buffer write, and also the ways that buffers are created to begin with.

<!-- more -->

## 1 - buffer fill basic example

So a basic example of the buffer fill method might be to just pass a single character string to the fill method when calling if off an instance of a buffer. The default encoding is utf8 so if the character is the letter a this will result in the value 61 being set for all bytes in the buffer.

```js
let buff = Buffer.alloc(4);
buff.fill('a');
console.log(buff.toString('hex'));
// 61616161

```

If you want the byte value of ten to be used the you will want to set the encoding to hex rather than utf8, and that is of course one of the additional arguments for the method. So lets look at another very basic example of the buffer fill method in action.

### 1.1 - Changing the encoding to hex

So then when it comes to filling a buffer with a value from a hex string then the string needs to be in the forum of hex string characters of course to begin with. Also the hex string must be sets of two characters for one or more byte values, as that is the smallest unit of data that we are working with when it comes to node buffers. When passing the hex string to the fill method I also just need to pass the string hex as the second argument to change the encoding from the default utf8 value tot hat of hex.

```js
let buff = Buffer.allocUnsafe(4);
buff.fill('0a', 'hex');
console.log(buff.reduce((acc, byt) => {
        return acc + ',' + byt
    }));
// 10,10,10,10
```

I then get the desired result by passing the string 0a that worked out to a byte value of 10, and that then is what the buffer ends up getting filled with.

### 1.2 - Filling with another buffer

A string and encoding can be used to fill a buffer with the fill method, but another buffer can be used also when desired. This buffer can be created by and means possible such as the Buffer.from method that can also be used as a way to both create and fill. Once the buffer exists it just needs to be passed as the first argument when calling the fill method and the buffer will be filled with the contents of the other buffer that was passed to buffer fill.

```js
let buff = Buffer.allocUnsafe(4);
buff.fill(Buffer.from([255]));
console.log(buff.toString('hex'));
// ffffffff
```

Here I have chose to use buffer from from method and passed it an array of bytes values. This array just has one element with a number value of 255, so that results in a buffer with a byte length of one and a value of 255 for that single byte. I then passed that value to the buffer fill metod oh another buffer that I created with the alloc unsafe method which fills the buffer with the value 255 rather than leaving any old contents that might be there.

## 2 - Fill an unsafe buffer

So when using the alloc buffer method the buffer starts out filled with zeros for starters by default. It is also possible to fill with other patterns just like with the fill method as well. But for the sake of this section now say you have an Unsafe buffer allocated, and you want to fill over any sensitive data that might be in it. One way to do so is to use the buffer fill method.

```js
let buff = Buffer.allocUnsafe(8);
buff.fill(Buffer.from('ff','hex'))
console.log(buff.toString('hex'));
// ffffffffffffffff
```

The allocUnsafe method does not zero fill a buffer for starters and on top of that it does not have arguments that can be used to fill the buffer in addition to this. So then this is the reason why it is called allocUnsafe, because there could be old data in there that might be of interest to a bad actor. 

So the buffer fill method can be used as one way to make it safe by zero filling the buffer, it is just that doing so is now an option, rather than a requirement. In some cases I might not want a buffer zero filled to begin with for performance reasons.

## 3 - Alteratives to buffer fill

So the buffer fill method might come in handy for quickly filling a buffer. However it some cases the fill method might be a little redundant. There are other ways to fill a buffer of course, and often it is an optiin to do so when using certain other buffer methods. 

When using the alloc method there are options for changing the patten used so it can be filled with something other than zeros. There are other methods and ways of filling a buffer with a pattern also, or just making the length of the buffer the length of the content to begin with. So lets take a look at some other options when it comes t filling a buffer in nodejs.

### 3.1 - fill with alloc

So when using the buffer alloc method as a way to create a new buffer, the buffer will be zero filed by default. It is also possible to change the pattern that is to be used to fill the buffer with by passing the same arguments that are used in the buffer fill method right after the first argument that is used to set the size of the buffer.

```js
let buff = Buffer.alloc(4, '0a', 'hex');
console.log(buff.reduce((acc, byt) => {
        return acc + ',' + byt
    }));
// 10,10,10,10
```

So if I am using alloc as away to create buffers if will be filled to begin with by zeros by default, but the second argument can set a pattern, and a third can be used to set the encoding. So then the functionally of th buffer fill method is baked into the buffer alloc method as an additional feature accessible via additional arguments.

### 3.2 - Fill a buffer with the buffer write method

So another way to fill a buffer is to use the buffer write method. This is one way to just go about putting some data into a buffer, but it can also be used to fill it as well if the arguments are given that will do so.

```js
let buff = Buffer.allocUnsafe(4);
 
buff.write('f1a20306', 0, 8, 'hex');
console.log(buff.toString('hex'));
// f1a20306
```

So if I want to fill with the buffer write method then the byte length of the string that I am using to fill with should be as long as the buffer. I will also want to be sure to set the right values for offset, and length. Also it should go without saying that I should make sure that the encodings match up also.

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

## 4 - Conclusion

So that is it for now when it comes to just filling buffers with a pattern in nodejs. WHen doing so the fill methods is great for doing so. However there are also a number of other ways of doing the same thing that are methods that can also be used in other ways.
