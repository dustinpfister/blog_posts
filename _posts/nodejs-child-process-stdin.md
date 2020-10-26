---
title: Standard Input in node.js wuth the child-process module
date: 2020-10-26 12:55:00
tags: [node.js]
layout: post
categories: node.js
id: 729
updated: 2020-10-26 14:51:23
version: 1.7
---

The standard input can be used as a source of data when making a nodejs script, doing so just requires the use of the [child process module](/2018/02/04/nodejs-child-process/). There is the [standard input property of a child process instance](https://nodejs.org/api/child_process.html#child_process_subprocess_stdin) when using something like exec, or spawn in that module that is one way to go about reading standard input. However there is also the [readline module](/2018/08/06/nodejs-readline/) in nodejs that can also be used as a way to get input via the command line that might be a [better choice for some projects](https://stackoverflow.com/questions/20086849/how-to-read-from-stdin-line-by-line-in-node). In any case in this post I will be going over a few quick examples of using the standard input property of a child process instance.


<!-- more -->

## 1 - Basic example of child process standard in, as well as process standard in and out

So for a basic example of using the standard input of a child process instance I thought I would make two quick javaScript files. One file will serve as a command that I will be using with the child process module, and the other will be the file that uses the child process module to supply input to the other.

On top of the standard input stream of the child process instance there is also the standard input stream of the process global. The difference between the two is that the standard input of a child process instance is a writable stream, so when it comes to using exec, or spawn, that stream is there to write two the standard input of the command that is being used. When it comes to making a script that will accept standard input that is where the standard input stream in the process global will come into play as that is a readable stream.

If you are still a little confused between the two then maybe it is called for to start out with a basic hello words style project that makes use of these two streams.

### 1.1 - process standard in and out script coder.js

So here I have a file that I have called coder.js for this example. In coder.js I am using the [process.stdin](/2019/07/09/nodejs-process-stdin/) stream to define what should happen to data that is given to coder.js by way of the standard input. In the body of the event handler for the readable event for process.stdin I am using the read method of the stdin stream to read chunks of data. For each chunk of data I am just logging to the standard output a simple string followed by the chunk of data.
```js
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        process.stdout.write('yeah this is: ' + chunk);
    }
});
```

This might not do anything that interesting, but this script is to just serve as the command that will be used for the next file that will make use of exec to run it. In a real example this script would do something of actual value, or it would be an operating system command that can be suppled data by way of the standard input. I am just supplying this script so that we have an operating system independent script that can be used in any system that will run nodejs. In addition I am also touching base on how to create a script that accepts standard input, rather than supplying standard input to a command.

### 1.2 - basic child process standard in example

Now that I have a script to use with exec I can now start my basic.js file that will use the exec method to call node and use the coder.js file that will accept standard input. All I have to do is require in the exec method, and then use that to call node and use the coder.js file, the returned result will be the child process instance. I can then attach a hander that will define what to do for the standard out of the coder.js file.

I can now write to the standard input of coder.js from this other file by using the write method of the child process standard input property.

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

So when I call this basic.js file I end up getting what is expected.

```
$ node basic
yeah this is: foobar
```