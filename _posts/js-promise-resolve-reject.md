---
title: Promise resolve and reject methods for just creating a resolve or rejected promise
date: 2019-09-18 11:49:00
tags: [js]
layout: post
categories: js
id: 536
updated: 2020-10-10 16:39:36
version: 1.12
---

When working with [promises in javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) there will come a time now and then where I just want to return a resolved promise without having to bother with the promise constructor to do so. In addition there is also doing the same but with a rejected promise, just retuning that inside the body of a promise so that is just directly results in a catch statement being called.

Well luckily even with native javaScript promises there is the [Promise.resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve), and [Promise.reject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) methods that can do just that. These methods will come in handy often when creating a long chain of promises and then method calls where I just want to return a resolve or rejected promise inside the body of a method that I am using with the then promise prototype method. It is basically a more appropriate alternative to using the promise constructor to just call resolve inside the body of a function that is given to the promise constructor, which will also work but why bother when you have Promise.resolve.

So todays post will just be on the Promise.resolve, and promise.reject methods.

<!-- more -->

## 1 - First a Basic Promise example that will resolve or reject

So if you are new to using promises or just want to review how they are use in this section I will be going over a basic example that uses the promise constructor. The basic idea of a promise is that it will return an object that represents a task that will resolve or reject over a period of time. The result might not come right away, and also the process of getting a result might fail. So a promise object might resolve to a requested value, and as such things can continue, or it might not at which point some additional action might need to be preformed such as trying again.

So then a promise is an alternative to using [callback functions](/2019/03/25/js-javascript-callback/). Callback functions are often functions that will fire at a later point and when they do so there is often a way to check if an error happed or not in the body of the single callback function. Once nice thing about promises over callbacks is that the use of promises often results in a promise chain rather than the so called call back hell that happens when callbacks are used in a nested way. This is often regarded as a nicer way to structuring things that is easier to read and debug.

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

The thing to keep in mind here with promises is that ultimately a promise object will resolve or reject. There is having something like this where there is a bunch of code that will ultimately resolve or reject when using the promise constructor. However what if you are doing something that expects a resolved or rejected promise object as a response? There should be a way to just create and return a resolved or rejected promise object right? Well yes there should be and there is, this is where the Promise resolve and reject methods come into play.

## 2 - Using Promise reject or resolve in place of the Promise constructor

Say for some reason I just simply want to start off with a resolve promise object, or for whatever extenuating circumstance I want a resolve promise object right now for a task that will not take much time. I could use the Promise constructor to create a promise and then just call resolve inside the body of the function that I pass the resolve constructor. However there is no need to do that as there is the Promise.resolve method that can be use for this purpose.

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

Okay so how about another example in which I am using the Promise reject method in a promise chain. Say I want to write a script that will check if a given path is a directory and if it is fail gracefully, else it will read the contents of the file. I will first want to get the file stats of the path, and then check if the path is a directory. If the path is a director I will want to return a rejected promise that will break the promise chain, and jump to the next catch.

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

## 4 - Conclusion

The promise resolve and reject methods are there when I want to just simple have an object returned that is a resolved or rejected promise. I find myself using them some times as a way to just go about returning such an object to gain a desired result in a chain or promises. 