---
title: Uint8arrays in javaScript
date: 2020-04-02 13:03:00
tags: [js]
layout: post
categories: js
id: 640
updated: 2020-04-02 13:29:10
version: 1.2
---

In javaScript there are a number of constructors that provide [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), one such constructor is the [uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) constructor. these kinds of constructors create index collections similar to that of a regular javaScript array, only much different. For starters the length of the collections is static, and the values that the collections can hold is restricted.

So these typed arrays are not a replacement for regular javScript arrays, but they are helpful when working out something that is an underlaying binary data buffer of sorts. The reason why is because of the fixed size, and the fact that values are restricted to numbers only, and on top of that additional rules for the n8invgers depending on the kind of typed array.

<!-- more -->

## 1 - Playing with the Uint8Array constructor for the first time

To create a Uint8Array call the constructor with the new keyword, and pass an argument that will be the number of elements for the array. Once there is an instance of this kind of typed array, I can then set byte values for it by using the bracket syntax just like that of a regular array. When setting a value to it that is a number values will be converted to a number range between 0 and 255.

```js
var arr = new Uint8Array(3);

arr[0] = 128;
arr[1] = -1;
arr[2] = 199.75;
 
console.log(arr[0], arr[1], arr[2]); // 128 255 199
```

## 2 - Clamped and not Clamped

There is a Uint8ClampedArray constructor the only difference between this and the plain Uint8Array constructor seems to be that values are clamped rather then warped when they go out of range.

```js
var clamped = new Uint8ClampedArray(3),
notClamped = new Uint8Array(3);
 
clamped[0] = 258;
notClamped[0] = 258;
 
console.log(clamped[0]); // 255
console.log(notClamped[0]); // 2
```