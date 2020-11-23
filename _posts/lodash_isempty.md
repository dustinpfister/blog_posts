---
title: The lodash is empty object method for finding out if an object is empty or not
date: 2019-09-01 17:23:00
tags: [lodash]
layout: post
categories: lodash
id: 529
updated: 2020-11-23 12:03:05
version: 1.6
---

In lodash there is the [\_.isEmpty](https://lodash.com/docs/4.17.15#isEmpty) method than can be used to find if a collection object is empty or not. This is not to be confused with other possible values that might be considered empty such as null, a false boolean value and so forth. There are also a number of ways to go about doing the same when it comes to working with just plain old native javaScript in addition to using the lodash is empty method. 

So this makes the lodash is empty method yet another one of those kinds of methods that make me scratch my head wondering if lodash is something that a developer should be bothering with at all even. I have to admit whenever I do use lodash in a project it is to use just one or two methods that are in there, it often makes more sense to install methods one at a time rather than bothering with the whole utility library, but never the less lets take a look at this one and maybe some vanilla javaScript alternatives to it also while we are at it.

In any case in this post I will be taking a quick look at the lodash is empty method, and also some vanilla javaScript code that also does what the lodash is empty method is for.

<!-- more -->

## 1 - Lodash is empty basic example

So the lodash \_.isEmpty method can be used to check if an object collection is empty or not. If the collection is just an object with one or more public key value pairs then it is not empty, the same is true with arrays when they have one ore more indexed values.

```js
// Is empty can be used with Object Collections
console.log( _.isEmpty({}) ); // true
console.log( _.isEmpty({x:42}) ); // false
 
// and Array Object Collections
console.log( _.isEmpty([]) ); // true
console.log( _.isEmpty([12,42,87]) ); // false
```

This is the intended use of the is empty method in lodash

## 2 - Lodash is empty and types

The lodash is empty method is for finding out if a collection does not have any items and that is it. It is not for finding out if a value fits other meanings of the word empty. For example when passing boolean values to the is empty method a boolean value will always return true even if the value is false.

```js
// Booleans
console.log( _.isEmpty(true) ); // true
console.log( _.isEmpty(false) ); // true
 
// Numbers
console.log( _.isEmpty(123) ); // true
console.log( _.isEmpty(0) ); // true
console.log( _.isEmpty(-123) ); // true
console.log( _.isEmpty(NaN) ); // true
console.log( _.isEmpty(Infinity) ); // true
 
// Strings
console.log( _.isEmpty('') ); // true
console.log( _.isEmpty('foo') ); // false
 
// Other
console.log( _.isEmpty(null) ); // true
console.log( _.isEmpty(undefined) ); // true
```