---
title: The Array sort method  in javaScript
date: 2019-12-02 21:40:00
tags: [js]
layout: post
categories: js
id: 574
updated: 2019-12-02 21:50:08
version: 1.2
---

In native javaScript there is the [array sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method in the array prototype object. This methods can be used to sort an array in place. 

<!-- more -->


## 1 - Array sort basic example

If you are just working with a simple array of numbers just calling the array sort method of the array instnace will sort the array of numbers.

```js
var arr = [7,4,2,5,8,6,3,1];
arr.sort();
console.log(arr);
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```