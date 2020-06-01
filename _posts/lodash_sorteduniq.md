---
title: The lodash SortedUniq and vanilla js alternative
date: 2020-06-01 16:12:00
tags: [lodash]
layout: post
categories: lodash
id: 661
updated: 2020-06-01 16:19:11
version: 1.1
---

The [lodash sorted uniq](https://lodash.com/docs/4.17.15#sortedUniq) method can be used to remove all redundant copies of an element from an array.

<!-- more -->

```js
let _ = require('lodash');
let a = [1,1,2,2,3,3,4,4,4,4]
let b = _.sortedUniq(a);
console.log(b); // [1,2,3,4];
```

## 2 - A vanilla javaScript alteraive

I have [found this vanilla javaScript alternative to sorted uniq](https://youmightnotneed.com/lodash/#sortedUniq)

```js
let sortedUniq = arr => {
    return [...new Set(arr)].sort()
};
let a = [1, 1, 2, 2, 3, 3, 4, 4, 4, 4],
b = sortedUniq(a);
 
console.log(b); // [1,2,3,4];
```