---
title: JS Function basics and much more
date: 2019-12-26 14:52:00
tags: [js]
layout: post
categories: js
id: 585
updated: 2019-12-27 17:03:57
version: 1.2
---

In [javaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) are a central part of much of the code that a javaScript developer will be studying and writing. The basics of functions in javaScript are something that can be quickly picked up in a flash, however there are many other aspects of functions in javaScript, and in general that might take longer to get solid.

<!-- more -->

## 1 - js function basic example

There are many ways to go about defining a function in javaScript.

```js
var func = function () {
    return 'Hello World';
};
 
console.log( func() );
```