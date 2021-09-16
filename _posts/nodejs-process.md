---
title: The node.js process global for positional arguments environment variables and much more
date: 2018-02-11 21:00:00
tags: [node.js]
layout: post
categories: node.js
id: 151
updated: 2021-09-16 14:29:05
version: 1.11
---

The [process global](https://nodejs.org/dist/latest-v8.x/docs/api/process.html) in [node.js](https://nodejs.org/en/) is helpful for getting information on, and control over, the current process of a script. When making node.js applications chances are you are going to use at least some of it's properties to grab at environment variables, and positional arguments given from the command line when a script is called with node in the command line. 

However there is even more to it on top of just getting positional arguments, and environment variables, such as things like piping data into a nodejs script from another application in the command line when calling the script. On top of piping data into a script from the standard input, there is also having better control over the standard output of a script beyond that of using the console.log method. The console.log method will work okay, but one little drawback of console.log is that it will always append a line break to output each time it is used.

In addition it can also be used to set some event handlers to give control over the process. For example I can set up an event handler that will do something each time some data is given to a script from the standard output. So then it is called for to write not just one post, but a few posts actually on the topic of the nodejs process global. In this post I will be just doing a general overview of the global without getting into any one feature in depth.

<!-- more -->


## 1 - [The process.cwd method](/2021/03/17/nodejs-process-cwd/)

The process.cwd method is what can be used to get the current working directory from within the the body of a script. The current working directory will not always be the same as the directory where the script is located. So another related topic to that of the process cwd method is the \_\_dirname global.

```js
console.log('dir_cwd : ', process.cwd());
console.log('dir_script : ', __dirname);
```

## 2 - [process.exit](/2019/08/13/nodejs-process-exit/)

The process exit method can be used to end the current script with a given exit code. An exit code of zero means that the script just finished, and no kind of error has happened at all. Any other value other than zero indicated that some kind of error happened when the script is called.

## 3 - [process.stdin](/2019/07/09/nodejs-process-stdin/)

The stdin property of the process global is a stream that can be used to work with standard input. This is how one would go about piping some data into a node js script that is the output of another script, or some whole other script completely actually. In fact the usual reason why I would want to bother doing something with this is so that I can use a nodejs script with some whole other command other than that of nodejs actually. The reason why is because when it comes to using another script that is written in javaScript there are generally better ways of doing that. However getting into what those options are may call for a whole other post.

## 4 - [process.stdout](/2021/03/18/nodejs-process-stdout/)

The process.stdout stream is a way to go about directly working with standard output. The write method of this stream can be used as a replacement for the console log method only it will not automatically append a line break after each call. So this allows one to have control over what kind of line break to append to the output, or to append no line break at all actually if that is what is called for.

## 5 - process.argv

This is thus far one of the properties of the process global that I use very often, at least when it comes to basic scripts. If I am starting to work on something that I would call a real project it makes sense to start to look into option parsers. However maybe getting into that is a matter for another post. When a module is called directly from the command line, and arguments are given, they should show up in the array provided here.

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

## 6 - process.env

This is another must know in the process global that comes in handy when I need to do anything that involves environment variables. When deploying a application to a hosting company there might be important information that I need to grab at such as a port, or password to a database, that is stored in an environment variable in the operating system environment when deploying. For example getting the port to connect to when making an app that I will be deploying to heroku, it will want to do something like this in my server.js file that will be called when it spins up.

```js
let port = process.env.PORT || process.argv[2] || 8080;
```

When I deploy to heroku the server will use the port specified in the PORT environment variable, and when starting the script locally I can specify a port via the command line or else it will default to the hard coded value of 8080.

## 7 - Message, and disconnect events

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

## 8 - Conclusion

The process global contains many more useful methods, and values so it is called for to expand on the process object more in the future as I work on more demos. However I think that I did mention to cover all of the basic features that I use most often thus far to say the least.

