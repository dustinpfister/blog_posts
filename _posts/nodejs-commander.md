---
title: Using commander for option parsing in node.js, and more
date: 2018-07-10 12:13:00
tags: [js,node.js]
layout: post
categories: node.js
id: 232
updated: 2018-07-10 12:44:09
version: 1.3
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


## 4 - An example of using a command with commander


```js
#!/usr/bin/env node
 
let prog = require('commander'),
path = require('path'),
pkg = require(path.join(__dirname, 'package.json'));
 
prog
.command('polpos <a> <d>')
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