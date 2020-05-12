---
title: Nodejs write file method basics and more
date: 2020-05-12 17:09:00
tags: [node.js]
layout: post
categories: node.js
id: 657
updated: 2020-05-12 17:13:59
version: 1.1
---

The nodejs read file file system method is a method in node build in file system module. This method might work just fine when I just want to read a file in full, and not do anything fancy with streaming or reading by way of a buffer. In most cases this method will work fine if I just simple want to read a small file, however it is not a golden hammer for all situations in which I need to read data from the local file system. Never the less it would seem that I never got around to writing a post on this method, so lets get this one out of the way.

<!-- more -->

## 1 - Basic old school read file example

```js
let fs = require('fs');
 
fs.readFile('./s1_basic.js', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data);

});
```