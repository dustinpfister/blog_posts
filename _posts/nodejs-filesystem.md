---
title: Working with the file system module in node.js
date: 2018-02-08 22:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 148
updated: 2019-11-25 10:34:38
version: 1.10
---

Working with files is a big part of most [node.js](https://nodejs.org/en) projects. I have written a [post on fs-extra](/2018/01/08/nodejs-fs-extra/) a while back, but so far never got around to the core file system module in node.js itself.

Depending on the version range of node you wish to support, you might not need to make a user space module that extends the file system module part of the stack. For example if you want file system methods that return promises there is the nodejs build in util promisify method that can be used to get that effect fairly quick, and easy. If you want more than just that maybe you still do need to bother with something more, in any case in this post I will be going vanilla javaScript style when it comes to file io tasks.

This post will also serve as a general overview of the file system module, and I will link to additional posts on more specific topics where doing so is called for.

<!-- more -->

## 1 - Some very basic node file system getting started examples

In this section I will be going over some very basic examples of the node file system module. That is just the basics of requiring the module into a script, and then using the fs.readFile method to read a file that is in the current working directory.

As you would expected this section is targeted at total beginners of using the nodejs file system module, but have at least some background when it comes to getting started with nodejs, and javaScript in general.

### 1.1 - read a file callback style

To start off this post how about a simple read file example. Use of the method is fairly simple, I just call fs.readFile, and pass the path of the file I want to read, following with the character encoding, and finally a callback that will be called when the file is read.

```js
let fs = require('fs'),
path = require('path'),
cwd = process.cwd();
 
fs.readFile(path.join(cwd, 'README.md'), 'utf-8', function (e, data) {
 
    if (e) {
 
        console.log(e);
 
    }
 
    console.log(data);
 
});
```

I am using the [path module](/2017/12/27/nodejs-paths/), because I have found that is a much better way of handling paths compared to just concatenating strings. In addition the cwd method of the process object will always return the current working directory which can be useful, but that is another post, for another day.

### 1.2 - Read a file Promise style

As of node.js 12.x all the methods do return promises now, However you might still want to promisify them anyway for the sake of supporting older versions of node. This is one of the reasons why you might want to use [fs-extra](/2018/01/08/nodejs-fs-extra/), but it's not like it is that hard to make a method that will return a promise. One way is to use the util promisify method.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
cwd = process.cwd();
 
let readFile = promisify(fs.readFile);
 
// read a file Promise style
readFile(path.join(cwd, 'README.md'), 'utf8')
 
.then(function (md) {
    console.log(md);
})
 
.catch (function (e) {
    console.log(e);
});
```

If you want to push backward compatibility back even further it might require the use of a promise library such as bluebird.

## 2 - Writing to files using the node file system module

So now that we have the basics out of the way when of comes to using the nodejs file system module lets progress into writing to file. There is more than one method, and file mode when it comes to writing to files, as well as reading from theme. However in this section I will be focusing on the fs.wirFile method, and the fs.createWriteStream methods.

I will not be getting into these methods in depth here, however I do have posts in which I do with both the fs.writeFile, and fs.createWriteStreams methods.

### 2.1 - An fs.writeFile basic example

So here is a basic example of the fs write file method. 

I am also using the promsify method of the node util module to make a new write method that will return a promise. If you are using a modern version of node and do not care about backward compatibility with older node versions, you could skip the use of the promisify method. However I do care so I often work out something like this for starters when making any kind of script that uses the fs.wirtFile method.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
cwd = process.cwd(),
write = promisify(fs.writeFile);
 
let path_db = path.join(cwd, 'db.json'),
db = [{
        cost: 2.8,
        shelfPrice: 2.99,
        desc: 'Cheepo Red Wine'
    }
],
json = JSON.stringify(db);
 
// write the json file
write(path_db, json, 'utf8')
.then(() => {
    console.log('created db')
})
.catch(() => {
    console.log(e.message);
});
```

There is way more to write about when it comes to using the fs.write method when it comes to using custom file flags, access modes, and encodings. Even so it is not necessary a magical method that will work well for all situations such as writing data  on a stream basis, and writing to just a certain byte index in a file. So lets look at some more examples of writing data to a file using the core node file system by itself.

### 2.2 - Using the fs.write method along with fs.open, and fs.close

The fs.writeFile method might work okay for most simple project where I am just interested in writing the whole contents of a file at once. However if I am more interesting in opening a file in a mode that can be used to both read and write to a file, and at certain byte locations with the file, then there is not one but several method in the node file system module of interest.

There is the fs.write method, and also the fs.read method, but before I can use those I need a file descriptor. To get that value I first need to use the fs.open method, and when I am done I need to use the fs.close method.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
cwd = process.cwd(),
open = promisify(fs.open),
close = promisify(fs.close),
read = promisify(fs.read),
write = promisify(fs.write),
 
path_file = path.join(cwd, 'db.txt');
 
let fd = null;
open(path_file, 'w+', 0o666)
 
.then((nFd) => {
    fd = nFd;
    return write(fd, Buffer.from('foo'), 0, Buffer.length, 0);
})
 
.then(() => {
    return close(fd);
})
 
.catch((e) => {
 
    console.log('\n', 'Error: ');
    console.log('code:' + e.code);
    console.log('mess: ' + e.message);
    console.log('');
 
});
```

### 2.3 - A fs.createWriteStream basic example

```js
let fs = require('fs');
 
let writer = fs.createWriteStream('helloworld.txt');
 
writer.write('hello world');
```