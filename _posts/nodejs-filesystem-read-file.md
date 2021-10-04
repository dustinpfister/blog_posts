---
title: Nodejs write file method basics and more
date: 2020-05-12 17:09:00
tags: [node.js]
layout: post
categories: node.js
id: 657
updated: 2021-10-04 15:54:15
version: 1.3
---

The nodejs [read file file system method](https://nodejs.org/en/knowledge/file-system/how-to-read-files-in-nodejs/) is a method in node build in [file system module](/2018/02/08/nodejs-filesystem/). This method might work just fine when I just want to read a file in full, and not do anything fancy with streaming or reading by way of a buffer. In most cases this method will work fine if I just simple want to read a small file, however it is not a golden hammer for all situations in which I need to read data from the local file system. Never the less it would seem that I never got around to writing a post on this method, so lets get this one out of the way.

<!-- more -->

## 1 - Some basic examples of the nodejs read file method

### 1.1 - very basic hello world style example of fs.readFile

```js
let fs = require('fs');
fs.readFile('./basic.js', (err, data) => {
    console.log(Buffer.isBuffer(data)); // true
    console.log(typeof data); // 'object'
    console.log(data.toString()); // [text of this code]
});
```

### 1.2 - Setting the encoding

```js
let fs = require('fs');
fs.readFile('./basic.js', 'utf8', (err, data) => {
    console.log(Buffer.isBuffer(data)); // false
    console.log(typeof data); // string
});
```

### 1.3 - Error handing

```js
let fs = require('fs'),
uri_conf = './conf.json';
 
let step = (obj) => {
    obj.count += 1;
    console.log('count is now: ' + obj.count);
    fs.writeFile(uri_conf, JSON.stringify(obj), (e) => {
        if (e) {
            console.log(e.message)
        } else {
            console.log('updated conf.json');
        }
    })
};
 
fs.readFile(uri_conf, 'utf8', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('NO conf.json FILE, making a new one!');
            let newObj = {
                count: 0
            };
            fs.writeFile(uri_conf, JSON.stringify(newObj), (e) => {
                if (!e) {
                    step(newObj);
                }
            })
        }
    } else {
        try {
            step(JSON.parse(data));
        } catch (e) {
            console.warn(e.message);
        }
    }
});
```