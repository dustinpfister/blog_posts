---
title: The node spawn child process method in action
date: 2019-08-02 14:22:00
tags: [node.js]
layout: post
categories: node.js
id: 514
updated: 2020-10-21 17:12:40
version: 1.20
---

I find myself using the [node spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) child process module method often when it comes to calling external commands in a nodejs project. However still have not mastered all the little aspects of this method as well as the child process module in general. So one way to go about getting more proficient on the subject would be to write a whole bunch of little demos on the node span method and write a post on them.

The spawn method can be used as a way to call external commands that there might be to work with in the host operating system. The availability of these commands will change of course depending one the host operating system, and what might be installed to work with.

Te spawn method is one of two methods that come to mind in the built in nodejs module that have to do with calling external commands. the other method of interest in the child process module would be the exec method. This method works in more or less the same way as spawn, only the whole command options and all can be given via a single argument as a string.

<!-- more -->

## 1 - lets start out with the node spawn method with some basic examples

So lets start out with the node spawn method by quickly getting together a basic example that I often start a post like this with. In this example I am just using the node spawn method to launch another instance of node and run a different script that just logs something to the standard output with the console log method.

When writing my basic.js file I start out my requiring in the spawn method from the child process module. Once I have that I can call the spawn method to create a new instance of the child process class. When doing so I pass a string of the command that I want to run in the command line as the first argument. Arguments can then also be passed as a second argument in the form of an array where each option is a string. So in this case the first argument is the string \'node\', and then second argument is an array with one one string value that is path of the script that I want to run.

So then basic.js looks like this:

```js
// using spawn
let spawn = require('child_process').spawn,
 
// spawn test.js
script = spawn('node', ['basic_test.js']);
 
// what to do for the standard output for
// test.js launched via the node spawn
// child process method
script.stdout.on('data', function(data){
    console.log(data.toString()); // 'this is a test'
});
```

The stdout property of the child process instance that is returned by the node spawn method can be used to set some events for the standard output of the child process. For this basic example I am just logging the output from the basic_test.js file, if I did not do this nothing would be displayed.

The basic_test.js file that I am calling looks like this:

```js
console.log('this is a test');
```

I can then call the main basic.js file which in turn calls the basic_test.js file from within the main basic.js file as a child process with the node spawn method.

```
$ node basic
this is a test
```

So there we have a simple example of the node spawn child process method in action. However there are some more basics at least to cover when it comes to command line arguments for the child process, and also the different kinds of steams and events. So lets look at a few more basic examples of spawn in action.

### 1.1 - Using arguments

So many commands accept one or more arguments, options or whatever you might call them when called from the command line. These arguments are to be given to spawn in the form of an array where each element is a string of the sub command, argument name, value, or anything else that is separated by spaces when using them in the command line.

So lets say I have a script that adds to arguments together like this.
```js
let a = process.argv[2] === undefined ? 0 : process.argv[2];
b = process.argv[3] === undefined ? 0 : process.argv[3];
console.log(Number(a) + Number(b));
```


I can then use those arguments when using the node spawn method like this.

```js
let spawn = require('child_process').spawn,
a = process.argv[2] || 25,
b = process.argv[3] || 75,
script = spawn('node', ['argu_test.js', a, b]);
script.stdout.on('data', function(data){
    console.log(data.toString()); // 100
});

```


```
$ node argu
100
$ node argu 5
80
$ node argu 1 1
2
```

### 1.2 - Standard error when using spawn

The standard error is a stream that has to do with data that logs what is going wrong with a child process. When using a script that logs something to the standard error it often gets displayed in the console. However when using the node spawn child process method to launch the script any errors that occur when doing so will not display in the console unless you do so my attaching a handler for it.

```js
let fs = require('fs'),
filename = process.argv[2] || 'not-there.txt';
console.log(filename);
fs.readFile(filename, 'utf8', (e, data) => {
    if (e) {
        console.warn('\u001b[31m' + e.message + '\u001b[39m');
    } else {
        console.log('\u001b[32m' + data.toString() + '\u001b[39m');
    }
});
```

```js
let spawn = require('child_process').spawn,
script = spawn('node', ['stderror_test.js', process.argv[2]]);
script.stdout.on('data', function(data){
    console.log(data.toString()); // 'this is a test'
});
// what to do for the standard error output
script.stderr.on('data', function(data){
    console.log(data.toString()); // 'this is a test'
});

```

### 1.3 - The standard in

The standard input of a child process created with the node span method is another subject of interest. The write method of the stdin property of the spawn child process can be used to write some data to the standard input of the script that is being launched with spawn.

```js
process.stdin.on('data', (data) => {
    process.stdout.write(data.toString());
    process.stdout.write(data.toString('hex'))
});

```

```js
let spawn = require('child_process').spawn,
script = spawn('node', ['stdin_test.js']);

script.stdout.on('data', (data) => {
    console.log(data.toString());
    script.kill();
});

script.stdin.write('um yeah I would think so');

```

## 2 - node spawn child process method options

There are a number of options for the node spawn child process method. In this section I will touching base with a few of these options that can be used to do things like changing what the standard input is tied to and so forth..

### 2.1 - The cwd option for changing the working director of the child process

There is a cwd option that can set the working directory of the child process. By default this will of course be the same as the parent process that launched the child process with spawn.

### 2.2 - The stdio option and IPC

I was wondering if IPC (Inter-Process Communication \)[https://en.wikipedia.org/wiki/Inter-process_communication] can be done with the spawn method. I was able to see a lot of examples for IPC in node, but it seems like all of them use Fork rather than Spawn. Maybe in most cases that might be the way to go about doing it, but I would think that there is a way to do so with Spawn. Well it turns out that there is, and it can be done with the stdio option.

```js
let spawn = require('child_process').spawn,
// set up io as ipc
options = {
    stdio: ['ipc', 'pipe', 'pipe']
},
script = spawn('node', ['option_stdio_test.js'], options);
// what to do when this parent process
// receives a message from the node child process
script.on('message', (m) => {
    console.log(m.b); // 12
    script.kill();
});
// send an IPC message to the
// child process
script.send({
    a: 5
});
```

```js
process.on('message', (m) => {
    process.send({
        b: m.a + 7
    })
});
```

By default the pipe value is set for the standard input, output and error. However that can be changed by setting the ipc value for the desired out or in.

## 3 - node spawn and read streams

So in a recent project of mine I started making all kinds of CLI tools that accept input via the standard input that does something to that input and then spits something out to the standard output. In a previous section I touched base on the standard input, but things do start to get a little complicated when it comes to working with streams. So in this section I thought I would put together a little example of something that I am running into with this project of mine.

In the parent script of this example I am creating a file read stream, and then I am piping the output of that read stream to thee standard input of a child process that I have created with node spawn.

```js
let spawn = require('child_process').spawn,
fs = require('fs');
let script = spawn('node', ['stdin_filestream_process.js']);
script.stdout.on('data', (data) => {
    console.log(data.toString());
});
script.stdout.on('close', (data) => {
    console.log('done');
});
fs.createReadStream('foo.txt').pipe(script.stdin);

```

```js
process.stdin.on('data', (data) => {
    process.stdout.write(data.toString('hex'));
});

```

```js
$ node stdin_filestream
54686973206973206a757374206120666f6f2062617220746578742066696c65
done
```

## 4 - Conclusion

The node spawn method is great, I use it all the time to launch process from within a node script. As I write more projects that make use of it I might very well come back to this post to update and expand my content on this one with more examples.