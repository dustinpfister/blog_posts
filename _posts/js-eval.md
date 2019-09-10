---
title: js eval function for executing a string representation of javaScript
date: 2019-09-09 20:31:19
tags: [js]
layout: post
categories: js
id: 532
updated: 2019-09-09 20:56:05
version: 1.4
---

In javaScript and many other programing languages there is the [eval function](https://en.wikipedia.org/wiki/Eval) that can be used to execute a string representation of some javaScript code. The eval function is a way to interpret javaScript from within javaScript itself. This will be a quick post on the js [eval function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval).

<!-- more -->

## 1 - js eval basic example

```js
var str = '2+2';
console.log(str);
// '2+2'
console.log(eval(str));
// 4
```

## 2 - js eval can create variables in the scope in which it is used

When the js eval function is used with a string of javaScript that contains the use of the var keyword to create a variable, and it is not used in string mode this can result in a variable being created in the scope in which eval is used.

```js
// when using var in Non-strict mode eval
// can create variables in the scope in which it is used
eval('var n = 42;');
console.log(n);
```