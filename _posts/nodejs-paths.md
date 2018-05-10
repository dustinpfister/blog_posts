---
title: What to know about working with paths in node.js
date: 2017-12-27 21:27:00
tags: [js,node.js]
layout: post
categories: node.js
id: 122
updated: 2017-12-28 22:53:18
version: 1.2
---

Working with paths in node.js is something that comes up all the time. A nice way to help with joining paths together, and help with problems that have to do with the differences of how paths are handled in windows and linux systems. For this there is no need to bother with an npm package of any kind the node.js built in [path module](https://nodejs.org/api/path.html) can help with a great deal of these kinds of tasks.

<!-- more -->

## Joining two paths together

This is a task that I use the path module for all the time.

```js
let uri = path.join('/','foo','bar'); // '/foo/bar'
```

## Getting the base name of a path

Another task that is quickly solved with the path module is getting the base name of a path. This is helpful for getting a filename from the end of a path.

```js
let fileName = path.basename('./foo/man/chew.js');
// returns 'chew.js'
```

## Getting a dir from a full path with path.dirname

Opposite of basename is path.dirname.

```js
let dir = path.basename('./foo/man/chew.js');
// returns '/foo/man'
```

I often end up in situations in which I have many different path parts and I want to piece them together into a single path in a way in which it will always come together in a single valid path. The join method serves me well with this.

## Absolute Paths

An absolute path is a full path all the way back to root. On a posix system an absoliute path is something like this

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

## Finding out if a path is a sub dir of another path

I recently ran into a situation in which I need to find out if a path is a sub dir of another path in order to exclude it if it is. Path.relative comes in handy with this.

```js
let isSub = function (rootPath, testPath) {
 
    let relative = path.relative(rootPath, testPath);
    return !!relative && !relative.startsWith('..') && !path.isAbsolute(relative);
 
};
```

