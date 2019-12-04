---
title: lodash eq method, Object.is, SameValueZero, equality, and identity
date: 2019-12-04 12:01:00
tags: [lodash]
layout: post
categories: lodash
id: 576
updated: 2019-12-04 12:08:30
version: 1.0
---

So there is the lodash eq method that is one way of fining out the same value zero result of two values. However what is same value zero, and is it all that hard to get the same result in native javaScript itself these days? Well in ECMA2015 spec javaScript the [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) static method was introduced that does indeed do the same thing. So if this is the only thing that you care about in a project, maybe a simple polyfill will do just fine and you can dich lodash. Otherwise the lodash \_.eq method can do more or less the same thing if you are still keeping lodash as part of your projects stack. 

Regardless of what you attitude is with lodash these days I will make this post also about sameValeZero in general so that this is not just a post on lodash eq alone.
<!-- more -->

## 1 - lodash intersection

```js
let arr1 = [1, 4, 5],
arr2 = [1, 2, 1],
arr3 = [1, 4, 5],
 
result = _.intersection(arr1, arr2, arr3);
 
console.log(result); // [1]
```