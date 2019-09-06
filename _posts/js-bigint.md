---
title: BigInt basics in javaScript for numbers beyond max safe int
date: 2019-09-06 15:46:00
tags: [js]
layout: post
categories: js
id: 531
updated: 2019-09-06 17:32:05
version: 1.2
---

So the regular number type in javaScript has some limitations when it comes to working with very large numbers beyond that of the max safe integer. In the past a library would have to be used that involves representing a number with a string if a project requires working with large numbers and preserving number precision. However in modern browsers and node 10.4.x + there is now the BigInt Object that now provides that kind of functionality in native javaScript by itself. As of this writing the [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) object is still not well supported so you might still want to use a library for that reason, but in time such libraries will no longer needed for this because of this native support.

<!-- more -->

## 1 - BigInt basics

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