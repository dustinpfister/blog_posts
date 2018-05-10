---
title: Turning a node.js method into a promise with pify
date: 2018-02-27 18:36:00
tags: [js,node.js]
layout: post
categories: node.js
id: 159
updated: 2018-02-28 17:23:05
version: 1.1
---

When making a node.js project, many methods in the node.js core work by giving a callback that will return an error, or what it is that you want from the method. It may be desireable to have these methods return promises instead to be used as a means to work with the method. I could juts do so with the Promise constructor, but [pify](https://www.npmjs.com/package/pify) is a nice little project that can help to make quick work of this.

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