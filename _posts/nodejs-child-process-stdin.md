---
title: Standard Input in node.js wuth the child-process module
date: 2020-10-26 12:55:00
tags: [node.js]
layout: post
categories: node.js
id: 729
updated: 2020-10-26 14:29:05
version: 1.3
---

The standard input can be used as a source of data when making a nodejs script, doing so just requires the use of the [child process module](/2018/02/04/nodejs-child-process/). There is the [standard input property of a child process instance](https://nodejs.org/api/child_process.html#child_process_subprocess_stdin) when using something like exec, or spawn in that module that is one way to go about reading standard input. However there is also the [readline module](/2018/08/06/nodejs-readline/) in nodejs that can also be used as a way to get input via the command line that might be a [better choice for some projects](https://stackoverflow.com/questions/20086849/how-to-read-from-stdin-line-by-line-in-node). In any case in this post I will be going over a few quick examples of using the standard input property of a child process instance.


<!-- more -->

## 1 - basic example of child process standard in, as well as process standard in and out

### 1.1 - process standard in and out

```js
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        process.stdout.write('yeah this is: ' + chunk);
    }
});
```

### 1.2 - basic child process standard in example

```js
// using exec
let exec = require('child_process').exec;
// creating an instance of child process by way of exec call
// of the node using the coder.js file
let script = exec('node coder');
// what to do for standard out
script.stdout.on('data', (data) => {
    console.log(data);
});
// writing 'foobar' to the standard input of coder.js
script.stdin.write('foobar');
// end standard input
script.stdin.end();
```