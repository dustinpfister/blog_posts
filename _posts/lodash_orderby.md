---
title: lodash orderby method as an option for sorting collections
date: 2020-01-05 11:00:00
tags: [lodash]
layout: post
categories: lodash
id: 588
updated: 2020-01-05 11:05:54
version: 1.2
---

The lodash orderby method is one of several options in lodash for sorting collections mainly arrays. It works more or less the same way as the lodash sortby method, but it allows for setting the sort orders \( ascending or descending \) of each metjod that is used to sort the collection.

<!-- more -->

## 1 - lodash orderby basic example

```js
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1],
asc = _.orderBy(nums),
desc = _.orderBy(nums, null, 'desc');
 
console.log(asc, desc);
 
// [ -5, -1, 3, 5, 6, 7, 27, 42, 52, 158 ]
// [ 158, 52, 42, 27, 7, 6, 5, 3, -1, -5 ]
```