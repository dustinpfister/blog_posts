---
title: Using mathjs as a more advanced alternative the the corejs Math Object
date: 2018-03-03 20:10:00
tags: [js,node.js,math]
layout: post
categories: node.js
id: 161
updated: 2018-03-08 12:25:43
version: 1.1
---

When it comes to doing anything with math in javaScript there is of course the corejs Math object that is very helpful, but it does have it's limitations, and does not always work the way I would like it to. A popular alternative to the corejs Math object is [math.js](http://mathjs.org/), which can be found on [npm](https://www.npmjs.com/package/mathjs), and [github](https://github.com/josdejong/mathjs) like most projects. It can do everything the Math object can, as well add a whole bunch of new features such as big number support. In addition certain mathjs equivalents to the Math object methods have additional features, and also a plug in system exists that can be used to further extend mathjs.

<!-- more -->

## Installing

Mathjs can be used as a front end solution, as well as in node.js. In anode.js environment just install with npm like always.

```
$ npm install mathjs --save
```

In this post I am using mathjs 4.x, and I assume a node.js environment.

## using mathjs in place of the Math Object

I tend to favor using mathjs separately as an alternative to the Math Object in core javaScript, rather than monkey patching the Math Object. This means I will have two globals, one lower case, and one upper.

## Plug in system

mathjs has a plug in system, and there are additional projects that wok well with mathjs when it comes to getting into a certain discipline involving math. Of course it is not that hard to add my own functionality as well if I cant fine something.

## The natural logarithm method

For starters I checked out the mathjs natural logarithm method, and have found that it is an improved alternative over the native Math.log method as it can also be used to find base log.

The improvement has to do with base log

```js
// So with javaScripts Math.log I can use
// that just to find the natural logarithm
// of a number just fine
console.log(Math.log(8)); // 2.07...

// but only one argument is accepted
// and there is on way to also use it to get
// base log
console.log(Math.log(8,2)); // 2.07...

// To geg base log I must divide using Math.log
console.log(Math.log(8) / Math.log(2)); // 3
```

With math.js I can just give a second argument

```js
let math = require('mathjs');
console.log(math.log(8,2)); // 3
```

If you are still wondering what base log is, just think of it as the opposite of using Math.pow. Where I want to find an unknown exponent given a number and base, rater than finding an unknown number given a base, and exponent.

```js
let math = require('mathjs');

let base = 2,
exp = 3,
n = math.pow(base,exp); // 8
 
console.log( math.log(n,base) ); // 3
console.log( math.log(n,base) === exp ) // true
```