---
title: Working with the file system module in node.js
date: 2018-02-08 22:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 148
updated: 2019-11-22 10:45:39
version: 1.3
---

Working with files is a big part of most [node.js](https://nodejs.org/en) projects. I have written a [post on fs-extra](/2018/01/08/nodejs-fs-extra/) a while back, but so far never got around to the core file system module in node.js itself.

Depending on the version range of node you wish to support, you might not need to make a user space module that extends the file system module part of the stack. For example if you want file system methods that return promises there is the nodejs build in util promisify method that can be used to get that effect fairly quick, and easy. If you want more than just that maybe you still do need to bother with something more, in any case in this post I will be going vanilla javaScript style when it comes to file io tasks.

This post will also serve as a general overview of the file system module, and I will link to additional posts on more specific topics where doing so is called for.

<!-- more -->

## Basic read file example

To start off this post how about a simple read file example. Use of the method is fairly simple, I just call fs.readFile, and pass the path of the file I want to read, following with the character encoding, and finally a callback that will be called when the file is read.

```js
let fs = require('fs'),
path = require('path'),
cwd = process.cwd();
 
fs.readFile(path.join(cwd, 'README.md'), 'utf-8', function (e, data) {
 
    if (e) {
 
        console.log(e);
 
    }
 
    console.log(data);
 
});
```

I am using the [path module](/2017/12/27/nodejs-paths/), because I have found that is a much better way of handling paths compared to just concatenating strings. In addition the cwd method of the process object will always return the current working directory which can be useful, but that is another post, for another day.

## Read a file Promise style

As of node.js 8.x all the methods do not return promises, this is one of the reasons why you might want to use [fs-extra](/2018/01/08/nodejs-fs-extra/), but it's not like it is that hard to make a method that will return a promise.

```js
let fs = require('fs'),
path = require('path'),
cwd = process.cwd();
 
// read file method
let readFile = function (dir) {
 
    // returns a promise
    return new Promise(function (resolve, reject) {
 
        // read a file
        fs.readFile(dir, 'utf-8', function (e, data) {
 
            if (e) {
 
                // reject if error
                reject(e);
 
            }
 
            // else resolve with the data
            resolve(data);
 
        });
 
    });
 
};
 
// read a file Promise style
readFile(path.join(cwd, 'README.md')).then(function (data) {
 
    console.log(data);
 
}).catch (function (e) {
 
    console.log(e);
 
});
```