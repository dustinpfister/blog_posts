---
title: The node.js child-process module
date: 2018-02-04 18:34:00
tags: [js,node.js]
layout: post
categories: node.js
id: 144
updated: 2022-07-29 13:58:25
version: 1.8
---

So for February I was plaining to [expand my catalog](/categories/node-js/) on [node.js](https://nodejs.org/en/) related content by getting into writing a bunch of demos on [core node.js modules](https://nodejs.org/dist/latest-v8.x/docs/api/), rather than what I have been doing for the most part before hand which is writing about npm packages. Looking over what I have so far, I never got around to writing about the [child_process module](https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html) yet, so I thought I would give that one a go.

<!-- more -->

## 1 - What is the child process module used for, and basic examples.

This module allows me to start a separate process on the command line. I can run any command that might be in the operating system environment, including node, which makes it one of two modules of interest when doing something involving running more than one instance of node on the operating system. The other module of interest being the [cluster module](/2018/01/18/nodejs-cluster/).

### 1.1 - Basic example of child_process using spawn

This module is a little involved so I will likely be writing a few posts on this module alone. So in this section I will just be providing a simple example of using the spawn method of the child_process module to launch another \*.js file with node. For more on the spawn method in detail, you might want to check out my [post on the spawn method](/2019/08/02/nodejs-child-process-spawn/).

Because this demo involves launching a script with another script, I will need to files, a test.js, and the usual index.js.

test.js:
```js
console.log('this is a child-process.');
```

index.js:
```js
// using spawn
let spawn = require('child_process').spawn,
 
script = spawn('node', ['test.js']);
 
script.stdout.on('data', function(data){
 
    console.log(data.toString());
 
});
```

With this demo when I call index.js from the command line, I get the message that was logged in test.js.

```js
$ node index
this is a child-process.
```

Spawn is an alternative to another method in the child_process module called exec. Generally I like to use spawn over exec because of some potential security concerns, but they both do the same thing, launch a process.

### 1.2 - The exec method

The spawn method woks by just passing the command name as a string, and then any additional commands must be pass as elements in an array as the second argument. The [exec method](/2020/10/21/nodejs-child-process-exec/) in the child process module works more or less the same way, ony the whole command options and all can be passed as a single string as the first argument.

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

## 2 - What about errors

So that basic example might help with the basic idea of using the spawn method to launch a command from the command line of the operating system that is being used. However when running a command things do not aways go as expected, sometimes there is an error of sorts that might happen.

For example say you run a git status command in a folder that is not a git folder, at the current working directory from which you called it or any parent folder for that matter as well. When that happens it will of course not work, because in order to know the status of a git folder you have to of course have a git folder to begin with.

So then there is the stderr property of a spawn instance that can be used in the same way as the stdout property only this is what will fire when there is an error of some sort.

```js
let spawn = require('child_process').spawn,
path = require('path');
 
// just check if we even have a git dir
let GitCheck = function () {
    return new Promise((resolve, reject) => {
        let stat = spawn('git', ['status']);
        stat.stdout.on('data', function (data) {
            resolve(data.toString());
        });
        stat.stderr.on('data', function (data) {
            reject(data.toString());
        });
    });
};
 
// start process
let dir = path.resolve(process.argv[0] || process.cwd);
GitCheck(dir)
.then((data) => {
    console.log('okay looks like we have a git');
})
.catch ((data) => {
    console.log(data);
});
```

## 3 - Conclusion

So the child process module built into nodejs itself is the standard goto module for calling an external resource. That external resource can be another nodejs script when using the fork method of the module. It can also be a script by calling nodejs itself and then pass the script as an argument when using spawn, or exec. Also speaking of spawn, and exec those methods can be used to call any command on the host operating system.