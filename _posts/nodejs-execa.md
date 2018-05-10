---
title: An enhanced child_process for node.js called execa
date: 2018-02-28 18:09:00
tags: [js,node.js]
layout: post
categories: node.js
id: 160
updated: 2018-02-28 17:23:05
version: 1.0
---

I have [written a post](/2018/02/04/nodejs-child-process/) on using the built in node.js [child_process](https://nodejs.org/docs/latest-v8.x/api/child_process.html) module which is one way to go about launching additional processes in a node.js environment. However I have not ever look into, and tested out something that is an improvement over that. Today I have come across something called [execa](https://www.npmjs.com/package/execa) that does the same thing as child_process, but adds some more features, such as making each method a promise.

<!-- more -->

## Basic example of execa

So the method that will be used the most typically is what is given in the main method that is exported when requiring execa into a project. This method works just like spawn in the native child_process node.js module, so it is faster, and safer than another method in this project that works like exec.

So I made a simple test script that just does something with arguments.
```js
let argv = process.argv.slice(2);
 
if (argv.length >= 2) {
 
    console.log(Number(argv[0]) + Number(argv[1]));
 
}
```

And my basic.js file that I will be parent process that I will start with node looks like this.
```js
let execa = require('execa');
 
execa('node', ['script_test', '40','2']).then(function (data) {
 
    console.log('the answer is');
    console.log(data.stdout);
 
}).catch (function (e) {
 
    console.log(e);
 
});
```