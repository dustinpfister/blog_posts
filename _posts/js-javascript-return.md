---
title: javaScript return statement
date: 2019-03-01 17:56:00
tags: [js]
layout: post
categories: js
id: 393
updated: 2019-03-01 20:38:05
version: 1.0
---

The return statement in javaScript is used in the body of a function to return a product when the function is called. The product that is returned can just be a simple primitive, but things get more interesting when it is an object, or function. In this post I will be exploring some examples that have to do with the return statement in javaScript and touch base on some related topics surrounding return as well.

<!-- more -->

## 1 - return statement

```js
// ES5- function deceleration that returns a product
function foo(a, b) {
    return a + b;
};
 
console.log(foo(5,2)); // 7
```

## 2 - 

```js
// ES5- Style function expression that returns a 
// product
var foo = function (a, b) {
    return a + b;
};
 
// ES2015+ style arrow function with brackets that 
// returns a product
let bar = (a, b) => {
    return a + b;
};
 
// ES2015+ style arrow function with an implicit 
// return of a product
 
let baz = (a, b) => a + b;
 
console.log(foo(5,2)); // 7
console.log(bar(5,2)); // 7
console.log(baz(5,2)); // 7
```
