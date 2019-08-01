---
title: lodash every collection method and vanilla js alternative
date: 2019-08-01 10:18:00
tags: [lodash]
layout: post
categories: lodash
id: 513
updated: 2019-08-01 10:45:17
version: 1.1
---

The lodash every collection method can be used to test if each key value in a collection meets a condition that is defined in the body of a function that is passed as one of the arguments. So it can for example be used to test if all elements in an array are a number. In this post I will be quickly going over the lodash every method as well as the native Array.every method and other native javaScript ways of testing if all values in an object meet a given condition.


<!-- more -->

## 1 - lodash every Basic example

So I often start of a post by quickly getting into a basic example of what it is that I am writing about in the post. So for this post on the lodash every method here is a simple example where I just have two arrays. One of which is all numbers, and the other of which contains one string.

I then have a function that can be used with the lodash \_.every method that will return true of a given element in an array or kety value in an object is a number. When I call the lodash every method I pass an array as the first argument and give the method that checks for a number as the second argument.


```js
let _ = require('lodash');
// two arrays one has nothing but numbers
// the other has a single element that is
// a string.
let arr1 = [1, 2, 3, 4],
arr2 = [1, 2, 'c', 4],
// a method that can be used to test
// if all elements are a number
tester = (el) => {
    return typeof el === 'number';
};
// using the tester method with _.every
console.log(_.every(arr1, tester)); // true
console.log(_.every(arr2, tester)); // false
```