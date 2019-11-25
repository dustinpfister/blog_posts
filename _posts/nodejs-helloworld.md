---
title: Nodejs hello world examples
date: 2017-04-05 16:25:00
tags: [js,node.js]
layout: post
categories: node.js
updated: 2019-11-25 13:33:52
id: 11
version: 1.6
---

I am sure I am not alone when I say that I love [node.js](https://nodejs.org/en/), and javaScript. The ability to create complex full stack web applications with a single uniform scripting language for both the front, and back end is really changing things for the better if you ask me. 

However there is much more to that also, nodejs can also be used for all kinds of general programing tasks. For example I like making all kinds of useful and interesting command line interface tools with nodejs that ca be used to create files, walk over a file system structure, and so much more I do not event know where to begin.


<!-- more -->

However I guess you always need to start somewhere when it comes to node.js and the concept of a [hello world](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program) example. in addition although I am sure it has been done before many times sense it's release in 2009, I thought I would throw my own hello world examples together for the hell of it so here it is.

## 1 - The simplest my_script nodejs hello world example

If the aim is to make back end scripts that ultimately spit something out to the standard output of the console, then writing a node.js hello world can be as simple as just doing a single console.log call.

```js
console.log('hello world');
```

Yes thats it, just save it as something like my_script.js with your favorite ASCII or Unicode editor then navigate to the working directory and just call it with node.

```
$ node my_script.js
```

## 2 - A module nodejs hello world style

I often run into situations in which I want to write a module. Getting started with modules is pretty easy, I just need to append to exports like this.

```js
exports.helloWorld = function () {
 
    return 'hello world';
 
};
```

Once I save this as a file that I often tuck away somewhere in my working tree. I just need to use require to use it in a script.

```js
var my_module = require('./js/module.js');
 
console.log(my_module.helloWorld());
```

## 3 - Simple http server.

Many node.js projects are not just stand alone Command Line Interface tools, and modules. Typically a lot of node projects are some kind of full stack web application. Starting a little hobby project can begin with something as simple as this:

```js
var http = require("http");
 
http.createServer(function (req, res) {
 
    res.writeHead(500, {
        "Content-Type" : "text/plain"
    });
    res.writeHead(200);
    res.write('hello world.');
    res.end();
 
}).listen(8888);
```

## 4 - Conclusion

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).

Thats all for now, happy coding.