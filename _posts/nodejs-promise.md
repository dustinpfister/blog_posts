---
title: Node promise basics and beyond
date: 2019-11-18 12:13:00
tags: [node.js]
layout: post
categories: node.js
id: 565
updated: 2019-11-18 12:20:35
version: 1.1
---

Looking back I have wrote a few posts on promises in nodejs, and a few when it comes to using them in javaScript in general. However I have not yet wrote a main post on node promise topics in general. From just starting out with the Promise constructor, and the using the promisify utility method to convert old callback style methods to methods that return promises.

It would also be nice to have one post where I go beyond just the basics of promises, and give some real solid examples that outline why they are great for handing a whole bunch of async tasks.

<!-- more -->

## 1 - Node promise basics


### 1.1 - The old node callback style way

```js
let fs = require('fs');
 
fs.readFile('./README.md', 'utf8', function (e, data) {
    if (e) {
        // error message if there is a problem
        console.log(e.message);
    } else {
        // the content of the file if it is there
        // and all id well
        console.log(data.toString());
    }
});
```

### 1.2 - The Node Promise native constructor

```js
let fs = require('fs');
 
let readFile = (filePath, encoding, flag) => {
    encoding = encoding || 'utf8';
    flag = flag || 'r';
    if (!filePath) {
        return Promise.reject(new Error('file path not given to readFile method.'))
    }
    // return a new Promise created with the
    // promise constructor
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, {
            encoding: encoding,
            flag: flag
        }, function (e, data) {
            if (e) {
                reject(e);
            } else {
                resolve(data);
            }
        });
    });
};
 
readFile('./README.md')
.then((data) => {
    // the content of the file if it is there
    // and all id well
    console.log(data.toString());
})
.catch((e) => {
    // error message if there is a problem
    console.log(e.message);
});

```

### 1.3 - THe Util module and the promisify method

```js
let fs = require('fs'),
promisify = require('util').promisify;
 
let readFile = promisify(fs.readFile);
 
readFile('./README.md')
.then((data) => {
    // the content of the file if it is there
    // and all id well
    console.log(data.toString());
})
.catch((e) => {
    // error message if there is a problem
    console.log(e.message);
});
```