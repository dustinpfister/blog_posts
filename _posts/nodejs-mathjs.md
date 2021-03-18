---
title: Using mathjs as a more advanced alternative the the Core JavaScript Math Object
date: 2018-03-03 20:10:00
tags: [js,node.js,math]
layout: post
categories: node.js
id: 161
updated: 2021-03-18 13:06:29
version: 1.11
---

When it comes to doing anything with math in javaScript there is of course the core javaScript Math object that is very helpful. The Object is packed with a whole bunch of usual suspects when it comes to all kinds of things that have to do with Math such as sin, cosine, a PI constant, and so forth. However the Native Math object does have it's limitations, and does not always work the way I would like it to. I find myself often having ti create a few stand alone methods sometimes such as a nth root method, and also look around for something to help with big number support. There are also many methods missing that have to do with things that have to do with statistics when it comes to things like the various kinds of means, and standard deviation.

A popular alternative to the corejs Math object is [math.js](http://mathjs.org/), which can be found on [npm](https://www.npmjs.com/package/mathjs), and [github](https://github.com/josdejong/mathjs) like most projects. The mathjs module can do everything the Math object can, however it also adds a whole bunch of new features such as big number support. When it comes to native javaScript there is now a native Big Number standard, but it still might now work great in all browsers. In addition certain mathjs equivalents to the Math object methods have additional features, and also a plug in system exists that can be used to further extend mathjs.

<!-- more -->

## 1 - Installing mathjs and some basic points

Mathjs can be used as a front end solution, as well as in node.js, however in this post I will be mainly going over  few nodejs examples. When I first started writing this post I was using mathjs 4.x, and the last time I edited this post there is now a 9.x, so if you run into problems getting some of these examples to work on your end check the version number that you are using first. So then in a node.js environment just install with npm like always when starting a new npm folder.

```
$ mkdir test_mathjs
$ cd test_mathjs
$ npm init
$ npm install mathjs --save
```

### 1.1 - Cloning down my test mathjs folder that I made for this post

Another option would be to [clone down the git folder](https://github.com/dustinpfister/test_mathjs) that I made for this post.

```
$ git clone --depth 1 https://github.com/dustinpfister/test_mathjs
$ cd test_mathjs
$ npm install
```


### 1.2 - using mathjs in place of the Math Object

I tend to favor using mathjs separately as an alternative to the Math Object in core javaScript, rather than monkey patching the Math Object. This means I will have two globals, one lower case, and one upper case. However once goes about importing mathjs the global variable should be separate from the native Math object.

### 1.3 - Plug in system

The mathjs module has a plug in system, and there are additional projects that wok well with mathjs when it comes to getting into a certain discipline involving math. Of course it is not that hard to add my own functionality as well if I cant fine something.

## 2 - The natural logarithm method

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
console.log(math.log(8, 2)); // 3
```

## 3 - mathjs pow method

If you are still wondering what base log is, just think of it as the opposite of using Math.pow. Where I want to find an unknown exponent given a number and base, rater than finding an unknown number given a base, and exponent.

```js
let math = require('mathjs');

let base = 2,
exp = 3,
n = math.pow(base,exp); // 8
 
console.log( math.log(n,base) ); // 3
console.log( math.log(n,base) === exp ) // true
```

## 4 - Big Numbers

```js
let math = require('mathjs');
 
let big = new math.bignumber('123456789876543217777777777777777771234444555666123');
 
console.log(big.toString());
```

## 5 - Conclusion

As of this writing it would seem that Mathjs is still being supported which is great. I do get around to editing my nodejs content once in a while, so next time I come around to this post I hope to expand it with at least a few more additional examples.

