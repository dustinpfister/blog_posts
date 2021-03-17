---
title: The current working dir and other dirs of interest in Nodejs with Process.cwd()
date: 2021-03-17 12:34:00
tags: [node.js]
layout: post
categories: node.js
id: 825
updated: 2021-03-17 12:50:08
version: 1.5
---

One thing that I wish that I got solid early on when I was first starting out with [nodejs](https://nodejs.org/en/) is how to get the current working directory, and also how to always get the directory where a script is located, along with other typical paths of interest on a system. In the process global there is a cwd method that when called will return the current working directory, which is of course a major directory of interest when it comes to creating a nodejs script. However it is not the only directory of interest of course it is also important to know how to go about getting the directory of the current script, and also how to get paths to assets that are relative to that script. There is also how to go about getting the user folder location when it comes to a standard location to park user specific data.

So in this post I will be covering a basic example of the [process.cwd](https://nodejs.org/api/process.html#process_process_cwd) method of course, but I will also be touching base on a whole bunch of other little topics that revolve around that.

<!-- more -->

## 1 - Just a basic process.cwd example for now when it just comes to getting the Current Working Directory

If I just want to get the current working directory I can use the process.cwd method to do so. However it is important to remember that the current working directory is just that, the current directory in which I am working with something. It should not be confused with the \_\_dirname global that will give me the path to the current script. More on that and many other little things in a bit, but for now lets just start out with the basic get current working directory example.

```js
console.log( process.cwd() );
```

## 2 -

```js
console.log( process.cwd() );
console.log( __dirname );
```

## 3 -

```js
let os = require('os');
 
console.log( process.cwd() );
console.log( __dirname );
console.log( os.homedir() );
```

## 4 -

```js
let path = require('path');
let fooMod = require(path.resolve(__dirname, 'lib/foo.js'));
let os = require('os');
let f = fooMod();
 
console.log( process.cwd() );
console.log( __dirname );
console.log( os.homedir() );
console.log( f.dirname );
console.log( f.mess );
```

## 5 - Conclusion

