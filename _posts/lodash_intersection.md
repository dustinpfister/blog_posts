---
title: lodash intersection method
date: 2019-12-03 20:10:00
tags: [lodash]
layout: post
categories: lodash
id: 575
updated: 2019-12-03 20:13:34
version: 1.1
---

Time for another post on lodash this one is on the [lodash intersection](https://lodash.com/docs/4.17.15#intersection) method.

<!-- more -->

## 1 - lodash intersection

```js
let arr1 = [1, 4, 5],
arr2 = [1, 2, 1],
arr3 = [1, 4, 5],
 
result = _.intersection(arr1, arr2, arr3);
 
console.log(result); // [1]
```