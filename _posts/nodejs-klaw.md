---
title: Using klaw, and through2 to walk a file system in node.js.
date: 2018-07-19 13:22:00
tags: [js,node.js]
layout: post
categories: node.js
id: 236
updated: 2018-07-20 10:41:36
version: 1.3
---

When making a command line interface program in node.js that needs to walk a file system recursively there are many options. If you do want to work within the core set of node.js modules without installing any additional from npm there is of course the nodedir method in the file system module that may be of interest. However in this post I will be writing about an npm package option that I seem to like a little for this known as [klaw](https://www.npmjs.com/package/klaw), that can also be used with another popular project known as [through2](https://www.npmjs.com/package/through2). I will be giving file system walking examples mainly using this, but will also touch base on some alternatives as well.

<!-- more -->

## 1 - What to know before hand.

This is a post on the klaw npm package that provides a node.js file walker solution. I assume that you have some background on node.js, javaScript in general, and are now just looking for options when it comes to recursively walking the contents of a folder in a file system.

### 1.1 - version numbers matter

In this post I am using klaw 2.1.1 which as of july 2018 is still the latest version, and there has not been much activity in the repo for the past few months. That is not a deal breaker for me as long as it seems that the project is still fairly solid, and so far I can not say I have not run into any problems with klaw.

## 2 - Some examples of klaw

I put together some examples of klaw that have to do with walking a file system folder. Like many of my posts on an npm package I make a test folder, and install the package along with any additional packages I might need to make some demos. For the examples in this section the only additional package I am using is throught2.

```
$ mkdir test_klaw
$ cd test_klaw
$ npm init
$ npm install klaw --save
$ npm install through2 --save
```

## 2.1 - Basic example of using klaw to walk a file system

For a basic.js file example I made a quick script that just walks the root name space of a path that I give as the first argument in the command line, else it defaults to the current working directory.

```js
let klaw = require('klaw'),
path = require('path'),
 
// the dir to walk
dir_walk = process.argv[2] || process.cwd();
 
klaw(dir_walk, {
 
    depthLimit: 0, // what is only at root
 
})
 
.on('data', function (item) {
 
    if (!item.stats.isDirectory()) {
 
        console.log(path.basename(item.path));
 
    }
 
});
```

## 3 - klaw alternatives

So now that I have covered how to use klaw as a node.js file system walker solution, it might be a good call to briefly take a look at some alternatives.

### 3.1 - The nodedir npm package

One of the first file systems walkers I have come across is [nodedir](https://www.npmjs.com/package/node-dir), and I have [written a post](/2017/11/05/nodejs-node-dir/) on this on a while back. As of this writing it would look as though the project is no longer supported, as there has not been a single commit at least for over a year now. Still the main method of interest does seem to work okay for what it was designed to do if you want to give it a try anyway.