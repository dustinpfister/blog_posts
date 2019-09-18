---
title: Promise resolve and reject methods for just creating a resolve or rejected promise
date: 2019-09-18 11:49:00
tags: [js]
layout: post
categories: js
id: 536
updated: 2019-09-18 12:43:50
version: 1.4
---

When working with [promises in javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) there will come a time now and then where I just want to return a resolved promise without having to bother with the promise constructor to do so. Well luckily even with native javaScript promises there is the [Promise.resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve), and [Promise.reject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) methods that can do just that. These methods will come in handy often when creating a long chain of promises and then method calls where I just want to return a resolve or rejected promise inside the body of a method that I am using with the then promise prototype method. It is basically a more appropriate alternative to using the promise constructor to just call resolve inside the body of a function that is given to the promise constructor, which will also work but why bother when you have Promise.resolve.

So todays post will just be on the Promise.resolve, and promise.reject methods.

<!-- more -->

## 1 - First a Basic Promise example that will resolve or reject

So if you are new to using promises or just want to review how they are use in this section I will be going over a basic example that uses the promise constructor.

```js
let defaultTest = () => {
    let i = Math.pow(10, 8),
    st = new Date(),
    t,
    n = 0;
    while (i--) {
        n += 5;
    }
    t = new Date() - st;
    if (t < 250) {
        return true;
    }
    return false;
}
 
// so I have a method that returns a promise that can resolve
// or reject depending on the outcome of what it does
let delayTest = (delay, theTest) => {
    delay = delay === undefined ? 1000 : delay;
    theTest = theTest === undefined ? defaultTest : theTest;
    return new Promise((resolve, reject) => {
 
        if (theTest()) {
            resolve('the test passed');
        }
        reject('the test failed');
 
    });
};
 
// I can then use the promise example
// and have methods that will fire if the promise resolves
// or rejects
delayTest()
.then((mess) => {
    console.log(mess)
})
.catch((e) => {
    console.log(e);
});
```

## 2 - Using Promise or reject resolve in place of the Promise constructor

```js
// if you find yourself doing this
let justGiveAResolvedPromise = (obj) => {
    obj = obj || {};
    return new Promise((resolve) => {
        resolve(obj)
    })
};

justGiveAResolvedPromise({
    mess: 'we are good'
})
.then((obj) => {
    console.log(obj.mess);
});

// You Could just do this with Promise.reject
Promise.resolve({
    mess: 'we are good'
})
.then((obj) => {
    console.log(obj.mess);
});
```

## 3 - nodejs check file example of promise reject use in a promise chain


```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify;
 
let stat = promisify(fs.stat),
readFile = promisify(fs.readFile);
 
let thePath = path.resolve(process.argv[2] || process.cwd());
 
// get stats of path
stat(thePath)
 
// just check if dir
.then((stats) => {
    let isDir = stats.isDirectory();
    if (isDir) {
        // if dir using Promise.reject to reject
        // breaking the chain and jumping to catch
        return Promise.reject(new Error('the given path is a dir'));
    }
    return stats;
})
 
// read file
.then((stats) => {
    return readFile(thePath)
})
 
// log the data
.then((data) => {
    console.log(data.toString());
})
 
.catch((e) => {
    console.log(e.message);
});
```