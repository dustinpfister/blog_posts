---
title: Using klaw, and through2 to walk a file system in node.js.
date: 2018-07-19 13:22:00
tags: [js,node.js]
layout: post
categories: node.js
id: 236
updated: 2018-07-20 10:22:32
version: 1.1
---

When making a command line interface program in node.js that needs to walk a file system recursively there are many options. If you do want to work within the core set of node.js modules without installing any additional from npm there is of course the nodedir method in the file system module that may be of interest. However in this post I will be writing about an npm package option that I seem to like a little for this known as [klaw](https://www.npmjs.com/package/klaw), that can also be used with another popular project known as [through2](https://www.npmjs.com/package/through2). I will be giving file system walking examples mainly using this, but will also touch base on some alternatives as well.

<!-- more -->

## 2 - Basic example of using klaw to walk a file system

```js
let klaw = require('klaw'),
path = require('path'),
 
// the dir to walk
dir_walk = process.argv[2] || process.cwd();
 
klaw(dir_walk, {
 
    depthLimit: 0, // what is only at root
 
})
 
.on('data', function (item) {
 
    if (!item.stats.isDirectory()) {
 
        console.log(path.basename(item.path));
 
    }
 
});
```

## 3 - klaw alternatives

### 3.1 - The nodedir npm package

One of the first file systems walkers I have come across is [nodedir](https://www.npmjs.com/package/node-dir), and I have [written a post](/2017/11/05/nodejs-node-dir/) on this on a while back. As of this writing it would look as though the project is no longer supported, as there has not been a single commit at least for over a year now. Still the main method of interest does seem to work okay for what it was designed to do if you want to give it a try anyway.