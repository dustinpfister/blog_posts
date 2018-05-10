---
title: Globals in a node.js environment
date: 2018-02-10 14:31:00
tags: [js,node.js]
layout: post
categories: node.js
id: 150
updated: 2018-02-12 20:02:38
version: 1.4
---

When working in a [node.js](https://nodejs.org/en/) environment there are many [global variables](https://nodejs.org/dist/latest-v8.x/docs/api/globals.html) to work with. Of course because it is server side javaScript there is what there is to work with in core js, or javaScript itself, however this post is on the additional global variables on top of core js that make core js server side js in a node.js environment.

<!-- more -->

## Coming from a client side javaScript background.

If you are familiar with client side javaScript, then you should be familiar with core js features that should be common between node.js and the browser, such as the javaScript syntax itself, things like Array, Function, Object, and so forth. In my experience when I was first starting out with node.js, I was able to quickly get up to speed as the core is more or less the same, compared to a browser that is complaint with the same javaScript spec (es5, es2015, ect).

There are naturally differences as well when it comes to things outside of core.js, and also some javaScript features may not work the same as you might expect, such as when you use the this keyword at the top level in node.js compared to a browser environment.


## Buffer

read my [full post on Buffer](/2018/02/07/nodejs-buffer/).

The Buffer class is what is used for working directly with binary data. Back when node.js was first starting out it was working with the es5 javaScript spec there was node of the [typed array constructors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) to work with, so Buffer was created to help work with binary data in a server environment, where a higher degree of control over the system is often typical, and legal.


## __dirname

This will give you the current dir of the module that you are working with, very useful when working with [paths](/2017/12/27/nodejs-paths/).


## __ filename

Another useful [paths](/2017/12/27/nodejs-paths/) related variable that is the full path to the current module, including it's filename.

## console

This provides simple console logging methods that you might be familiar with when working in a web browser. When using the console.log method the text is loged to the standard output rather than the javaScript console you may be familial with in a web browser.

```js
console.log('hello world');
// prints 'hello world' to the console
```

## exports

This is a way of exporting methods in a module to be used in another module by way of using require.

for example if I have a module.js file like this:
```js
exports.func = function(){
 
    return 'foo';
 
};
```

I can use that method in an index.js file in the same folder

```js
let func = require('./module.js').func;
console.log(func());
```

So when I call index.js with node the method will work in index.js

```
$ node index
foo
```

This is of course a way o go about breaking your code down into smaller, more manageable sections of code. It is essential to the process of defining a reusable package that can be used across projects, rather than writing the same code over, and over again from the ground up.

exports is what I generally used if I want to make a whole bunch of methods that are exported, If I just have one method to export there is also module.exports that is also of interest. More on that later.

## global

How global variables are handled in node.js is a little different from what you might be used to in client side javaScript. In client side javaScript typically you are dealing with just one global scope, however with a node.js project you have a global scope for each module.

## module

This represents the current module or \*.js file in your project, and contains helpful info on it. In my experience so far this variable has two major uses:

One is to find out of the current module has been called directly from the Command Line Interface, or is being used by another module, by making a comparison to require.main.

```js
let func = function (mess) {
 
    return 'mess: ' + mess;
 
};
 
if (require.main === module) {
 
    // if require.main equals the module,
    // then this script was called directly from
    // the CLI, as such I might want to call a method
    // and use some argument that may have been given from the
    // command line.
    console.log(func(process.argv[2] || 'Hello World'));
 
} else {
 
    // else it was called from another module, 
    // thus we should export what this module has
    // so it can be used there
    module.exports = func;
 
}
```

Doing something like this is necessary when making any kind of module that will be used directly, or by way of another module, or for whatever reason I just want to know how the module is being used.

The other Important use of the module variable is the module.exports property, this is what I use in conjunction with exports, to define what is exported when the module is used my another module with require.


```js
let func = function () {
 
    return 'foo';
 
};
 
// reassign exports, and module.exports to a whole
// new Object, and make it a function
module.exports = exports = function () {
 
    return 'bar';
 
};
 
exports.func = func;
```

## process

The process variable contains a whole bunch of useful information, such as any environment variable that may be present in the operating system environment, the current working directory, and any arguments that may have been given to the module from the Command Line Interface if the module was called directly rather than from a script.

### process.argv

This is where any arguments that have been given at the command line will be, it is an array, and the first two arguments will always be node, and the module that is beging called, that is why you often see something like this:

```js
var argu = process.argv[2] || 'index.html';
```

You may want to use some kind of option parser in stead of working out how to handle the parsing of options that are given from the command line from scratch. What I have experence with so far is [nopt](/2017/05/05/nodejs-nopt/), but there are many others out there.

## process.cwd()

This method will return the current working directory. Say you want to write a script that will read a file of a certain type at any directory at which the script is called, this is one way to anyways find out what the directory is

## process.env

This is another very important must know method in the process variable. It will contain all the environment variables that are available in the operating system in which the script is running, which becomes important when deploying an application to a hosting company that will only allow an application to start a server on a certain port that is specified by way of an environment variable.

```js
let port = process.env.PORT || process.argv[2] || 8080;
```

This will set the value of port to a port given by way of an environment variable called PORT if present, else it will expect a port value to be given as the first argument, and if that is not given it will default to the hard coded value 8080;

## require

Require is what is used to use additional modules in a module. It can be a built in node.js module, such as [path](/2017/12/27/nodejs-paths/), or [fs](/2018/02/08/nodejs-filesystem/), it can be a package that has been installed into a node_modules folder by way of using npm such as [cheerio](/2017/11/28/nodejs-cheerio/), or a module of your own design that may be within a lib folder in your project.

basic use of require to work with the node.js path, and file-system modules.
```js
let fs = require('fs'),
path = require('path');
 
fs.readFile(path.join(process.cwd(),'README.md'),'utf-8', function(e,data){
 
    if(e){
 
        console.log(e);
 
    }else{
 
        console.log(data);
 
    }
 
});
```