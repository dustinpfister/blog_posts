---
title: Creating an array of numbers with _.range with lodash
date: 2018-10-02 20:47:00
tags: [js,lodash]
layout: post
categories: lodash
id: 295
updated: 2021-10-03 12:04:00
version: 1.20
---

Sometimes when working on a javaScript project there is a need to create a range of numbers in an array, with [lodash](https://lodash.com/) there is the [\_.range](https://lodash.com/docs/4.17.10#range) method than can be used to quickly make a range of numbers. The method is fairly easy to use so this should be be quick when it comes to just using the single lodash method. However there is also the general idea of not using lodash anymore as there are often native javaScript solutions for doing many of these tasks actually. So on top of going over a few quick examples of the lodash rage method I will also be looking into some additional examples that make use of just native javaScript by itself.

<!-- more -->

## 1 - what to know

This is a post on the \_.range method in lodash that can be used to quickly create an array that contains a range of numbers. This is also something that is not that hard to do with plain old vanilla js as well, so I will also be looking at some plain old javaScript solutions for creating number ranges. This is not a getting started post with lodash, or javaScript in general, so I hope you have at least some background with those topics before continuing.

## 2 - Creating an range of numbers using lodash

So this is very much a post on lodash, at least first and foremost anyway. So in this section I will be going over a few basic examples of the lodash range method. In this section I will also be going over other options when it comes to using lodash in general. Later in this post I will then be getting into some alternatives that involve just using native javaScript alone.

### 2.1 - Basic lodash range example

There is not much to write about when it come to using \_.range, just call the method, and pass a count of the number of numbers that you need in the array if you just want a range of numbers from zero upwards then just one argument will work just fine like so.

```js
let nums = _.range(10);
console.log(nums); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### 2.2 - Start and end values

Also a range between a start and end value can be done by passing the starting number first, and then the ending number.

```js
let nums = _.range(5,10);
console.log(nums); // [5,6,7,8,9]
```

### 2.3 - setting a step value

Also when giving three arguments it is possible to set a step rate.

```js
let nums = _.range(100,200,20);
console.log(nums); //  [ 100, 120, 140, 160, 180 ]
```

So that is all there is to when when it comes to the lodash range method. However it is true that this is not one of the most compelling methods in lodash that help support a case for its continued use. There are of course a number of ways to get a similar result using other lodash methods, as well as native javaScript so lets look at some other ways to create a range of numbers with javaScript.

### 2.4 - Using \_.map to create an array of sequential numbers

So a solution for this could be done with [lodash \_.map](/2018/02/02/lodash_map/) or the native [array map method](/2020/06/16/js-array-map/) as well by creating an array that has a length that is the desired range, and then using the index argument that is given to the callback to set the numbers.

```js
let nums = _.map(new Array(10), (el, i) => i);
console.log(nums); // [0,1,2,3
```

However if you aim to use the native Array.map it will not call the function for elements that do not have values, so a solution like this will not work with the native Array.map unless the array is filled before hand some how.

### 2.5 - Custom map example

Using map might prove to be a better option in some cases. That is that for the most part the range method will work fine, but now and then I might need to work something else out when it comes to the stepping, or I might want to give a size argument rather than an end value. So in this section I am using the lodash map method once again to make a custom method for creating a range of numbers.

```js
const myRange = (start, size, step) => {
    let arr = new Array(size);
    step = step === undefined ? 1 : step;
    return _.map(arr, (el, i) => {
        let d = step;
        if (typeof step === 'function') {
            d = step(i, start, size);
        }
        return start + i * d;
    });
};
 
console.log(myRange(0, 10));
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 
console.log(myRange(5, 15, 5));
// [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75 ]
 
console.log(_.range(5, 15, 5));
// [5, 10]
 
// I can still get a similar result to _.range if I just
// adjust the arguments to size, rather than a stop value
console.log(myRange(5, 2, 5));
// [5, 10]
 
// custom stepping
console.log(myRange(0, 5, (i) => Math.pow(2, i)));
// [ 0, 2, 8, 24, 64 ]
```

This might not be the best example, but the basic idea is there. Using the lodash map method, or some native counterpart allows for me to define what the expression is to create the numbers. It might prove to be more complex, but what the situation calls for it some times I just have to do something like this. However doing something like this also makes me question why I should bother with lodash, it would seem that there are times where what i really need to do is create some kind of custom utility library with methods that I am actually gong to use.

## 3 - Vanilla js range method

Yes it is not to hard at all to make a vanilla js replacement for \_.range

```js
var range = function (start, end, step) {
 
    let arr = [],
    len = 0;
 
    step = step === undefined ? 1 : step;
 
    if (arguments.length === 1) {
 
        len = start;
        start = 0;
        end = start;
 
    } else {
 
        start = start === undefined ? 1 : start;
        end = end === undefined ? 1 : end;
        len = end - start;
 
    }
 
    var i = 0;
    while (i < len) {
 
        arr.push(start + i * step);
 
        i += 1;
 
    }
 
    return arr;
 
};
 
console.log( range(10) ); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log( range(10,15) ); // [ 10, 11, 12, 13, 14 ]
console.log( range(8, 16, 2) ); // [ 8, 10, 12, 14, 16, 18, 20, 22 ]
```

Still making a simple method like this takes a little time, and if it is there in lodash all ready, and lodash is part of the projects stack, then there is no need to bother.

## 4 - Conclusion

That is it for today, just wanted to do a quick post on a simple topic like this. lodash does have a lot of little methods like this that are not that complex, but do help save me the time of making a solution from scratch, or hunting something down at stack overflow.
