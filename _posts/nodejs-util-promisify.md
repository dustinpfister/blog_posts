---
title: node util promisify method in nodejs
date: 2019-06-22 09:25:00
tags: [node.js]
layout: post
categories: node.js
id: 485
updated: 2019-06-24 20:20:00
version: 1.5
---

In versions of node before that of 8.x if I wanted to make a node js method return a promise rather than having to deal with callbacks I would have to use some kind of user land module to promisify that method, do so manually with the Promise constructor, or use a dependency that does so out of the box such as with fs-extra for example. However in versions of node 8+ there is now the [util.promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) method that can be used to promisify one of these callbacks.

<!-- more -->

## 1 - Util promisify in nodejs 8.x+

The util.promisify method can be used with any of the methods in nodejs that make use of the usual nodejs style callback that passes a error as the first argument and the something more after that in the event that things go well. Many examples of this kind of method exist in the file system module for example

```js
let util = require('util'),
fs = require('fs'),
promisify = util.promisify,
writeFile = promisify(fs.writeFile);
// can now write files Promise style in
// node 8.x
writeFile('./test.txt', 'hello world')
.then(() => {
    console.log('test.txt written');
})
.catch ((e) => {
    console.log('error writing test.txt');
    console.log(e.message);
});
```

There is still no native Promise.promisify when it comes to native javaScript, and before nodejs 8.x this would have to be accomplished with a user space npm package like bluebird.