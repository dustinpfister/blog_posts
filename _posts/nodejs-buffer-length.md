---
title: The buffer length property and data length in nodejs
date: 2019-08-05 14:22:00
tags: [node.js]
layout: post
categories: node.js
id: 515
updated: 2021-03-17 17:06:39
version: 1.5
---

When working with arrays the length property is not really a good way to go about getting the data length of a string. The reason why is because of the nature of Unicode. However in nodejs when working with buffers the [buffer length](https://nodejs.org/api/buffer.html#buffer_buf_length) property of a buffer can be used to get the amount of memory that the buffer is taking up at least. In addition if buffers are used the right way buffer length can be used as a way to get the actual data size of a string. So this will be a quick post on the buffer length property in nodejs and some related topic when it comes to array length.

<!-- more -->

## 1 - Buffer length basic example

The length property of a buffer will give the size of the buffer in bytes. This will always be the amount of memory that is allocated for the buffer rather than the total number of elements in an array, or the number of characters in a string. So for a basic example of buffer length I just needed to create a buffer my any way possible and just use the length property to get the buffer length of that buffer.

```js
let buff = Buffer.alloc(8);
console.log(buff.length); // 8
```

## 2 - Do not set buffer length to change buffer size

When it comes to Array length setting the length property is one way to go about trimming the size of an array. That might work okay with arrays, but you do not really want to do the same with buffers. So the buffer length property should be considered read only, and another way should be used to set the size of a buffer.

One way to go about changing the buffer length would be to just use a method like buffer slice to create a new buffer of the desired size and then set that to the variable that is being used.

```js
let buff = Buffer.alloc(8);
console.log(buff.length); // 8
buff = buff.slice(0,4);
console.log(buff.length); // 4
```

## 3 - String length and Buffer length

So the length property of a string is sometimes used to find the data size of a string. This might work okay if the string is composed of characters with a value of 127 or lower, but if that is not the case it will result in values that are a little off. However using the buffer from method and the buffer length property should get correct results.


Here I have a string that is composed of 8 characters and when I use buffer from and buffer length it is indeed 8 bytes in size.
```js
let str = 'jalapeno';
console.log(str); // 'jalapeno'
console.log(str.length); // 8
let buff = Buffer.from(str);
console.log(buff.length); // 8
```

So far the string length property seems like an okay way to know the data size of a string right? However lets looks at just one more example.

```js
let str = 'jalape\u00f1o';
console.log(str); // jalapeño
 
// array length is 8
console.log(str.length); 
 
// actual data size in bytes is 9
let buff = Buffer.from(str, 'utf8');
console.log(buff.length); // 9
```

Turns out that the String length property is not a good way to get the size of a string, I could get into the nature of Unicode to explain better why this is, but that is a whole other post maybe.

## 4 - Conclusion

So the buffer length is the number of bytes a buffer is, or at least it should be as far as I can tell at least. So then the buffer length should be a good way to go about finding out the actual data length of a string, that is as long as the proper encoding is used when creating the buffer from the string.
