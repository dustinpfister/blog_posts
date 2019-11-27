---
title: node open file examples
date: 2019-11-25 13:23:58
tags: [js,node.js]
layout: post
categories: node.js
id: 570
updated: 2019-11-26 19:23:13
version: 1.4
---

So in most of my nodejs projects I just use the fs.writeFile, and fs.readFile methods when it comes to working with files. With many of my projects just working with those methods get the job done just file. However of course there are more tools in the box, and sometimes it might be better to go with the [fs.open](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback) method, and then methods like fs.write, and fs.read.

<!-- more -->

## 1 - An fs open basic example in node with the file system core module

### 1.1 - Basic fs open example callback style

```js
let fs = require('fs'),
path = require('path'),
 
path_file = path.join(process.cwd(), 'db.txt');
 
fs.open(path_file, 'w+', 0o666, (err, fd) => {
    if (err) {
        console.log(err);
        console.log(fd);
    } else {
        let buff = Buffer.from('Hello World', 'utf8'),
        buff_start = 0,
        buff_length = buff.length,
        file_pos = 0;
        fs.write(fd, buff, buff_start, buff_length, file_pos, (err) => {
            if (err) {
                console.log(err);
                fs.close(fd, () => {
                    console.log('file closed');
                });
            } else {
                console.log('write done');
                fs.close(fd, () => {
                    console.log('file closed');
                });
            }
        });
    }
});
```

### 1.2 - Basic fs open example promise style

```js
let fs = require('fs'),
promisify = require('util').promisify,
path = require('path'),
open = promisify(fs.open),
close = promisify(fs.close),
write = promisify(fs.write),
path_file = path.join(process.cwd(), 'db.txt');
let fd;
open(path_file, 'w+', 0o666)
.then((nFd) => {
    fd = nFd;
    let buff = Buffer.from('Hello World', 'utf8'),
    buff_start = 0,
    buff_length = buff.length,
    file_pos = 0;
    return write(fd, buff, buff_start, buff_length, file_pos);
})
.then(() => {
    console.log('write done');
    return close(fd);
})
.catch((e) => {
    console.log(e);
});
```

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