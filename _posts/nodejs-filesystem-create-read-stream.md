---
title: The fs.createReadStream method
date: 2018-08-18 22:06:00
tags: [js,node.js]
layout: post
categories: node.js
id: 263
updated: 2018-08-19 11:55:44
version: 1.6
---

In the post I will be writing about read streams in [node.js](https://nodejs.org/en/) using the [fs.createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options). This method is one of many examples of streams in node.js, so if you are new to streams it makes sense to just start playing around with some of these methods. The fs.createReadStream is an example of a readable stream, and as such it can only be used to read data from a file, which differs from Writable and Duplex streams. This methods can be used in conjunction with a writable stream, including the fs.createWriteStream method. So lets take a look as some examples of working with readable streams with node.js, and it's built in file system module.

<!-- more -->

## 1 - Before continuing reading

This is a post on the fs.createReadStream method in node.js, I will not be getting into streams in Depth, let alone the file system module, node.js, and javaScript by itself.

### 1.1 - Readable, writable, and Duplex streams

The method I will be writing about in this post is an example of a readable stream, this means that certain methods that can be used in writable streams are not present. So this methods is used as a way to just read a file, but not to write to it. However readable streams allow for piping to a writable stream when working with something like fs.createWriteStream. These other kinds of streams will be touched on breafly, but the focus will be on reading streaming data, rather than writing it.

## 2 - Some basic examples of fs.createReadStream

For starters lets just look at a few basic examples of using fs.createReadStream to read the contents of a file, one chunk at a time. There are many different ways to create an instance of this kind of readable stream, involving chaining, variables, and both old and new coding styles.

## 2.1 - A basic example that involves chaining

So the method is part of the node.js file system module, and as such I will first need to bring that into a script using require. Once I have the fs module to work with I can call that, passing the path of the file I want to read, and then I can attach events where I can define what to do for each chunk of data that is coming in. One way to do all of that in one stroke is by way of chaining.

```js
require('fs').createReadStream('README.md').on('data', function (chunk) {
    console.log(chunk.toString());
});
```

This might look nice and concise, but when it comes to getting into a real project involving the use of fs.createReadStream, chances are I might not aways be such a great idea to have everything chained together like this.

## 2.2 - Using some variables

So client side jaavScript development might be one thing, but when it comes to node.js development there is no real reason to bother with var anymore when it comes to declaring some variables. 

```js
let fs = require('fs'),
reader = fs.createReadStream('README.md');
 
reader.on('data', function (chunk) {
 
    console.log(chunk.toString());
 
});
```

So I do miss the old days of only having one keyword to worry about when it comes to declaring variables thought so I tend to just type let, event though const might be the better option. Getting into that thought is off topic for this post so moving on.

### 2.3 - Basic example with an options object

Like many methods in node.js, an options object can be passed to it as the second argument when calling the method. This is what I will want to use when doing things like changing the chunk size in bytes, character encoding, and the byte position start a,d ending location.

```js
let fs = require('fs'),
reader = fs.createReadStream('README.md', {
    flag: 'a+',
    encoding: 'ascii',
    start: 8,
    end: 64,
    highWaterMark: 16
});
 
reader.on('data', function (chunk) {
 
    console.log(chunk.toString());
 
});
```