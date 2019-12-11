---
title: Math pow in javaScript
date: 2019-12-10 21:28:00
tags: [js]
layout: post
categories: js
id: 578
updated: 2019-12-10 21:31:04
version: 1.1
---

The [Math pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) method is what can be used i javaScript to create a number that is a power from a base and an exponent.

<!-- more -->

## 1 - Math pow basic example

```js
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