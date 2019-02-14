---
title: lodash array
date: 2019-02-14 16:41:00
tags: [lodash]
layout: post
categories: lodash
id: 381
updated: 2019-02-14 18:40:26
version: 1.7
---

The lodash array methods are methods that can be used to preform common tasks with arrays. Many of these methods are baked into core javaScript itself these days, however many are not as well. So in this post I will be going over some of the lodash array methods, explaining which ones are still useful event today.


<!-- more -->

## 1 - lodash array

In lodash there are a number of methods that are consisted array methods, rather than object methods and collection methods. In javaScript an array is actually a kind of object, it is just a certain kind of object that is formated in a way in which it is a collection of numbered index and value key pairs, along with a length property that reflects the count of those key value pairs. In addition an array in javaScript has some built in prototype methods. Many of the lodash array methods are now part of this prototype, but that is not the case with all of them. In addition many of the lodash equivalents of the core javaScript array prototype methods are collection methods that are designed to work with arrays as well as most objects in general as well.

## 2 - The \_.chunk method

The [\_.chunk method](/2017/09/13/lodash-chunk/) is a lodash array method that can be used to break a linear array into an array of arrays of a given length. The need to do this comes up now and then and the chunk method helps to make quick work of this, and allow me to move on with a project rather than writing this usual suspect from scratch.

```js
var _ = require('lodash'),
 
// basic example
arr = ['one', 'two', 'three', 'four', 'five', 'six'];
 
console.log(_.chunk(arr, 2));
// [ [ 'one', 'two' ], [ 'three', 'four' ], [ 'five', 'six' ] ]
```

## 3 - The \_.flatten method

So when it comes to doing the opposite of \_.chunk and quickly turning an array of arrays back into a simple linear array there is the [\_.flatten](/2018/08/12/lodash_flatten/) method as well.

```js
let grid = [
   [1,2,3],
   [4,5,6],
   [7,8,9]
];
 
let flat = _.flatten(grid);
 
console.log( flat ); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

## 4 - The \_.zip method

The [zip method](/2018/02/01/lodash_zip/) takes two or more arrays and zips theme together.

```js
var x = [10,20,30],
y = [8,16,32],
 
matrix = _.zip(x,y,[5,5,5],[3,3,3]);
 
_.each(matrix, function(pt){
 
    console.log(pt);
    // [10,8,5,3]
    // [20,16,5,3]
    // [30,32,5,3]
 
});
```
