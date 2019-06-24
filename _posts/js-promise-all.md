---
title: Promise all method for a collection of promises
date: 2019-06-24 13:03:00
tags: [js]
layout: post
categories: js
id: 488
updated: 2019-06-24 13:06:19
version: 1.1
---

When a whole bunch of tasks need to be accomplished before moving on with things, one way to do so is with the Promise.all methid.

<!-- more -->


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