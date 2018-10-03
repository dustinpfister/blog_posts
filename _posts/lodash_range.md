---
title: Creating an array of numbers with _.range with lodash
date: 2018-10-02 20:47:00
tags: [js,lodash]
layout: post
categories: lodash
id: 295
updated: 2018-10-02 21:11:31
version: 1.6
---

Sometimes when working on a javaScript project there is a need to create a range of numbers in an array, with [lodash](https://lodash.com/) there is the [\_.range](https://lodash.com/docs/4.17.10#range) method than can be used to quickly make a range of numbers. The method is fairly easy to use so this should be a thin post today, but to help beef things up here many I will cover some vanilla js solutions for this as well.

<!-- more -->

## 1 - what to know

This is a post on the \_.range method in lodash that can be used to quickly create an array that contains a range of numbers. This is also something that is not that hard to do with plain old vanilla js as well, so I will also be looking at some plain old javaScript solutions for this as well. This is not a getting started post with lodash, or javaScript in general, so I hope you have at least some background with this.

## 2 - Some examples of \_.range

There is not much to write about when it come to using \_.range, just call the method, and pass a count of the number of numbers that you need in the array if you just want a range of numbers from zero upwards like so.

```js
let nums = _.range(10);
 
console.log(nums); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Also a range between a start and end value can be done by passing the starting number first, and then the ending number.

```js
let nums = _.range(5,10);
 
console.log(nums); // [5,6,7,8,9]
```

Also when giving three arguments it is possible to set a step rate.

```js
nums = _.range(100,200,20);
 
console.log(nums); //  [ 100, 120, 140, 160, 180 ]
```

## 3 - Using \_.map to create an array of sequential numbers

So a solution for this could be done with \_.map as well by creating an array that has a length that is the desired range, and then using the index argument that is given to the callback to set the numbers.

```js
let nums = _.map(new Array(10), function(el,i){return i});
 
console.log(nums); // [0,1,2,3,4,5,6,7,8,9]
```
