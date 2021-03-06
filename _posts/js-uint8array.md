---
title: Uint8arrays in javaScript
date: 2020-04-02 13:03:00
tags: [js]
layout: post
categories: js
id: 640
updated: 2020-11-01 15:12:48
version: 1.20
---

In javaScript there are a number of constructors that provide [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), one such constructor is the [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) constructor. These kinds of constructors create index collections similar to that of a regular javaScript array, only they are a little different when it comes to the values that can be held in them.

For starters the length of the collections is static, and the values that the collections can hold is restricted to number values. On top of that the number values are also restricted depending on the kind of typed array, for example a uint8 array is restricted to a one byte number range between 0 and 255. So these typed arrays are not a replacement for regular javScript arrays that do not have these restrictions and can hold any kind of value, but typed arrays still come in handy when working with binary data.

So then typed arrays are helpful when working out something that is an underlaying binary data buffer value of some kind for one thing, and more ofte then not that is what they are used for. The reason why is because of the fixed size, and the fact that values are restricted to numbers only, and on top of that additional rules for the integers, or float values depending on the kind of typed array that is used. 

There is also both clamped, and un-clamped versions for many of these typed arrays that has to do with what happens when a value goes out of the number range. There is clamping a value so that a value higher then 255 end up being 255, and a value below 0 will be 0. Then there is warping, or in other words allowing for a value to wrap around and work out to what is left when dividing.

So there is a bit to cover when it comes to a uint8 array, and typed arrays in general. In this post I will be looking mainly at the Uint8Array constructor, but much of what is written here can be applied to other type array constructors.

<!-- more -->

## 1 - The Uint8Array basics

For starters there is juts knowing [how to create and use a Uinit8Array](https://stackoverflow.com/questions/38718202/how-to-use-uint8array-uint16array-uin32array) with the constructor, and static methods that can be used to do so. It is also worth mentioning some additional basics with these kinds of arrays. So in this section I will just be starting out with a few quick basic examples of this kind of array constructor in javaScript.

The general basic idea to keep in mind with these arrays is that they are restricted to just one type that is Numbers, and the range for the numbers is restricted to the value range of one byte.

### 1.1 - Playing with the Uint8Array constructor for the first time

To create a Uint8Array call the constructor with the new keyword, and pass an argument that will be the number of elements for the array, just like with the usual plain javaScript array Constructor. Once there is an instance of this kind of typed array, I can then set byte values for it by using the bracket syntax just like that of a regular array. When setting a value to it that is a number values will be converted to a number range between 0 and 255.

```js
var arr = new Uint8Array(3);

arr[0] = 128;
arr[1] = -1;
arr[2] = 199.75;
 
console.log(arr[0], arr[1], arr[2]); // 128 255 199
```

### 1.2 - Clamped and not Clamped

There is a [Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) constructor on top of the plain Uint8Array constructor. The only difference between the Uint8ClampedArray and the plain Uint8Array constructor is that values are clamped rather then warped when they go out of range.

For example is I set an element value to 258 with a regular Uint8Array the resulting value will end up being 2. The reason why is that the values for a Uint8Array are wrapped rather than clamped, and the numbers are zero relative. So then the numbers go 255, 0, 1, 2 when we are wrapping rather than clamping. With a Clamped array the resulting value will just be clamped at 255 the highest value for a Uint8Array.

```js
var clamped = new Uint8ClampedArray(3),
notClamped = new Uint8Array(3);
 
clamped[0] = 258;
notClamped[0] = 258;
 
console.log(clamped[0]); // 255
console.log(notClamped[0]); // 2
```

So in some situations it would be better to go with clamped rather than wrapped arrays, but there is also juts making sure that things do not go out of range to begin with.

### 1.3 - The Uint8.from static method

Most clients will support the typed array from method that works in a similar way tot hat of the [Array from](/2020/01/27/js-array-from/) method. That is it is a static method of the Uint8Array constructor or any type array constructor that can be used to create a new typed array from a regular array like object.

```js
let arr = ['foo','255','128', 64, null, false, NaN],
uint8 = Uint8Array.from(arr);
 
console.log(uint8); // [0,255,128,64,0,0,0]
```

## 2 - The Uint8Array map method

Just like with regular arrays there are a number of array prototype methods to work with off of an instance of a Uint8Array. There might not be a direct equivalent for each method mind you, but many of them are there. Once such method is the map method that works more or less the same way, only it will return a new Uint8Array rather than just a plain old array. Aside from that it can be used more or less the same way.

```js
let byts = Uint8Array.of(128, 32, 220, 8);
 
let invert = byts.map((byt) => {
        return byt + 128;
    });
 
console.log(invert);
```

## 3 - Conclusion

So Uint8Arrays are a way of having an array of number values that range between 0 and 255 making it an appropriate options when it comes to anything that has to do with raw binary data. So any project that will need to work with data in a raw binary from a type array might be a good choice as it will enforce rules for the elements that are appropriate for this kind of application. There might be some cross browser concerns when it comes to front end development though on cretin platforms, but if you are suing a late version of node then there should be little to no problem just working with theme there of course.

I have made an effort to try to keep my javaScript content fresh, and as such I am aiming to keep this post and all other javaScript posts fresh within a year. So it will only be a matter of time until I get around to editing this post again when I get around to it. In the mean time I have [found a post on typed arrays](https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/) that does a decent job of outlining one decent use case examples with typed arrays. There are a number of things that one might run into where a knowledge of how to go about working with this kind of array is required, such as WebGl, and the canvas imagData class, just to name a few things that come to mind.