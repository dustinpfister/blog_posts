---
title: JavaScript async await
date: 2019-06-25 13:23:00
tags: [js]
layout: post
categories: js
id: 490
updated: 2020-09-18 13:15:14
version: 1.12
---

A [js async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function can be used as a way to define a special kind of asynchronous function. These kinds of functions still operate in the main event loop, so they still can not be used as a way to achieve true threading with javaScript, at least not by themselves.

So then js async is not a replacement for Webworker in client side javaScript, or something like the cluster module in nodejs. If you want to get closer to true threading you would want to look into those options. Still in some situations the async keyword can be useful so lets look at some code examples of this in use.

<!-- more -->

## 1 - js async basics

In this section I will be going over just a few very basic examples that involve the use of promsies and the async keyword as a way to create functions.

### 1.1 - Basic example involving the use of promsies

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

### 1.2 - The same example with js async

The async keyword can be used in combination with a function such as an arrow function to declare an async function. Inside the body of the async function the await keyword can be used as a way to pause the execution of the rest of the logic in the function until a function that was called with await is completed. The function that is called with awaite should be a function that will return a promsie or another function created with the async keyword.

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

### 2.1 - Async functions will still hode up the event loop

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

In nodejs there is the [child_process](/2018/02/04/nodejs-child-process/) built in module. This can be used to launch an application from the command line, including node itself. When doing so it results in an additional, independent process on the operating system. Thus it is a way to do something involving more than one event loop with javaScript, thus it is a kind of so called trude threading that differs from what is typical when it comes to async functions, setTiemout, and so forth by itself.

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