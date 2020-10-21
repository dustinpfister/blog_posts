---
title: The node exec child process method
date: 2020-10-21 16:13:00
tags: [node.js]
layout: post
categories: node.js
id: 726
updated: 2020-10-21 17:12:40
version: 1.8
---

The [nodejs exec](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) method of the nodejs built in child process module is one way to go about running an external command from a nodejs script written in javaScript. The other method of interest in the child process module would be the [spawn method](/2019/08/02/nodejs-child-process-spawn/). Both the exec method and the spawn method work in a similar way with one significant difference and that is how the methods are called. With the exec method the command can be called with a single string, where the spawn method just the command is given as the first argument, and then any additional options much be given as elements in an array as the second argument.

<!-- more -->

## 1 - basic example of child process exec

So to start off a post like this it would be a good idea to start off with a simple hello world style example of the exec method. The first step would be to get a reference to the method by requiring in the child process module, and getting a reference of the exec method of that module. 

Next I can now use the exec method to call and external command that might be there to work with in the operating system. For this example I am calling git, and preforming a status which would end in two very different ways depending if it is called in a git folder or not. So I just call exec, and then I give the command that I would call in the command line to do a git status check in the form of a string. An object is then returned by the exec method to which I can then use to attach some events.


```
let exec = require('child_process').exec,
script = exec('git status');
// what to do for data coming from the standard out
script.stdout.on('data', function(data){
    console.log(data.toString());
});
// what to do with data coming from the standard error
script.stderr.on('data', function(data){
    console.log(data.toString());
});
// what to do when the command is done
script.on('exit', function(code){
    console.log('program ended with code: ' + code);
});
```

When it comes to events I generally want to attach at least three handlers in most cases, one for the standard out, another for the standard error, and one last hander for the exit event of the command. So when I call this script a git status will be called, and the handers for the standard out, and error will be used to log out the results of that command to the console. When the command is over one way or another I will get the program has ended message when all is done.

## 2 - Set the current working path for the command

There is a wide range of options that can be set for the instance of the exec call by way of an object that can be passed as the second argument for the method. One option that I thing is worth mentioning right away is the cwd option that can be used as a way to set what the current working directory for the command will be.

So I can take the example before where I am just calling git, and add an options object for the command. The path module can be used as a way to parse a path this is given or not as an argument wheh calling the script.

```
let exec = require('child_process').exec,
path = require('path'),
opt = {
    cwd: process.argv[2] ? path.resolve(process.argv[2]) : process.cwd()
},
script = exec('git status', opt);
script.stdout.on('data', function (data) {
    console.log(data.toString());
});
script.stderr.on('data', function (data) {
    console.log(data.toString());
});
script.on('exit', function (code) {
    console.log('program ended with code: ' + code);
});
```

So if I where to copy this code to a local folder and save it as something like option_cwd.js I could then test it out on a git folder, as well as a folder that is not a git folder.

```
$ mkdir foo
$ cd foo
$ git init
$ node ../option_cwd.js
$ node ../option_cwd.js ..
```

The script will yield different results depending if the folder that is set to the current working folder is a got folder or not.

## 3 - max Buffer option

Another option that might be worth pointing out is the option that can be used to set the size for the buffer that will be used for standard out and standard error.

```js
let exec = require('child_process').exec,
opt = {
    maxBuffer: 41 * 20
},
script = exec('git log -n 20 --format=\"%H\"', opt),
out = '';
script.stdout.on('data', function (data) {
    out += data;
});
script.stderr.on('data', function (data) {
    console.log(data);
});
script.on('exit', function (code) {
    console.log(out);
    console.log('program ended with code: ' + code);
});
```

## 4 - Conclusion

So the exec method is grate for calling additional commands from inside a nodejs script written in javaScript. The method can be used to call any command in the host operating system, including nodejs itself. So because this method can be used to call additional instances of node it is one way to have more than one event loop running at once on the same system, although the use of this method might not be the best way to go about doing so. There are additional modules to look into when it comes to this such as the [cluster module](https://nodejs.org/api/cluster.html).
