---
title: JavaScript forEach with arrays and objects in general
date: 2019-02-16 10:39:00
tags: [js]
layout: post
categories: js
id: 384
updated: 2019-02-16 10:52:59
version: 1.2
---

In javaScript there is the [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method that is often used as a quick way to go about looping over the contents of an array. However there are other Array methods that do the same thing but might be a better choice depending on what you want to do with an Array like Array.map, and Array.filter. Then there are other objects in javaScript that are structured like arrays, but are not arrays. In addition there are also plain old objects that are named collections of key value pairs rather than indexed by numbers. As such this post will be on Array.forEach, but also the many other options in native javaScript  and libraries like [lodash](/2019/02/15/lodash/).

<!-- more -->

## 1 - javaScript forEach

The Array.forEach method in native javaScript is one of many ways to loop over the contents of a collection in javaScript. However the Array.forEach method is only useful for looping over the contents of an Array, it can also in some cases be used to loop over the contents of an array like object, but it might not always be the best solution when it comes to looping over named collections when it comes to clever ways to get it to work with such collections. In any case there are other ways of doing this that involve the use of a library like javaScript as well as other native solutions.