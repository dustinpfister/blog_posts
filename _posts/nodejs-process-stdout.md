---
title: Using process.stdout in place of console.log
date: 2021-03-18 13:42:00
tags: [node.js]
layout: post
categories: node.js
id: 826
updated: 2021-03-18 15:20:18
version: 1.2
---

In some cases I might want to use process.stdout in place of console.log when working out a nodejs script. The console.log method works just fine for most typical user case examples, however it does append a line feed at the end of the output each time. Often this might be what I want to happen, however when it comes to having better control over the standard output of a script the write method of the strout stream in the process global is how to go about doing so.

<!-- more -->


## 1 - console.log and process.stdout

For starters just play around with the console.log method and the process.stdout.write method. WHen doing so there is one majot difference and that is that when using the stdout stream directly a line break will not be added to the end of the output automaticly. This allows for me to not do so when it comes to writing scripts that will create output that will be piped into another command and i do not want that extra line break in the output. If I do want to append a line break I can do so by making use of something like the End Of Line property of the os module.

```js
console.log( 'Hello World' );
 
let os = require('os');
process.stdout.write('Hello World' + os.EOL);
```
