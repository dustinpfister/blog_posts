---
title: JavaScript throw statement
date: 2019-03-15 20:07:00
tags: [js]
layout: post
categories: js
id: 402
updated: 2020-06-02 17:01:54
version: 1.7
---

The [javaScript throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) statement can be used to intentionally throw a user-defined exception or error if you prefer. It can be used as a way to stop execution of a javaScript program in the event that some kind of essential condition is not in order. In some cases I might use it as a way to intentionally throw a wrench into a machine sort of speak to stop execution of a program at a certain point as a means of debugging, but as of late I prefer to use alternatives to that to catch a state of affairs sort of speak.

So lets take a look at some example of the javaScript throw keyword in action.

<!-- more -->

## 1 - javaScript throw basics

To use a throw statement just type the throw keyword followed by a value that reflects what the error is about. The value can be a string, number boolean or an object that should be given certain standard key value pairs more on that later.

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

So a string can be used to describe the user defined Error, but it might be best to use an Object or The Error constructor to create an object with message and name properties that help to better identify what is wrong when the Error is thrown.

```js
throw {
    message: 'this error is defined with an object',
    name: 'ObjectDefinedError'
}
// ObjectDefinedError: this error is defined with an object
```

## 3 - javaScript throw and try catch blocks

When an Error is thrown any catch statement present will of course be executed which can be used to handal the Error

```js
var process = function (str) {
    if (str === 'bar') {
        console.log('foobar');
    }
    throw {
        message: 'must give bar',
        name: 'NoBarError'
    };
};
 
try {
    process('foo');
} catch (e) {
    console.log(e.message); // 'must give bar'
}
```
