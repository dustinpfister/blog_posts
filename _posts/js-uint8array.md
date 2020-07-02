---
title: Uint8arrays in javaScript
date: 2020-04-02 13:03:00
tags: [js]
layout: post
categories: js
id: 640
updated: 2020-07-02 08:37:39
version: 1.6
---

In javaScript there are a number of constructors that provide [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), one such constructor is the [uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) constructor. These kinds of constructors create index collections similar to that of a regular javaScript array, only they are a little different. 
For starters the length of the collections is static, and the values that the collections can hold is restricted to number values. The number values are also restricted depending on the kind of typed array, for example a unit8 array is restricted to a one byte number range between 0 and 255. So these typed arrays are not a replacement for regular javScript arrays that do not have these restrictions and cand gold any kind of value, but they come in handy when working with binary data.

So then typed arrays they are helpful when working out something that is an underlaying binary data buffer value of some kind for one thing. The reason why is because of the fixed size, and the fact that values are restricted to numbers only, and on top of that additional rules for the integers depending on the kind of typed array. For example there is both clamped and un-clamped versions for many of these typed arrays that has to do with value the exceeded the number range, that is clamping values so that a value higher then 255 end up being 255 or allowing for the value to wrap around and work out to what is left when dividing.

In this post I will be looking mainly at the Unit8Array constructor, but much of what is written here can be applied to other type array constructors.

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

There is a [Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) constructor the only difference between this and the plain Uint8Array constructor seems to be that values are clamped rather then warped when they go out of range.

```js
var clamped = new Uint8ClampedArray(3),
notClamped = new Uint8Array(3);
 
clamped[0] = 258;
notClamped[0] = 258;
 
console.log(clamped[0]); // 255
console.log(notClamped[0]); // 2
```

## 3 - Conclusion

So unit8 arrays are a way of having an array of number values that range between 0 and 255 making it an appropriate options when it comes to anything that has to do with raw binary data.