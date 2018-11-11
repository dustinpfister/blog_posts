---
title: Chaining functions in javaScript with lodash or not
date: 2018-11-11 08:41:00
tags: [js,lodash]
layout: post
categories: lodash
id: 3328
updated: 2018-11-11 11:12:10
version: 1.8
---

So when working out a javaScript project it may often be a good idea to chain functions together so that what is returned by one method becomes what another method acts on. In [lodash](https://lodash.com/) there is the \_.chain method that can be used to create what are called  explicit method chain sequences, as well as the \_() function that when called can be used to create implicit method chain sequences that work in a similar fashion to what you may all ready be familiar with whe it comes to chaining vanilla js native methods. Although this is a lodash post I will be covering chaining with, and without lodash in this post.

<!-- more -->

## 1 - What to know

Chaining methods is useful for taking a whole bunch of different steps and combine them into a single line of code. There is both explicit, and implicit chaining of functions in lodash. In addition there is also the nature of how native javaScript methods chain as well which is similar to implicit chaining as well, but does not behave the same way as implicit chaining in lodash. In any case I will be covering how chaining works in general as I often do that with my posts on lodash.

## 2 - Explicit Chaining with \_.chain

When passing a value to \_.chain the returned result is a wrapped value ready for explicit chaining. Functions that return arrays, collections, functions, and values of any kind can then be chained together. However once done in order to unwrap the chain the \_.value method must be called.

```js
let arr = _.chain([1, 2, 3, 4])
    .map((n) => {
        return Math.pow(2, n);
    })
    .filter((n) => {
        return n % 8 === 0;
    })
    .sum();
 
// we have an wrapped object
// and not a final value
console.log(arr); // { Object }
 
// I must call value() to get what I want
console.log(arr.value()); // 24
```

This type of chaining is not consistent with the kind of chaining that you might be familiar with when deal with plain vanilla javaScript.

## 3 - Implicit Chaining with the main lodash method \_()

Many of the methods in lodash are properties of the \_ variable that is added to the global name space when using lodash. However the \_ variable is a function rather than just a plain old object, and as such it can be called and passed a value. When using the main lodash method in place of \_.chain that is what is called Implicit chaining. It is more is less the same as the explicit chaining only using a method like \_.sum will result in unwrapping the wrapped value, so the \_.value method does not need to be used in such a case.

```js
let arr = _([1, 2, 3, 4])
    .map((n) => {
        return Math.pow(2, n);
    })
    .filter((n) => {
        return n % 8 === 0;
    })
    .sum();

console.log(arr); // 24
```