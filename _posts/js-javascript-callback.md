---
title: javaScript callbacks and more
date: 2019-03-25 13:36:00
tags: [js]
layout: post
categories: js
id: 406
updated: 2019-04-01 15:53:05
version: 1.12
---

In [javaScript callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) are often used as a way to define some logic that is to execute later on. They are often used with, or as a replacement for other options such as promises. In many javaScript projects, code examples, and so forth chances are you will be encountering at least one or tow callbacks now and then so it is important to know a thing or two about them.

<!-- more -->


## 1 - javaScript callback basics

The basic idea of a call back is that it is a function that will fire at a later time. This allows for additional code to execute in the mean time. For example say I have a function that accepts two arguments one is a delay, and another is a function to fire once that delay has elapsed.

```js
var delay = function (delay, cb) {
    delay = delay === undefined ? 0 : delay;
    cb = cb === undefined ? function () {}: cb;
    return setTimeout(cb, delay);
};
 
// 'no delay logs first'
delay(1000, function(){
    console.log('delay');
});
console.log('no delay')

```

The important thing to note here is that in this example the no delay message logs to the console first. So the execution of javaScript is not delayed. So this qualifies as a basic example of a callback in javaScript as it is a function that is to be called at a later time. This might not be the best example of a callback though so lets look at some additional examples.

## 2 - Node.js callback examples

When it comes to a node.js project callbacks come up a lot. They where used all the time in the early days of node.js as a way to define javaScript code that is to run after a task that will take some time is completed. They are still often used as one way of going about doing that sort of thing when needed.

### 2.1 - Using an fs module method

One of the most common examples of a callback in node.js examples might be with a method in the node.js file system module. Many of these methods have to do with reading or writing something to a local file system. These kinds of tasks can take a little time compared to doing something that involves just doing a little math. So one way or another it is necessary to define some code that will run which the task completes so that anything else that needs to happen is not put on pause while waiting for that to happen. So a callback is one way to go about doing that.

```js
let fs = require('fs');
 
// using readFile with a callback method
fs.readFile('basic.js', function (e, data) {
    if (e) {
        console.log(e.message);
    }
    if (data) {
        console.log(data.toString());
    }
});
 
// this will log first.
console.log('first!');
```

There are other ways of going about handling these kinds of situations such as with promises. When using callbacks all the time in more complex node.js projects this can quickly result in callback hell, a term which refers to situations in which there are many nesed callbacks.

### 2.2 - Callback hell in node.js

So say you want to get a list of files in a directory, then for each file get stats for each file. Once stats are obtained use the states object to find out if an item in the directory is a file or folder, and if so if it is a javaScript file. If the conditions are meet then read the file and log the javaScript code to the console.

Complex tasks like this can be done with the node.js file system module alone, but it often involves the use of more than one file system method each requiring a callback resulting in the so called callback hell.

```js
let fs = require('fs'),
path = require('path'),

root = path.resolve('./');

// read a root dir for files (using a callback)
fs.readdir(root, function (e, files) {
 
    if (files) {
 
        // for each file
        files.forEach(function (file) {
            let dir = path.join(root, file);
 
            // get stats for a file (another callback)
            fs.stat(dir, function (e, stats) {
 
                if (stats.isFile() && path.extname(dir).toLowerCase() === '.js') {
 
                    // read file (yet another callback)
                    fs.readFile(dir, function (err, data) {
 
                        // finally log javaScript code
                        console.log(data.toString());
 
                    })
 
                }
 
            });
 
        });
    }
 
});
```

There are ways of resolving this that involve the use of promises. In late versions of node.js (11.x) there is what is at the time of this writing experimental support for promises. For older versions of node.js there is npm packages like [fs-extra](/2018/01/08/nodejs-fs-extra/) that add promise support to the fs module.