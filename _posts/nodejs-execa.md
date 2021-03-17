---
title: An enhanced child_process for node.js called execa
date: 2018-02-28 18:09:00
tags: [js,node.js]
layout: post
categories: node.js
id: 160
updated: 2021-03-17 16:45:24
version: 1.3
---

I have [written a post](/2018/02/04/nodejs-child-process/) on using the built in node.js [child_process](https://nodejs.org/docs/latest-v8.x/api/child_process.html) module which is one way to go about launching additional processes in a node.js environment. The module is a great built in starting point for starting an external command in the host operating system in which nodejs is running. The built in module seems to work just fine for the most part, however there might come situations in which I might need to use something that builds on top of this core built in nodejs module.

So far I have not ever really looked into, and tested out something that is an improvement over the built in child process module. However today I have come across something called [execa](https://www.npmjs.com/package/execa) that does the same thing as child_process, but adds some more features, such as making each method a promise.

<!-- more -->

## 1 - Basic example of execa

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

## 2 - Conclusion

I have to admit that I am not making that many nodejs projects these days, and when I do the built in nodejs child process module seems to still work okay when it comes to starting an external command within a nodejs script. I often just start with that, and I never really get around to finding a reason to look into using something that brings a little more to the table.


