---
title: lodash difference method examples
date: 2019-03-27 19:55:00
tags: [js,lodash]
layout: post
categories: lodash
id: 407
updated: 2019-03-29 10:52:46
version: 1.3
---

In this post I will be writing about some lodash difference method examples. In lodash the difference method can be used to create an array of values that are not present in the other given arrays when using ht method.

<!-- more -->

## 1 - lodash difference

The lodash distance method can be used to find the difference between two arrays. just give an array as the first argument, and another as the second and what will be returned is a new array of values that are not in second array.

```js
let _ = require('lodash');
 
let data = ['foo', 'bar', 'baz']
 
let noGood = _.difference(['foo', 'man', 'chew'], data);
 
console.log(noGood); // ['man', 'chew']
```