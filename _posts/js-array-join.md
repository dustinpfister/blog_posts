---
title: The js array join method
date: 2020-03-09 20:53:00
tags: [js,corejs]
layout: post
categories: js
id: 623
updated: 2020-03-09 21:21:02
version: 1.7
---

The [js array join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) prototype method can be used to join all elements of an array into a string with a string that is to be used between each element.

One of the great things about the js array join method is that it has been part of javaScript for a real long time. So no need to bother with polyfills with this one, it will even work in browsers as old as IE 5.5.

<!-- more -->

## 1 - basic js array join method example

The basic idea of array join is to just call it off an instance of a javaScript array. When doing so I just pass a string that I want to have between each element in the resulting string produced form the array with js array join.

```js
var arr = [3,9,2020],
str = arr.join('/');
 
console.log(str); '3/9/2020'
```

That is about it, however maybe some more examples are called for with this one.

## 2 - js array join and empty string as a separator

An empty string can be given as the argument to the array join method.

```js
var arr = [1,2,3,3],
 
a = parseInt(arr.join('')),
 
b = a + 1;
 
console.log(b); // 1234
```

## 3 - String split and js array join

The string split method is another method that comes to mind when dealing with the array join method as it is an inversion of the method. Where the js array join method will create a string from an array the string split method will split a string into an array of elements.

```js
var n = 12345;
 
var a = parseInt(String(n).split('').map(function (n) {
        return Math.pow(2, n);
    }).join(''));
 
console.log(a); // 2481632
```