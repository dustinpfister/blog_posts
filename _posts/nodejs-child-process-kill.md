---
title: Killing a node.js child-process that was started from within a main script.
date: 2018-02-05 13:22:00
tags: [js,node.js]
layout: post
categories: node.js
id: 145
updated: 2018-02-05 13:43:19
version: 1.0
---

In my effort to make helpful posts on [node.js](https://nodejs.org/en/), I have been working with the [child_process module](https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html) lately. This is a very useful module that can be used to launch a command on the operating system of the computer that the node.js project is running on, including node itself. So it is a way in which I can run another script from within a script and when doing so this child process will end up having it's own process id, and is a way to go about doing some things in parallel in a node.js environment.

<!-- more -->

When launching such a process there might be some kind of condition in which I will want to kill the child process if it is the kind of process that will keep going otherwise. Luckly doing so is very easy I just need to use the kill method that is provided to the object that is returned when using spawn.

## Getting started with a simple demo

In this demo I will be using two scripts one is the usual index.js file, and the other I will be calling loop.js. The main index.js file will launch the loop.js file using the spawn method to call node, at which point loop.js will keep looping, logging to the console until it is killed by a condition in the main index.js file.

## loop.js

So the loop.js is a very simple script that will just log to the console every half second by making use of the setInterval core js method.

```js
console.log('child process started');
 
let st = new Date();
setInterval(function () {
 
    let time = new Date() - st;
 
    // log what this script is doing
    console.log('child: ' + time);
 
}, 500);
```

So in this demo loop.js does not do much of anything, but it could be some other kind of script that does some heavy lifting of some kind.

## index.js

The main index.js file which I will be starting with node in the command line serves as a main process that will start the child process, and when needed, stop it as well.

```js
// using spawn
let spawn = require('child_process').spawn;
 
console.log('main process started.');
 
let script = spawn('node', ['loop.js']);
 
script.stdout.on('data', (data) => {
 
    // data is a Buffer
    // log a conversion to a string that is one less byte
    // this is drop the line feed.
    console.log(data.slice(0,data.length-1).toString('utf8'));
 
});
 
// start time
let st = new Date();
 
setInterval(function () {
 
    let time = new Date() - st;
 
    // if time is over 5 secs, and the script has not been killed...
    if (time > 5000 && !script.killed) {
 
        // pause and kill script
        script.stdin.pause();
        script.kill();
        console.log('child killed');
 
    }
 
    // After ten seconds kill this main script
    if (time > 10000) {
 
        console.log('ending main process');
        process.exit();
 
    }
 
    // log what this script is doing
    console.log('main: ' + time);
 
}, 1000);
```

So the spawn method will call node in the command line, and pass a single argument, which is the same as calling:

```
$ node loop.js
```

When called it will return an object, that I have referenced in the variable _script_. This object has methods that allow for me to define event handlers to work with the output of the process, and also to stop it by calling the kill method of this object.