---
title: The node.js process global what to know
date: 2018-02-11 21:00:00
tags: [node.js]
layout: post
categories: node.js
id: 151
updated: 2021-03-17 11:56:42
version: 1.2
---

The [process global](https://nodejs.org/dist/latest-v8.x/docs/api/process.html) in [node.js](https://nodejs.org/en/) is helpful for getting information on, and control over, the current process. When making node.js applications chances are you are going to use at least some of it's properties to grab at environment variables, and arguments given from the command line when a script is called directly. In addition it can also be used to set some event handlers to give control over the process.

<!-- more -->

## process.argv

This is thus far one of the properties of the process global that I use very often. When a module is called directly from the command line, and arguments are given, they should show up in the array provided here.

say I have an ecco.js file like this
```js
console.log(process.argv[2]);
```

It will log what I give to it when called
```
$ node ecco hello
hello
```

If I am doing something that involves a lot of arguments I will want to use some kind of option parser such as [nopt](/2017/05/05/nodejs-nopt/).

## process.env

This is another must know in the process global that comes in handy when I need to do anything that involves environment variables. When deploying a application to a hosting company there might be important information that I need to grab at such as a port, or password to a database, that is stored in an environment variable in the operating system environment when deploying. For example getting the port to connect to when making an app that I will be deploying to heroku, it will want to do something like this in my server.js file that will be called when it spins up.

```js
let port = process.env.PORT || process.argv[2] || 8080;
```

When I deploy to heroku the server will use the port specified in the PORT environment variable, and when starting the script locally I can specify a port via the command line or else it will default to the hard coded value of 8080.

## Message, and disconnect events

With the process global there are a bunch of events that can be used to help give control over the process including [Inter-process communication](https://en.wikipedia.org/wiki/Inter-process_communication#Approaches) I am new to this but I was able to put together a working demo pretty quickly when it comes to sending a simple message to a child-process.

This requires starting another module from within a module using the fork method of the [child_process](/2018/02/04/nodejs-child-process/), or [cluster](/2018/01/18/nodejs-cluster/) modules.

I have a child.js file that makes use of the message, and disconnect events like this:

```js
process.on('message', function (n) {
 
    if (n === 42) {
 
        console.log('yes that is the answer');
 
    } else {
 
        console.log('nope');
 
    }
 
});
 
process.on('disconnect', function (a, b) {
 
    console.log('okay, goodbye');
 
});
```

and an index.js file that starts, and kills that child process with the fork method.

```js
let fork = require('child_process').fork,

child = fork('child');

child.send(2);
child.send(12);
child.send(42);

child.disconnect();
```

When I call index.js from the command line I get what I expect.

```
$ node index
nope
nope
yes that is the answer
okay, goodbye
```

## Conclusion

The process global contains many more useful methods, and values I will expand on process more in the future as I work on more demos.

happy coding