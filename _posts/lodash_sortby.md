---
title: The lodash _.sortBy method
date: 2018-07-06 20:56:00
tags: [js,mongodb]
layout: post
categories: lodash
id: 223
updated: 2019-11-05 15:22:48
version: 1.5
---

So I have come to find that I like the [lodash](https://lodash.com/) [\_.sortBy](https://lodash.com/docs/4.17.10#sortBy) method more so than the native [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method. I do still use it of course when it comes to working with a project where lodash is not part of the stack. It is just that the method works in a way that I find more natural, and I will be elaborating what I mean by that in this post. Also it is worth pointing out that this is a collection method, so \_.sortBy is a more robust method that brings a bit more to the table. In this post I will be writing about sorting using the \_.sortBy method.

<!-- more -->

## 1 - What to know

This is one of my many posts on lodash methods, this one is on the \_.sortBy method that works like the sort array prototype method in native javaScript, but works a little differently. Here I will be writing about that method a bit, as well as the corresponding Array.sort when it comes to just working with javaScript by itself. This is not a getting started post on lodash, or javaScript in general.

## 2 - Basic example of \_.sortBy

For a basic example of \_.sortBy why not start off with just using it to sort an array of numbers. It does not get more basic than that does it.

### 2.1 - Sort an array of numbers

To sort an array of numbers by numerical value, I just have to give the array of numbers to \_.sortBy.

```js
let _ = require('lodash');
 
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
 
console.log(_.sortBy(nums));
 
//[ -5, -1, 3, 5, 6, 7, 27, 42, 52, 158 ]
```

### 2.2 - Sort an array of numbers by an expression

I can give a method as a second argument that can be used to define an expression for sorting.

```js
let lessThanTen = _.sortBy(nums, function (n) {
  return n < 10;
});
 
console.log(lessThanTen);
// [ 42, 52, 27, 158, 5, -5, 7, 6, 3, -1 ]
```