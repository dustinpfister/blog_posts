---
title: nth root of a number in javaScript
date: 2020-03-11 15:06:00
tags: [js]
layout: post
categories: js
id: 625
updated: 2020-03-16 20:35:59
version: 1.7
---

Often I end up using [Math.sqrt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt) in projects whenever I need to get the square root of a number. However what if I want the [nth root](https://en.wikipedia.org/wiki/Nth_root) of a number? Such as the cubes root of a number, or any other degree beyond of that of just the number 2.

<!-- more -->

## 1 - nth root and math pow

One solution is to use the [Math.pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) method to get the nth root of a given root number and degree.

This works by just passing the root number as the base for Math.pow, and then diving 1 by the degree number to get the exponent argument for Math.pow

```js
var root = 25,
degree = 3;
 
var x = Math.pow(root, 1 / degree); // 5
 
console.log(Math.sqrt(num)); // 5
```