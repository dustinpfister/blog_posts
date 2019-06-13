---
title: Nodejs json read write and convert
date: 2019-06-22 09:22:00
tags: [js,node.js]
layout: post
categories: node.js
id: 477
updated: 2019-06-13 12:32:01
version: 1.6
---

In nodejs json is often used as the standard data serialization language of choice for most applications. There are alternatives to json such as yaml, but for this post I will be going over some of the basics of json in node.js as a way of handing data serialization and config files.

<!-- more -->

## 1 - In nodejs json can be quickly loaded with require

If I just want to simply load in some JSON from an external javaScript [nodejs require](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_require) can be used to do so without having to bother with the file system module or any other kind of additional third party module.

So in a pinch if you know the relative path to the json that you want to load, and the json is property formated json could be parsed just like this.

```js
let json = require('./my-json.json');
console.log(json.foo); // 'bar'
```

Although this might work okay there are still some drawbacks when it comes to error handling at least in the event that the json file is not there, or is not property formated for whatever the reason. So lets take a look at some other options.

## 2 - So about the possibility of bad json and other errors

When when loading in json in a nodejs project with require there is a possibility that some kind of error might happen in the process. So a common way of going about handling errors with async tasks such as grabbing json these days with javaScript is to use promises.

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

This way if an error happens when loading a json file I can write some logic that will do something in the event that an error occurs.

## 3 - write json

So require can be used to import json but it can not be used to export it. For this something more will need to be used on top of just require. The file system module in node.js can be used to read and write files and do a wide range of additional file io related tasks. So in this section I will be going over a simple example that can be used as a way to write some json to a file using the file system write method and the JSON stringify method.

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
