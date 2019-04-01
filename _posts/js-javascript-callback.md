---
title: javaScript callbacks and more
date: 2019-03-25 13:36:00
tags: [js]
layout: post
categories: js
id: 406
updated: 2019-04-01 14:20:06
version: 1.7
---

In [javaScript callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) are often used as a way to define some logic that is to execute later on. They are often used with, or as a replacement for other options such as promises. In many javaScript projects, code examples, and so forth chances are you will be encountering at least one or tow callbacks now and then so it is important to know a thing or two about them.

<!-- more -->


## 1 - javaScript callback basics

The basic idea of a call back is that it is a function that will fire at a later time. This allows for additional code to execute in the mean time. For example say I have a function that accepts two arguments one is a delay, and another is a function to fire once that delay has elapsed.

```js
var delay = function (delay, cb) {
    delay = delay === undefined ? 0 : delay;
    cb = cb === undefined ? function () {}: cb;
    return setTimeout(cb, delay);
};
 
// 'no delay logs first'
delay(1000, function(){
    console.log('delay');
});
console.log('no delay')

```

The important thing to note here is that in this example the no delay message logs to the console first. So the execution of javaScript is not delayed. So this qualifies as a basic example of a callback in javaScript as it is a function that is to be called at a later time. This might not be the best example of a callback though so lets look at some additional examples.

## 2 - Node.js callback examples

When it comes to a node.js project callbacks come up a lot. They where used all the time in the early days of node.js as a way to define javaScript code that is to run after a task that will take some time is completed. They are still often used as one way of going about doing that sort of thing when needed.

### 2.1 - Using an fs module method

```js
let fs = require('fs');
 
// using readFile with a callback method
fs.readFile('basic.js', function (e, data) {
    if (e) {
        console.log(e.message);
    }
    if (data) {
        console.log(data.toString());
    }
});
 
// this will log first.
console.log('first!');
```