---
title: Ratio Module javaScript example
date: 2021-04-13 13:30:00
tags: [js]
layout: post
categories: js
id: 844
updated: 2021-04-13 13:44:40
version: 1.2
---

This [javaScript example](/2021/04/02/js-javascript-example/) post will be on a ratio module that I put together that I intend to use with a bunch of other modules to create one or more games that involve the use of ratios. The main project thus far with this is my orb.js module that I have been working on as of late, but I am sure that I might find additional uses for this in future projects.

<!-- more -->

## 1 - The ratio module

In this section I will be going over the ratio module as it stands of this writing. The modules contains basic tool functions like a greatest common divisor method, and all kinds of additional methods that I have found that I needed when making my orb.js module that prompted the creation of this module.

```js
var ratio = {};
 
// Greatest Common Divisor
// https://en.wikipedia.org/wiki/Greatest_common_divisor
ratio.GCD = function (a, b) {
    if (!b) {
        return a;
    }
    return ratio.GCD(b, a % b);
};
 
// Greatest Common Divisor from array
// https://www.geeksforgeeks.org/gcd-two-array-numbers/
ratio.GCDFromArray = function(arr, n){
    let result = arr[0];
    n = n === undefined ? arr.length: n;
    for (let i = 1; i < n; i++){
        result = ratio.GCD(arr[i], result);
        if(result == 1){
            return 1;
        }
    }
    return result;
}
 
// Are all non-zero elements in the ratio equal to each other?
// ratio.allNonZeroEqual([1,0,1,1]); // true
// ratio.allNonZeroEqual([1,2,0,4]); // false
ratio.allNonZeroEqual = function (array) {
    var a = 0;
    return array.every(function(num){
        if(num === 0){ // if 0 return true
            return true;
        }
        if (a === 0) { // if first non-zero value return true
            a = num;
            return true;
        }
        // if any additional non-zero value does not equal the 
        // first non zero value return false, else true
        return num === a;
    });
};
 
// count nonZero array elements
ratio.countNonZero = function(array){
    return array.reduce(function(acc, n, i){
        acc = i === 1 ? acc === 0 ? 0 : 1 : acc;
        return acc += n > 0 ? 1 : 0;
    });
};
 
// is binary only array
ratio.isBinaryArray = function(array){
    var i = 0,
    len = array.length;
    while(i < len){
        if(Number(array[i]) === 0 || Number(array[i]) === 1){
           i += 1;
           continue;
        }
        return false;
    }
    return true;
};
 
// get the simple ratio from a set of arr (or simplify a ratio)
// ratio.getSimpleRatio([0,0,14,2]); // [0,0,7,1]
ratio.getSimpleRatio = function (arr) {
    // make sure pure, dual, triple, and quad
    // work they way they should
    if (ratio.allNonZeroEqual(arr)) {
        return arr.map(function (el) {
            return el === 0 ? 0 : 1;
        });
    }
    // if we get this far use ratio.GDCFromArray
    var gcd = ratio.GCDFromArray(arr);
    // get simple ratio by diving all arr by gd
    return arr.map(function (pt, i) {
        return pt / gcd;
    });
};
 
// raise the given array of numbers n time with the given base
// The array of numbers will be simplified
// ratio.getRaisedRatio([2,2,0,1], 2, 1); // [4,4,0,2]
// ratio.getRaisedRatio([2,2,0,1], 4, 2); // [32,32,0,16]
ratio.getRaisedRatio = function(arr, n, base){
    n = n === undefined ? 1 : n;
    base = base === undefined ? 1 : base;
    var simp = ratio.getSimpleRatio(arr);
    return simp.map(function(el){
        //return n * Math.pow(el, base);
        return n * Math.pow(el, base);
    });
};
 
// The inverse of ratio.getRaisedRatio
// ratio.getLevel([4,4,0,2], 1); // 2
// ratio.getLevel([32,32,0,16], 2); // 4
ratio.getLevel = function(arr, base){
    base = base === undefined ? 1 : base;
    // get lowest non zerro number
    var a = Math.min.apply(null, arr.filter(function(n){
        return n > 0;
    }));
    // if base is one just divide
    if(base === 1){
        return a / base;
    }
    // else use Math.log
    return Math.log(a) / Math.log(base);
};
 
// just the sum of the numbers
ratio.sum = function(arr){
    return arr.reduce(function(acc, n){
        return acc + n;
    });
};
 
```