---
title: The node.js child-process module
date: 2018-02-04 18:34:00
tags: [js,node.js]
layout: post
categories: node.js
id: 144
updated: 2018-02-04 19:10:09
version: 1.1
---

So for February I was plaining to [expand my catalog](/categories/node-js/) on [node.js](https://nodejs.org/en/) related content by getting into writing a bunch of demos on [core node.js modules](https://nodejs.org/dist/latest-v8.x/docs/api/), rather than what I have been doing for the most part before hand which is writing about npm packages. Looking over what I have so far, I never got around to writing about the [child_process module](https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html) yet, so I thought I would give that one a go.

<!-- more -->

## What is the child process module is for.

This module allows me to start a separate process on the command line. I can run any command that might be in the operating system environment, including node, which makes it one of two modules of interest when doing something involving running more than one instance of node on the operating system. The other module of interest being the [cluster module](/2018/01/18/nodejs-cluster/).

## Basic example of child_process using spawn

This module is a little involved so I will likely be writing a few posts on this module alone. So in this post I will just be providing a simple example of using the spawn method of the child_process module to launch another \*.js file with node.

Because this demo involves launching a script with another script, I will need to files, a test.js, and the usual index.js.

test.js:
```js
console.log('this is a child-process.');
```

index.js:
```js
// using spawn
let spawn = require('child_process').spawn,
 
script = spawn('node', ['test.js']);
 
script.stdout.on('data', function(data){
 
    console.log(data.toString());
 
});
```

With this demo when I call index.js from the command line, I get the message that was logged in test.js.

```js
$ node index
this is a child-process.
```

Spawn is an alternative to another method in the child_process module called exec. Generally I like to use spawn over exec because of some potential security concerns, but they both do the same thing, launch a process.
