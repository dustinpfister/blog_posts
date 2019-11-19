---
title: Node os module examples
date: 2019-11-19 14:19:00
tags: [node.js]
layout: post
categories: node.js
id: 566
updated: 2019-11-19 14:40:41
version: 1.2
---

So you might be wondering if there is a node built in way to access all kinds of data about the host operating system that your nodejs project is running on top of. Maybe you want to work out some logic where you want to handle things a little differently if the project is running on top of windows rather than linux of another posix system. 

Well there is the idea of using the child process module as a way to just go ahead and see if a command of one sort or another works or not and figure it out that way. However maybe the node os core module is what you would rather start with. This node build in module contains many properties and methods than are helpful for gaining at least some basic information about what you are dealing with. 
<!-- more -->


## 1 - Node os basic platform example

So for a basic example of the node os module this will be a very simple script that just logs out a string that represents the operating system. In other worlds this is an example of the os platform method to be more precise. To do this I just need to require in the os module, and then call the platform method of the module, the result is a string that gives me a general idea of what I am working with.

```js
let os = require('os');
 
console.log(os.platform());
// 'win32' if windows
// 'linux' is linux
// 'darwin' is apple darwin / OSX
```

## 2 - Node EOL end of line example

Another typical use case example of the node os module is the end of line property. This property will contain the typical end of line byte pattern that is used for a line break. In windows systems it is often a two byte pattern starting with a carriage return followed by a line feed \(CRLF\). In linux, apple darwin, and just about any OS other than windows is is just a one byte line feed \(LF\).

```js
let os = require('os');
 
console.log(Buffer.from(os.EOL).toString('hex'));
// '0d0a' if 'win32'
// '0a' if posix
 
console.log(Buffer.from('\r\n').toString('hex'));
// '0d0a'
console.log(Buffer.from('\n').toString('hex'));
// '0a'
```