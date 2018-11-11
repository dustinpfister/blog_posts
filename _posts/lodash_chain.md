---
title: Chaining functions in javaScript with lodash or not
date: 2018-11-11 08:41:00
tags: [js,lodash]
layout: post
categories: lodash
id: 3328
updated: 2018-11-11 09:08:55
version: 1.2
---

So when working out a javaScript project it may often be a good idea to chain functions together so that what is returned by one method becomes what another method acts on. In [lodash](https://lodash.com/) there is the \_.chain method that can be used to create what are called  explicit method chain sequences, as well as the \_() function that when called can be used to create implicit method chain sequences that work in a similar fashion to what you may all ready be familiar with whe it comes to chaining vanilla js native methods. Although this is a lodash post I will be covering chaining with, and without lodash in this post.

<!-- more -->

## 1 - What to know


## 2 - Explicit Chaining with \_.chain

```js
let arr = _.chain([1, 2, 3, 4])
    .map((n) => {
        return Math.pow(2, n);
    })
    .filter((n) => {
        return n % 8 === 0;
    })
    .reverse()
    .sum();
 
// we have an wrapped object
// and not a final value
console.log(arr); // { Object }
 
// I must call value() to get what I want
console.log(arr.value()); // 24
```

## Implicit Chaining with the main lodash method \_()

```js
let arr = _([1, 2, 3, 4])
    .map((n) => {
        return Math.pow(2, n);
    })
    .filter((n) => {
        return n % 8 === 0;
    })
    .reverse()
    .sum();

console.log(arr); // 24
```