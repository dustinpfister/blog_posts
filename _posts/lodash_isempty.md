---
title: The lodash is empty object method for finding out if an object is empty or not
date: 2019-09-01 17:23:00
tags: [lodash]
layout: post
categories: lodash
id: 529
updated: 2020-11-23 12:19:28
version: 1.7
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

The lodash is empty method is for finding out if a collection does not have any items and that is it. It is not for finding out if a value fits other meanings of what the word empty might mean to some. For example when passing boolean values to the is empty method a boolean value will always return true even if the value is false.

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

## 3 - Vanilla javaScript isEmpty method

It is not so hard to make a vanilla javaScript isEmpty method when one is familiar with the basics of what to look for when it comes to finding out if an object is empty or not. Maybe the idea is a little subjective when it comes to hidden properties of objects and if they count or not, as well as maybe something that is going on in the prototype chain. However I would say that an object is empty when there are no public keys in the Object. So one way to find out if an object is empty or not is to use a method like Object.kets to get an array of public key names, and if the length of that array is greater than or equal to one, then the object is not empty.

```js
let isEmpty = (obj) => {
    if (typeof obj === 'object' && obj != null) {
        return Object.keys(obj).length >= 1 ? false : true;
    }
    return true;
};
 
// Is empty can be used with Object Collections
console.log(isEmpty({})); // true
console.log(isEmpty({x: 42})); // false
 
// and Array Object Collections
console.log(isEmpty([])); // true
console.log(isEmpty([12, 42, 87])); // false
 
// Booleans
console.log( isEmpty(true) ); // true
console.log( isEmpty(false) ); // true
console.log( isEmpty(123) ); // true
console.log( isEmpty(0) ); // true
console.log( isEmpty(-123) ); // true
console.log( isEmpty(NaN) ); // true
console.log( isEmpty(Infinity) ); // true
console.log( isEmpty('') ); // true
console.log( isEmpty('foo') ); // false
console.log( isEmpty(null) ); // true
console.log( isEmpty(undefined) ); // true
```