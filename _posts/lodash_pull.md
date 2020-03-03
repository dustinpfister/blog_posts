---
title: The lodash pull method and other ways to remove elements
date: 2020-03-03 12:46:00
tags: [lodash]
layout: post
categories: lodash
id: 620
updated: 2020-03-03 12:54:29
version: 1.1
---

The lodash pull method can be used to remove one or more values from an array using the same value zero methods as a way to make comparisons. This method is a kind of convenience method in place of using lodash remove with the lodash eq methods. It is not to hard to do the same thing that the lodash pull method does with vanilla javaScript, but not as easily as you might think. In any case I will be going over the lodash pull methods alone with lodash remove lodash eq and vanilla javaScript methods that do the same thing.

<!-- more -->

## 1 - lodash pull basics

### 1.1 - Basic lodash pull example

```js
let arr = [-1,5,7,-1,-1, 8, 7];
 
arr = _.pull(arr,-1);
 
console.log( _.join(arr,':') );
// 5:7:8:7
```

### 1.2 - Using lodash remove, and lodash eq to do the same thing and more.

```js
let arr = [-1, 5, 7, -1, -1, 8, 7];
 
// lodash \_.remove and \_.eq can be used also to do
// the same thing more or less
arr = _.remove(arr, function (el) {
        return !_.eq(el, -1);
    });
 
console.log(_.join(arr, ':'));
// 5:7:8:7
 
// remove can also be used to define any custom
// logic for removing elements
 
var arr1 = _.remove([-1, 1, -5, -7, 2, 3], function (el) {
        return !(el < 0);
    });
console.log(_.join(arr1, ':'));
// '1:2:3'
```

### 1.3 - using vanilla javaScript to do lodash pull style pulling Compleate with an Object.is pony fill

```js
// SameValue algorithm pony fill
var eq = function (x, y) {
    if (x === y) { // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
    } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }
};
 
// vjs pull
var pull = function (arr) {
    var len = arguments.length,
    val,
    i = 1;
    if (arguments.length <= 1) {
        return arr || [];
    }
    while (i < len) {
        val = arguments[i];
        arr = arr.filter(function (el) {
                return !eq(el, val);
            });
        i += 1;
    }
    return arr;
};
 
var arr = [-1, 5, 7, -1, -1, 8, 7];
arr = pull(arr, -1);
 
console.log(arr.join(':'));
// 5:7:8:7
 
// passes the SameValue test
console.log(pull([-0, 0], 0).join(':'));
// 0
console.log(pull([NaN, 5, NaN], NaN).join(':'));
// 5
```