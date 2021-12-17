---
title: The lodash clamp number method and adding a wrap number method
date: 2021-12-17 12:56:00
tags: [lodash]
layout: post
categories: lodash
id: 945
updated: 2021-12-17 13:02:04
version: 1.1
---

In lodash there is a clamp umber method, but it would seem that there is not a wrap number method.

<!-- more -->


## 1 - Basics

### 1.1 - The lodash get method

```js
// using the get get method
var arr = [1, 2, 3];
console.log( _.get(arr, -1, 0) ); // 0
console.log( _.get(arr, 2, 0) );  // 3
console.log( _.get(arr, 3, 0) );  // 0
```

### 1.2 - The odash clmap method

```js
// custom get method using lodash get and clamp
var get = function(arr, i, def){
    return _.get(arr, _.clamp(i, 0, arr.length - 1), def);
};
// using the get method
var arr = [1, 2, 3];
console.log( get(arr, -1, 0) ); // 1
console.log( get(arr, 2, 0) );  // 3
console.log( get(arr, 3, 0) );  // 3
// using just clamp directly
console.log( _.clamp(-1, 0, 5) ); // 0
console.log( _.clamp(7, 0, 5) );  // 5
```

### 1.3 - adding a wrapNumber method

```js
// using lodash mixin to add a lodash wrap number
_.mixin({'wrapNumber': function(n, min, max){
    var r = max - min;
    return (min + ((((n - min) % r) + r) % r));
}});
// get method using custom wrap method
var get = function( arr, i, def ){
    return _.get( arr, _.wrapNumber( i, 0, arr.length ), def );
};
// using the get method
var arr = [1, 2, 3];
console.log( get(arr, -1, 0) ); // 3
console.log( get(arr, 2, 0) );  // 3
console.log( get(arr, 3, 0) );  // 1
// can use the wrap number method directly
console.log( _.wrapNumber(-1, 0, 10) ); // 9
console.log( _.wrapNumber(10, 0, 10) ); // 0
console.log( _.wrapNumber(-6, -5, 5) ); // 4
console.log( _.wrapNumber(5, -5, 5) ); // -5
```


