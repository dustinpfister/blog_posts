---
title: Working with very big numbers in node.js with big-integer
date: 2017-05-29 18:08:53
tags: [js,node.js]
layout: post
categories: node.js
id: 25
updated: 2019-09-06 15:54:21
version: 1.7
---

Want to do some math in a node.js environment involving really big numbers? Then you might want to look into the npm package called [big-integer](https://www.npmjs.com/package/big-integer). That is unless you are using a version of node that is 10.4.x or later in which case you might have BigInt support in the node.js environment that you are using. In this post I will be going over some nodejs example that have to do with the big-integer npm package, but if you are using a late version of node I have another post that I have [wrote on the BigInt](/2019/09/06/js-bigint/) native support that there is for big integers in javaScript now.

<!-- more -->

## 1 - The limits of JavaScript numbers

In most cases normal old JavaScript numbers work fine, but if you are working on some kind of project that requires a high degree of precession beyond that of the limit of the [max safe integer limit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) of regular javaScript numbers then this npm package is one way to get around that limit. When working with numbers of a high magnitude regular javaScript numbers do have there limits so lets start out with knowing what those limits are.

For example take the following into consideration.

```js
var jsHigh = Math.pow(2,256),
jsLow = 1;
 
console.log(jsHigh === jsHigh + jsLow); // true
```

You might think that this should not result in true, and you would be right. However after a certain point, this is what happens when you add a small number to a very large one. If you are interested in knowing why you can dive into the deep end when it comes to understating double precision [iee-754](https://en.wikipedia.org/wiki/IEEE_floating_point) standard that is used to represent numbers in javaScript. If you just want to cut to the chase, yes there are limits with how numbers are represented in javaScript.

## 2 - The big-integer demo

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

## 3 - Conclusion

As I stated before this post is on an npm package that have to do with working with large numbers in nodejs, but when I first wrote this post I was using an older version of node and in late versions of node there is now the BigInt object that can be used to work with big numbers in javaScript with just plain old native javaScript by itself. So in time this post will no longer be relevant as node 8.x starts to approve the end of its support cycle. Still if for some reason you want to work with big numbers in nodejs in  a way in which the project will work with older versions of node then you will still want to use a npm package such as this. 

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/) and native nodejs modules as well if you enjoyed this post. 

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

