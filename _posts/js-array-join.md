---
title: The js array join method
date: 2020-03-09 20:53:00
tags: [js,corejs]
layout: post
categories: js
id: 623
updated: 2020-03-09 21:06:26
version: 1.3
---

The array join prototype method can be used to join all elements of an array into a string with a string that is to be used between each element.

<!-- more -->

## 1 - basic js array join method example

The basic idea of array join is to just call it off an instance of a javaScript array. When doing so I just pass a string that I want to have between each element in the resulting string produced form the array with js array join.

```js
var arr = [3,9,2020],
str = arr.join('/');
 
console.log(str); '3/9/2020'
```

That is about it, however maybe some more examples are called for with this one.

## 2 - String split and js array join

```js
var n = 12345;
 
var a = parseInt(String(n).split('').map(function (n) {
        return Math.pow(2, n);
    }).join(''));
 
console.log(a); // 2481632
```