---
title: parseInt and other options for parsing numbers in javaScript
date: 2019-05-15 21:23:00
tags: [js]
layout: post
categories: js
id: 449
updated: 2019-05-15 21:47:10
version: 1.2
---

In javaScript [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) is one of several ways to convert a string to a number. parseInt does convert a string or number to an integer, but technically it is still a float as all numbers in javaScript a double precision floating point numbers. So it is really just a float with the fraction part removed. There are other was to parse to an integer, or float in javaScript as well so lets take a look at the options.

<!-- more -->

## 1 - parseInt basic examples

parseInt works by just passing a string of a number, or a number and it will attempt to parse what is passed to it as a number.

```js
console.log( parseInt('42') ); // 42
console.log( parseInt('6' * '7') ); // 42
console.log( parseInt(42) ); // 42
console.log( parseInt(42.1234) ); // 42
```

## 2 - The deal with max safe integer

```js
let n = Number.MAX_SAFE_INTEGER;
console.log(n); // 9007199254740991
console.log(parseInt(n + 100)); // 9007199254741092
```

## 3 - parseInt and Number

```js
let str = '42.1234';
// number will parse to float if there
// is a fraction
console.log( Number(str) ); // 42.1234
 
// paser Int will not
console.log( parseInt(str) ); // 42
 
let str2 = '42abc';
// Number will result in NaN
// if there are non number chars
// in the end of a string
console.log( Number(str2) ); // NaN
// parseInt will not
console.log( parseInt(str2) ); // 42
```