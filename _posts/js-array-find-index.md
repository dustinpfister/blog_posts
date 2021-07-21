---
title: Find the index values of arrays in javaScript
date: 2021-07-21 12:00:00
tags: [js]
layout: post
categories: js
id: 915
updated: 2021-07-21 12:07:29
version: 1.2
---

When it comes to finding the index value of one element in an [array in javaScript](/2018/12/10/js-array/) there is the [array find index method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) that will work okay for this sort of thing. This find index array prototype method works more or less the same way as the array find method only it will return an index value, rather than the value of the element.

Although the find index, and find methods might work okay in many situations there are some sort coming s with the method. For one thing the method will always return the first element from left to right rather than the other way around. Also there are some steps that should typically be taken before finding an element in an array such as sorting, and filtering the array. For the most part the find method might be a good choice when it comes to getting an element in an array that just has a single unique value, rather than situations in which I want a list of elements where the first element in the list would be a best match.

<!-- more -->

