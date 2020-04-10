---
title: Node path resomve method and absolute rather than relative paths
date: 2020-04-07 19:32:00
tags: [js,node.js]
layout: post
categories: node.js
id: 642
updated: 2020-04-10 12:53:02
version: 1.2
---

In nodejs there is the path module and the [resolve method](https://nodejs.org/api/path.html#path_path_resolve_paths) of that module than can be used to resolve a relative path to an absolute path. A relative path can be a string representation of the current working directory, or to some other relative path to a resource. It is generally a god idea to think more so in terms of absolute paths to things rather than relative ones to help eliminate confusion.

<!-- more -->

```js
let path = require('path');
 
let p = path.resolve('.');
 
console.log(p);
// C:\Users\Dustin\  (Win32)
// or
// /home/dustin  (Linux)
```
