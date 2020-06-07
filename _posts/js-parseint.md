---
title: parseInt and other options for parsing numbers in javaScript
date: 2019-05-15 21:23:00
tags: [js]
layout: post
categories: js
id: 449
updated: 2020-06-07 11:37:07
version: 1.10
---

In javaScript [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) is one of several ways to [convert a string to a number as an integer](https://www.geeksforgeeks.org/javascript-parseint-with-examples/). The parseInt method does convert a string or number to an [integer](https://en.wikipedia.org/wiki/Integer), but technically it is still a float as all numbers in [javaScript are double precision floating point numbers](https://en.wikipedia.org/wiki/IEEE_754). 

So when using the javaScript parseInt method to produce an integer it is really just a float still technically, but for all practical purposes when it comes to the product in a mathematical sense it is an integer. There are other was to parse to an integer, or float in javaScript as well so lets take a look at the options when it comes to parsing integers in javaScript.

<!-- more -->

## 1 - parseInt basic examples

The parseInt method in native core javaScript works by just passing a string of a number, or a number as the first argument. When doing so parseInt will attempt to parse what is passed to it as a number. In addition to giving a value to parse to an integer a [radix](https://en.wiktionary.org/wiki/radix) can be given as a second argument.

```js
console.log( parseInt('42') ); // 42
console.log( parseInt('6' * '7') ); // 42
console.log( parseInt(42) ); // 42
console.log( parseInt(42.1234) ); // 42
```

## 2 - parseInt converts to String first

The parseInt method might not always return expected results in some situations. For example the parseInt method converts to a string first and if it is a number the goes off into notation, then the letter e char will not be recognized as a number and will parse an int based on what comes before it.

```js
// parseInt may not always work as expected
console.log(parseInt( Math.pow(10,21) ) ); // 1
 
// because it converts to string first
let str = String(Math.pow(10,21));
 
// and it does not consider the letter e to 
// be a number
console.log(str); // 1e+21
console.log(parseInt(str)); // 1
console.log( parseInt('12e45') ); // 12
```

## 3 - The deal with max safe integer

There is also the nature of the max safe integer, when adding anything to that and going beyond the max safe int that too can result in unexspected results as well.

```js
let n = Number.MAX_SAFE_INTEGER;
console.log(n); // 9007199254740991
console.log(parseInt(n + 100)); // 9007199254741092
```

## 4 - parseInt and Number

The [Number function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) can be used to convert a string to a number as well. However it will not parse to an integer, at least not my itself.

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