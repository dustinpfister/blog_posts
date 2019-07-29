---
title: node console standard output and more
date: 2019-07-24 21:22:00
tags: [node.js]
layout: post
categories: node.js
id: 508
updated: 2019-07-29 17:53:12
version: 1.5
---

In nodejs there is the console global that works much like the console global in web browsers that can be used to log the status of variables and messages in general to the javaScript console. The [node console](https://nodejs.org/api/console.html) log method will print what is passed to it in the standard output with a newline after what is given as the first argument. There is also the standard error as well that can be logged to with the node console warn method. There are a few more things to be aware of when it comes to the node console global so in this post I will be going over some basics with it, as well as some other related topics.

<!-- more -->

## 1 - node console basic example using the node console log method

So the console log method is one way to go about logging something to the standard output. In other words creating a script that when it is called by node it displays something in the command line.

So if I create a file called basic.js in a folder that looks like this:

```js
// the console.log method ca be called and passed
// a value to be logged to the standard output like this
console.log('hello world');
 
// more than one item can be passed
let a = 'foo', b = 'baz', c = 42;
console.log(a, b, c);
```

And then go to the folder in which that javaSript file is stored and use node to run it, then the console log method will spit what I am logging with the console log method to the standard output when called.

```
$ node basic.js
hello world
foo baz 42
```

## 2 - File logger example using the console.Console constructor

It is possible to create a custom logger that will log to some other kind of stream such as a file write stream in the file system module, or a tpc connecting using the net module. To do this I just need to call the console constructor of the node console global to create a new logger. When doing so I pass the stream that I want to use for the normal output as the first argument and then another stream that I want to use for the standard error output as the second argument when calling the constructor.

```js
let fs = require('fs'),
out = fs.createWriteStream('output.txt'),
err = fs.createWriteStream('errorlog.txt'),
 
logger = new console.Console(out, err);
 
logger.log('hello world');
 
logger.error( new Error('my Custom error has happened') );
```