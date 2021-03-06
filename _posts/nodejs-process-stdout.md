---
title: Using process.stdout in place of console.log
date: 2021-03-18 13:42:00
tags: [node.js]
layout: post
categories: node.js
id: 826
updated: 2021-03-18 16:36:46
version: 1.10
---

In some cases I might want to use [process.stdout](https://nodejs.org/api/process.html#process_process_stdout) in place of [console.log](https://nodejs.org/api/console.html#console_console_log_data_args) when working out a [nodejs script](https://nodejs.org/en/). The console.log method works just fine for most typical user case examples, however it does append a line feed at the end of the output each time. Often this might be what I want to happen, however when it comes to having better control over the standard output of a script the write method of the strout stream in the process global is how to go about doing so.

<!-- more -->

## 1 - console.log and process.stdout

For starters just play around with the console.log method and the process.stdout.write method. WHen doing so there is one majot difference and that is that when using the stdout stream directly a line break will not be added to the end of the output automatically. This allows for me to not do so when it comes to writing scripts that will create output that will be piped into another command and i do not want that extra line break in the output. If I do want to append a line break I can do so by making use of something like the End Of Line property of the os module.

```js
console.log( 'Hello World' );
 
let os = require('os');
process.stdout.write('Hello World' + os.EOL);
```

## 2 - Custom log methods

The use of console.lof works okay, but often it is a good idea to have a custom log method. Also when it comes to creating a major project it might even be a good idea to have a log module, that way I can have all the calls of a log method point to the use of a method in that log module. WHen it comes to defining what that log function is, I could use console.log, or I could use the write method of the stdout stream in process. I could also making logging point to some whole other kine of stream completely if I wanted to. So then in this section I will be going over some examples of basic log functions.

### 2.1 - A Basic log method

A starting point might be to have a log method at the top of a single script. Often many of my simple nodejs projects are just one file so something like this might work just fine.

```js
let log = (mess, eol, stream) => {
    mess = mess || '';
    eol = eol || '';
    stream = stream === undefined ? process.stdout : stream;
    stream.write(mess + eol);
};
 
log('foo', '\n');
log('bar', '\n');
// foo
// bar
 
log('foo', '');
log('bar', '\n');
// foobar
```

So it is a little neater to call log each time rather than console.log. However there is more to it than just that, for example if something that I am working on starts to become a little more advanced there is taking the log method and placing it in its own module. I can then use the same log method for all of my modules, and having all logging go to just one place.

### 2.2 - Making a log.js module

The next step from a simple log method would be to make something that is a module that I can pull away into its own file, and then link to from all of my other scripts. When it comes to going all out with something like this there are many little details that I might add to such a module. 

One feature that I might add is color support, there are npm packages like [chalk](/2017/05/31/nodejs-chalk/) that can be used to add color, or another way is to just know the [ansi codes to turn color on and off](/2019/09/19/nodejs-ansi-escape-codes/). In any case when it comes to adding color to output that is something that I might want to add for output that will be color to a console, but it might not be what I want to end up going to a file, or some other script when it comes to piping standard output to another script. So it makes sense to have more than one log method,or ways to turn that kind of feature off when it comes to use case examples where I would not want these ansi codes added to the output.

```js
let colorCode = {
  black: '\u001b[30m',
  red: '\u001b[31m',
  green: '\u001b[32m',
  orange: '\u001b[33m',
  blue: '\u001b[34m',
  purple: '\u001b[35m',
  cyan: '\u001b[36m',
  white: '\u001b[37m',
  reset: '\u001b[39m'
};
 
var logType = function(mess, eol, type, stream, colors){
    if(colors){
       stream.write(colorCode[colors[type] || 'white']);
    }
    stream.write(mess + eol);
    if(colors){
       stream.write(colorCode.reset);
    }
};
 
var fullLog = (mess, type, eol, colors, typeObj) => {
    mess = mess || '';
    type = type || 'info';
    eol = eol || '';
    colors = colors || false;
    typeObj = typeObj || { info: process.stdout, error: process.stderr }
    // log
    logType(mess, eol, type, typeObj[type], colors);
};
 
// typically log function
var api = function(mess, type, eol){
   fullLog(mess, type, eol, {
       info: 'cyan',
       error: 'red'
   });
};
 
// typical settings for clean output
api.clean = function(mess, type){
   fullLog(mess, type, '', false);
};
 
// making full log method public
api.fullLog = fullLog;
 
module.exports = api;
```


I can then use this log method in ascript like this.

```js
let path = require('path');
let log = require( path.join(__dirname, 'log.js') );
 
log('Hello World', 'info', '\n');
 
log('no good', 'error', '\n');
```

This results in cyan color text for the hello world message, and red color text for errors.

## 3 - Conclusion

So then that is all when it comes to standard output and nodejs scripts, at least as far as this post goes at least. However there is also the topic of working with [standard input](/2019/07/09/nodejs-process-stdin/) in a nodejs script also, for that I have a similar post on the stdin stream of the process global. However to really get the hand of standard output, input, and many other little topics it might be best to start working out some simple actually [nodejs project examples](/2021/03/16/nodejs-example/). 

I do have my main post on the [nodejs process global in general](/2018/02/11/nodejs-process/) that might be work checking out also. There is a lot to be aware of when it comes to this global, so it makes sense to work out at least a few basic examples, and simple projects to get the hang of things.

