---
title: Working with the file system module in node.js
date: 2018-02-08 22:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 148
updated: 2019-11-22 10:58:21
version: 1.4
---

Working with files is a big part of most [node.js](https://nodejs.org/en) projects. I have written a [post on fs-extra](/2018/01/08/nodejs-fs-extra/) a while back, but so far never got around to the core file system module in node.js itself.

Depending on the version range of node you wish to support, you might not need to make a user space module that extends the file system module part of the stack. For example if you want file system methods that return promises there is the nodejs build in util promisify method that can be used to get that effect fairly quick, and easy. If you want more than just that maybe you still do need to bother with something more, in any case in this post I will be going vanilla javaScript style when it comes to file io tasks.

This post will also serve as a general overview of the file system module, and I will link to additional posts on more specific topics where doing so is called for.

<!-- more -->

## 1 - Some very basic node file system getting started examples



### 1.1 - read a file callback style

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

### 1.2 - Read a file Promise style

As of node.js 12.x all the methods do return promises now, However you might still want to promisify them anyway for the sake of supporting older versions of node. This is one of the reasons why you might want to use [fs-extra](/2018/01/08/nodejs-fs-extra/), but it's not like it is that hard to make a method that will return a promise. One way is to use the util promisify method.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
cwd = process.cwd();
 
let readFile = promisify(fs.readFile);
 
// read a file Promise style
readFile(path.join(cwd, 'README.md'), 'utf8')
 
.then(function (md) {
    console.log(md);
})
 
.catch (function (e) {
    console.log(e);
});
```

If you want to push backward compatibility back even further it might require the use of a promise library such as bluebird.