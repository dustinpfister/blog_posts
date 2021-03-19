---
title: New Buffer from strings arrays and more in nodejs
date: 2019-07-19 14:33:00
tags: [js,node.js]
layout: post
categories: node.js
id: 505
updated: 2021-03-19 14:45:20
version: 1.12
---

The [Buffer from](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array) method in nodejs can be used to create a new Buffer from a string, or array of numbers, or object in general. In many cases it might be one of th best ways to create a new Buffer, but there are [other options as well of course](/2019/06/17/nodejs-buffer-new/). In any case when creating a nodejs project buffers do come up now and then, and the from method of the [Buffer global](/2018/02/07/nodejs-buffer/) comes in handy when there is a desire to quickly create a buffer with an initial value derives from a hex string for example. So lets take a quick look at some examples of the buffer from method in action in nodejs.

<!-- more -->

## 1 - Buffer from basic example

For starters the buffer from method can be used by just passing a string as the first argument when calling it. When doing so the default encoding observed is utf8, however and alternative encoding such as ascii can be given as the second argument.

```js
// from ascii string
let buff = Buffer.from('a', 'ascii');
 
// as expected this results in a 
// one byte sized buffer
console.log(buff.length); // 1
 
// The value of the byte
// is 97 as expected
console.log(buff[0]); // 97
```

When using the buffer from method this way the size and starting content of the resulting buffer depending on the length of the string and the encoding given if any. But there is must more to the buffer from method then just this so lets look at some more examples that have to do with strings, and event various kinds of objects.

## 2 - Creating Buffers from strings with buffer from

So there is more to creating a buffer from a string that just giving the string to the buffer from method and being done with it. There is the deferences between ascii and utf8 encoding, and there is also the question of hex strings and other forms of data the are sored in string form. So in this section I will be taking a look at some more examples that have to do with creating new buffers with a string value in nodejs.

### 2.1 - Utf8 and ascii encoding

So when it comes to character encoding the two main forms that come to mind for most javaScript developers might be utf8 and ascii. On the surface these two encoding might apear to be about the same, but only when it comes to byte values of 127 and lower. With utf8 encoding if any character has a value of 128 to 255 it would be two bytes in utf8 and only one is ascii.

```js
// a string with char 80 in hex
// or 128 in decimal
const str = '\u0080';
 
// the default encoding is utf8
// so this will result in two bytes
let buff = Buffer.from(str);
console.log(buff.length); // two bytes
 
// it is still one byte if ascii encoding
// is used
buff = Buffer.from(str, 'ascii');
console.log(buff.length); // one byte
```

What is nice about ascii is that it is a simple and easy to understand encoding in which each character is one byte, but that it not the case with utf8. The eight in utf8 does not mean eight bits per character, it just means that single byte units of data are used to represent characters. Sure it it one byte per character when it comes to sticking to the ascii range of characters, but that is not the case when going into extended ascii and beyond with utf8 of course.

### 2.2 - Hex encoding

So on top of the diferences between utf8 and ascii there is also the nature of hex strings. If I have a string of hex values where there are two chars for each byte then I can use the hex encoding option to create a buffer from a hex string.

```js
let hex = '010203fffefd';
 
let buff = Buffer.from(hex, 'hex');
 
console.log(buff.length); // 6 bytes
 
buff.forEach((byt) => {
    console.log(byt);
});
// 1 2 3 255 254 253
```

## 3 - Creating Buffers from arrays with buffer from

So then there are arrays in javaScript, and when it comes to them yes they two can be used as a way to create a buffer as well. Each value in the array should be a number and it should be a vale between 0 and 255. In this section I will be quickly going over some f the ins and outs when it comes to creating a buffer from an array in nodejs.

### 3.1 - An array of numbers

So if it is an array of numbers that are between 0 and 255 then just pass the array as the first argument. The length of the array will be equal to the number of elements, and the value for each byte in the array will correspond to the values for each element.

```js
// array of numbers
let arr = [1, 2, 3, 4, 255, 254, 253];
 
let buff = Buffer.from(arr);
console.log(buff.length); // 7 bytes
buff.forEach((byt) => {
    console.log(byt);
});
// 1 2 3 4 255 254 253
```

### 3.2 - An array of hex strings

So the Array should be an array of numbers, if however you are dealing with an array of string values such as hex values. The the way to go about doing it will involve converting the array of string values to a single string, and then using that with the desired encoding as covered in the section in which I went over creating buffers from strings above.

```js
// array of numbers
let arr = ['0a','0b','0c'];
 
let buff = Buffer.from(arr.join(''),'hex');
console.log(buff.length); // 3 bytes
buff.forEach((byt) => {
    console.log(byt);
});
// 10 11 12
```

## 4 - New buffers from objects in general

So then there is creating buffers from objects in general. Any object that has a valueOf property can be passed as the first argument. In this case as the value that is the result of calling the valueOf property of the object is what will be used to create the starting size and content of the buffer.

### 4.1 - Custom Object with a valueOf property

In this example I am creating my one custom object with a valueOf property to show what happens when creating a buffer with an object.

```js
let myThing = {
    x: 23,
    y: 32,
    valueOf: function () {
        let str = String.fromCharCode(this.x) + '\u00ff' + String.fromCharCode(this.y);
        return str;
    }
};
 
let buff = Buffer.from(myThing, 'ascii');
 
buff.forEach((byt)=>{
    console.log(byt);
});
// 23 255 32
```

## 5 - Conclusion

Well there are some basic example of using the buffer from method in nodejs to create new buffers from strings, arrays, and objects in general. There are many other method of interest in the buffer global as well though. The buffer.alloc method is what can be used to create a new zero filled buffer, and then there is the buffer write method that can be used to put data into the buffer. So much more to write about just when it comes to buffers alone when it comes to nodejs.