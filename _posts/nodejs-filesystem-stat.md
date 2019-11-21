---
title: The fs.stat method and getting stats of a file and directory in nodejs
date: 2018-02-15 21:00:58
tags: [js,node.js]
layout: post
categories: node.js
id: 153
updated: 2019-11-21 09:53:29
version: 1.7
---

Getting the stats of a file is quick and easy in [node.js](https://nodejs.org/en) with just the nodejs built in core file system module, and the [fs.stat](https://nodejs.org/api/fs.html#fs_fs_fstat_fd_options_callback) method. A stat object contains useful information about a file such as when it was last modified, and the data size of it. A stat object also contains methods that can be used to find if the current file is in fact a file, or a directory. So in this post I will be going over a few quick examples of using the fs.stat method in a nodejs environment.

<!-- more -->

## 1 - basic example of fs.stat

For a basic example of fs.stat how about just getting the stats of a readme file in a demo folder. to do this I just need to require in the filesystem module, and then I can use the fs.stat method to get the stats of a file by passing the path to the file as the first argument, and then a callback as the second argument. In recent versions of nodejs version 12 and forward promises can be used as well, but for now I am using callbacks as a way to ensure better backward compatibility with older versions of node.

```js
let fs = require('fs'),
path = require('path'),
cwd = process.cwd();
 
fs.stat(path.join(cwd, 'README.md'), function (e, stats) {
 
    if (e) {
 
        console.log(e);
 
    }
 
    console.log(stats);
 
});
```

## 2 - Get a list of just files in a path

When getting a stat object with fs.stat, there are many useful stats on the file, but there are also useful methods like stat.isFile that can be used to find out of an item in a dir is a file, or a directory. In this example I am using the stat.isFile method to create a list of just files. This example makes used of many other aspects of nodejs and javaScript in general including the util modules promisify method, fs.readdir, Promise.all, and Array.filter just to name a few all of which are worth checking out if you are not familiar with them.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
dir_root = process.argv[2] || process.cwd();

// promisify fs.readdir and fs.stat
let readdir = promisify(fs.readdir),
stat = promisify(fs.stat),
// is file method that returns an object for the file
// of false for a dir
isFile = (filePath) => {
    return stat(filePath)
    .then((stat) => {
        if (stat.isFile()) {
            return {
                filePath: filePath,
                stat: stat
            }
        }
        return false;
    });
}

// read the dir
readdir(dir_root)
// then map an isFile for each item in the array
// and pass the result to Promise.all
.then((files) => {
    return Promise.all(files.map((file) => {
            return isFile(path.join(dir_root, file));
        }));
})
// once all items are processed filter all false items
// to get a list of just files
.then((result) => {
    result = result.filter((item) => {
            return item;
        });
    console.log(result);
})
.catch((e) => {
    console.log(e.message);
});
```
