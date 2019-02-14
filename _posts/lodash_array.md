---
title: lodash array
date: 2019-02-14 16:41:00
tags: [lodash]
layout: post
categories: lodash
id: 381
updated: 2019-02-14 18:20:09
version: 1.2
---

The lodash array methods are methods that can be used to preform common tasks with arrays. Many of these methods are baked into core javaScript itself these days, however many are not as well. So in this post I will be going over some of the lodash array methods, explaining which ones are still useful event today.


<!-- more -->

## 1 - lodash array

In lodash there are a number of methods that are consisted array methods, rather than object methods and collection methods. In javaScript an array is actually a kind of object, it is just a certain kind of object that is formated in a way in which it is a collection of numbered index and value key pairs, along with a length property that reflects the count of those key value pairs. In addition an array in javaScript has some built in prototype methods. Many of the lodash array methods are now part of this prototype, but that is not the case with all of them. In addition many of the lodash equivalents of the core javaScript array prototype methods are collection methods that are designed to work with arrays as well as most objects in general as well.

## 2 - The \_.chunk method

The chunk methods is a lodash array method that can be used to break a linear array into an array of arrays of a given length. The need to do this comes up now and then and the chunk method helps to make quick work of this, and allow me to move on with a project rather than writing this usual suspect from scratch.
