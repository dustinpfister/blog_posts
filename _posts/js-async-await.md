---
title: JavaScript async await
date: 2019-06-25 13:23:00
tags: [js]
layout: post
categories: js
id: 490
updated: 2019-06-25 13:28:41
version: 1.0
---

A [js async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function can be used as a way to define a special kind of asynchronous function.

<!-- more -->


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