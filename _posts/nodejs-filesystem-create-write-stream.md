---
title: The fs.createWriteStream method
date: 2018-08-17 20:37:00
tags: [js,node.js]
layout: post
categories: node.js
id: 262
updated: 2018-08-22 19:45:39
version: 1.3
---

In [node.js](https://nodejs.org/en/) streams come up often, even with the most simple of examples will typically involve logging something to the standard output which is a kind of stream. In this post I will be writing about the fs.createWriteStream method in the node.js built in file system module, and why that is often a better choice for writing to a file compared to other options in that module.

<!-- more -->

## 1 - start here

This is a post on the fs.createWriteStream method in the node.js built in file system module. This method can be used to quickly make a writable stream for the purpose of writing data to a file. This method may be a smarter option compared to methods like fs.writeFile when it comes to very large amounts of data. This is not a getting started post on node.js, or javaScript in general, and I assume that you have log at least a few hours with these things before hand. If not you might have a hard time enjoying reading this post.


## 2 - Some basic examples of fs.createWriteStream

```js
let fs = require('fs');
 
let writer = fs.createWriteStream('test.txt');
 
writer.write('this is only a test');
```

## 3 - Events

### 3.1 - The on error event

```js
let fs = require('fs');
 
// a writer in 'wx+' mode that will fail if the file
// all ready exists
let writer = fs.createWriteStream('test.txt',{flags:'wx+'})
 
.on('error', function (err) {
 
    console.log(err);
 
});
 
writer.write('this will fail if the file is there before hand');
```