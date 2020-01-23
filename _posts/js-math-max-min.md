---
title: Math max and min methods in javaScript
date: 2020-01-22 20:57:00
tags: [js]
layout: post
categories: js
id: 595
updated: 2020-01-23 18:23:40
version: 1.1
---

In Core javaScript there is the Math max and Math min methods that can be used to find the highest and lowest numbers in a set of numbers.

<!-- more -->


## 1 - Math min basic example

```js
var x = 3,
y = -7,
z = 0;
 
var min = Math.min(x, y, z);
 
console.log(min); // -7
```

## 2- Using the apply function prototype method

```js

var nums = [7, -4, 0, 8, 12, -2];
 
console.log( Math.min.apply(null, nums) ); // -4
console.log( Math.max.apply(null, nums) ); // 12
```