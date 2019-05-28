---
title: Array Slice in javaScript and related topics
date: 2018-12-08 11:17:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 346
updated: 2019-05-28 18:57:54
version: 1.8
---

In [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) the Array.slice prototype method comes up a whole lot in many code examples. It works in a very similar fashion to that of Array.splice but with one very important difference, it returns a new Array rather than manipulating the existing one that it is used with. This nature of the array slice then makes it consistent with the concept of pure functions, and functional programing in some cases when working with an array of primitives. So for todays post on javaScript I will be covering some simple examples of Array.slice, as well as some related topics.

<!-- more -->


## 1 - Array Slice basic example

For starters lets look at a very basic example of Array.Slice. So when working with an instance javaScript Array the Array.slice prototype method can be used by calling the method off the Array instance, and passing a starting and ending index.

```js
let a1 = [1,2,3,4],
a2 = a1.slice(1,3);
 
// a2 is a new array
// with the starting and ending index values
// from the a1 array
console.log(a2); // [2,3]
 
// and a1 remains unchanged
console.log(a1) // [1,2,3,4]
```

The index values are zero relative, and the elements that will end up in the new array will be from the starting index, and up to but not including the ending index.

## 2 - Getting the last element of an array with array slice

Negative index values can be given to Array.slice this results in the corresponding index value from the end of the length of an array. So then array slice can be used as a quick way of getting the lat element of an array.

```js
let a1 = [1,2,3,4],
last = a1.slice(-1)[0];
 
console.log(last); // 4
```

## 3 - Array slice can be used to clone an array of primitives

So because Array.slice returns a new Array rather than mutating one it can, in some cases, be used as a way to clone an array assuming it is an array of primitive values.

```js
let a1 = [1,2,3,4],
a2 = a1.slice();
 
a1[1] += 5;
 
console.log(a1); // [1,7,3,4]
console.log(a2); // [1,2,3,4]
```

This works because I am working with an array of primitives, objects however are copied by reference.

```js
var points = [
    {
        x: 5,
        y: 42
    }, {
        x: 27,
        y: -15
    }
];
 
var p = points.slice();
 
points[0].x = 0;
 
console.log(points[0].x); // 0
console.log(p[0].x); // 0
```