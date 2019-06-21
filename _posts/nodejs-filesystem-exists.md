---
title: Fs exists method in nodejs and better alternatives
date: 2019-06-21 07:42:00
tags: [node.js]
layout: post
categories: node.js
id: 484
updated: 2019-06-21 08:10:36
version: 1.6
---

The [fs exists method](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback) in the [file system module](/2018/02/08/nodejs-filesystem/) of nodejs should not be used at all these days. In node 8.x it has been deprecated, and it is reasonable that it might not work at all in future versions of nodejs. So then how does one test if a file is there or not, well there are a number of ways to do that by just opening the file, and then handle the error in the event that the file is not there.In all fairness that is how it should be done anyway using the fs exists method just makes things more complicated than they need to be.

<!-- more -->

## 1 - fs exists method alternative example

Open way to go about kicking fs exists to the curb is to just use fs open with the right flags. There are many options when it comes to flags that can be used with fs open, but for this example the two flags that are of interest are the r+ and w+ flags. The r+ flag will open a file for reading and writing, but will throw an error in the event that the file is not there, in addition it will not create the file as well. The w+ flag on the other hand will do the same thing only it will not throw and error in the event that the file is not there, and will create it, or just open it if it is there.

So a simple method that returns a promise can be written like this.

```js
let fs = require('fs');
let open = (path_file, flags) => {
    flags = flags || 'r+';
    return new Promise((resolve, reject) => {
        fs.open(path_file, flags, (e, fd) => {
            if (e) {
                reject(e)
            } else {
                resolve(fd);
            }
        });
    })
};
```

Keep in mode that I was using nodejs 8.x when I wrote this, in later versions of nodejs the fs.open method itself might return a promise.

### 1.1 - Using fs open to throw and error in the event that a file is not there

So then the fs open method could be used to throw and error in the event that a file is not there, then something can be done such as calling the fs open method again but with the w+ flag then continue g on like normal.

```js
let path_file = './test.txt';
open(path_file)
.catch ((e) => {
    console.log('Error opening ' + path_file);
    console.log(e.code);
    if (e.code === 'ENOENT') {
        return open(path_file, 'w+');
    }
})
.then((fd) => {
    console.log('the file exists the fd is : ' + fd);
    let str = 'hello world';
    let onClose = () => {
        console.log('file closed');
    }
    fs.write(fd, Buffer.from(str), 0, str.length, 0, (e, bw, buff) => {
        if (e) {
            console.log(e.message);
            fs.close(fd, onClose);
        } else {
            console.log('bytes written' + bw);
            fs.close(fd, onClose);
         }
    });
})
```

### 1.2 - Or better yet just the w+ flag can be used alone

To make things even more simple why not just use the w+ flag by itself even.

```js
let path_file = './test.txt';
open(path_file, 'w+')
.then((fd) => {
    console.log('the file exists the fd is : ' + fd);
    let str = 'hello world';
    let onClose = () => {
        console.log('file closed');
    }
    fs.write(fd, Buffer.from(str), 0, str.length, 0, (e, bw, buff) => {
        if (e) {
            console.log(e.message);
            fs.close(fd, onClose);
        } else {
            console.log('bytes written' + bw);
            fs.close(fd, onClose);
        }
    });
});
```