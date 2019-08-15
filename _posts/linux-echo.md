---
title: Linux echo command and scripting with nodejs
date: 2019-08-15 15:03:00
tags: [linux,js]
layout: post
categories: linux
id: 523
updated: 2019-08-15 15:24:43
version: 1.1
---

So this will be a quick post on using the linux echo command and node.js when it comes to creating shell scripts with javaScript rather than the usual Bourne Shell. The echo command just simply prints something to the standard output, in some cases now and then I find myself using it. For example just simply piping in some kind of simple test input to a CLI tools standard input I am putting together that will accept such input from something else when it comes to a read use case scenario.

<!-- more -->

## 1 - The Linux Echo command and other ways to log to the standard output with nodejs

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

## 3 - The deal with a backslash

```js
let spawn = require('child_process').spawn;
 
let processBackslash = process.argv[2] === '-E' ? false : true,
option1 = processBackslash ? '-e' : '-E';
 
let echo = spawn('echo', [option1, 'So this is a line \\n and another line \\n\\n'], {
    stdio: ['pipe', 'inherit', 'pipe']
});
```