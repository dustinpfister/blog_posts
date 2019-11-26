---
title: node open file examples
date: 2019-11-25 13:23:58
tags: [js,node.js]
layout: post
categories: node.js
id: 570
updated: 2019-11-26 12:14:15
version: 1.1
---

So in most of my nodejs project I just use the fs.writeFile, and fs.readFile methods. With many of my projects just working with those methods get the job done just file. However of course there are more tools in the box, and sometimes it might be better to go with the fs.open method, and then methods like fs.write, and fs.read.

<!-- more -->

## 2 - Use the r+ flag over w and w+ as they do not seem to work the way they should

When I look at the table of flag options for the fs.open method the w+ flag looks like a good option for some cases. It is a mode where I will be opening a file for reading and writing, and the file will be created if it is not there unlike the r+ mode that will cause an error if the file is not there. However this is not the case as both the w and w+ modes do not work as I would expect them two when using the fs.write method.

```js
let fs = require('fs'),
promisify = require('util').promisify,
path = require('path'),
 
open = promisify(fs.open),
close = promisify(fs.close),
write = promisify(fs.write);
 
let writeRecordAt = function (opt) {
    opt = opt || {};
    opt.dbPath = path.resolve(opt.dbPath || './db.txt');
    opt.recNum = opt.recNum || 0;
    opt.recSize = opt.recSize || 8;
    opt.rec = opt.rec || Buffer.alloc(opt.recSize, 'ff', 'hex');
 
    // use r+ actually even though we are just writing
    // because w and w+ do not work as expected.
    return open(opt.dbPath, 'r+', 0o666)
    // file not there?
    .catch((e) => {
        // only use w+ if the file is not there
        // as that will work okay for writing the first record
        // at least
        if (e.code === "ENOENT") {
            return open(opt.dbPath, 'w+', 0o666)
        }
        // reject if other error
        return Promise.reject(e);
    })
    // write the record
    .then((fd) => {
        return write(fd, opt.rec, 0, opt.recSize, opt.recSize * opt.recNum);
    });
};
 
writeRecordAt({
    dbPath: './db.rplus.txt',
    recNum: 2,
    recSize: 8,
    rec: Buffer.from('ccccccc\n', 'utf8')
})
.then(() => {
    console.log('write done');
});
```