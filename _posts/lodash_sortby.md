---
title: The lodash _.sortBy method
date: 2018-07-06 20:56:00
tags: [js,mongodb]
layout: post
categories: lodash
id: 223
updated: 2018-07-06 21:42:51
version: 1.1
---

So I have come to find that I like the [lodash](https://lodash.com/) [\_.sortBy](https://lodash.com/docs/4.17.10#sortBy) method more so than the native Array.sort. Also it is worth pointing out that this is a collection method, so \_.sortBy is a more robust method that brings a bit more to the table. In this post I will be writing about sorting using the \_.sortBy method, and I will also be covering some vanilla js alternates as well.

<!-- more -->


## 1 - basic example of \_.sortBy


### 1.1 - sort an array of numbers

```js
let _ = require('lodash');
 
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
 
console.log(_.sortBy(nums));
 
//[ -5, -1, 3, 5, 6, 7, 27, 42, 52, 158 ]
```

### 1.2 - sort an array of numbers by an expression

```js
let lessThanTen = _.sortBy(nums, function (n) {
  return n < 10;
});
 
console.log(lessThanTen);
// [ 42, 52, 27, 158, 5, -5, 7, 6, 3, -1 ]
```