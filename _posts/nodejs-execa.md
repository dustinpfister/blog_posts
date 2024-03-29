---
title: An enhanced child_process for node.js called execa
date: 2018-02-28 18:09:00
tags: [js,node.js]
layout: post
categories: node.js
id: 160
updated: 2022-07-29 14:07:24
version: 1.8
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

So then this main execa method seems to work more or less like that of the spawn method of the child process module in core nodejs. However it will return a promise without having to create a wrapper, which is something that will not happen out of the box, at least not in the old versions of nodejs that I still find myself using now and then at least.

## 2 - Conclusion

I have to admit that I am not making that many nodejs projects these days, and when I do the built in nodejs child process module seems to still work okay when it comes to starting an external command within a nodejs script. I often just start with that, and I never really get around to finding a reason to look into using something that brings a little more to the table.

If you are looking for something more to read when it comes to running additional processes from a node script there is my main post on the [nodejs child process module](/2018/02/04/nodejs-child-process/) that might be a good starting point when it comes to what to work with when it comes to the built in child process module. The main methods of interest in that module are the [exec method](/2020/10/21/nodejs-child-process-exec/) and the [spawn method](/2019/08/02/nodejs-child-process-spawn/) both of which I have also wrote posts on that are the main methods to use when it comes to the module.

There is a great deal more to write about when it comes to working with child processes, but much of it might be a bit off topic. Also this post should mainly be about the execa module and what it has to offer over the built in child process module. As of this writing when I last edited this post it would seem that this module is still supported. However i am not so sure as to hold necessary it is to use something like this in light of what is possible with the child process lone when it comes to late versions of nodejs. many projects like this where introduced when older versions of nodejs where being used that did not do things like return a promise for many built in methods, however in late versions of nodejs that seems to be changing.

