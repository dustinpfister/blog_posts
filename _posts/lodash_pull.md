---
title: The lodash pull method and other ways to remove elements
date: 2020-03-03 12:46:00
tags: [lodash]
layout: post
categories: lodash
id: 620
updated: 2020-03-03 13:18:22
version: 1.9
---

The [lodash pull](https://lodash.com/docs/4.17.15#pull) method can be used to remove one or more values from an array using the same value zero methods as a way to make comparisons. This method is a kind of convenience method in place of using [lodash remove](/2017/09/19/lodash_remove/) with the [lodash eq](/2019/12/04/lodash_eq/) methods. It is not to hard to do the same thing that the lodash pull method does with vanilla javaScript, but not as easily as you might think. In any case I will be going over the lodash pull methods alone with lodash remove lodash eq and vanilla javaScript methods that do the same thing.

<!-- more -->

## 1 - lodash pull basics

In this section I will be going over some basic examples of the lodash pull method as well as other lodash and vanilla javaScript methods of interest.

### 1.1 - Basic lodash pull example

The basic idea of the lodash pull method is that I call it, pass and array as the first argument, and then one or more additional arguments that are values to remove from the array using the same value zero method that can be used by itself via the lodash eq method.

```js
let arr = [-1,5,7,-1,-1, 8, 7];
 
arr = _.pull(arr,-1);
 
console.log( _.join(arr,':') );
// 5:7:8:7
```

### 1.2 - Using lodash remove, and lodash eq to do the same thing and more.

The lodash remove method is another way to go about removing methods from an array with lodash, only that will give a greater deal of flexibility as I can define the logic that will be used. I could use the lodash remove combined with the lodash eq method to do the same thing as lodash pull, or I could use a completely different expression all together in the function that I pass to the lodash remove method.

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

### 1.3 - A vanilla js pull to do lodash pull style pulling complete with an Object.is pony fill

Many might think that all lodash pull does is remove elements from an array with the same value as one or more given values. Yes on the surface that might seem like a very simple thing to do with plain old vanilla javaScriopt by itself. However there is more to it then just pulling values that are equal to a value. In javaScript there is the equality operator, and then there is also the identity operator. In additional to this there is also the isNaN method and the fact that it does not always given an intended result.

Making a vanilla javaScript lodash pull method is not just a question of looping over an array and splicing out elements using the equality operator. The Object.is method should be used to make the comparisons, and when it comes to that there is the question of browser support. If you want to push browser support back a great deal you are going to want to polyfill or pony fill th Object.is method and then use that in your vanilla javaScript pull method.

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

## 2 - lodash pull and lodash without

The lodash pull method is similar to that of the lodash without method only it will mutate the array in place, so the pull method is not a functional programing style method compared to the lodash without method. So if you want to remove elements in a way so that a new array is returned without mutating the give array you will want to use lodash without, or whatever vanilla javaScript alternatives do achieve a similar effect.
