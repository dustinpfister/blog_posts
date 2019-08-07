---
title: The node fork child process method.
date: 2019-08-07 10:45:00
tags: [node.js]
layout: post
categories: node.js
id: 517
updated: 2019-08-07 11:47:12
version: 1.5
---

I have been doing a lot of work revolving the use of the child process module as of late, so I thought I would write some demos about the [node fork](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options) child process method. This node fork method does not launch a copy of the current process, but it does start a new node process with the given external script given as the first argument. It is similar to other methods in the child process module such as spawn, but it is set up a little different by default, and might be a better alternative to using spawn when it comes to launching an additional node process on the host os.

<!-- more -->


## 1 - node fork basic example

For just a basic example of the node fork child process method I made just a simple parent script that will launch one or more test scripts. This just seems like the thing to do when I first start working with one of these kinds of methods in nodejs.


So that being said I worked out a simple script that just uses the node fork method like this:
```js
let fork = require('child_process').fork;
// call the script from this script
fork(process.argv[2] || './basic-test.js');
```

This will fire a basic-test.js file as a new process by default in the command line if not other script is given at the command line. For the moment the parent script does nothing other than just launching this child process via the node fork method. Now that I have this together lets look at some basic scripts to use with it.

### 1.1 - A basic node fork child script that just prints to the standard output

So one thing I noticed right off the bat compared to spawn is that when I write something to the standard output in the child process script that is launched with node fork, it shows up in the console. This differs from using the node spawn method where I have to set up a handler for the child process instance. So things are set up a little different by default when it comes to how the standard output is handled with the child process that is created with node fork.

So If I have a basic_test.js file like this
```js
// the standard out is inherited from the parent process
process.stdout.write('hello node fork!');
```

I can then use my main parent script to launch it.
```
$ node basic
hello node fork!
```

### 1.2 - The standard input in a child script used with node fork

```js
// and the standard in is inherited from
// the parent process by default also
process.stdin.on('data', (data) => {
    console.log(data.toString('hex'));
});
process.stdin.on('end', (data) => {
    console.log('end of data');
});
```
