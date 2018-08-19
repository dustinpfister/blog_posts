---
title: The fs.createReadStream method
date: 2018-08-18 22:06:00
tags: [js,node.js]
layout: post
categories: node.js
id: 263
updated: 2018-08-19 13:42:19
version: 1.15
---

In the post I will be writing about read streams in [node.js](https://nodejs.org/en/) using the [fs.createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options). This method is one of many examples of streams in node.js, so if you are new to streams it makes sense to just start playing around with some of these methods. The fs.createReadStream is an example of a readable stream, and as such it can only be used to read data from a file, which differs from Writable and Duplex streams. This methods can be used in conjunction with a writable stream, including the fs.createWriteStream method. So lets take a look as some examples of working with readable streams with node.js, and it's built in file system module.

<!-- more -->

## 1 - Before continuing reading

This is a post on the fs.createReadStream method in node.js, I will not be getting into streams in Depth, let alone the file system module, node.js, and javaScript by itself.

### 1.1 - Version numbers matter

In this post I am using node.js 8.x which at the time of this writing is still the latest major release that is an LTS release. If you are using a newer version of node there might be a few more features to be aware of.

### 1.2 - Readable, writable, and Duplex streams

The method I will be writing about in this post is an example of a readable stream, this means that certain methods that can be used in writable streams are not present. So this methods is used as a way to just read a file, but not to write to it. However readable streams allow for piping to a writable stream when working with something like fs.createWriteStream. These other kinds of streams will be touched on breafly, but the focus will be on reading streaming data, rather than writing it.

### 1.3 - Buffers

When working with fs.createReadStream, or streams in general it is important to have a string foundation understanding of buffers in node.js. This is what you will be working with when it comes to working with chunks of data coming in at a certain rate. If you like you can check out my post on buffers that covers the must know features of buffers in node.js.

## 2 - Some basic examples of fs.createReadStream

For starters lets just look at a few basic examples of using fs.createReadStream to read the contents of a file, one chunk at a time. There are many different ways to create an instance of this kind of readable stream, involving chaining, variables, and both old and new coding styles.

In these examples I will just be used the on data event to log what is being read into the console, or standard output.

## 2.1 - A basic example that involves chaining

So the method is part of the node.js file system module, and as such I will first need to bring that into a script using require. Once I have the fs module to work with I can call that, passing the path of the file I want to read, and then I can attach events where I can define what to do for each chunk of data that is coming in. One way to do all of that in one stroke is by way of chaining.

```js
require('fs').createReadStream('README.md').on('data', function (chunk) {
    console.log(chunk.toString());
});
```

This might look nice and concise, but when it comes to getting into a real project involving the use of fs.createReadStream, chances are I might not aways be such a great idea to have everything chained together like this.

## 2.2 - Using some variables

So client side jaavScript development might be one thing, but when it comes to node.js development there is no real reason to bother with var anymore when it comes to declaring some variables. 

```js
let fs = require('fs'),
reader = fs.createReadStream('README.md');
 
reader.on('data', function (chunk) {
 
    console.log(chunk.toString());
 
});
```

So I do miss the old days of only having one keyword to worry about when it comes to declaring variables thought so I tend to just type let, event though const might be the better option. Getting into that thought is off topic for this post so moving on.

### 2.3 - Basic example with an options object

Like many methods in node.js, an options object can be passed to it as the second argument when calling the method. This is what I will want to use when doing things like changing the chunk size in bytes, character encoding, and the byte position start a,d ending location.

```js
let fs = require('fs'),
reader = fs.createReadStream('README.md', {
    flag: 'a+',
    encoding: 'ascii',
    start: 8,
    end: 64,
    highWaterMark: 16
});
 
reader.on('data', function (chunk) {
 
    console.log(chunk.toString());
 
});
```

I will be getting into these options in greater dpeth in the options section of this post.

## 3 - Events for fs.createReadStream

So there are a few events that are part of fs.createReadStream, and there are a few others that are there simple because it is an example of a readable stream. In this section I will be writing about these events, and how that come in handy when dealing with a readable stream via fs.createReadStream.


### 3.1 - The data event

So far in this post all of my examples involve the use of the data event. This event is not just an event of fs.createReadStream, but of read streams in general. In any case this event is by far the most important event of a readable stream because in any application that involves the use of a readable stream I will want to do something with that data as it comes in chunk, by chunk.

```js
let fs = require('fs');
 
fs.createReadStream('README.md')
 
.pipe(fs.createWriteStream('README_copy.md'))
 
.on('data', function (chunk) {
 
    console.log(chunk.toString());
 
});
```

In any example involving a readable stream I will often want a data event that will be used to work with the data that is being read, however an alternative would be to pipe that data to a writable stream, more on that later

### 3.2 - The error event

In the event that an error happens, I might want to do something about it, or at least know about it. For this there is of course the error event, another event that is there not just in an instance of createReadStream, but with streams in general as it should be.

```js
let fs = require('fs');
 
fs.createReadStream('file-that-is-not-there.txt',{flags:'r'})
 
.on('data', function (chunk) {
 
    console.log(chunk);
 
})
 
// this will fire if the file is not there
.on('error', function (err) {
 
    console.log(err);
 
});
```

In this example an error will occur because of the nature of the 'r' file mode in which an error occurs if a file that does not exist is being read. There are other file modes that will result in the file be created if it is not there, more about that in the section about options.

### 3.3 - The close event

The close event is called once the read stream is all over, this means the stream itself, and any additional resources such as a file descriptor which is the case with this file system method. This event differs from the end event covered later in this section as that methods is called when there is no more data to consume, but certain resources may still be available.

```js
let fs = require('fs');
 
fs.createReadStream('README.md')
 
.on('data', function (chunk) {
 
    console.log(chunk);
 
})
 
.on('close', function () {
 
    console.log(''read stream closed'');
 
})
```

### 3.4 - The open event

This event is fired once the files file descriptor has been opened. That descriptor is available as the first argument of the callback given, it is also a property of the object that can be referenced via the this keyword.

### 3.5 - The readable event

```js
let fs = require('fs');
 
let reader = fs.createReadStream('README.md',{highWaterMark:16}).pause();
 
reader.on('data', function(chunk){  console.log(chunk);})
 
// readable event
reader.on('readable', function () {
 
    console.log('ready to read');
 
    this.read();
 
});
```

### 3.6 - The end event

So with a readable stream the end event files when the stream is out of data to read, but has not been closed just yet. There is an auto close property that is set to true by default, if this is set to false before the stream runs out of data the close event will not fire, but the end event will.

So An example like this might help to illustrate the difference between the close, and end events of a readable stream.

```js
let fs = require('fs');
 
fs.createReadStream('README.md',{autoClose:false})
 
.on('data', function (chunk) {console.log(chunk);})
 
// the end event is fired when 
// there is no more data to read, but 
// has not been closed yet
.on('end', function () {
 
    let s = this;
    setTimeout(function () {
 
       // the destroy method can be used to
       // close the stream manually
        s.destroy();
 
    }, 3000);
 
})
 
.on('close', function () {
    console.log('closed now');
});
```