---
title: Find the _.size of Arrays and Objects with lodash, and vanilla js
date: 2018-11-04 16:22:00
tags: [js,lodash]
layout: post
categories: lodash
id: 321
updated: 2018-11-04 16:40:44
version: 1.1
---

Getting the length of an array is a trivial matter in javaScript, but then there is getting the length of Objects that is a little not so trivial. In [lodash](https://lodash.com/) there is the [\_.size](https://lodash.com/docs/4.17.10#size) that is a collection method that will work with both arrays, and objects to return the element length of an array, or the number of enumerable properties of a plain old object. In this post I will be quickly covering the \_.size method, but will also be going over vanilla js solutions for doing this as well.

<!-- more -->

## 1 - what to know

The \_.size method in lodash is one of the many so called collection methods in lodash. What that means is that they work with both arrays, and plain old objects. This differs from what is typically used when it comes to native javaScript alternatives which are often prototype methods of Array or Object. Sometimes it is possible to get an Array method to work with an Object that is not an instance of Array if it just happens to be "array like" by using Function.call, but they are not intended to be used on any Object.
