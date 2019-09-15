---
title: node command line options and command use examples
date: 2019-09-11 16:09:00
tags: [node.js]
layout: post
categories: node.js
id: 534
updated: 2019-09-15 07:59:56
version: 1.8
---

This will be a post on the [node command](https://nodejs.org/api/cli.html) that is used to start nodejs projects written in javaScript. The node command is used to run scripts written in javaScript by way of an external javaScript file, or other means such as from the command line via the eval option. This post is mainly aimed at developers that are new to nodejs, but even if you are a more seasoned nodejs developer there might be a few more aspects of using the node command that you might not yet be aware of that might be of use in some situations when it comes to advanced topics such as [piping](https://en.wikipedia.org/wiki/Pipeline_(Unix)).

<!-- more -->

## 1 - The node command basics

The node command is what will be available in the command line of an operating system after installing nodejs if it is not part of the os image to begin with. The process of installing nodejs is outside the scope of this post, at this time I assume that you have nodejs installed, and now want to know the basics of using nodejs in the bash terminal which is typical of posix systems such as linux, or command prompt in windows systems.

## 2 - The eval node command option

When using the node command in the terminal the eval option can be used as a way to run some javaScript by passing it as a string as part of the command. I can not say that I use this option often, but if for some reason you do just want to test out a line of code without saving it to a fine this is one way to go about doing just that.

```
$node --eval "console.log(2+5)"
7
```

## 3 - Using interactive mode

There is the interactive mode of node that allows for me to drop into a javaScript console of sorts. This console is somewhat similar to the javaScript console that you may all ready be familiar with when it comes to client side javaScript in chrome. I can also use this in conjunction with piping from the standard input into this console. In this section I will be going over some examples of using the n ode command this way.

### 3.2 - Droping into a javaScript console

So this is actually the default behavior if no argument of nay kind is given but the i option can be given as a way to make it explicit. In addition in some situations the i option must be given.

```
$ node -i
> let n = 40
undefined
> n + 2 
42
> 
```

### 3.1 - Piping and interactive mode

I will not be getting into the nature of the standard input and piping in this post, but of course that is another way to push input into the console in interactive mode.

```
$ echo 40 + 2 | node -i
> 40 + 2
> 42
```

## 4 - Using script files with the node command

Using the node command to run a line of javaScript or work within interactive mode is nice but in my experience so far for the most part the node command is used to start an external javaScript file of a package. There is an awful lot to cover when it comes to this so I might not get into every tittle detail about this. However in this section I will start out with some of the basics and then progress into some things that are not so basic when it comes to using the node command to start or use an external javaScript file with the node command.

### 4.1 - Writing an external javaScript file and starting it with the node command

So to get started with external javaScript files and the node command just create a new text file with any basic text editor and save it as something like script.js. The name should just conform to the rules of filenames where there are just certain characters that you should not use even through you can such as spaces, but the file extension should be js.

```js
let func = (a, b) => {
    return a + b;
};
console.log( func(40,2) );
```

```js
$ node script
42
```