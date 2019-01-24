---
title: javaScript arguments object in action
date: 2019-01-21 19:27:00
tags: [js]
layout: post
categories: js
id: 362
updated: 2019-01-23 21:24:23
version: 1.3
---

When writing a function in javaScript, inside the body of that function there is an special identifier that can be used to access any and all arguments that have been passed to the function when it is called. This identifier is known as the javaScript arguments object which is an array like object that can be used to find out things like the number of arguments that was given to the function when it was called, alone with the values of course.


<!-- more -->

## 1 - javaScript arguments object basic example

For a basic example of the javaScript arguments object here is a simple function that uses this as a way to return a different result depending on the number of arguments that is given when the function is called.

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

Without using the arguments object to find the number of arguments that is given the function would return NaN when used with just a single argument. So the arguments object is there to help write functions that will work differently depending on the number of arguments that is given.

## 2 - Why it is the arguments object rather than arguments array

The arguments object is called the arguments object because it is not an instance of an Array. So it is actually just a plain old object, however it can be considered an array like object. This is because although it is not an instance of an Array it is structured link an array, so some Array methods can be used with it via something like Function.call.