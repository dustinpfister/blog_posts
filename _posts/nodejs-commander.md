---
title: Using commander for option parsing in node.js, and more
date: 2018-07-10 12:13:00
tags: [js,node.js]
layout: post
categories: node.js
id: 232
updated: 2018-07-10 13:08:38
version: 1.7
---

When making scripts that are to be called from the command line with [node.js](https://nodejs.org/en/), the subject of option parsing becomes of interest. Option parsing is the process of parsing a string of [arguments from a command line interface](https://en.wikipedia.org/wiki/Command-line_argument#Arguments) into a workable object of values. If you are in a situation in which you find yourself trying to work out your own solution for extracting arguments that are given from the command line via process,argv, you might want to stop and check out some of the npm modules that are around that help to make quick work of this such as [commander](https://www.npmjs.com/package/commander). In this post I will be writing about commander as a solution for command line option parsing, and will be giving some examples of it's use.

<!-- more -->

## 1 - what to know before getting started with commander

What I am writing about here has to do with the [npm package known as commander](https://www.npmjs.com/package/commander) that is a helpful tool when making scripts that will be called from the command line in node.js. This is not a beginners guide for node.js, javaScript or any other skills that are needed before hand.

### 1.1 - Commander is not the only option of option parsing

I have writne a post on another one called [nopt](/2017/05/05/nodejs-nopt/) and I am sure there are many others. It would appear that commander is very popular, and it sure does get the job done well. I am not recommending nopt over commander, just pointing out that there are options, and that one of them should be used over bothering with this from the ground up in most cases.

## 2 - A basic example of commander

```js
#!/usr/bin/env node
 
let prog = require('commander'),
path = require('path'),
pkg = require(path.join(__dirname, 'package.json'));
 
prog
 .version(pkg.version || '0.0.0','-v, --version')
 .parse(process.argv);
```

## 3 - Setting options in commander

```js
#!/usr/bin/env node
 
let prog = require('commander'),
path = require('path'),
pkg = require(path.join(__dirname, 'package.json'));
 
prog
.version(pkg.version || '0.0.0', '-v, --version')
.option('-a, --answer', 'the answer')
.parse(process.argv);
 
if (prog.answer) {
 
    console.log(42);
 
} else {
 
    console.log(prog);
 
}
```


## 4 - Using commands with commander

With commander a command is when I want to make some kind of command for a command. For example with the static website generator hexo that I use to build this site I do this in the command line when in a hexo project folder:

```
$ hexo generate
```

however if I do not what to build my site, but just serve it up locally I can do this:

```
$ hexo server -s
```

When doing that the public folder will be hosted locally, and I can view what I have so far before actually publishing. When making a command in commander this allows me to define these kinds of sub commands for commands.

### 4.1 - Optional vs required arguments

When defining the string that will be the command it is possible to set one or more arguments that should be given after it, such as a directory or some numbers. These additional arguments can be optional or required.

```js
prog
.command('polpos [a] [d]') // the arguments a and b are optional
```

```js
prog
.command('polpos <a> <d>') // the arguments a and b are required
```

### 4.2 - A polar position example of a command

So for an example of this I made a command that will give me the x, and y position of a pint that lays a given angle, and distance relative to a starting position. The starting position defaults to 0,0 but I can set it with additional options, I also have an additional option that will display more info if given.

```js
#!/usr/bin/env node
 
let prog = require('commander'),
path = require('path'),
pkg = require(path.join(__dirname, 'package.json'));
 
prog
.command('polpos [a] [d]')
.option('-x, --startx <n>', 'start x')
.option('-y, --starty <n>', 'start y')
.option('-i, --info', 'print more info')
.action(function (a, d, options) {
 
    let sx = Number(options.startx === undefined ? 0 : options.startx),
    sy = Number(options.starty === undefined ? 0 : options.starty);
 
    if (options.info) {
        console.log('polar position: ');
        console.log('start pos: ', sx, sy);
        console.log('angel: ', a);
        console.log('distance: ', d);
        console.log('');
    }
 
    a = a === undefined ? 0 : a;
    d = d === undefined ? 0 : d;
 
    a = Math.PI / 180 * a;
 
    let x = sx + Math.cos(a) * d,
    y = sy + Math.sin(a) * d;
 
    console.log(Math.floor(x), Math.floor(y));
 
});
prog.parse(process.argv);
```

Some use examples calling it with node.

```
$ node command.js polpos
0,0
$ node command.js polpos 0 100
100 0
$ node command.js polpos 90 100
0 100
$ node command.js polpos 45 100 -x 100 -y 100 -i
polar position:
start pos:  100 100
angel:  45
distance:  100

170 170
```