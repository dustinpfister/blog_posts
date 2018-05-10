---
title: Getting file system stats with fs.stat
date: 2018-02-15 21:00:58
tags: [js,node.js]
layout: post
categories: node.js
id: 153
updated: 2018-02-20 18:33:50
version: 1.3
---

Getting the stats of a file is quick and easy in [node.js](https://nodejs.org/en) with just the core file system modules fs.stat method. A stat object contains useful information about a file such as when it was last modified, and the data size of it. A stat object also contains methods that can be used to find if the current file is in fact a file, or a directory.

<!-- more -->

## basic example of fs.stat

For a basic example of fs.stat I was able to get the stats of a readme file in a demo folder.

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

## Find out if an item in a list is a file

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
