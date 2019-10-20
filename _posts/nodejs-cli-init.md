---
title: A node cli project initialization tool
date: 2019-10-18 21:25:00
tags: [js,node.js]
layout: post
categories: node.js
id: 547
updated: 2019-10-20 18:18:40
version: 1.1
---

So I thought I would write a whole bunch of posts on node cli tool examples.

<!-- more -->

## 1 - The index.js file of the node cli ini command

```js
#!/usr/bin/env node
 
let checkTarget = require('./check-target.js'),
createProject = require('./create-project.js'),
 
target = process.argv[2] || process.cwd();
 
checkTarget(target)
 
.then(() => {
    return createProject(target);
})
 
.catch((e) => {
 
    console.log(e.message);

})
```

## 2 - Check the target path


```js
// using the fs module, and the promisify method
// of the util module
let fs = require('fs'),
promisify = require('util').promisify,
 
// promisify fs.stat, and fs.readdir
stat = promisify(fs.stat),
readdir = promisify(fs.readdir);
 
// the check target method is the only thing exported
module.exports = (target) => {
 
    // get stats
    return stat(target)
 
    // if the target is a dir, read the contents
    .then((stat) => {
        if (stat.isDirectory()) {
            return readdir(target);
        }
        // if not a dir fail
        return Promise.reject(new Error('target is not a directory.'));
    })
 
    // just resolve if dir contents are empty
    .then((files) => {
        if (files.length === 0) {
            return Promise.resolve();
        }
        // fail if there are contents
        return Promise.reject(new Error('The directory is not empty'));
    });
 
};
```

## 3 - The create project module

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
 
mkdir = promisify(fs.mkdir),
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile);
 
// create a new project at target
module.exports = (target) => {
 
    // make posts folder
    return mkdir(path.join(target, '_posts'))
 
    // read demo post
    .then(() => {
        return readFile(path.join(__dirname, 'demo-post.md'));
    })
 
    // write demo post in new _posts folder
    .then((data) => {
        return writeFile(path.join(target, '_posts', 'first-post.md'), data);
    })
 
};
```