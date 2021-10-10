---
title: JavaScript async await
date: 2019-06-25 13:23:00
tags: [js]
layout: post
categories: js
id: 490
updated: 2021-10-10 13:30:59
version: 1.27
---

A [js async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function can be used as a way to define a special kind of asynchronous function. These async functions can be used in conjunction with the await keyword to help with the process of writing asynchronous code easier in javaScript as of late specs of javaScript as of ECMAScript 2017.

These kinds of [async functions still operate in the main event loop](https://stackoverflow.com/questions/46004290/will-async-await-block-a-thread-node-js), so they still can not be used as a way to achieve what is often called true threading with javaScript, at least not by themselves. So then js async is not a replacement for [Webworker in client side javaScript](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), or something like the [cluster module](/2018/01/18/nodejs-cluster/), or [child process module](/2018/02/04/nodejs-child-process/) in nodejs. If you want to get closer to true threading you would want to look into those options and not just use asnyc functions alone. Still in some situations the async keyword can be useful so lets look at some code examples of this in use.

<!-- more -->

## 1 - js async basics

In this section I will be going over just a few very basic examples that involve the use of promises and the async keyword as a way to create functions, as well as other related topics when it comes to the very basics of this sort of thing. The main thing to keep in mind where is that the use of these async functions are just another way to operate in a single event loop, so if you are thinking that this is something that is far beyond using something like setTimeout that is not really the case actually. The reason why is because that setTiemout and async functions are still working within a single event loop. So if you are thinking that async functions are another kind of web worker, or spawn method call in nodejs, that is not how to think about it. However async functions are another tool along side features like setTimeout, requestAnimaitonFrame, and the Promise constructor.

So then in this section I will be sticking to a few simple examples that might hopefully show what async functions are, and also in the process hopefully also what they are not.

### 1.1 - The source code here is on github

This post like many others is still a kind of work in progress, as such it is only a matter of time until I get around to editing the content here once again, as long as I am able to do so. With that said I have the collection of source code that I am writing about in this post up on my [test vjs Github respiratory](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-async-await), along with all the other source code examples for all my other posts on native javaScript features. So then the latest work that I have done with these examples will be there, that is also where one would want to make a pull request. However there is also the comments section at the end of this post that can also be used to bring something up.

### 1.2 - Hello world async function

To start off with maybe it would be best to compare what the return values are for a async function compared to say a function expression. When I have a function expression that returns a string, the return value is, well a string no surprise there. However the same will not always be true for an async function as when I call such a function the return value right away is not a string, but an object. That is because an async function will always return a promise, even if the return value is not one the return value will be wrapped in a promise object.

```js
var helloWorld = function () {
    return 'Hello World';
};
var helloWorldAsync =  async function () {
    return 'Hello World';
};
 
console.log(typeof helloWorld());      // 'string'
console.log(typeof helloWorldAsync()); // 'object'
```

### 1.3 - Hello world promise function

So then there is having a similar result to a sync function by just getting into the habit of creating functions that return a promise. One way to go about returning a promise inside the body of a function would be to use the [Promise Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise).

```js
var helloWorld = function () {
    return 'Hello World';
};
var helloWorldPromise = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('Hello World');
        }, 3000)
    })
};
 
console.log(typeof helloWorld()); // 'string'
console.log(typeof helloWorldPromise()); // 'object'
```

### 1.4 - using then off of a promise object

The main thing about promise objects is not to just assign the promise object to a variable, but to call the then function off of the promise object and do what needs to be done with the result insdie the body of this then function call.

```js
let foo = (delay) => {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, delay);
    });
};
 
let bar = function () {
    console.log('start');
    return foo(3000).then(() => {
        console.log('end');
    });
};
 
bar();
```

### 1.5 - The same example with js async

The async keyword can be used in combination with a function such as an arrow function to declare an async function. Inside the body of the async function the await keyword can be used as a way to pause the execution of the rest of the logic in the function until a function that was called with await is completed. The function that is called with await should be a function that will return a promise or another function created with the async keyword.

A basic example of an async function in javaScript might then look like this then:

```js
let foo = async (delay) => {
    let st = new Date(),
    now = st,
    t = 0;
    while(t < delay){
        now = new Date();
        t = now - st;
    }
    return 1;
};
 
let bar = async ()=> {
    console.log('start');
    await foo(3000);
    console.log('end');
};
 
bar();
```

The foo function returns a promise that resolves after a delay. When used inside the body of the func async function that execution of code is paused, and thus the string end is not logged to the console until the delay has completed. So this can be thought of as a cleaner style compared to just using promises.

## 2 - Not a replacement for WebWorker and child_process

An async function still operates in the main javaScript event loop, so it is not a way to go about accomplishing what is often called true threading in javaScript. However there are was of doing that these days with javaScript, just not with async await, at least not by itself anyway.

In this section I will be writing about the subject of async await and true threading in javaScript.

### 2.1 - Async functions will still hold up the event loop

So an async function that has some code in it that might hold up the event loop will do so just like that of any other function in javaScript. This is because just like any other function in javaScript, we are still dealing with a single event loop. That is unless we take advantage of something that allows for us to create an additional event loop.

For example take into account the following:

```js
// async function that does something heavy
let heavyAsync = async function () {
    var i = Math.pow(10, 9);
    while (i--) {}
    console.log('bar');
};
// loop
let i = 0, st;
let loop = function () {
    setTimeout(loop, 250);
    st = new Date();
    if (i % 10 === 5) {
        heavyAsync();
    }
    console.log('tick' + i, ' time: ' + (new Date() - st));
    i += 1;
};
loop();
```

In this example when the heavyAsync function is called it still ends up delaying the whole application. This is because I am still just working with a single event loop.

### 2.2 - However in nodejs the child_process module can help avoid that

In nodejs there is the [child_process](/2018/02/04/nodejs-child-process/) built in module. This can be used to launch an application from the command line, including node itself. When doing so it results in an additional, independent process on the operating system. Thus it is a way to do something involving more than one event loop with javaScript, thus it is a kind of so called true threading that differs from what is typical when it comes to async functions, setTiemout, and so forth by itself.

```js
let heavyAsync = async function () {
    var i = Math.pow(10, 9),
    st = new Date();
    while (i--) {}
    console.log('heavy time: ', new Date() - st);
};
heavyAsync();

```

```js
let spawn = require('child_process').spawn;
let startHeavy = () => {
    let heavy = spawn('node', ['heavy.js']);
    heavy.stdout.on('data', function (data) {
        console.log(data.toString());
    });
};
let i = 0, st;
let loop = function () {
    setTimeout(loop, 250);
    st = new Date();
    if (i % 10 === 5) {
        startHeavy();
    }
    console.log('tick' + i, ' time: ' + (new Date() - st));
    i += 1;
};
 
loop();
```
So then this example, unlike the first one that just makes use of async await, does not hold up the main javaScript event loop.

## 3 - Concluson

So then an async function is just a function that will always return a function, and inside the body of the function the await keyword can be used as a way to pause and wait for a result rather than moving on. I can not say that I use these kinds of functions that often actually as there are many ways of having a similar situation with things other than using async functions. There is having functions that return a function, and then there is also just doing things that involve old javaScriot style call back functions.

