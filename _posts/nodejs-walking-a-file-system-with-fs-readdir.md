---
title: Walking over the contents of a path recursively with fs.readdir
date: 2018-07-20 17:48:00
tags: [js,node.js]
layout: post
categories: node.js
id: 238
updated: 2018-07-20 17:56:19
version: 1.1
---

The subject of walking, or looping over a file system path recursively for the purpose of doing some kind of file operation on a whole bunch of files in a directory that meet a certain criteria is a subject that comes up often with node.js development. There are many options when it comes to doing this, some of which are well known npm packages such as walk, and klaw. However in this post I will be writing about how to go about doing so with just the node.js build in file system modules readdir method, along with some others a well.

<!-- more -->


## 2 - basic example of fs.readdir

```js
let fs = require('fs');
 
fs.readdir(process.cwd(), (e,items)=>{
 
    console.log(items);
 
});
```

## 3 - A file system walker using fs.readdir


### 3.1 - just using fs, and path here.

```js
let fs = require('fs'),
path = require('path');
```

### 3.2 - The readDir method that makes use of fs.readdir

```js
// read a dir using fs.readdir
let readDir = function (dir) {
 
    return new Promise((resolve, reject) => {
 
        fs.readdir(dir, function (e, contents) {
 
            if (e) {
 
                reject(e)
 
            } else {
 
                resolve(contents);
 
            }
 
        });
 
    });
 
};
```

### 3.3 - A get stats method

```js
// get the stats
let readStats = function (itemPath) {
 
    return new Promise((resolve, reject) => {
 
        fs.stat(itemPath, function (e, stats) {
 
            if (e) {
 
                reject(e)
 
            } else {
 
                resolve(stats);
 
            }
 
        });
 
    });
 
};
```
 
### 3.4 - The method that will call itself recursively

```js
// read dir recursive
let readDirRecursive = function (opt, dir, curDepth, maxDepth) {
 
    readDir(dir).then(function (items) {
 
        items.forEach(function (item) {
 
            let nextDepth = curDepth + 1,
            api = {
                fs: fs,
                item: {
                    path: path.join(dir, item),
                    filename: path.basename(path.join(dir, item))
                }
            };
 
            // read stats
            readStats(api.item.path).then(function (stats) {
 
                api.item.isDir = stats.isDirectory();
                api.item.stats = stats;
                api.item.level = curDepth;
                api.item.data = null;
 
                // call forItem
                if (opt.read) {
 
                    // read contents
                    fs.readFile(api.item.path, function (e, data) {
 
                        if (data) {
                            api.item.data = data;
                            opt.forItem.call(api, api.item);
 
                        }
 
                    });
 
                } else {
 
                    // else just give the item
                    opt.forItem.call(api, api.item);
 
                }
 
                // if dir
                if (stats.isDirectory()) {
 
                    if (curDepth < maxDepth || maxDepth === -1) {
 
                        readDirRecursive(opt, api.item.path, nextDepth, maxDepth);
 
                    }
 
                }
 
            });
 
        })
 
    })
 
};
```

### 3.5 - Export it

```js
module.exports = function (opt, forItem) {
 
    opt = opt || {};
 
    // if opt is a string
    if (typeof opt === 'string') {
 
        // that is the same as calling with and object
        // like this
        opt = {
            root: opt
        };
 
    }
 
    // resolve opt.root to an absolute path
    opt.root = path.resolve(opt.root || process.cwd());
 
    // depth defaults to -1 for unlimited recursion
    opt.depth = opt.depth || -1;
 
    // set forItem method
    opt.forItem = opt.forItem || forItem || function (item) {
        console.log(item);
    };
 
    // start recursive read
    readDirRecursive(opt, opt.root, 0, opt.depth);
 
};
```

## 4 - some examples of this working

### 4.1 - basic example

```js
let jWalk = require('./jwalker.js');
 
jWalk('./', function (item) {
 
    console.log(item.level + ':' + item.path);
 
});
```