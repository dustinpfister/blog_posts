---
title: Nodejs write file method basics and more
date: 2019-06-14 09:49:00
tags: [js,node.js]
layout: post
categories: node.js
id: 479
updated: 2019-11-21 12:43:24
version: 1.7
---

The [nodejs write](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) nodejs [file system module](/2018/02/08/nodejs-filesystem/) method will come up a lot when it comes to do anything with, well writing a file in nodejs. There is more that one method in the file system module that can eb used to write data to a file system, but this is the one that I find myself using all the time over the others.
 
There is the old way of how to go about using the nodejs write file method that can lead to a kind of call back hell, and then there is the more modern way of using write file that involves the use of promises and the util promisify method. I generally choose to use promises over callbacks because I use write file along with many other methods and I find that promises are a much better way of making many calls to methods like this in a certain order.

<!-- more -->

## 1 - Basic examples involving the use of node write file file system method

In this section I will be going over a very basic hello world style example of the nodejs write file method. One that just involves the use of a callback that will work on a wide range of nodejs versions. I will then be going over a more advanced example that makes use of the promisify method in the util module that I can use to make a version of the write file method that returns a promise on versions of node that do not do so by default.

So this is just a getting started section of sorts with writing files in nodejs.

## 1.1 - nodejs write file method basic example

A basic example of the nodejs write file method is to require in the nodejs file system module, and then call the fs.wrietFile method passing the path of the file to write to as the first argument, followed by the data to write to, and then the encoding and callback to fire when done.

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

this is the old school way to go about using the nodejs write file method that can lead to a kind of callback hell if a whole much of read and write operations need to be preformed in sequence. So in es2015+ javaScript there is now native support for Promises which many javaScript developers argue is a far batter way to deal with reading and writing to fines in node.

## 1.2 - Write file method using promises

So in later versions of nodejs it looks like there might now be native support for Promises when using nodejs file system method like the write file method. However in this section I am assuming that you might be using an older version of node. SO you just need to use some kind of dependency like fs-extra to promisify the fs module, or just write some read and write methods that return promises.

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