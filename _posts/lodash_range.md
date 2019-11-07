---
title: Creating an array of numbers with _.range with lodash
date: 2018-10-02 20:47:00
tags: [js,lodash]
layout: post
categories: lodash
id: 295
updated: 2019-11-07 13:05:07
version: 1.10
---

Sometimes when working on a javaScript project there is a need to create a range of numbers in an array, with [lodash](https://lodash.com/) there is the [\_.range](https://lodash.com/docs/4.17.10#range) method than can be used to quickly make a range of numbers. The method is fairly easy to use so this should be a thin post today, but to help beef things up with the post a little I will cover some vanilla js solutions for this sort of task as well as I often do for my posts on lodash.

<!-- more -->

## 1 - what to know

This is a post on the \_.range method in lodash that can be used to quickly create an array that contains a range of numbers. This is also something that is not that hard to do with plain old vanilla js as well, so I will also be looking at some plain old javaScript solutions for this as well. This is not a getting started post with lodash, or javaScript in general, so I hope you have at least some background with this.

## 2 - Some examples of \_.range

There is not much to write about when it come to using \_.range, just call the method, and pass a count of the number of numbers that you need in the array if you just want a range of numbers from zero upwards like so.

```js
let nums = _.range(10);
 
console.log(nums); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Also a range between a start and end value can be done by passing the starting number first, and then the ending number.

```js
let nums = _.range(5,10);
 
console.log(nums); // [5,6,7,8,9]
```

Also when giving three arguments it is possible to set a step rate.

```js
nums = _.range(100,200,20);
 
console.log(nums); //  [ 100, 120, 140, 160, 180 ]
```

## 3 - Using \_.map to create an array of sequential numbers

So a solution for this could be done with \_.map or the native Array.map as well by creating an array that has a length that is the desired range, and then using the index argument that is given to the callback to set the numbers.

```js
let nums = _.map(new Array(10), function(el,i){return i});
 
console.log(nums); // [0,1,2,3,4,5,6,7,8,9]
```

However if you aim to use the native Array.map it will not call the function for elements that do not have values, so a solution like this will not work with the native Array.map unless the array is filled before hand some how.

## 4 - Vanilla js range method

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

## 5 - Conclusion

That is it for today, just wanted to do a quick post on a simple topic like this. lodash does have a lot of little methods like this that are not that complex, but do help save me the time of making a solution from scratch, or hunting something down at stack overflow.
