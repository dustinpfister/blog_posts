---
title: Find the count of cpus in a node.js environment
date: 2018-08-23 08:41:00
tags: [js,node.js]
layout: post
categories: node.js
id: 268
updated: 2018-08-23 10:42:23
version: 1.5
---

As I continue to log time working with [node.js](https://nodejs.org/en/) I start to get into things that are a little advanced such as clustering. When making a node.js project that will spawn additional instances of itself to help make some heavy lifting go faster, there is a need to know how many processors there are on the system that node is running. In this post I will be quickly writing about how to go abound finding that out very fast, and will be giving some quick examples on why this is helpful.

<!-- more -->

## 1 - what to know

This is a post on the os.cpus method in the node.js os module, a helpful module that can be used to work with the underlaying operation system that node.js is running on top of. I will not be getting into the os module in detail in this post, but I will be coving some use case examples of the os.cpus method in this module. When I made these demos I was using node.js 8.x, which at the time of this writing is the latest LTS major release version of node.js.

## 2 - A very basic example of os.cpus in node.js

The os.cpus method works by just simply calling it with no arguments, and it then returns an array of objects, where each object contains some properties about each processor. So for a very basic example of os.cpus, I made a quick script that just logs out the model, and speed of each cpu object in the array of objects that is returned by is.cpus.

```js
let os = require('os'),
 
cpus = os.cpus(),
cpuCount = cpus.length;
 
console.log('There are ' + cpuCount + ' cpu(s) on this system');
 
cpus.forEach(function (cpu, i) {
 
    console.log('**********');
    console.log('index ' + i);
    console.log('model: ' + cpu.model);
    console.log('speed: ' + cpu.speed);
 
});
```

So the count of cpus on the system can be found by just getting the array element length of the array returned by os.cpus. In addition I can gain some additional information about each cpu, but it is not at all a replacement for some other kind of back end that would give more detailed information.

## 3 - An example that involves the cluster module

So for a more interesting example I made a quick example that involves the use of the [cluster module](/2018/01/18/nodejs-cluster/). This module has many properties, and methods that help with forking a script. So it can be used to create more than one child process of the same script.

Of course I will not be getting into cluster in detail here, however I will be using os.cpus to launch a process for each processor that is found using os.cpus.

```js
// using the os, and cluster modules
let os = require('os'),
cluster = require('cluster');
 
if (cluster.isMaster) {
 
    // this is for the master process that is started by calling
    // this script with node from the command line
 
    // Calling the os.cpus method will give an array of objects
    // with some basic info on the numder of cpus
    // on the system
    let cpus = os.cpus();
 
    console.log('master: I am the master process.');
 
    // for each cpu
    cpus.forEach(function (cpu, i) {
 
        console.log('master: forking a child process for cpu ' + i);
 
        // fork this script to a new worker by calling cluster.fork
        // this will return an instance of Worker
        let worker = cluster.fork();
 
        // I can set some events for the worker here if I want
        worker.on('exit', function () {
 
            console.log('child: All done.');
 
        })
 
    });
 
    // the exit event will fire each time
    // a worker exits
    cluster.on('exit', function () {
 
        let activeWorkers = Object.keys(cluster.workers).length;
 
        if (activeWorkers === 0) {
 
            console.log('master: My work is done.');
            process.exit();
 
        }
 
    });
 
} else {
 
    // for this example a child process just logs to the screen
    // and exits
    console.log('child: hello I am a child process.');
    process.exit();
 
}
```

## 4 - Conclusion

So if I just want a count of how many processors there are to work with on a system the os.cpus methods works just fine, and with most of the scripts written with node.js there is not much need for detailed information about each processor. If you want more detailed information then you will want to use some other back end that can get that for you, and use it via the child-process module that can be used to work with such back ends from the command line withing a node.js script.