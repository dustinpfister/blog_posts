---
title: lodash xor array method aka symmetric difference
date: 2020-04-01 16:49:00
tags: [lodash]
layout: post
categories: lodash
id: 639
updated: 2020-04-01 16:53:45
version: 1.1
---

In [lodash there is the \_.xor](https://lodash.com/docs/4.17.15#xor) method that can create a new array that is the symmetric difference of the given arrays. In other words it will be an array of elements that show up in the arrays that are unique to each array, but not elements that are shared across all the arrays, or in other words elements that are intersections.

<!-- more -->

## 1 - Basic lodash xor example

```js
let _ = require('lodash');
 
let xor = _.xor([0,1],[1,2]);
 
console.log(xor);
// [0,2]
```