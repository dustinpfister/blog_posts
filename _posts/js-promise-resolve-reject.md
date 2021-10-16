---
title: Promise resolve and reject methods for just creating a resolve or rejected promise
date: 2019-09-18 11:49:00
tags: [js]
layout: post
categories: js
id: 536
updated: 2021-10-16 09:38:39
version: 1.25
---

When working with [promises in javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) there will come a time now and then where I just want to return a resolved promise without having to bother with the promise constructor to do so. In addition there is also doing the same but with a rejected promise, just retuning that inside the body of a promise so that is just directly results in a catch statement being called.

Well luckily even with native javaScript promises there is the [Promise.resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve), and [Promise.reject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) methods that can do just that. These methods will come in handy often when creating a long chain of promises and then method calls where I just want to return a resolve or rejected promise inside the body of a method that I am using with the then promise prototype method. It is basically a more appropriate alternative to using the promise constructor to just call resolve inside the body of a function that is given to the promise constructor, which will also work but why bother when you have Promise.resolve.

So todays post will just be on the Promise.resolve, and promise.reject methods.

<!-- more -->

## 1 - Some basic examples of Promises including Promise.resolve and Promise.reject

So if you are new to using promises or just want to review how they are use in this section I will be going over some basic examples that use the promise constructor, as well as the Promise.resolve and Promise.reject methods. The basic idea of a promise is that it will return an object that represents a task that will resolve or reject over a period of time. The result might not come right away, and also the process of getting a result might fail. So a promise object might resolve to a requested value, and as such things can continue, or it might not at which point some additional action might need to be preformed such as trying again.

The typical alternative to a promise is using what is often called a [callback function](/2019/03/25/js-javascript-callback/). Callback functions are often functions that will fire at a later point and when they do so there is often a way to check if an error happed or not in the body of the single callback function. One nice thing about promises over callbacks is that the use of promises often results in a promise chain rather than the so called call back hell that happens when callbacks are used in a nested way. This is often regarded as a nicer way to structuring things that is easier to read and debug.

### 1.1 - A very simple promise example using a Promise Constructor

There is starting out with just some very basic examples of The promise constructor, just to get the general idea of what this is about. So for this example I am creating a new Promise object by calling the Promise constructor with the new keyword, the returned object will then be an instance of a promise to which I can call methods like then, and catch off of that will fire if the promise resolved or rejects.

When creating a Promise by way of the Promise constructor the first argument that I give to the Promise constructor function is a function that will have two arguments resolve and reject. These resolve and reject arguments will then be functions that I will call inside the body of the function that I pass to the function constructor when something happens that should resolve in the promise resolving or rejecting.


```js
new Promise(function (resolve, reject) {
    resolve('foo');
})
.then(function (str) {
    console.log(str);
})
.catch(function (e) {
    console.warn(e);
});
// 'foo'
```

For this example I am not doing anything that will take a while such as making an http request or something to that effect. This is a very simple getting started type example after all, so for now I am just calling the resolve method inside the body of the function that I am passing to the Promise Constructor and passing a string value for the call of the resolve function. The result is then the next then function of the Promise chain being called, rather than catch.

### 1.2 - A very simple Promise.resolve example

Some times I might want to just start off with a resolve promise object, or there is a situation in which I must pass a promise and only a promise as an argument for a function. I could create one with the Promise Constructor and just resolve it like I did in the about simple example of the Promise Constructor. However there is also a static method of the Promise global for this sort of thing.

```js
Promise.resolve('foo')
.then(function (str) {
    console.log(str);
});
// 'foo'
```

### 1.3 - A Very simple Promise.reject example

There is also the Promise reject static method that does the same thing and the Promise resolve method only it is a way to just quickly create a rejected promise rather than a resolve one. So then this will result in the next catch method in the chain being called rather than a then call.

```js
Promise.reject(new Error('No Good'))
.catch(function (e) {
    console.warn(e.message);
});
// 'No Good'
```

### 1.4 - A helper function that returns a promise

The thing to keep in mind here with promises is that ultimately a promise object will resolve or reject. There is having something like this where there is a bunch of code that will ultimately resolve or reject when using the promise constructor. However what if you are doing something that expects a resolved or rejected promise object as a response? There should be a way to just create and return a resolved or rejected promise object right? Well yes there should be and there is, this is where the Promise resolve and reject methods come into play.

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

## 2 - Using Promise reject or resolve in place of the Promise constructor

Say for some reason I just simply want to start off with a resolve promise object, or for whatever extenuating circumstance I want a resolve promise object right now for a task that will not take much time. I could use the Promise constructor to create a promise and then just call resolve inside the body of the function that I pass the resolve constructor. This might work, but it is not really a professional way to go about doing it. There are a number of methods in the Promise prototype object, and a javaScript developer should be aware of them and what they are used for.

So there is no need to do create a simple Promise with the Promise constructor that just resolves right away as there is the Promise.resolve method that can be use for this purpose.

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

In addition to the Promise resolve method there is also the Promise reject method that will cause the next catch rather than then call to fire in a Promise chain.

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

This might just be a silly example that will just log the error to the console in the event that the script is called on a directory rather than a file. However in a real example the script might do something more when it comes to that kind of situation. In any case this shows how the Promise reject, and resolve methods can prove to be useful in some situations. An any point in a then call I can use the Promise reject method to skip ahead to the next catch rather than then call.

## 4 - Conclusion

The promise resolve and reject methods are there when I want to just simply have an object returned that is a resolved or rejected promise. I find myself using them some times as a way to just go about returning such an object to gain a desired result in a chain or promises. 

There are many additional methods in the native Promise prototype that are worth checking out if one is nit familiar with them just yet. One of which is the [Promise.all](/2019/06/24/js-promise-all/) method that strokes me as one of the most important promise prototype methods that a javaScript developer should be aware of when it comes to Promises. 

On top of that there are many other things to be aware of when it comes to promised in specific environments as well as in user space libraries. For example in late versions of nodejs the [file system module](/2018/02/08/nodejs-filesystem/) methods will return a promise, however when it comes to supporting older versions of node you might want to use the [promisify method in the utils module](/2019/06/22/nodejs-util-promisify/). When it comes to client side javaScript there is the [fetch method](/2018/03/27/js-fetch/) that will return a promise, however the XmlHttpRequest method will not when it comes to scripting http from a browser.

That is it for now, but I often get around to editing my content now and then. If you have any ideas about something that should be added be sure to speak up in the comments section with it.