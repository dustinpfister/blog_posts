---
title: Uint8arrays in javaScript
date: 2020-04-02 13:03:00
tags: [js]
layout: post
categories: js
id: 640
updated: 2020-04-02 13:12:47
version: 1.0
---

In javaScript there are a number of constructors that provide [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), one such constructor is the [uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) constructor. these kinds of constructors create index collections similar to that of a regular javaScript array, only much different. For starters the length of the collections is static, and the values that the collections can hold is restricted.

So these typed arrays are not a replacement for regular javScript arrays, but they are helpful when working out something that is an underlaying binary data buffer of sorts. The reason why is because of the fixed size, and the fact that values are restricted to numbers only, and on top of that additional rules for the n8invgers depending on the kind of typed array.

<!-- more -->
