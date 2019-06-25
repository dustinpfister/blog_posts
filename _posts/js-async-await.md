---
title: JavaScript async await
date: 2019-06-25 13:23:00
tags: [js]
layout: post
categories: js
id: 490
updated: 2019-06-25 13:37:16
version: 1.3
---

A [js async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function can be used as a way to define a special kind of asynchronous function.

<!-- more -->

## 1 - js async basic example

The async keyword can be used in combination with the function keyword to declare an async function. Inside the body of the async function the await keyword can be used as a way to pause the execution of the rest of the logic in the function until a function that was called with await is completed.

A basic example of an async function in javaScript might then look like this:

```js

let foo = (delay) => {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, delay);
    })
};
 
let func = async function() {
    console.log('start');
    await foo(3000);
    console.log('end');
};
func();
```

The foo function returns a promise that resolves after a delay. When used inside the body of the func async function that execution of code is paused, and thus the string end is not logged to the console until the delay has completed.