---
title: The fs.createWriteStream method
date: 2018-08-17 20:37:00
tags: [js,node.js]
layout: post
categories: node.js
id: 262
updated: 2018-08-23 16:58:17
version: 1.13
---

In [node.js](https://nodejs.org/en/) streams come up often, even with the most simple of examples will typically involve logging something to the standard output which is a kind of stream. In this post I will be writing about the [fs.createWriteStream method](https://nodejs.org/docs/latest-v8.x/api/fs.html) in the node.js built in file system module, and why that is often a better choice for writing to a file compared to other options in that module.

<!-- more -->

## 1 - start here

This is a post on the fs.createWriteStream method in the node.js built in file system module. This method can be used to quickly make a writable stream for the purpose of writing data to a file. This method may be a smarter option compared to methods like fs.writeFile when it comes to very large amounts of data. This is not a getting started post on node.js, or javaScript in general, and I assume that you have log at least a few hours with these things before hand. If not you might have a hard time enjoying reading this post.

### 1.1 - Writable streams

The fs.createWriteStream is an example of a writable stream, which differs from readable streams, and duplex streams. For example when it comes to piping data from one stream to another a readable stream can pipe to a writable stream, but not the other way around, because there is nothing to read. Some of the base events are different as well, if you want to learn more about streams there is always the [node.js docs on streams](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html), my content on them as of this writing is a little thin.

## 2 - Some basic examples of fs.createWriteStream

So for starters I put together some simple examples of fs.createWriteStream. In these examples I will be just should some very basic use case examples, and will not be getting into anything to intense involving piping, and events.

### 2.1 - A fs.createWriteStream hello world example

A simple hello world example of fs.createWriteStream might involve just grabbing a reference to the file system module. Then use the fs.createWriteStream by calling it and passing the path to where the data should be saved as the first argument. Once that is done the write method can be used to write a string to the file.

```js
let fs = require('fs');
 
let writer = fs.createWriteStream('helloworld.txt');
 
writer.write('hello world');
```

## 3 - Piping from readable streams

With writable streams such as the streams created with fs.createWriteStream, data can be piped from a readable stream.

```js
let fs = require('fs');
 
let writer = fs.createWriteStream('test_copy.txt', {
        flags: 'w'
    });
 
let reader = fs.createReadStream('test.txt')
 
    .pipe(writer);
```

## 4 - Events

It is possible to attach events to an instance of fs.createWriteStream, or any stream for that matter. The type of events are the stream as with any writable stream, however there are also a few that are for fs.createWriteStream only. In this section I will be going over some of these events,a dn give simple examples.

### 4.1 - The error event

The error event will fire if an error occurs, for example if I try to write to a file that all ready exists when set in the w+ file mode using the flag option.

```js
let fs = require('fs');
 
// a writer in 'wx+' mode that will fail if the file
// all ready exists
let writer = fs.createWriteStream('test.txt',{flags:'wx+'})
 
.on('error', function (err) {
 
    console.log(err);
 
});
 
writer.write('this will fail if the file is there before hand');
```

A must have event for error handling.

### 4.2 - The open event

The open event will fire once a file is open, and ready to write to. The first element is the file descriptor of the file.

```js
let fs = require('fs');
 
let writer = fs.createWriteStream('test.txt')
 
.on('open', function (fd) {
 
    console.log('file is open!');
    console.log('fd: ' + fd);
 
});
```

### 4.3 - The pipe event

The pipe event will fire whenever something is being piped in from a readable stream

```js
let fs = require('fs');
 
let writer = fs.createWriteStream('test_copy.txt', {
        flags: 'w'
    });
 
writer.on('pipe', function () {
 
    console.log('seomthing is being piped in.');
 
});
 
let reader = fs.createReadStream('test.txt')
 
    .pipe(writer);
```

## 5 - Conclusion

The fs.createWriteStream method is one of many examples of a writeable stream in node.js. For the most part streams are something that I consume, and there is no need to make my own custom streams. If for some reason you want to do that, you will want to use [stream.Writable](https://nodejs.org/docs/latest-v8.x/api/stream.html#stream_class_stream_writable). If what needs to happen involves streaming data to a file, on the local system though there is not much need to create a custom stream from the ground up though, in most cases fs.createWritweStream will work just fine.