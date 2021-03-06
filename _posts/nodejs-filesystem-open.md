---
title: node open file examples
date: 2019-11-25 13:23:58
tags: [js,node.js]
layout: post
categories: node.js
id: 570
updated: 2019-11-26 19:38:37
version: 1.8
---

So in most of my nodejs projects I just use the fs.writeFile, and fs.readFile methods when it comes to working with files. With many of my projects just working with those methods get the job done just file. However of course there are more tools in the box, and sometimes it might be better to go with the [fs.open](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback) method, and then methods like fs.write, and fs.read.

<!-- more -->

## 1 - An fs open basic example in node with the file system core module

In this Section I will be starting out with just a few basic examples of the fs open method in the node file system module.

### 1.1 - Basic fs open example callback style

Here is a basic hello world example of the fs open method, in the old callback style. Right off the bat you can see that there is a problem forming with the so called callback hell. The fs open method just opens a file and gives a file descriptor value as an argument via the callback method that is given. That file descriptor or fd for short is then what can be used with methods like fs read, and fs right all of which also used callbacks.

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

The basic idea of the fs open method is there though, I call the fs open method pass a path to a file that I want to open, along with a flag, and file access mode, and then a means to do something later on with the file descriptor once it is available.

So then there is a desire to use some other way of handling this so that I do not end up with so many nested callbacks like this. One way is to use promises so lets look at another example that does the same thing only promise style.

### 1.2 - Basic fs open example promise style

Here now is the same example as before but now I am using the promisify method of the util module to make new methods that return a promise. I can now use these methods as a way to make use of the fs open method along with fs read, write, and close.

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