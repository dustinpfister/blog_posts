---
title: Nodejs json read write and convert
date: 2019-06-22 09:22:00
tags: [js,node.js]
layout: post
categories: node.js
id: 477
updated: 2019-06-12 09:29:04
version: 1.1
---

In nodejs json is often used as the standard data serialization language of choice for most applications. There are alternatives such as yaml, but for this post I will be goijg over some of the basics of json in node.js.

<!-- more -->

## 1 - In nodejs json can be quickly loaded with require

```js
let json = require('./my-json.json');
console.log(json.foo); // 'bar'
```

## 2 - However what about the possibility of bad json

```js
let loadJSON = (dir_file) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(require(dir_file));
        } catch (e) {
            reject(e);
        }
    });
};
 
loadJSON('./my-bad-json.json')
.then((json) => {
    console.log('we are good');
    console.log(json)
}).catch ((e) => {
    console.log(e.message);
});
```

## 3 - write json

```js
let fs = require('fs');
 
let writeJSON = (dir_file, obj) => {
    return new Promise((resolve, reject) => {
        try {
            let json = JSON.stringify(obj);
            fs.writeFile(dir_file, json, (e) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(json);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};
 
writeJSON('./foo.json', {
    t: new Date(),
    n: 42
}).then((json) => {
    console.log('write good');
    console.log(json)
}).catch ((e) => {
    console.log(e.message);
});
```
