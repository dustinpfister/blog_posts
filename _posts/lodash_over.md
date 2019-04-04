---
title: lodash over
date: 2019-04-02 09:22:00
tags: [js,lodash]
layout: post
categories: lodash
id: 410
updated: 2019-04-03 21:06:00
version: 1.2
---

In this post I will be taking a look at the lodash \_.over method. This method can be used to create a function that calls an iteratee function with all the arguments that are given to it returns the result.

<!-- more -->

## 1 - lodash over

```js
let _ = require('lodash');
 
let a = (x, y) => {
    return x + y;
},
b = (x, y) => {
    return x * y;
}
 
let c = _.over([a, b])
 
console.log( c(10,2) ); // [12,20]
```


## 2 - Pow N example

```js
let powN = function (n) {
    return function () {
        let nums = [],
        len = arguments.length,
        i = 0;
        while (i < len) {
            nums.push(Math.pow(n, arguments[i]))
            i += 1;
        }
        return nums;
    };
};
 
let pow2n4 = _.over([powN(2),powN(3)]);
 
console.log(pow2n4(2, 4));
// [ [ 4, 16 ], [ 9, 81 ] ] 
```