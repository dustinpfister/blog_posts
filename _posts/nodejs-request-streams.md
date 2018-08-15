---
title: Using streams with the request npm package.
date: 2018-08-15 13:27:00
tags: [js,node.js]
layout: post
categories: node.js
id: 260
updated: 2018-08-15 15:31:57
version: 1.4
---

So for [yet another post](/categories/node-js/) on [node.js](https://nodejs.org/en/) and the many useful packages that can be installed via [npm](https://www.npmjs.com/) I thought I would write another post on the npm package request, that is a popular http client for scripting http. Although I think this time around I will be focusing on streams. Out of the box request only gives to ways to work with incoming data, callback methods, and streams. Promise support can be added, but that is off topic for this post.

<!-- more -->

## 1 - What to know

This is an advanced post on node.js, and JavaScript that has to do with working streams using request over the built in modules for doing so. I will not be covering everything there is to know about request, let alone all the other topics of interest that branch off from this. If you want to learn the basics about request, I have [an older post on that](/2017/05/23/nodejs-request/).


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

## 3 - Stream.transform

The transform method in the node.js built in stream module, can be used to define my own transform methods. That is anything that I might want to do with an incoming stream of data, simple things like converting text to upper case, to more complex things that can be considered a kind of compression, encryption, or obfuscation.

### 3.1 - To upper case

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
