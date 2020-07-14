---
title: The array concat method and some other ways of adding two arrays together
date: 2020-07-13 14:11:00
tags: [js]
layout: post
categories: js
id: 681
updated: 2020-07-14 11:01:41
version: 1.2
---

So there is adding two strings or numbers together with the addition operator in javaScript, but then there is adding two or more objects together including arrays. In the array prototype object there is the [array concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method that can be used to create a new array that is the concatenation of two or more arrays, or values. This is then one way to go about adding two or more arrays together. There are then also ways of going about doing the same thing, such as converting and array to a string and then back again using something like the string split method. So lets look at some examples of array concatenation with the array concat method, as well as other ways to go about getting a similar effect.

<!-- more -->

## 1 - basic array concat example

So the basic idea of the concat method is that I just call it off of an instance of a javaScript array, and then pass one or more arrays that I want to concatenate with the array that I call the method off of. A new array will be returned by the array concat method, and none of the source arrays including the array that the method is called off of will be mutated.

```js
var a = [1, 2, 3],
b = [4, 5, 6],
c = a.concat(b);
 
console.log(a, b, c);
// [ 1, 2, 3 ] [ 4, 5, 6 ] [ 1, 2, 3, 4, 5, 6 ]
```

## 2 - Can pass arrays, and just values as arguments

SO the array concat method can be used to concatenate two or more arrays, but values can also be added via arguments also. So then this concat method also works as an alternative to the array push method then also.

```js
var a = [1, 2, 3],
b = a.concat(4, 5, '6', null, false, {}, [7, 8], [9, 10, 11], [12]);
 
console.log(b);
// [ 1, 2, 3, 4, 5, '6', null, false, {}, 7, 8, 9, 10, 11, 12 ]
```

## 3 - 

```js
var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
 
var a = Array.prototype.concat.call(obj, 4, 5, [6, 7]),
b = Array.from(obj).concat(4, 5, [6, 7]);
 
console.log(a);
// [ { '0': 1, '1': 2, '2': 3, length: 3 }, 4, 5, 6, 7 ]
console.log(b);
// [ 1, 2, 3, 4, 5, 6, 7 ]
```

## 4 - 

```js
var a = [1, 2, 3],
b = [4, 5, 6],
c = a + b;
 
console.log(c, c.constructor.name);
// 1,2,34,5,6 String
 
var d = String(a + ',' + b).split(',');
console.log(d, d.constructor.name);
// [ '1', '2', '3', '4', '5', '6' ] 'Array'
```