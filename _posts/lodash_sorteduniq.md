---
title: The lodash SortedUniq and vanilla js alternative
date: 2020-06-01 16:12:00
tags: [lodash]
layout: post
categories: lodash
id: 661
updated: 2020-06-02 09:53:22
version: 1.2
---

The [lodash sorted uniq](https://lodash.com/docs/4.17.15#sortedUniq) method can be used to remove all redundant copies of an element from an array. This is one of many methods in lodash that seem a little redundant, or present some kind of functionality that can easily be done with just native javaScript by itself. In any case this will be a quick post and removing copy elements from an array using the lodash sortedUniq method and vanilla javaScript alternatives to this method.

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