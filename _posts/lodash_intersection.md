---
title: lodash intersection method
date: 2019-12-03 20:10:00
tags: [lodash]
layout: post
categories: lodash
id: 575
updated: 2019-12-09 08:13:08
version: 1.4
---

Time for another post on lodash this one is on the [lodash intersection](https://lodash.com/docs/4.17.15#intersection) method. The \_.intersection method will create an array of values that are in all the given arrays using the [lodash \_.eq](/2019/12/04/lodash_eq) method also known as same value zero for comparisons.

This is yet another kind of task that is not so hard to do with just plain old javaScript by itself these days using array prototype methods such as array some, and array filter. However regardless if you use lodash or not this will be a post on creating arrays of intersecting values in javaScript in general.

<!-- more -->

## 1 - lodash intersection basic example

So for a basic example of the lodash intersection method, if I just have to arrays of primitives I can just pass those arrays as arguments to the lodash intersection method. The result that is returned will then be an array of values that are in all of those given arrays.

```js
let arr1 = [1, 4, 5],
arr2 = [1, 2, 1],
arr3 = [1, 4, 5],
 
result = _.intersection(arr1, arr2, arr3);
 
console.log(result); // [1]
```