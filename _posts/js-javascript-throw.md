---
title: JavaScript throw statement
date: 2019-03-15 20:07:00
tags: [js]
layout: post
categories: js
id: 402
updated: 2019-03-15 20:37:22
version: 1.1
---

The [javaScript throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) statement can be used to internationally throw a user-defined exception. It can be used as a way to stop execution of a javaScript program in the event that some kind of essential condition is not in order.

<!-- more -->

## 1 - javaScript throw basics

```js
var addNumbers = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw 'must give numbers';
    }
    return a + b;
};

console.log( addNumbers(15,5) ); // 20
addNumbers('foo', []); // Error must give numbers
```

## 2 - javaScript throw defined with an object

```js
throw {
    message: 'this error is defined with an object',
    name: 'ObjectDefinedError'
}
// ObjectDefinedError: this error is defined with an object
```