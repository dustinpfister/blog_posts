---
title: Math pow in javaScript
date: 2019-12-10 21:28:00
tags: [js]
layout: post
categories: js
id: 578
updated: 2019-12-10 21:33:43
version: 1.2
---

The [Math pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) method is what can be used i javaScript to create a number that is a power from a base and an exponent.

<!-- more -->

## 1 - Math pow basic example

So here I have a very basic example of the Math.pow method where I am just using the array map method to make each element a power of 2 using a number in the array as an exponent.

```js

var nums = [0, 1, 2, 3, 4];
 
nums = nums.map((n) => Math.pow(2, n));
 
console.log(nums.join(','));
// 1,2,4,8,16
```

## 2 - Get the exp of a number is you know the base

```js
var getExp = function (n, b) {
    return Math.log(n) / Math.log(2);
};
 
var n = Math.pow(2, 4);
console.log(getExp(n, 2)); // 4
```

## 3 - limits of 2d images

```js
var IMGStringFromIndex = function (index) {
    var size = 7 * 7,
    maxIndex = Math.pow(2, size) - 1,
    num,
    baseStr;
    if (index > maxIndex) {
        index = maxIndex;
    }
    if (index < 0) {
        index = 0;
    }
    num = index.toString(2);
    baseStr = new Array(size).fill('0').join('');
    return String(baseStr + num).slice(size * -1).split('').reverse().join('');
};
 
var indexFromIMGString = function (string) {
    var index = 0;
    string.split('').forEach(function (pix, i) {
        index += pix == 1 ? Math.pow(2, i): 0;
    });
    return index;
}
 
var str = IMGStringFromIndex( Math.pow(2, 7 * 7 ) - 1 );
console.log(str);
// 1111111111111111111111111111111111111111111111111
 
var index = indexFromIMGString(str);
console.log(index);
// 562949953421311
```