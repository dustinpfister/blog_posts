---
title: Using the walk npm package to loop over the  contents of a file system in node.js.
date: 2018-07-23 10:46:00
tags: [js,node.js]
layout: post
categories: node.js
id: 240
updated: 2018-07-23 11:28:31
version: 1.3
---

For the past few days I have been exploring node.js powered options when it comes to walking over the contents of a file system. I have been looking at methods in the node.js fs module that can be used to just start doing soething like this from the ground up, as well as npm packages. Im my travels I have found what looks like maybe one of the most popular soultions when it comes to npm packages that is just simply called [walk](https://www.npmjs.com/package/walk). In this post I will be covering the use of walk to just get this aspect of development over with quickly.

<!-- more -->

## 1 - What to know before continuing

This is a post on the npm package known as walk that can be used to walk a file system in a node.js environment. It is not a getting started post on node.js, and JavaScript in general, I assume you have some background on those things.

### 1.1 - Be sure to check out other solutions also

It would seem that walk is a decent solution, with many of the features that I would expect from such a project. There are many others out there as well thought, and it may not be a waste of time to make your own from the ground up as well if it seems like that is what needs to happen. Be sure to check out my [main post on node.js file system walkers](/2018/07/20/nodejs-ways-to-walk-a-file-system/) to gain a batter sense of what is out there.

## 2 - Some basic examples of walk 

So walk works by calling the walk or walkSync method that are in the object the is returned when bringing walk into a project with require. When calling the walk method I will of course want to give the path in the file system where walking is to start, as the first argument I can then set one or more events that are to be called for a file, directory, of if some kind of error happens.

### 2.1 - The files event in node.js

```js
let dir = process.argv[2] || process.cwd();
 
require('walk').walk(dir)
 
// on file
.on('file', function (root, fileStats, next) {
 
    // log absolute path of each file found
    console.log(require('path').join(root,fileStats.name));
    next();
 
});
```