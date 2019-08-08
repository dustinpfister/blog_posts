---
title: The node stream module and making custom readable and writable streams
date: 2019-08-08 10:51:00
tags: [node.js]
layout: post
categories: node.js
id: 518
updated: 2019-08-08 12:24:46
version: 1.3
---

So I have wrote a few posts on streams when it comes to the create read stream and create write stream file system module methods, as well as many other such methods in various native nodejs modules. However I have not wrote much on the node stream module by itself, and how to go about using that module to make my own custom streams. Also it is important to know a thing or two about this module and the nature of streams in general when it comes to working on nodejs projects. So I thought I would put together a piece of content in which I am focusing on the node stream module and custom made streams, rather than something else in nodejs that inherits from the base classes in this module.

<!-- more -->

## 1 - Readable Node Stream example that streams random letters

So there are writable streams and duplex streams that can both read and write, but for starters readable streams might be a good place to begin with streams in nodejs. So I made a quick example that can be used to stream random letters to a writable stream that can console the data. This might not be the most piratical example of a readable stream, but the basic concepts can surly be applied to a stream that might have some kind of piratical application. So in this section I will be writing about using the node stream module to make a custom readable stream, and some basic examples that make use of it.

### 1.1 - The Random Letters Readable stream file

So I started out by making a readable node stream module that exports a method that can be used to create an instance of the Random Letters readable stream.

```js
let stream = require('stream');
 
// default stop if method
let stopIf = function (buff, opt) {
    if (opt.byteIndex < opt.totalBytes) {
        // use the push method to push data to be
        // consumed
        this.push(buff);
    } else {
        // push null when done
        this.push(null);
    }
};
 
// returns a RandomLetters Readable Stream
exports.RandomLetters = function (opt) {
    opt = opt || {};
    opt.byteIndex = opt.byteIndex === undefined ? 0 : opt.byteIndex;
    opt.totalBytes = opt.totalBytes === undefined ? 1024 : opt.totalBytes;
    opt.stopIf = opt.stopIf || stopIf;
    return new stream.Readable({
        // must have a read method
        read: function () {
 
            // generate some data
            let n = 65 + Math.round(25 * Math.random());
            let buff = Buffer.from(n.toString(16), 'hex');
 
            // call stopIf and step index
            opt.stopIf.call(this, buff, opt);
            opt.byteIndex += 1;
            if (opt.byteIndex > opt.totalBytes) {
                opt.byteIndex %= opt.totalBytes;
            }
        }
    });
};
```

### 1.2 - Using a pipe to standard output with default stop method

```js
// Using my Random Letters Read Stream
let RandomLetters = require('./read_random_letters.js').RandomLetters;
 
// create an instance of the read stream
let readStream = RandomLetters({totalBytes: process.argv[2] || 1024 });
 
// pipe to a writable stream like the standard output
readStream.pipe(process.stdout);
```

### 1.3 - Using a pipe with custom stop method that gives to condition to stop

```js
// Using my Random Letters Read Stream
let RandomLetters = require('./read_random_letters.js').RandomLetters;
 
// create an instance of the read stream
let readStream = RandomLetters({
        stopIf: function (buff, opt) {
            // no stop condition
            this.push(buff);
        }
    });
 
// this will go forever until I break with ctr+c
// because piping is a way to enter flowing state
readStream.pipe(process.stdout);
```

### 1.4 - Fine grain pause and resume control

```js
// Using my Random Letters Read Stream
let RandomLetters = require('./read_random_letters.js').RandomLetters;
 
// create an instance of the read stream
let readStream = RandomLetters({
        stopIf: function (buff, opt) {
            // no stop condition
            this.push(buff);
        }
    });
// So then I can just read and read and define my condition to stop
// by some other way such as using the readable.resume, read, and pause
// methods to control the flow state
console.log(readStream._readableState.flowing); // null
setInterval(function () {
    readStream.resume();
    process.stdout.write(readStream.read().toString());
    console.log(' ' + readStream._readableState.flowing); // true
    readStream.pause();
    console.log(' ' + readStream._readableState.flowing); // false
}, 1000);
```