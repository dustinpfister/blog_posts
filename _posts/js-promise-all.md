---
title: Promise all method for a collection of promises
date: 2019-06-24 13:03:00
tags: [js]
layout: post
categories: js
id: 488
updated: 2019-06-24 14:22:12
version: 1.3
---

When a whole bunch of tasks need to be accomplished before moving on with things, one way to do so is with the [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method. This method will return a resolved promise object when everything that is given to it via an array as the first argument is resolved if a promise, or is something that is not a promise.

<!-- more -->


## 1 - Promise all nodejs example

Here I have a simple example of Promise all in nodejs 8.x

```js
let util = require('util'),
fs = require('fs');
Promise.all([
        util.promisify(fs.stat)('./text.txt'),
        util.promisify(fs.readFile)('./text.txt')
    ])
.then((a) => {
    console.log(a[0].isFile()); // true
    console.log(a[1].constructor.name); // Buffer
})
.catch ((e) => {
    console.log(e.message);
});
```