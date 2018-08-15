---
title: Using streams with the request npm package.
date: 2018-08-15 13:27:00
tags: [js,node.js]
layout: post
categories: node.js
id: 260
updated: 2018-08-15 19:36:39
version: 1.10
---

So for [yet another post](/categories/node-js/) on [node.js](https://nodejs.org/en/) and the many useful packages that can be installed via [npm](https://www.npmjs.com/) I thought I would write another post on the npm package request, that is a popular http client for scripting http. Although I think this time around I will be focusing on streams. Out of the box request only gives to ways to work with incoming data, callback methods, and streams. Promise support can be added, but that is off topic for this post.

<!-- more -->

## 1 - What to know

This is an advanced post on node.js, and JavaScript that has to do with working streams using request over the built in modules for doing so. I will not be covering everything there is to know about request, let alone all the other topics of interest that branch off from this. If you want to learn the basics about request, I have [an older post on that](/2017/05/23/nodejs-request/). In this post I am usingh node 8.x, and the version of request is 2.88.0.

## 1.1 - Buffers

In this post I will be making heavy use of Buffers, they come up a lot in node.js when working with streams. In this post I will be mostly working with chunks of data from requests using request, as that is what this is mainly what the post is on. However in some examples I will also be working with buffers when it comes to writing data to a file as well. If you are not to keen on buffers you might want to check out my [post on buffers](/2018/02/07/nodejs-buffer/), but the [node.js docs](https://nodejs.org/dist/latest-v8.x/docs/api/buffer.html) might very well be the best source on that subject.

## 1.2 - Streams

This post has to do with streams involving the http client request. Request gives two ways to work with data that is the reponse to an http request, callbacks, and streams. If you do not know a great deal about streams you might want to check out the [node.js docs on streams](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html) as well.

## 2 - Just logging chunks of data as they come in.

As chunks of data come in from a request there are many things that I might want to do with that stream of data. Such as writing them to a file, running it through some kind of transformation, or just logging it out to the standard output in the command line interface. In this section I will be going over a few quick examples of just doing this for starters.

### 2.1 - Using process.stdout

One way to log that data to the console, is to pipe it to process.stdout. This will work in a simular way to that of using console.log, the incoming chunks will be logged out to the console.

```js
let request = require('request');
 
request('https://raw.githubusercontent.com/request/request/master/README.md')
 
.pipe(process.stdout);
```

### 2.1 - Using console.log by using the data event

If you really want to use console.log, one way to do so would be to the data event.

```js
let request = require('request');
 
request('https://google.com')
 
.on('data', function (chunk) {
 
    console.log(chunk.toString());
 
});
```

This is also handy if I want to do something with the chunks as they come in, but it might not be a true replacement for stream.transform, more on that later.

## 3 - Writing chunks to a file

One thing that comes to mind when working with streams using request, is that I will want to write some chunks of data to a file. for this there is the createWriteStream method in the stream module. In this section I will be covering a few examples of this using request.

### 3.1 - CreateWriteStream basic example

So this will be a basic example of using stream.createWriteStream to write chunks of data from a request using request. I can use the on error, and on data events to log any errors, and give a sense of progress. The pipe the incoming chunks to createWriteStream.

```js
let request = require('request'),
fs = require('fs');
 
// start the get request
request(process.argv[2] || 'https://dustinpfister.github.io')
 
// log any error
.on('error', function(err){ console.log(err);})
 
// log chunks
.on('data', function (chunk) {console.log(chunk.toString());})
 
// pipe to createWriteStream
.pipe(fs.createWriteStream('file_' + new Date().getTime() + '.txt'));
```

### 3.2 - Using the write method

If I want to use write stream in a way in wich I call a method each time I want to write a few bytes of data to the file that I have created with create Write stream that is not to hard to pull off. Doing so just requires that I save the instance of the write stream to a variable, and just call the write method, passing the chunks to that method.

```js
let request = require('request'),
stream = require('stream'),
fs = require('fs'),
 
// requesting a url given from the command line, or my home page
uri = process.argv[2] || 'https://dustinpfister.github.io',
 
// a tx file to write to
txFile = fs.createWriteStream('file_' + new Date().getTime() + '.txt');
 
// start the get request
request({
 
    method: 'get',
    uri: uri
 
})
 
// if an error log it
.on('error', function (err) {
 
    console.log(err);
 
})
 
// for each chunk
.on('data', function (chunk) {
 
    // log to the console
    console.log(chunk.toString());
 
    // and write it to the file
    txFile.write(chunk);
 
})
 
// when done
.on('end', function () {
 
    // let me know, and end
    console.log('file done');
    txFile.end();
 
});
```

This is useful for situations in which the writing process might have many pauses, and I just want to write to the file a few bytes at a time.

## 4 - Stream.transform

The transform method in the node.js built in stream module, can be used to define my own transform methods. That is anything that I might want to do with an incoming stream of data, simple things like converting text to upper case, to more complex things that can be considered a kind of compression, encryption, or obfuscation.

### 4.1 - To upper case

For a simple example of a transform I made an example that just converts every letter to uppercase.

```js
let request = require('request'),
stream = require('stream');
 
request('https://raw.githubusercontent.com/request/request/master/README.md')
 
.pipe(new stream.Transform({
 
        transform: function (chunk, en, cb) {
 
            this.push(chunk.toString().toUpperCase());
 
            cb();
 
        }
 
    }))
 
.pipe(process.stdout)
 
.on('error', function (err) {
 
    console.log(err);
 
});
```

This is just a basic example of what can be done with Stream.transform, but I can define some kind of more complex way of transforming an incoming stream of data with this.

## 5 - Downloading war and peace

So maybe a good example of why streams are important is when dealing with very large files. The novel war an peace has a reputation of being a very large book, of over five hundred thousand words. On a slow connection a file this large will take a little while to download. 

In this example I am checking the headers of a file at a url that holds a text file that is a copy of war and peace via a head request first. Once the head request is done I look for a content length header, and assume that this must be the byte length of the file. Once I have the byte length I can check if it is between some set limits for downloading the body of a file. If all goes well I then start the get request for the file, and for each incoming byte of data I update a percent done variable, and log the current percentage done in the console. While this is happening I am also writing the chunks to a file as well.

```js
let request = require('request'),
stream = require('stream'),
fs = require('fs'),
 
// requesting "War, and peace" (it's over 500,000 words)
uri = 'http://www.textfiles.com/etext/FICTION/war_peace_text',
 
// a tx file to write to
txFile = fs.createWriteStream('warpeace_.txt');
 
// start out with a head request
// as I would likt to know the file
// size first
request({
 
    method: 'head',
    uri: uri
 
})
 
// if an error log it
.on('error', function (err) {
 
    console.log(err);
 
})
 
// if we have a response for the head request
.on('response', function (res) {
 
    // get the byte size
    let byteSize = res.headers['content-length'] || -1,
    byteDown = 0,
    per = 0;
 
    // if we have a byteSize between two bounds
    if (byteSize >= 0 && byteSize <= 10000000) {
 
        // Then make the actual get request
        // for the body of the file
        request({
 
            method: 'get',
            uri: uri
 
        })
 
        // if an error log it
        .on('error', function (err) {
 
            console.log(err);
 
        })
 
        // for each incoming chunk
        .on('data', function (chunk) {
 
            byteDown += chunk.length;
            per = byteDown / byteSize * 100;
 
            console.log('downloading: ' + per.toFixed(2) + '%');
 
            // write the current chunk
            txFile.write(chunk);
 
        })
 
        .on('end', function () {
 
            console.log('file done');
            console.log(byteDown + ' bytes downloaded');
 
            txFile.end();
 
        });
 
    } else {
 
        console.log('byteSize: ' + byteSize);
        console.log('byteSize not in bounds, headers:');
        console.log(res.headers);
 
    }
 
})
```

