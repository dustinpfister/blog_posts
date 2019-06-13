---
title: Nodejs json read write and convert
date: 2019-06-22 09:22:00
tags: [js,node.js]
layout: post
categories: node.js
id: 477
updated: 2019-06-13 11:57:09
version: 1.2
---

In nodejs json is often used as the standard data serialization language of choice for most applications. There are alternatives such as yaml, but for this post I will be goijg over some of the basics of json in node.js.

<!-- more -->

## 1 - In nodejs json can be quickly loaded with require

If I just want to simply load in some JSON from an external javaScript [nodejs require](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_require) can be used to do so without having to bother with the file system module or any other kind of additional third party module.

So in a pinch if you know the relative path to the json that you want to load, and the json is property formated json could be parsed just like this.

```js
let json = require('./my-json.json');
console.log(json.foo); // 'bar'
```

Although this might work okay there are still some drawbacks when it comes to error handling at least in the event that the json file is not there, or is not property formated for whatever the reason. So lets take a look at some other options.

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
