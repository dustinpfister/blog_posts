---
title: JavaScript Promise general overview
date: 2021-10-22 10:45:00
tags: [js]
layout: post
categories: js
id: 934
updated: 2021-10-22 11:22:04
version: 1.6
---

I have not yet got around to writing a post that is a general overview of [Promises in javaScript](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261) just a whole lot of posts on various native methods of the Promise Object as well as various libraries and other native javaScript features surrounding the use of Promises. So then in todays post I will be putting and end to this by writing a post that will serve as a way to tie all of this together.

<!-- more -->


## 1 - JS Promise basics

To start off this post I will be taking a moment to write about some basics of Promises, as well as any and all related topics that might come up in the process of doing so. There is of course having at least some background when it comes to getting started with javaScript itself in general, as well as all kinds of various other topics that you should know before hand. As such I will not be getting into all the various little details that you show know before reading this, however I will be trying my best to keep things fairly simple in the basic getting started type section as always.

### The source code examples in this post can be found on Github

If you are wondering if the source code examples in this post are stored somewhere on Github you would be right, they are in my test vjs Github repository. In that repository I also have all the source code examples for all my other posts on vanilla javaScript

### 1.1 - A nodejs example of the Promise Constructor

```js
// requiring in the file system module
let fs = require('fs');
// usning the Promise constructor as a way to create a promise
new Promise((resolve, reject) => {
    let uri = process.argv[2];
    // reject if not URI to a file is given
    if(!uri){
        reject(new Error('ENOURI: no path to file given as first positonal argument.'));
    }else{
        // if we have a given uri try to read it
        fs.readFile(uri, 'utf8', (e, data) => {
            // if we have an error reject passing that error object
            if(e){
                reject(e);
            }else{
                // else resolve with what should be the data of the file
                resolve(data);
            }
        });
    }
})
// then if all goes well
.then((data)=>{
    console.log(data);
})
// if any error happens we will end up here
// and the above then call will not fire
.catch((e) => {
    console.warn(e.message);
});
```


## 2 - The nodejs promisify method in the utils module

In nodejs there is the util module, and in this module there is a [util promisify method](/2019/06/22/nodejs-util-promisify/) that can be used as a way to create a method that will return a promise from a method that uses old nodejs style call back functions. On nodejs built in module that is packed with methods that use this kind of callback function would be the [nodejs file system module](/2018/02/08/nodejs-filesystem/).

### 2.1 - Basic util promisify example

```js
// requiring in the file system module
let fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);
// read file method should return a promise in node 8+
readFile(process.argv[2], 'utf8')
.then((data)=>{
    console.log(data);
})
.catch((e) => {
    console.warn(e.code, ' : ', e.message);
});
```

### 2.2 - Not using promisify, and just using the fs.promises in late nodejs versions


```js
let fs = require('fs');
 
fs.promises.readFile(process.argv[2], 'utf8')
.then((data)=>{
    console.log(data);
})
.catch((e) => {
    console.warn(e.code, ' : ', e.message);
});
```

```
$ node16 
$ node8 
```

### 2.3 - Monkey patching fs.promises

```js
let fs = require('fs'),
promisify = require('util').promisify;
 
fs.promises = fs.promises || {};
fs.promises.readFile = fs.promises.readFile || promisify(fs.readFile);
 
fs.promises.readFile(process.argv[2], 'utf8')
.then((data)=>{
    console.log(data);
})
.catch((e) => {
    console.warn(e.code || '', ' : ', e.message);
});
```