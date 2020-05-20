---
title: Nodejs symlink file method for making symbolic links
date: 2020-05-19 20:09:00
tags: [node.js]
layout: post
categories: node.js
id: 658
updated: 2020-05-19 20:30:06
version: 1.0
---

In the nodejs file system module there is a method for creating symbolic links.

<!-- more -->

## 1 - Basic node symlink example

```js
let fs = require('fs'),
path = require('path'),
cwd = process.cwd();
 
fs.symlink(path.join(cwd,'..'), path.join(cwd, 'back'), 'junction', (e) => {
    if (e) {
        console.log(e);
    } else {
        console.log('made a link');
    }
});
```