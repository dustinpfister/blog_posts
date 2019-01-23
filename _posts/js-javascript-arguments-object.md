---
title: javaScript arguments object in action
date: 2019-01-21 19:27:00
tags: [js]
layout: post
categories: js
id: 362
updated: 2019-01-22 20:40:21
version: 1.1
---

When writing a function in javaScript, inside the body of that function there is an special identifier that can be used to access any and all arguments that have been passed to the function when it is called. This identifier is known as the javaScript arguments object which is an array like object that can be used to find out things like the number of arguments that was given to the function when it was called, alone with the values of course.


<!-- more -->

## 1 - javaScript arguments object basic example

```js
var func1 = function (a, b) {
 
    if (arguments.length == 2) {
        return a + b;
    }
 
    return a;
 
};
 
console.log(func1(40,2)); // 42
 
console.log(func1(42)); // 42
```