---
title: Node path resomve method and absolute rather than relative paths
date: 2020-04-07 19:32:00
tags: [js,node.js]
layout: post
categories: node.js
id: 642
updated: 2020-04-14 15:49:43
version: 1.4
---

In nodejs there is the path module and the [resolve method](https://nodejs.org/api/path.html#path_path_resolve_paths) of that module than can be used to resolve a relative path to an absolute path. A relative path can be a string representation of the current working directory, or to some other relative path to a resource. It is generally a god idea to think more so in terms of absolute paths to things rather than relative ones to help eliminate confusion.

<!-- more -->

## 1 - Basic node path resolve method example

So say I use a string of period to refer to the current working directory. Doing so might not be the best way of doing so in a node project, but for the sake of this section lets just go with that for a moment. If I want to convert the string of a period to an absolute path to the current working directory then I can use the path resolve method to do so.

```js
let path = require('path');
 
let p = path.resolve('.');
 
console.log(p);
// C:\Users\Dustin\  (Win32)
// or
// /home/dustin  (Linux)
```

## 2 - The __dirname global and process.cwd

Although the path resolve method is the tool that I go for to make sure I am always working with an absolute path, it is of course just part of the toolbox. In just about all use case examples I could use the path resolve method with the string of a period to refer to the current working directory, but I tend to prefer using the process cwd method to do so in place of that. In addition if I want to refer to the absolute path of the module that is called rather than the current working directory the use of the path resolve method with a period will not cut it, I will want to use the \_\_dirname global.

```js
let path = require('path');
 
let cwd = process.cwd(),
thisMod = __dirname;
 
console.log(  path.resolve('.') );
console.log(  cwd );
console.log(  thisMod );
```