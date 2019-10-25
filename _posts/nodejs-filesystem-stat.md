---
title: Getting file system stats with fs.stat
date: 2018-02-15 21:00:58
tags: [js,node.js]
layout: post
categories: node.js
id: 153
updated: 2019-10-25 13:33:04
version: 1.5
---

Getting the stats of a file is quick and easy in [node.js](https://nodejs.org/en) with just the nodejs built in core file system module fs.stat method. A stat object contains useful information about a file such as when it was last modified, and the data size of it. A stat object also contains methods that can be used to find if the current file is in fact a file, or a directory. So in this post I will be going over a few quick examples of using the fs.stat method in a nodejs environment.

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

## 2 - Find out if an item in a list is a file

When getting a stat object with fs.stat, there are many useful stats on the file, but there are also useful methods like stat.isFile that can be used to find out of an item in a dir is a file, or a directory.

```js
let fs = require('fs'),
path = require('path'),
cwd = process.cwd(),
dir_used = process.argv[2] || cwd;
 
let getDirList = function (dir) {
 
    dir = dir || cwd;
 
    return new Promise(function (resolve, reject) {
 
        // read the contents of the dir
        fs.readdir(dir, function (e, list) {
 
            if (e) {
 
                reject(e.message);
 
            }
 
            resolve(list);
 
        });
 
    });
 
};
 
let listFiles = function (dir) {
 
    let i = 0,
    len = 0,
    files = [];
 
    dir = dir || dir_used;
 
    return new Promise(function (resolve, reject) {
 
        getDirList(dir).then(function (list) {
 
            let i = 0,
            len = list.length,
 
            next = function () {
 
                let file = list[i];
 
                fs.stat(path.join(dir, file), function (e, stat) {
 
                    //console.log(file);
                    //console.log(stat.isFile());
 
                    if (e) {
 
                        reject(e.message);
 
                    }
 
                    if (stat.isFile()) {
 
                        files.push(file);
 
                    }
 
                    i += 1;
 
                    if (i >= len) {
 
                        resolve(files);
 
                    } else {
 
                        next();
 
                    }
 
                });
 
            };
 
            next();
 
            //});
 
        });
 
    });
 
};
 
listFiles(dir_used).then(function (list) {
 
    console.log(list);
 
});
```
