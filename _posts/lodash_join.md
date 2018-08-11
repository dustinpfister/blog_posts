---
title: The lodash _.join method, and Array.join
date: 2018-08-11 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 256
updated: 2018-08-11 15:34:37
version: 1.3
---

So with [lodash](https://lodash.com/) as well as with plain old vanilla js there are the methods \_.join in lodash, and Array.join when it comes to native javaScript. In any case this is a method that come sup a lot when working out all kinds of solutions for problems when working in a javaScript programing environment. These methods are used to join all the elements of an array together with a given separator furnishing a string from those array elements. It can be thought of as the opposite of \_.split, or String.split that can be used to split a string down into an array of elements with a given separator. In any case this post will outline some examples of joining the elements of a javaScript array togeather into a string.

<!-- more -->

## 1 - what to know

This is a post on the lodash method \_.join, as well as the corresponding Array.join methods that are used in javaScript to join an array of elements together into an array. It is not a getting started post on lodash, or javaScript in general, and I assume that you have at least a little background with javaScript before hand.

## 2 - Basic example of joining an Array in javaScript with \_.join, and Array.join.

For a basic example of the join methods I put together some examples that involve an array of folder names that need to be combined together into an string that ca be used as a corresponding path with a '\/' separator.

### 2.1 - joining an array of strings that represent folder names into a path using \_.join

To use the lodash method I just need to call \_.join, pass the array, and then give the separator that I want between elements when making the string. This will give me a string that will work okay as a path. If I all ready have a string that is formated in a way in wich there is a '\/' separator between folder names I can use the \_.split method to split that string into an array of elements, reversing the process.

```js
var str = _.join(['home','dustin','github','test_lodash'], '/');
 
console.log(str); //'home/dustin/github/test_lodash'
 
console.log(_.split(str,'/')); // [ 'home', 'dustin', 'github', 'test_lodash' ]
```

### 2.2 - The same example using Array.join

The native Array.join method works in verry much the same mannor only it is a prototype method of Array, so I call it as such, and only give the separator.

```js
var str = ['home','dustin','github','test_lodash'].join('/');
 
console.log(str); //'home/dustin/github/test_lodash'
 
console.log(str.split('/')); // [ 'home', 'dustin', 'github', 'test_lodash' ]
```