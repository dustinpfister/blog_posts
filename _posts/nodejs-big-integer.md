---
title: Woking with very big numbers in node.js with big-integer
date: 2017-05-29 18:08:53
tags: [js,node.js]
layout: post
categories: node.js
id: 25
updated: 2017-09-30 19:09:32
version: 1.2
---

Want to do some math in a node.js environment involving really big numbers? Then look into the npm package called [big-integer](https://www.npmjs.com/package/big-integer).

<!-- more -->

## The limits of JavaScript numbers

In most cases normal old JavaScript numbers work fine, but if you are working on some kind of project that requires a high degree of precession when working with numbers of a high magnitude they do have there limits.

Take the following into consideration.

```js
var jsHigh = Math.pow(2,256),
jsLow = 1;
 
console.log(jsHigh === jsHigh + jsLow); // true
```

You might think that this should not result in true, and you would be right. However after a certain point, this is what happens when you add a small number to a very large one. If you are interested in knowing why you can dive into the deep end when it comes to understating double precision [iee-754](https://en.wikipedia.org/wiki/IEEE_floating_point) standard that is used to represent numbers in javaScript. If you just want to cut to the chase, yes there are limits with how numbers are represented in javaScript.

## The big-integer demo

With the problem presented in mind, there may come a time where you might want to use some kind of dependency that stores numbers as a string value, and will have it's own methods for adding, subtracting, and so forth.

```js
var bigInt = require("big-integer");
 
var jsHigh = Math.pow(2,256),
jsLow = 1,
 
bigHigh = bigInt(2).pow(256),
bigLow = bigInt(1);
 
console.log(jsHigh === jsHigh + jsLow); // true
 
console.log(bigHigh.equals(  bigHigh.add( bigLow ) )) // false
 
console.log(jsHigh);
// 1.157920892373162e+77
console.log(jsHigh + 1);
// 1.157920892373162e+77
 
console.log(bigHigh.toString());
// 115792089237316195423570985008687907853269984665640564039457584007913129639936
console.log(bigHigh.add(bigLow).toString());
// 115792089237316195423570985008687907853269984665640564039457584007913129639937
```

Now the problem is resolved, I can add a very small number to a very large one, and it still counts for what it is worth.

## Conclusion

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).

<!--

## Max Safe Integer

```js
var maxSafe = 9007199254740991,
notSafe = maxSafe + 1;
 
console.log(maxSafe === maxSafe + 1); // false
 
console.log(notSafe === notSafe + 1); // true
```

# The hello world project

```js
var bigInt = require("big-integer");

// plain old JavaScript number
console.log(Math.pow(2,128));
 // 3.402823669209385e+38

// JavaScript number to big int
console.log( bigInt( Math.pow(2,128) ).toString());
// 340282366920938500000000000000000000000

// big int
console.log( bigInt(2).pow(128).toString() );
// 340282366920938463463374607431768211456
```

-->

