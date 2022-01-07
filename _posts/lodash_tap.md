---
title: Tap off of a chain in lodash with the lodash tap method
date: 2022-01-07 12:15:00
tags: [lodash]
layout: post
categories: lodash
id: 949
updated: 2022-01-07 12:27:52
version: 1.1
---

When working with a chain of lodash methods there might end up being one or more instances in which I will want to just tap off of the chain at some point, mutate a collection, and then continue on with the chain of methods.

<!-- more -->

## 1 - The lodash tap method

### 1.1 - Basic example of lodash tap

```js
let a = [1,2,3,4,5]
// using tap with lodash chain, and map
let b = _.chain(a)
.map((n)=>{
    return Math.pow(n, 2);
})
.tap((a)=>{
    a[3] = 0;
})
.value();
console.log(b);
//[ 1, 4, 9, 0, 25 ]
```

## 2 - Vanilla javaScript and tapping

### 2.1 - Basic

```js
let a = [1, 2, 3, 4, 5]
 
// IIFE
let b = a.map((n) => {
        return Math.pow(n, 2);
    });
b[3] = 0;
 
console.log(b);
//[ 1, 4, 9, 0, 25 ]
```

### 2.2 - IIFE

```js
let a = [1, 2, 3, 4, 5]
 
// IIFE
let b = (function () {
    return {
        tap: function (cb) {
            a.map((n) => {
                return Math.pow(n, 2);
            });
            cb(a);
            return a;
        }
    }
}()).tap(function (a) {
    a[3] = 0;
});

console.log(b);
//[ 1, 4, 9, 0, 25 ]
```
