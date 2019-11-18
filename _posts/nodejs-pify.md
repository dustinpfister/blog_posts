---
title: Turning a node.js method into a promise with pify
date: 2018-02-27 18:36:00
tags: [js,node.js]
layout: post
categories: node.js
id: 159
updated: 2019-11-18 10:05:11
version: 1.2
---

When making a node.js project, many methods in the node.js core work by giving a callback that will return an error, or what it is that you want from the method. This is a callback style method that can result in the so called callback hell when it comes to doing anything where many of these kinds of calls need to be nested.

In late versions of nodejs many core modules now return a promise as an alternative to this cllback style way of doing things. Also there is the [promisify method in the util module](/2019/06/22/nodejs-util-promisify/) that I often use as a way to promsify these built in methods. That solution will also work on most older versions of nodejs, at least all the one that are still supported anyway.

Another option would be to just make a quick method where I am returning a new instance of a promise constructor when it comes to any version of node that supports Promises, or failing that, by using a user space module like bluebird to add promises. However this is a post on the npm package [pify](https://www.npmjs.com/package/pify), one of many project created and maintained by [sindresorhus](https://github.com/sindresorhus), it is a nice little project that can help to make quick work of this also so lets look at some quick examples.

<!-- more -->

## A basic example of pify

So normally most node.js methods are used by giving one or more arguments ending with a callback. 

like this:
```js
let fs = require('fs');
 
fs.readFile('readme.md', function (e, text) {
 
    // something went wrong
    if (e) {
 
        console.log(e);
 
    } else {
 
        // the contents of the readme
        console.log(text.toString());
 
    }
 
});
```

This can work okay, but can lead to what is called call back hell when making a complex project. Promises can help to keep things neater, and pify can be used as a way to do just that.


```js
let pify = require('pify'),
fs = require('fs');
 
pify(fs.readFile)('readme.md').then(function (text) {
 
    // the contents of the readme
    console.log(text.toString());
 
}).catch (function (e) {
 
    // something went wrong
    console.log(e);
 
});
```