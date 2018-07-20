---
title: Using klaw, and through2 to walk a file system in node.js.
date: 2018-07-19 13:22:00
tags: [js,node.js]
layout: post
categories: node.js
id: 236
updated: 2018-07-20 13:53:59
version: 1.7
---

When making a command line interface program in node.js that needs to walk a file system recursively there are many options. If you do want to work within the core set of node.js modules without installing any additional from npm there is of course the nodedir method in the file system module that may be of interest. However in this post I will be writing about an npm package option that I seem to like a little for this known as [klaw](https://www.npmjs.com/package/klaw), that can also be used with another popular project known as [through2](https://www.npmjs.com/package/through2). I will be giving file system walking examples mainly using this, but will also touch base on some alternatives as well.

<!-- more -->

## 1 - What to know before hand.

This is a post on the klaw npm package that provides a node.js file walker solution. I assume that you have some background on node.js, javaScript in general, and are now just looking for options when it comes to recursively walking the contents of a folder in a file system.

### 1.1 - version numbers matter

In this post I am using klaw 2.1.1 which as of july 2018 is still the latest version, and there has not been much activity in the repo for the past few months. That is not a deal breaker for me as long as it seems that the project is still fairly solid, and so far I can not say I have not run into any problems with klaw.

## 2 - A Basic example of klaw, and test folder setup

I put together some examples of klaw that have to do with walking a file system folder. Like many of my posts on an npm package I make a test folder, and install the package along with any additional packages I might need to make some demos. For the examples in this section the only additional package I am using is throught2.

```
$ mkdir test_klaw
$ cd test_klaw
$ npm init
$ npm install klaw --save
$ npm install through2 --save
```

## 2.1 - Basic.js example of using klaw to walk a file system

For a basic.js file example I made a quick script that just walks the root name space of a path that I give as the first argument in the command line, else it defaults to the current working directory.

```js
let klaw = require('klaw'),
path = require('path'),
 
// the dir to walk
dir_walk = process.argv[2] || process.cwd();
 
// walking dir_walk with the following options
klaw(dir_walk, {
 
    // default to full recursion, if now depth is given
    depthLimit: process.argv[3] || -1
 
})
 
// for each item
.on('data', function (item) {
 
    if (!item.stats.isDirectory()) {
 
        console.log(path.basename(item.path));
 
    }
 
})
 
// when the walk is over
.on('end', function () {
 
    console.log('');
    console.log('the walk is over');
 
});
```

I am so far only using a single option when calling klaw that can be used to set the depth level of recursion when it comes to walking through a file system, a key feature that just about any walker should have.

### 2.2 - The on data event, and item object

One of the most important aspects of klaw is the data event, as this is what will be called for each file that is not filtered out before hand, more on that later in this post. A single object is given for the method that is provided as the callback for this event that contains the absolute path of the item, as well as the stats for that item.

```js
// for each item
.on('data', function (item) {
 
    console.log(item.path); // the full absolute path of of the item
    console.log(item.stats); // the stats of the item
 
})
```

The stats object is an instance of what is returned if I where to call an [fs.stat](/2018/02/15/nodejs-filesystem-stat/) for each file, there is no need to do that as it is done foe each file by default. The path given is always an absolute path, as it should be for something like this.

```
$ node basic ./ 0
.gitignore
basic.js
package-lock.json
package.json
 
the walk is over
```

## 3 - Using fs-extra as a replacement for graceful-fs

By default klaw uses the fs module replacement package known as [graceful-fs](https://github.com/isaacs/node-graceful-fs), If I want to have klaw use something else such as [fs-extra](https://www.npmjs.com/package/fs-extra) for example, then I just need to pass it as the fs option when using klaw.

So then I just need to install it.
```
$ npm install fs-extra --save
```

And then pass it as the file system module via the fs option.

```js
let klaw = require('klaw'),
path = require('path'),

// the dir to walk
dir_walk = process.argv[2] || process.cwd();

// walking dir_walk with the following options
klaw(dir_walk, {

    // using fs-extra as the fs module
    fs: require('fs-extra') 

})

// for each item
.on('data', function (item) {

    // now using fs-extra in place of graceful-fs
    // So now I can use promises
    this.fs.readFile(item.path).then(function (data) {

        console.log(data.toString());

    }).catch (function (e) {

        console.log(e.message);

    });

});
```

So as you can see fs-extra makes each of the file system methods return a promise, if I comment one the fs option this will of course result in an error. If interested I have writen a post on [fs-extra](/2018/01/08/nodejs-fs-extra/) a while back if you want to read more about that fs module drop in replacement.

## 5 - Using stream.Transfrom to filter items

In this post I am also using through2 as a way to make streams to use with the pipe method. If for some reason I do not want to use through2 one alternative is to just directly use stream.Transform in object mode.

```js
let klaw = require('klaw'),
path = require('path'),
stream = require('stream'),
dir_walk = process.argv[2] || process.cwd();
 
klaw(dir_walk)
 
// using stream.Transform in objectMode
.pipe(new stream.Transform({
 
        objectMode: true,
        transform: function (item, en, cb) {
 
            if (item.stats.size > 0 && item.stats.size < 1024) {
 
                this.push(item);
 
            }
 
            cb();
 
        }
 
    }))
 
// the filtered list of items
.on('data', function (item) {
 
    console.log(item.path);
 
});
```

## 4 - Using through2 to filter items

The projects readme file recommends that I use through2 to to quickly help with more advanced filtering operations that, may involve preforming one or more steps, some of which may require additional file io operations such as reading the actual contents of a file rather than just the meta data. Turns out that through2 is a fairly popular project, so I thought I would give it a try.

## 4.1 - filtering by file extension

So if I want to filter by extension I can pass a method to the through2 object method that will return

```js
let klaw = require('klaw'),
path = require('path'),
through2 = require('through2'),
dir_walk = process.argv[2] || process.cwd();
 
// lets klaw
klaw(dir_walk)
 
// only html
.pipe(through2.obj(function (item, enc, next) {
 
        let ext = path.extname(item.path);
 
        if (ext.toLowerCase() === '.html' || ext.toLowerCase() === '.htm') {
 
            this.push(item);
 
        }
 
        next();
 
    }))
 
// for each item that remains
.on('data', function (item) {
 
    console.log(item.path);
 
});
```

## 4 - klaw alternatives

So now that I have covered how to use klaw as a node.js file system walker solution, it might be a good call to briefly take a look at some alternatives.

### 4.1 - The nodedir npm package

One of the first file systems walkers I have come across is [nodedir](https://www.npmjs.com/package/node-dir), and I have [written a post](/2017/11/05/nodejs-node-dir/) on this on a while back. As of this writing it would look as though the project is no longer supported, as there has not been a single commit at least for over a year now. Still the main method of interest does seem to work okay for what it was designed to do if you want to give it a try anyway.