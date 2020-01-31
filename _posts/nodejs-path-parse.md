---
title: Node path parse method and the compoents of a path
date: 2020-01-31 17:38:00
tags: [js,node.js]
layout: post
categories: node.js
id: 601
updated: 2020-01-31 17:44:48
version: 1.1
---
In the [node path](https://nodejs.org/api/path.html) core build in module of node js there is the [path parse](https://nodejs.org/api/path.html#path_path_parse_path) method. This is a methid that can be used to parse a path string into an object with properties for each of the parts of a typical file system path.

<!-- more -->

## 1 - node path parse basic example

So for a basic example of the node path parse method here is a quick copy and past example that will helper to get the basic idea of what this method is for. First I need to require in the module, then I can call the path parse method passing a string that I want to parse into an object. The properties of that object will then be root, dir, base, name, and ext. In other words the root dir, the dir consisting of root and the rest of the directory, the base file name with extension, and then the name and extension.

```js
let path = require('path');
 
let p = '/home/dustin/js/nodejs-path-parse/index.js';
 
let obj = path.parse(p);
 
console.log(obj.root); // '/'
console.log(obj.dir);  // '/home/dustin/js/nodejs-path-parse'
console.log(obj.base); // 'index.js'
console.log(obj.name); // 'index'
console.log(obj.ext);  // '.js'
```