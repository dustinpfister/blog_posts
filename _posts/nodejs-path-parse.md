---
title: Node path parse method and the compoents of a path
date: 2020-01-31 17:38:00
tags: [js,node.js]
layout: post
categories: node.js
id: 601
updated: 2020-01-31 18:10:37
version: 1.5
---
In the [node path](https://nodejs.org/api/path.html) core build in module of node js there is the [path parse](https://nodejs.org/api/path.html#path_path_parse_path) method. This is a method that can be used to parse a path string into an object with properties for each of the parts of a typical file system path.

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

## 2 - The root property

The root property should be the [root directory](https://en.wikipedia.org/wiki/Root_directory) of the path that was given to the path parse method. The root directory is the first or top level directory in a file system hierarchy. In posix systems this is typically the root path from which everything else branches off from, but can also be a relative root path or sorts that could be mounted to such a tree. In windows systems it is typically the current drive letter, such as C.

```js
let path = require('path');
 
let p1 = '/home/dustin/js/nodejs-path-parse/index.js',
p2 = './js/project1/main.js',
p3 = 'C:\\Windows\\system32\\notepad.exe';
 
console.log(path.parse(p1).root); // '/'
console.log(path.parse(p2).root); // ''
console.log(path.parse(p3).root); // 'C:\\'
```

In the event that a relative path is given the root property will end up being an empty string. One of the reasons why it is generally a good idea to make sure you are always dealing with an absolute path.

## 3 - Conclusion

So the path parse method of the node path module is a useful little method for getting an object of all the parts of a given path. However there is much more that the node path module has to offer that a node developer should be aware of before looking for some kind of user space package to do something that can be done with a built in module.

For more on paths in nodejs be sure to check out my [main post on the node path](/2017/12/27/nodejs-paths/) built in node module.