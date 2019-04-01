---
title: lodash some
date: 2019-03-32 17:11:00
tags: [js,lodash]
layout: post
categories: lodash
id: 408
updated: 2019-04-01 12:39:34
version: 1.4
---

The [lodash \_.some](https://lodash.com/docs/4.17.11#some) collection method can be used to test to see if just one element of an array, or key of an object in general meets a given condition. There is another collection method known as \_.every that works in a similar way to that of the \_.some method but will only return true when all elements of a collection meet a given condition. In this post I will be going over some simple examples of both, as well as some ways of doing so with just plain old vanilla js as well.

<!-- more -->

## 1 - lodash some basic example

The lodash some method is used to quickly find out if at least one element in a collection meets a given condition. To use it just call the \_.some method followed by the collection that is to be tested, followed by a function that will be used to test potentially all elements in the collection for a certain condition.

```js
let _ = require('lodash');
 
// some arrays
let arr1 = ['foo', null, 42, 'bar'],
arr2 = ['foo', 'man', 'chew'],
 
// what to test for
tester = function (el) {
    return typeof el === 'number';
};
 
console.log(_.some(arr1, tester)); // true
console.log(_.some(arr2, tester)); // false
```

## 2 - lodash some vanilla JavaScript alternatives

### 2.1 - Writing a some method

```js
let some = function (col, tester) {
    let i = 0,
    keys = Object.keys(col),
    len = keys.length;
    while (i < len) {
        if (tester(col[keys[i]], keys[i], i)) {
            return true;
        }
        i += 1;
    }
    return false;
};
 
// works with arrays
let arr = [null, 'foo', 'baz', 42, {}, false, true];
console.log(some(arr, function (el) {
        return typeof el === 'number';
    })); // true
console.log(some(arr, function (el) {
        return typeof el > 50
    })); // false
 
// works with objects in general
let obj = {
    x: 42,
    y: 17,
    z: -12
};
 
console.log(some(obj, function (n) {
        return n > 50 || n < -50
    })); // false
console.log(some(obj, function (n) {
        return n <0
    })); // true
```