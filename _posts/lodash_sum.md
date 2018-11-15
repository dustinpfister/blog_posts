---
title: Making a sum with lodash _.sum, _.reduce, and vanilla javaScript alternatives
date: 2018-11-15 14:48:00
tags: [js,lodash]
layout: post
categories: lodash
id: 332
updated: 2018-11-15 17:25:20
version: 1.3
---

Creating a sum from an array, more often then not, is a fairly trivial matter with javaScript.However in some cases it might be nice to have methods that make quick work of trivial tasks allowing me to move forward with s project faster. Also in some cases making a sum is not so trivial, thankfully in [lodash](https://lodash.com/) there are some methods that can be used to help make the process of producing a sum speed along a little faster. In this post I will be writing about \_.sum, \_.sumBy, \_.reduce, and vanilla js alternatives when creating a sum.

<!-- more -->

## 1 - what to know before hand

This is a post on using lodash to help with tasks involving [summation](https://en.wikipedia.org/wiki/Summation), as well as plain javaScript examples of doing so as well. This is not a getting started post on lodash, or javaScript in general so I assume that you have at least some background with these topics.

### 1.1 - version numbers matter

In this post I was using lodash 4.17.10

## 2 - Using lodash to add up a sum

## 2.1 - \_.sum

```js
// array element length
let a = [1, 2, 3, 4];
 
let sum = _.sum(a);
 
console.log(sum); // 10
```

## 3 - Vanilla javaScript examples
