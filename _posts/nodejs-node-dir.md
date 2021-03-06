---
title: Looping over a bunch of files in Node.js with node-dir 
date: 2017-11-05 21:08:00
tags: [js,node.js]
layout: post
categories: node.js
id: 86
updated: 2018-07-21 20:47:16
version: 1.4
---

So you have a bunch of files in a folder, and you want to do something involving the content of each file. You might only want to bother with a certain kind of file, and you might want to know each filename. Well one npm package that I have found that helps a whole lot with that is [node-dir](https://www.npmjs.com/package/node-dir), and I find it a bit of a time saver compared to just making something from the ground up.

<!-- more -->

## 1 - what to know

So this is a post on the npm package node-dir that can be used as a file system walker, among a few other things. This is not a post on node.js, and javaScript in general and as such I assume that you have some background with that.

### 1.1 - be sure to check out other options for file system walkers

This project does still do what it was designed to do, but it is a little old, and it looks like it is no longer supported. As such you might want to check out my [main post on file system walkers](/2018/07/20/nodejs-ways-to-walk-a-file-system/) for more options when it comes to walking a file system.

## 2- Getting started with a new project

First things first, create a new project folder, cd into it, set up a package.json file, and install node-dir. Maybe call it something like node-dir-demo.

```
$ cd node-dir-demo
$ npm init
$ npm install node-dir --save
```

When making a simple demo project like this I often just run threw and set default values for each value in the package.json file. If you are new to node.js development the --save flag adds node-dir to the dependences list of the package.json file.

## 3 - Basic readFiles hello world example of node-dir

Once that is done it's time to make an index.js file for the project. As with any post of mine where I write about an npm package like this I start off with a simple hello world style example of it's use. For this I thought I would start off with a script that logs to the console the fileNames, and content of all files found in the root path in which it is called.

```js
var dir = require('node-dir');
 
dir.readFiles('./', function (err, content, fileName, next) {
 
    console.log('********************');
    if (err) {
 
        // if there is an error log that
        console.log(err);
 
    } else {
 
        // else log filename, and content of a file
        console.log(fileName);
        console.log('**********');
        console.log(content);
 
    }
    console.log('********************');
 
    next(); // next file
 
});
```

As You might have guess this method is the one to use if I want to sequentially read threw files.

## 4 - Getting files that Match a certain regEx pattern

An options object can be passed to readFiles that allows for me to set a certin pattern that is to be matched if I say only want to loop over html files, and it can also be used to set recursive looping on or off.

```js
var dir = require('node-dir');
 
dir.readFiles(
 
    './', // the root path
 
    // an options object
    {
 
        match: /.json$/, // only match json files
        recursive: false // only the root dir
 
    },
 
    function (err, content, filename, next) {
 
        if (err) {
 
            console.log(err);
 
        } else {
 
            console.log(filename);
 
        }
 
    }
 
);
```


## 5 - Turn the project into a global CLI tool

If I feel as thought I am starting to develop some kind of project that will work well as a CLI tool, there is the option of [adding the node.js shebang](/2017/03/26/linux_shebang/) to the top of the index file, and using an [option parser such as nopt](/2017/05/05/nodejs-nopt/) with the project. I will also want to add a bin entry to my package.json file.

```
# npm install nopt --save
```

So My package.json file should look like this:

```js
{
  "name": "node-dir-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "node-dir": "^0.1.17",
    "nopt": "^4.0.1"
  },
  "bin": {
    "node-dir-demo" : "./index.js"
  }
}
```

and Now I updated my index.js file like this:


```js
#!/usr/bin/env node
// added the node.js shebang
 
var dir = require('node-dir'),
 
// a very nice option parser, for when used as a CLI tool
nopt = require('nopt');
 
// default options
defaults = {
 
    source: './',
    recursive: false // default recursive listing to false
 
},
 
// just need a simple shallow clone (or merge) object method
clone = function (obj, nObj) {
 
    // merge to given object, or return a new one
    nObj = nObj || {};
 
    for (var prop in obj) {
 
        nObj[prop] = obj[prop];
 
    }
 
    return nObj;
 
},
 
// the actual options object that will be used
options = clone(defaults);
 
// apply parsed options from command line using nopt
clone(nopt(
 
        // command line options
    {
        source: String,
        recursive: Boolean
    },
 
        // shorthands
    {
        s: '--source',
        r: '--recursive'
    },
 
        process.argv, 2), options);
 
// using node-dir readFiles
dir.readFiles(options.source, options, function (err, content, fileName, next) {
 
    console.log('********************');
    if (err) {
 
        // if there is an error log that
        console.log(err);
 
    } else {
 
        // else log filename, and content of a file
        console.log(fileName);
        console.log('**********');
        console.log(content);
 
    }
    console.log('********************');
 
    next(); // next file
 
});
```

So now I should be able to install my project globally, and if all goes well I can not use this script anywhere within my operating system environment just like any other CLI tool.

```js
$ npm install -g
$ node-dir-demo -r
```

Using nopt I can define any options, including shorthands that I want.

## 6 - Alternatives to node-dir

So of course node-dir is not the only npm package that can be used as a file system walker, there are many alternatives, and of course there is the option of making your own file system walker with just node.js by itself.

## 6.1 - klaw

So these days [klaw might be my favorite](/2018/07/19/nodejs-klaw/) file system walker that I know of so far. It might not have all the features that I would want in such a dependency, but it is still a nice solution for this sort of thing.

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
 
});
```

## 7 - Conclusion

I started playing with some of the other methods, but ran into problems with the async alternatives for readFiles in version 0.1.17. For the most part the readFiles method does what I want for most projects that come to mind, for looping over all files, or only files the meet a certain pattern. The readFiles method also works great for getting what it is that I want when doing something like this, the filename, and the content of all files.

