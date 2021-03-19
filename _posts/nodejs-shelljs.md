---
title: shelljs a node.js way to bring posix commands to a node project.
date: 2018-03-22 16:01:00
tags: [js,node.js,linux]
layout: post
categories: node.js
id: 164
updated: 2021-03-19 14:16:56
version: 1.4
---

As someone who has been a kind of windows, and Linux dual boot type person for over ten years now, it would be great to have some way of always having some of the commands I have grown to like when working in a Linux environment always with me regardless of the operating system environment that i am working with when making a node.js project. Lucky for me there is a project called [shell.js](https://www.npmjs.com/package/shelljs) that can help with this.

<!-- more -->

## 1 - installing shell.js

To use shell.js as a module in a node.js project just install it in the usual manner when adding a dependency to a project like normal.

```
$ mkdir test_project
$ cd test_project
$ npm init
$ npm install shelljs --save
```

Many of the demos I will be writing about with this project will involve using shelljs this way, if you want to use the commands as one liners from the command line interface in windows that can be done aw well by installing shelljs globally.

## 2 - Which method example

The which method searches for a native command in the systems path, which is useful to find out if something like git or mongodb is installed on the system or not.

```js
let shell = require('shelljs');
 
if (shell.which('mongod')) {
 
    console.log('looks like mongo db is installed');
 
} else {
 
    console.log('mongo db is not installed.');
 
}
```

## 3 - exec

If you are familiar with the [child-process](/2018/02/04/nodejs-child-process/) module, then you should also be familiar with exec and spawn.

As such an exec method is given for convenience for launching external commands.

```js
let shell = require('shelljs');
 
if (shell.which('git')) {
 
    shell.exec('git --version');
 
} else {
 
    console.log('you do not have git installed.');
 
}
```

An optional options object, and callback can be given to exec as well.

```js
let shell = require('shelljs');
 
shell.exec('git --version', {silent:true}, function (code, out, err) {
 
    if (code === 0) {
 
        let regex = out.match(/\d.\d.\d/);
 
        if (regex) {
 
            let v = regex[0].split('.');
 
            if (v[0] >= 2 && v[1] >= 8) {
 
                console.log('Using 2.8.x or later I see, good.');
 
            } else {
 
                console.log('kicking it old school? Okay, fine, see if I care.');
 
            }
 
        } else {
 
            console.log('ahhh... hua?');
 
        }
 
    } else {
 
        console.log('what!? really?');
        console.log(err);
 
    }
 
});
```

Using the silent option prevents exec from logging the raw standard output to the console. In addition I can give a callback to exec that will give me the exit code, as well as the standard output, and standard error in the event of an error.

## 4 - Grep example

Maybe one of the best know unix like commands out there is [grep](https://en.wikipedia.org/wiki/Grep), which is used for text pattern matching tasks.

```js
let shell = require('shelljs');
 
console.log( shell.ls('*.js').grep('_[0-9]{8}').toString() );
```

I am a little fuzzy on the regex used in grep and how it compares to what is used in javaScript. Getting into that may be a whole other post, but so far they seem very similar.

## 5 - piping of commands

One of the best features of a unix style Command Line Interface is the ability to pipe commands, or in other words supply the input of a command as the output of another. This can be done by chaining commands.

```js
let shell = require('shelljs');
 
console.log( shell.ls('*.js').grep('app_').toString() );
```

This as you would expect results in a list of \*.js files begin with the text pattern 'app_'.

## 6 - Using shell.js globally

Although shell.js can be used globally, as a way to bring Linux like commands to windows the developers recommend against this. However if you really want to it can be done easly by just installing the script globally.

```
$ npm install -g shelljs
```

Once shelljs is installed globally, A command can then be used by calling shjs, and then the command you want to use.

```
$ shjs ls
```

## 7 - Conclusion

Shelljs looks like a great solution for making unix like commands more portable across different operating systems. Even when developing, and deploying with posix environments I would say it is a nice alternative to fiddling with the child-process module. Still for the most part I am often just working and using my scripts in Linux systems, any for various other reasons it is tempting to say the lest to just use the child process module to use the native Linux commands that are there to work with by themselves, and just not support Windows or macOS.

However when it comes to really getting into Linux, maybe the best way to do so would be to write bash scripts rather than bothering with trying to make scripts that will work across all systems that run node. In any case all of that is a matter for another post.
