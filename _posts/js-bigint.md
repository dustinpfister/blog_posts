---
title: BigInt basics in javaScript for numbers beyond max safe int
date: 2019-09-06 15:46:00
tags: [js]
layout: post
categories: js
id: 531
updated: 2019-09-06 17:36:23
version: 1.3
---

So the regular number type in javaScript has some limitations when it comes to working with very large numbers beyond that of the max safe integer. In the past a library would have to be used that involves representing a number with a string if a project requires working with large numbers and preserving number precision. However in modern browsers and node 10.4.x + there is now the BigInt Object that now provides that kind of functionality in native javaScript by itself. As of this writing the [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) object is still not well supported so you might still want to use a library for that reason, but in time such libraries will no longer needed for this because of this native support.

<!-- more -->

## 1 - JavaScript BigInt Numbers might not be the best option for now at least

As of this writing BigInts are still a fairly new addition to native javaScript. If the nature of the project consists of front end code BigInts might not be the best option because of poor browser support. In addition if it is a nodejs project then it might still not be a good idea to use BigInts unless you are confident that the project will always be used in later versions of node that are version 10.4.x or later. Even if you go with BigInt there are still some drawbacks that might not make a library solution outdated just yet, BigInt numbers can not be used with native javaScript Math Object methods such as Math.pow for example.

## 2 - BigInt basics

So If you are confident that the use of native javaScript BigInt numbers will work for your project rather than a library in user space then getting started with them is fairly simple. The BigInt Object can be used as a way to create an instance of BigInt from a number or a string of a number. Also there are a number of operators that can be used with BigInts just like plain old javaScript numbers.

```js
// create BigInts from a Number
var n = BigInt(37),
// from a string of a number
x = BigInt('130000'),
// by appending an n to the end of a number literal
y = 4500n,
// by writing an expression using BigInts
z = n + x * y;

console.log(z.toString());
// '585000037'
```