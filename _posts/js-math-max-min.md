---
title: Math max and min methods in javaScript
date: 2020-01-22 20:57:00
tags: [js]
layout: post
categories: js
id: 595
updated: 2020-01-24 09:05:57
version: 1.3
---

In core javaScript there is the Math max and Math min methods that can be used to find the highest and lowest numbers in a set of numbers. The methods work by passing the set of numbers as arguments, but it is also possible to use an array by making use of the apply function prototype method.

<!-- more -->

## 1 - Math min basic example

The Math min and Math max methods work by passing numbers as arguments to the methods and then the smallest or largest number that is passed is returned by the method. So if i give the Math min method the numbers 3, 0, and -7 as arguments then the number -7 is what will be returned.

```js
var min = Math.min(3, 0, -7);
console.log(min); // -7
```

Although this simple example works out okay for what it is, when it comes to any kind of real code example such code examples will often involve an array of values, and likely never a set of static number literals. If you are not familiar with the function apply prototype method yet as well as other such methods such as call and bind, now would be a good time to look into them.

## 2- Using the apply function prototype method

```js

var nums = [7, -4, 0, 8, 12, -2];
 
console.log( Math.min.apply(null, nums) ); // -4
console.log( Math.max.apply(null, nums) ); // 12
```