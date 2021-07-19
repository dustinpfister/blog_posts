---
title: The array find method and alternatives in vanilla javaScript
date: 2021-07-19 11:13:00
tags: [js]
layout: post
categories: js
id: 913
updated: 2021-07-19 11:23:06
version: 1.1
---

A long time ago I wrote a post on the lodash find method that is a way to go about finding a single element in an array. Lodash might still not be a dead library just yet, but I have to say that for the most part I am just making use of native javaScript features to do much of what can be done with lodash. One such method that might come to mind is the [native array find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method of the array prototype I native javaScript. In many respects this is just like the lodash fine method. There may be some talking points as to why the native array find method might not be a drop in replacement for the loadash fine method with respect to all use case scenarios. However there are many other native javaScript features that can be used to even over come those other situations in which the lodash fine method will work where the native array find method will not.

There is also not just the question of using the native array find method or the lodash fine method, there are many other lodash method of course, and there are also many tools to work with in core javaScript also. Most of the time I can not say that I use the find methods if any kind to find something actually oddly enough. There is also many other lodash methods such as the lodash filter method, as well as the native array filter method that can also be used to find not just the first element, but all elements that meet a condition. There is also the question of how to go about sorting the results of what I get from filtering an array. So in this post I will be touching base on the array find method, but I will also be looking into what other methods there are to work with when it comes to finding something.

<!-- more -->

