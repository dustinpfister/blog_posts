---
title: JS Function basics and much more
date: 2019-12-26 14:52:00
tags: [js]
layout: post
categories: js
id: 585
updated: 2019-12-30 18:40:38
version: 1.8
---

In [javaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) are a central part of much of the code that a javaScript developer will be studying and writing. The basics of functions in javaScript are something that can be quickly picked up in a flash, however there are many other aspects of functions in javaScript, and in general that might take longer to get solid.

<!-- more -->

## 1 - js function basic example that returns something

There are many ways to go about defining a function in javaScript such as [function expressions](/2019/01/27/js-function-expression/), [function declarations](/2019/04/11/js-function-declaration/), and [arrow functions](/2019/02/17/js-arrow-functions/). There is getting into the depth of the differences between these kinds of functions in javaScript, but for now lets start out with a very stupid simple example of a function in javaScript.

```js
var func = function () {
    return 'Hello World';
};
 
console.log( func() );
```

Here I defined a function via a function expression and I assigned that function to a variable called func. I can then call that function and the string hello world is returned. This is the basic idea of what is accomplished with many functions, you call it and some kind of product is returned. This might be a silly pointless example, but we will be progressing on to some real examples later on in this post that also return a product when called.

## 2 - Pure functions

Pure functions are functions that only work with what is given via a set of arguments, and not anything that that is a global variable of object class instance. They also do not mutate and object that is given in place but return a new object.

```js
var pure = function (a, b) {
    return a + b;
};
 
console.log(pure(1, 1));
```