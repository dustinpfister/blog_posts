---
title: Linux echo command and scripting with nodejs
date: 2019-08-15 15:03:00
tags: [linux,js]
layout: post
categories: linux
id: 523
updated: 2021-03-11 16:36:39
version: 1.19
---

So this will be a quick post on using the [Linux echo](https://en.wikipedia.org/wiki/Echo_%28command%29) command and node.js when it comes to creating shell scripts with javaScript rather than the usual Bourne Shell. The echo command just simply prints something to the standard output, in some cases now and then I find myself using it. For example just simply piping in some kind of simple test input to a CLI tools standard input would be one reason why I would go about using the echo command. The test output that echo creates can be used as a place holder of sorts for input from something else that would prove to be a real use case scenario.

The echo command can have many real would use cases also though, for example when writing a bash script I might want to print some result in string form to the standard output when the script is called, one way to do so would be to use the echo command and pass that string value as the first argument. When doing so there are a number of options that can be used to set of there should be a line break at the end or not, or if some special characters should be used or not to create the final output.

So in this post I will be going over some basic example of the Linux echo command, and also go over some of the advanced options that often prove to be useful when using it.

<!-- more -->

## 1 - Some basics of the Linux echo command by itself

So before getting into some javaScript it might be best to just start out playing around with some commands in the terminal with Linux echo by itself. I would say that the echo command is one of those basic commands in Linux that everyone that uses Linux, or a posix environment in general should be aware of. The command comes up a lot, so it pays to be familiar with many of the options ans and basic use case examples.

### 1.1 - basic Linux Echo

So if I type echo in the command line and then give a string the echo command will just echo that to the standard output of the console.

```
$ echo "hello world"
hello world
```

That is it that is the basic idea of what echo is for.

### 1.2 - Sometimes I might need to escape things

In some situations I might need to use the escape option so that things will render the way that they should in the console, or in any destination in which the result will ultimately end up. For example say I want to put some new lines in a string with the backslash n syntax.

```
$ echo -e 'foo\nbar\n'
foo
bar
 
```

So this is the only option I often find myself using now and then so I thought I would have a brief section here on this.

### 1.3 - make it so echo will not add a line feed at the end

By default the echo command will add a line feed character at the end of the output. Most of the time I will want to have a line feed at the end of the output that echo spits out to the console, however in some cases I might want that to not happen actually. For these kinds of situations there is the -n option of the echo command that I can use to make it so the echo command will not append that final line feed charterer.

```
$ echo -n 'foo'
```

### 1.4 - Piping example

One major use case example of using the echo command is to just create some test standard output when it comes to playing around with a new command to learn what it can do when it comes to feeding it something with the standard input. For  example take the base32 command, this command can take some input from the standard input and spit out a base32 form of that input. However in order to test it out I need to have some input to pipe into it and one way to do so would be to use the echo command.

```
$ echo -n "a" | base32
ME======
```

There are other options of course, for example if I had a text file that I wanted to pipe into it I could use the cat command to do so. However when it comes to doing something like this I might also want to write the results of it to a file also, and with that said I think I should move on into another Linux echo example that make used of redirection.

### 1.5 - Redirection example

Redirection is another feature of bash that I think I should cover here while I am at it. With that said the Linux echo command combined with redirection can be used as a way to create text files from the command line.

```
$ echo "Hello World" > ~/hello.txt
```

## 2 - The Linux Echo command nodejs examples

So when working out a nodejs script that needs to split something out to the standard output, I could use the spawn child process to use the echo command. However there are some other ways to do so that are more piratical when working in a javaScript environment. Namely there is the console log method that will also echo something to the standard output and append a line beak just line that of the Linux echo command. In  addition there is also the stdout property of the process global that is an instance of a writable stream. Still I do like nodejs, and javaScript so I have to have a section on using that here.

### 2.1 - Using spawn in child process to call the Linux Echo command

So first off a basic node script where I am using the child process module as a way to call the Linux Echo Command. However I will also be showing the two general ways to go about spitting something out into the standard output when it comes to nodejs scripts also here which are what should be used in a nodejs script.

```js
// sure I could use echo in nodejs via spawn
let spawn = require('child_process').spawn;
 
// to do so I will want to use the stdio
// option of spawn to set 'inherit' rather 
// than the default 'pipe' value for the
// standard output
let echo = spawn('echo', ['Hello world, spawn style using Linux echo.'], {
    stdio: ['pipe', 'inherit', 'pipe']
});
 
// but there is also the sdout property of the process global
let os = require('os');
process.stdout.write('Hello World, process stdout style.' + os.EOL);
 
// or just simply console.log
console.log('Hello world, console log style');
```

### 2.2 - Using Linux Echo to pipe in some data to the standard input of a nodejs script

One of the typical use case examples when making a CLI tool, or Shell Script with nodejs is to use echo to pipe some kind of test input to the standard input of a script. In my nodejs script I can just use the stdin property of the process global to attach an event handler that will do something on a per chunk bases with that input.

Fo a quick example here is a script that just converts the data that is piped in to hex.

```js
// do something with data that is being
// piped in from the standard input from a 
// command like Linux echo
process.stdin.on('data', (data) => {
    console.log(data.toString('hex'));
});
```

```
// $ echo "hello" | node echo_pipe
// 68656c6c6f0a
```

With many of my real projects so far what is actually being piped in might be the full body of text of a blog post that is actually being piped in via another script. Also the script that I am piping into does something more than just convert that text to hex, but this is the basic idea never the less.

### 2.3 - The deal with a backslash

One of the options of the Linux echo command is the -e option that can be used to enable the processing of backslashes as a way to inject certain characters.

```js
let spawn = require('child_process').spawn;
 
let processBackslash = process.argv[2] === '-E' ? false : true,
option1 = processBackslash ? '-e' : '-E';
 
let echo = spawn('echo', [option1, 'So this is a line \\n and another line \\n\\n'], {
    stdio: ['pipe', 'inherit', 'pipe']
});
```

## 3 - Conclusion

Well that is it for now when it comes to the Linux echo command, but there really is only so much to write about when it comes to this topic. The echo command is just one way to go about creating some standard output from the string value that is given to it as an argument. So as the name suggests it just echos what is given to it as an argument to the standard output of the console.

