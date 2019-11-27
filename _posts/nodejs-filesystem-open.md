---
title: node open file examples
date: 2019-11-25 13:23:58
tags: [js,node.js]
layout: post
categories: node.js
id: 570
updated: 2019-11-26 19:19:03
version: 1.3
---

So in most of my nodejs projects I just use the fs.writeFile, and fs.readFile methods when it comes to working with files. With many of my projects just working with those methods get the job done just file. However of course there are more tools in the box, and sometimes it might be better to go with the [fs.open](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback) method, and then methods like fs.write, and fs.read.

<!-- more -->

## 2 - Use the r+ flag over w and w+ as they do not seem to work the way they should

When I look at the table of flag options for the fs.open method the w+ flag looks like a good option for some cases. It is a mode where I will be opening a file for reading and writing, and the file will be created if it is not there unlike the r+ mode that will cause an error if the file is not there. However this is not the case as both the w and w+ modes do not work as I would expect them two when using the fs.write method.

When I use the w, or w+ flag and write at a position in a file that is at a starting byte location other than zero, the whole of the content of the file from byte position 0 to the start location ends up being filled with null byte values. So I have found that I just need to use the r+ flag when I want to read and write to a file, or just write to a file actually, and just handle the error that will occur if the file is not there to begin with.

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