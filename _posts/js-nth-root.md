---
title: nth root of a number in javaScript
date: 2020-03-11 15:06:00
tags: [js]
layout: post
categories: js
id: 625
updated: 2020-03-12 09:22:30
version: 1.5
---

Often I end up using [Math.sqrt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt) in projects are a way to get the square root of a number, but what if I want the [nth root](https://en.wikipedia.org/wiki/Nth_root) of a number? 

<!-- more -->

## 1 - nth root and math pow

One solution is to use the [Math.pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) method, and divide 1 by the degree number when working out the exponent for the number that is used as the base for Math.pow.

```js
var num = 25,
degree = 3;
 
var x = Math.pow(num, 1 / degree); // 5
 
console.log(Math.sqrt(num)); // 5
```