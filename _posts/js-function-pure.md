---
title: javaScript and pure functions
date: 2020-06-18 16:13:00
tags: [js]
layout: post
categories: js
id: 669
updated: 2020-06-18 16:53:08
version: 1.2
---

So in javaScript there are many different [kinds of functions](/2019/12/16/js-function/), and also how functions can be used. There is the nature of [constructor functions](/2019/02/27/js-javascript-constructor/) and how they are used as a way to create functions that are called off of an instance of that constructor. In contrast to that of a constructor function there is what many might call a [pure function](https://en.wikipedia.org/wiki/Pure_function). In pure functions one of the features is that a pure function will always return the same result for the same arguments, this is not always the case when calling the prototype method of a constructor instance.

With the instances of constructor functions there are prototype methods like that of the array splice method for example that will mutate an array in place, and then there are other methods in the array prototype such as slice that will not mutate the source array, but instead return a new array without mutating the source array off of while array slice was called. However even with array slice it can still end up giving different results depending on the state of the array that is is called off of, so although it is pure like it is not the case.

<!-- more -->
