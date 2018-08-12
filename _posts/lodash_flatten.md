---
title: The lodash _.flatten method for flatting down a multi dimensional array
date: 2018-08-12 12:17:00
tags: [js,lodash]
layout: post
categories: lodash
id: 257
updated: 2018-08-12 13:41:42
version: 1.1
---

So some of the method in [lodash](https://lodash.com/) are can come in handy, and really do help to save time with certain projects, todays post on lodash is one of those methods which is [\_.flatten](https://lodash.com/docs/4.17.10#flatten). The \_.flatten, and also \_.flattenDeep methods are one of many methods that help with the task of working with arrays of arrays, or multi dimensional arrays in javaScript. Flatten can be used to flatten down an array of arrays into a single array, thus making it a method that can be thought of as a reversal of [\_.chunk](/2017/09/13/lodash-chunk/).

<!-- more -->

## 1 - what to know

This is a post on the \_.flatten method in lodash, than ca be used to flatten nested arrays down into a single array. I will not be getting into lodash, arrays, and javaScript in general in depth, and assume that you have at least some background with javaScript and using lodash in a project.

## 2 - Basic example of \_.flatten, and \_.chunk

So for a basic example of \_.flatten and the corresponding \_.chunk method I will start off with an array of arrays where each array is a number between 1 and 9, and is broken into three arrays of three numbers each. The \_.flatten method can be used to flatten such an array of arrays into a single linear array, and then the \_.chunk method can be used to break it back down again into the array of arrays.

### 2.1 - flattening an array of arrays into a linear array with \_.flatten

So If I make an array of arrays with the array literal notation I can flatten it down into a straght linear array with the lodash \_.flatten method, but just passing the array of arrays as the first argument.

```js
let grid = [
   [1,2,3],
   [4,5,6],
   [7,8,9]
];
 
let flat = _.flatten(grid);
 
console.log( flat ); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Simple enough right, now if I want to break it back down again I will want to use \_.chunk.

### 2.2 - chunking a linear array into an array of arrays with \_.chunk

So then if I have a linear array but then want to break it down into an array of arrays there is the \_.chunk method that can do the opposite of /_.flatten. It works by passing the linear array as the first argument, and then the element length of the arrays as the second argument.

```js
let flat = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
 
let grid = _.chunk(flat,3);
 
console.log( grid ); // [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
```
