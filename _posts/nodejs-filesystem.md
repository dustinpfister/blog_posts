---
title: Working with the filesystem module in node.js
date: 2018-02-08 22:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 148
updated: 2018-02-09 11:26:10
version: 1.1
---

Working with files is a big part of most [node.js](https://nodejs.org/en) projects. I have written a [post on fs-extra](/2018/01/08/nodejs-fs-extra/) a while back, but so far never got around to the core file system module in node.js itself.

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