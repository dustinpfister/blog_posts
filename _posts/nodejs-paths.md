---
title: Node path module general overview
date: 2017-12-27 21:27:00
tags: [js,node.js]
layout: post
categories: node.js
id: 122
updated: 2020-01-31 15:46:51
version: 1.13
---

Working with paths in node.js is something that comes up all the time when it comes to file system related tasks. When doing so there is a desire for a nice module to help with joining paths together, and help with problems that have to do with the differences of how paths are handled in windows and linux systems. There are also many other concerns surround paths such as the difference between relative and absolute paths. 

So I could look for some kind of npm package, or other user space copy and past type thing to help me out with this, or take the time to writ my own code. However for for the most part there is no need to bother with any of that as the node.js built in [path module](https://nodejs.org/api/path.html) can help with a great deal of these kinds of tasks when working with file system paths.

<!-- more -->

As such this post will serve as a general overview of the built in node path module in node.js itself. These will be just very simple examples of the methods that are in the module without getting into any kind of complicated real life example.

## 1 - node path module and joining two paths together

This is a task that I use the path module for all the time. I have a base path to a working folder or any kind of folder of interest where there are resources of some kind. I then also have a relative path from that working path and I want to create a path from the base path and the relative path. One way to go about doing so with the path module in nodejs is to use the path join method.

```js
let path = require('path');
let p = path.posix.join('/','foo','bar');
 
console.log(p);
// '/foo/bar'
```

In the above example I am using the posix property of the path module to make sure that I end up getting a posix rather than win32 friendly path result. I could just call path.join but that would give a result that is different depending on the underlaying operating system that node is running on. In some situations I might want to do something that way actually, but for this example I wanted to make a simple code example of the path join method that will return the same result on any kind of platform.

## 2 - Path resolve method

So another node path method module method that I use a lot is the resolve method. This also works like path join but will resolve the path to an absolute path. In general I find that it is best to make everything that I am working with an absolute path to help make sure that I am always grabbing at an absolute resource location.

```js
let path = require('path');
let p = path.resolve(process.cwd(),'new_foo_project');
 
console.log(path.isAbsolute(p)); // true
console.log(p);
// (absolute path to ./new_foo_project)
```

I could get more into relative and absolute path examples, but that would be getting off topic a little. If you are still new to node and working with paths, it is a good idea for now to just be aware of what the difference is between relative and absolute paths. The value of what is placed in before a relative path can change depending on certain factors, but an absolute path helps to make sure that nothing weird happens.

## 3 - Getting the base name of a path

Another task that is quickly solved with the path module is getting the base name of a path. This is helpful for getting a filename from the end of a path.

```js
let fileName = path.basename('./foo/man/chew.js');
// returns 'chew.js'
```

## 4 - Getting a dir from a full path with path.dirname

Opposite of basename is path.dirname, as one would expect this will return the dirname of the given path.

```js
let path = require('path');
 
let dir = path.dirname('./foo/man/chew.js');
console.log(dir);
// './foo/man'
```



## 5 - Absolute Paths, relative paths, and the isAbsolute node path method

An absolute path is a full path all the way back to root, or in other words a full path to a folder or file. This is in contrast to a relative path, that is just a path to a filename maybe, but not a full path to that resource. On a posix system an absolute path is something like this

```
/home/dustin/documents
```

On a windows system it would be something like this

```
C:/users/dustin/documents
```

This differs from a relative path like this

```
../documents
```

As such it is nice to have a way to find out if a path is absolute or not, so there is a method for that called path.isAbsolute.

```js
let isAbsolute = path.isAbsolute('/home/dustin');
// returns true
```

## 6 - Finding out if a path is a sub dir of another path

I recently ran into a situation in which I need to find out if a path is a sub dir of another path in order to exclude it if it is. The Path.relative method comes in handy with this.

```js
let isSub = function (rootPath, testPath) {
 
    let relative = path.relative(rootPath, testPath);
    return !!relative && !relative.startsWith('..') && !path.isAbsolute(relative);
 
};
```

## 7 - Conclusion

The node path module is a built in module that I find myself using all the time when it comes to making nodejs modules, examples, and basic projects. It is not a silver bullet for all file system related tasks though, there is still the file system module when it comes to actually reading and writing files for example.