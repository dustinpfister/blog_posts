---
title: The lodash _.untion method and Sets
date: 2020-09-02 14:38:00
tags: [lodash]
layout: post
categories: lodash
id: 699
updated: 2020-09-02 15:09:57
version: 1.1
---

Time for another one of my usual [lodash](https://lodash.com/) posts this time I will touch base on the [lodash union](https://lodash.com/docs/4.17.15#union) method. Just like many lodash methods there are ways of doing the same thing that the lodash union method does with vanilla javaScriot, so I will be taking a look at [sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) also.

<!-- more -->

## 1 - basic lodash union example

```js
let _ = require('lodash');
 
let arr = _.union([1, 2, 3], [6], [3, 2, 4, 1], [5, 4]);
 
console.log( _.sortBy(arr) );
// [1,,3,4,5,6]
```


## 2 - Vanilla javaScript set example

```js
let s = new Set(),
arr = [];
[[1, 2, 3], [6], [3, 2, 4, 1], [5, 4]].forEach(function (arr) {
    arr.forEach(function (n) {
        s.add(n);
    });
});
 
console.log(s);
// Set { 1, 2, 3, 6, 4, 5 }
```
