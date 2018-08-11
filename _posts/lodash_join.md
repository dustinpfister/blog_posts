---
title: The lodash _.join method, and Array.join
date: 2018-08-11 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 256
updated: 2018-08-11 15:28:44
version: 1.2
---

So with [lodash](https://lodash.com/) as well as with plain old vanilla js there are the methods \_.join in lodash, and Array.join when it comes to native javaScript. In any case this is a method that come sup a lot when working out all kinds of solutions for problems when working in a javaScript programing environment. These methods are used to join all the elements of an array together with a given separator furnishing a string from those array elements. It can be thought of as the opposite of \_.split, or String.split that can be used to split a string down into an array of elements with a given separator. In any case this post will outline some examples of joining the elements of a javaScript array togeather into a string.

<!-- more -->

## 1 - what to know

This is a post on the lodash method \_.join, as well as the corresponding Array.join methods that are used in javaScript to join an array of elements together into an array. It is not a getting started post on lodash, or javaScript in general, and I assume that you have at least a little background with javaScript before hand.

## 2 - Basic example of joining an Array in javaScript with \_.join, and Array.join.

### 2.1 - joining an array of strings that represent folder names into a path using \_.join

```js
var str = _.join(['home','dustin','github','test_lodash'], '/');
 
console.log(str); //'home/dustin/github/test_lodash'
 
console.log(_.split(str,'/')); // [ 'home', 'dustin', 'github', 'test_lodash' ]
```

### 2.2 - The same example using Array.join

```js
var str = ['home','dustin','github','test_lodash'].join('/');
 
console.log(str); //'home/dustin/github/test_lodash'
 
console.log(str.split('/')); // [ 'home', 'dustin', 'github', 'test_lodash' ]
```