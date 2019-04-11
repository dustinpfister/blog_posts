---
title: Function Declarations in javaScript
date: 2019-04-11 14:14:00
tags: [js]
layout: post
categories: js
id: 414
updated: 2019-04-11 17:26:29
version: 1.1
---

In javaScript there is more than one way to define a function, depending on the nature of the function all the different ways of defining a function will work okay, or not. So it is important to understand the differences between them so you know which to use in a given situation. In this post I will be writing about function declarations, but for comparison I will also be touching base on function expressions and arrow functions as well.

<!-- more -->

## 1 - Function Declaration basics in javaScript

To create a function declaration start out by typing the function keyword followed by a name for the function, then parentheses and one or more  optional parameters followed by opening and closing brackets. This way of defining a function differs slightly from a function expression, and arrow functions, as well as other ways of defining a function such as using the Function constructor. 

```js
function foo() {
    return 'bar';
};
 
console.log( foo() );
```
