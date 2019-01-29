---
title: function expressions in javaScript
date: 2019-01-27 18:44:00
tags: [js]
layout: post
categories: js
id: 366
updated: 2019-01-28 19:32:25
version: 1.1
---

[Function expressions](https://developer.mozilla.org/en-US/docs/web/JavaScript/Reference/Operators/function) (also sometimes called function literals) in javaScript is a way to define a function as an expression rather than a statement, or declaration. Function Expressions have some advantages over [function statements (aka declarations)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), but they are also not necessary a full replacement for function statements. In this post I will be going over some of the ins and outs of function expressions in javaScript, and why they can come in handy now and then.

<!-- more -->


## 1 - function expressions in javaScript a basic example

A very basic example of a function expression might look something like this.

```js
let foo = function () {
 
    return 'bar';
 
};
 
console.log( foo() ); // 'bar'

```

This differs from a function statement that would start with the function keyword followed by an identifier for the function.