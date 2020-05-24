---
title: Nodejs symlink file method for making symbolic links
date: 2020-05-19 20:09:00
tags: [node.js]
layout: post
categories: node.js
id: 658
updated: 2020-05-24 09:55:02
version: 1.2
---

In the nodejs file system module there is a method for creating [symbolic links](https://en.wikipedia.org/wiki/Symbolic_link) to files and folders. A symbolic link is just simply a reference to a folder or file rather than a folder of file itself. This method is the fs symlink method and in some cases it can be used without issue, however there are some things to be aware of when it comes to permissions when using it.

<!-- more -->

## 1 - Basic node symlink example

The following can be considered a simple hello world example of the nodejs file system module fs symlink method. Here I am just creating a symlibnk to the folder that is one down from the current working folder.

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

If the script is run with node from a user account with the proper access permissions then it should be able to create a symlink in windows and most posix systems.