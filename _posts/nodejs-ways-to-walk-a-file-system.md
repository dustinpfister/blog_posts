---
title: Some Ways to walk a file system in node.js
date: 2018-07-20 17:28:00
tags: [js,node.js]
layout: post
categories: node.js
id: 237
updated: 2018-07-23 11:24:37
version: 1.6
---

As I work to expand my content on node.js, I have come around to working out some examples on how to walk a files system. This includes both my own vanilla js solutions, as well as some walkers that other people have made for node.js, such as [klaw](https://www.npmjs.com/package/klaw), and [node-dir](https://www.npmjs.com/package/node-dir), just to name a few. In this post I will be covering some options, and if you are looking into this sort of thing for your own project hopefully you will find this post helpful.

<!-- more -->

## 1 - What to know before hand.

This is a post on some node.js options for walking a file system, or in other words looping over the contents of a path recursively to preform file io operations on a whole bunch of content. There are many projects that do this in one way or another, or porjects that make use of a file walker of some kind or another like [rimraf](/2017/05/14/nodejs-rimraf/).

## 2 - Lets look at the options with file system walking in node.js

So I will be covering methods that are available in the built in node.js modules that can be used to make your own file sysstem walker from the ground up, along with code examples. I will also be covering some npm packages as well, and linking to other relevant posts on this if you want to read more about each of them.

### 2.1 - fs.readdir: As a vanilla js node.js solution for walking a file system

The fs.readdir method is one of many useful methods in the node.js built in file system module. When I call it I give it a directory, and a callback, and I can do something with the array of items that are in that are in that given directory. This method by itself is not a file system walker, but this method used with several other methods, inside a method that is called recursively can result in a simple walker.


If you start playing with this option you might end up with something like this:

```js
// just using fs, and path
let fs = require('fs'),
path = require('path');
 
// a simple walk method
let walk = function (dir) {
 
    // get the contents of dir
    fs.readdir(root, (e, items) => {
 
        // for each item in the contents
        items.forEach((item) => {
 
            // get the item path
            let itemPath = path.join(dir, item);
 
            // get the stats of the item
            fs.stat(itemPath, (e, stats) => {
 
                // Just log the item path for now
                console.log(itemPath);
 
                // for now just use stats to find out
                // if the current item is a dir
                if (stats.isDirectory()) {
 
                    // if so walk that too, by calling this
                    // method recursively
                    walk(itemPath);
 
                }
 
            });
 
        });
 
    });
 
};
 
walk(process.cwd());
```

A more advanced example might introduce use of promises, and breaking things down into more methods along with an events that can be used to define what to do for each item instead of just logging the path to the console. This might be a crude example, but it works, and I can work from here into something not so crude.

If interested in learning more about this, you might want to read my [full post on using fs.readdir](/2018/07/20/nodejs-walking-a-file-system-with-fs-readdir/) as a file system walker solution.

### 2.2 - Using klaw, and through2

[klaw](https://www.npmjs.com/package/klaw) is a descent option that I have come to like a lot, and it can also be used with the popular [through2](https://www.npmjs.com/package/through2) project that helps with node.js object streams.

```js
let klaw = require('klaw'),
path = require('path'),
 
// the dir to walk
dir_walk = process.argv[2] || process.cwd();
 
// walking dir_walk with the following options
klaw(dir_walk, {
 
    // default to full recursion, if now depth is given
    depthLimit: process.argv[3] || -1
 
})
 
// for each item
.on('data', function (item) {
 
    if (!item.stats.isDirectory()) {
 
        console.log(path.basename(item.path));
 
    }
 
})
 
// when the walk is over
.on('end', function () {
 
    console.log('');
    console.log('the walk is over');
 
});
```

For more on klaw I [have a post on klaw](/2018/07/19/nodejs-klaw/) in which I get into this one in further detail.

### 2.3 - walk

So the npm package that is just simple called walk, is also a decent solution for just quickly getting this done, and moving on with a project.

```js
let dir = process.argv[2] || process.cwd();
 
require('walk').walk(dir)
 
// on file
.on('file', function (root, fileStats, next) {
 
    // log absolute path of each file found
    console.log(require('path').join(root,fileStats.name));
    next();
 
});
```

In addition to the onFile method there are many other such methods for directories, and error handling as well. For more on walk you might want to [check out my post on walk](/2018/07/23/nodejs-walk/) for more.

### 2.4 - node-dir

So [node-dir](https://www.npmjs.com/package/node-dir) is an option that I have used in the past with some projects, although I do not use it much these days. It is an older project, and it looks like it is no longer supported, also it does not have many of the features that I like it in walker.


```js
var dir = require('node-dir');
 
dir.readFiles(
 
    './', // the root path
 
    // an options object
    {
 
        match: /.json$/, // only match json files
        recursive: false // only the root dir
 
    },
 
    function (err, content, filename, next) {
 
        if (err) {
 
            console.log(err);
 
        } else {
 
            console.log(filename);
 
        }
 
    }
 
);
```

I wrote a post on [node-dir](/2017/11/05/nodejs-node-dir/) as well a while back.

## 3 - Conclusion

There are many more walkers out there, also there are other ways to make a walker with node.js by itself as well when it comes to making a walker from the ground up. Many of these projects make use of streams. As such I might update this post as I write more content on this subject.