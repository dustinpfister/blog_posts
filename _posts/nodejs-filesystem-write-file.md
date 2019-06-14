---
title: Nodejs write file method basics and more
date: 2019-06-14 09:49:00
tags: [js,node.js]
layout: post
categories: node.js
id: 479
updated: 2019-06-14 09:54:33
version: 1.1
---

The nodejs write file method will come up a lot when it comes to do anything with, well writing a file in nodejs. There is the old way of how to go about using the nodejs write file method that can lead to a kind of call back hell, and then there is the more modern way of using write file that involves the use of promises.

<!-- more -->

## 1 - nodejs write file method basic example

```js
let fs = require('fs'),
path = require('path'),
cwd = process.cwd(),
 
text = process.argv[2] || 'hello world',
dir = path.join(cwd, 'test.txt');
 
fs.writeFile(dir, text, 'utf-8', (e)=> {
    if (e) {
        console.log(e);
    }
});
```

## 2 - Write file method using promises

```js
let fs = require('fs'),
path = require('path'),
path_conf = path.join(process.cwd(), 'conf.json'),
default_conf = {
    reset: false,
    count: 0
};
// write
let write = (file_path, text) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file_path, text, 'utf-8', (e) => {
            if (e) {
                reject(e);
            } else {
                resolve(text);
            }
        });
    });
};
 
// read
let read = (file_path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf-8', (e, text) => {
            if (e) {
                reject(e);
            } else {
                resolve(text);
            }
        });
    });
};
 
// read conf.json
read(path_conf)
 
// then if we have a conf.json
.then((json) => {
    let conf = JSON.parse(json);
    if (conf.reset) {
        conf = default_conf;
    } else {
        conf.count += 1;
    }
    console.log('updated conf.json');
    console.log(conf);
    return write(path_conf, JSON.stringify(conf));
})
// else an error
.catch ((e) => {
    let conf = default_conf;
    console.log('ERROR reading conf.json, writing a new one');
    console.log(conf);
    return write(path_conf, JSON.stringify(conf));
});
```