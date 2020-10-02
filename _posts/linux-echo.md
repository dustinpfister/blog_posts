---
title: Linux echo command and scripting with nodejs
date: 2019-08-15 15:03:00
tags: [linux,js]
layout: post
categories: linux
id: 523
updated: 2020-10-02 14:57:05
version: 1.5
---

So this will be a quick post on using the [Linux echo](https://en.wikipedia.org/wiki/Echo_%28command%29) command and node.js when it comes to creating shell scripts with javaScript rather than the usual Bourne Shell. The echo command just simply prints something to the standard output, in some cases now and then I find myself using it. For example just simply piping in some kind of simple test input to a CLI tools standard input I am putting together that will accept such input from something else when it comes to a read use case scenario.

<!-- more -->

## 1 - The Linux Echo command and other ways to log to the standard output with nodejs

So to just use the linux echo command by itself in the bash shell I type echo and then the string value that is to be piped to the standard output. There are a few options but for the most part that is all there is to the echo command in linux.

```
$ echo "hello world"
hello world
```

So when working out a nodejs script that needs to split something out to the standard output, I could use the spawn child process to use the echo command. However there are some other ways to do so that are more piratical when working in a javaScript environment. Namely there is the console log method that will also echo something to the standard output and append a line beak just line that of the linux echo command. In  addition there is also the stdout property of the process global that is an instance of a writable stream.

```js
// sure I could use echo in nodejs via spawn
let spawn = require('child_process').spawn;
 
// to do so I will want to use the stdio
// option of spawn to set 'inherit' rather 
// than the default 'pipe' value for the
// standard output
let echo = spawn('echo', ['Hello world, spawn style using linux echo.'], {
    stdio: ['pipe', 'inherit', 'pipe']
});
 
// but there is also the sdout property of the process global
let os = require('os');
process.stdout.write('Hello World, process stdout style.' + os.EOL);
 
// or just simply console.log
console.log('Hello world, console log style');
```

## 2 - Using Linux Echo to pipe in some data to the standard input of a nodejs script

One of the typical use case examples when making a CLI tool, or Shell Script with nodejs is to use echo to pipe some kind of test input to the standard input of a script. In my nodejs script I can just use the stdin property of the process global to attach an event handler that will do something on a per chunk bases with that input.

Fo a quick example here is a script that just converts the data that is piped in to hex.

```js
// do something with data that is being
// piped in from the standard input from a 
// command like linux echo
process.stdin.on('data', (data) => {
    console.log(data.toString('hex'));
});
```

```
// $ echo "hello" | node echo_pipe
// 68656c6c6f0a
```

With many of my real projects so far what is actually being piped in might be the full body of text of a blog post that is actually being piped in via another script. Also the script that I am piping into does something more than just convert that text to hex, but this is the basic idea never the less.

## 3 - The deal with a backslash

One of the options of the Linux echo command is the -e option that can be used to enable the processing of backslashes as a way to inject certain characters.

```js
let spawn = require('child_process').spawn;
 
let processBackslash = process.argv[2] === '-E' ? false : true,
option1 = processBackslash ? '-e' : '-E';
 
let echo = spawn('echo', [option1, 'So this is a line \\n and another line \\n\\n'], {
    stdio: ['pipe', 'inherit', 'pipe']
});
```