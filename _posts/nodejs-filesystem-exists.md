---
title: Fs exists method in nodejs and better alternatives
date: 2019-06-21 07:42:00
tags: [node.js]
layout: post
categories: node.js
id: 484
updated: 2019-06-21 07:54:43
version: 1.1
---

The fs exists method in the file system module of nodejs should not be used at all these days. In node 8.x it has been deprecated, and it is reasonable that it might not work at all in future versions of nodejs. So then how does one test if a file is there or not, well there are a number of ways to do that by just opening the file, and then handle the error in the event that the file is not there.In all fairness that is how it should be done anyway using the fs exists method just makes things more complacted than they need to be.

<!-- more -->

## 1 - fs exists method alternative example

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