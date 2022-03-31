---
title: Getting started making a CLI tool with node.js
date: 2017-11-13 14:41:00
tags: [linux,node.js]
layout: post
categories: linux
id: 90
updated: 2022-03-31 11:49:01
version: 1.16
---

So because I have been messing around with node.js a whole lot more lately, and have written a [number of posts on nodejs](/categories/node-js/) it including the various built in modules as well as many npm packages. The thing about nodejs is that it is very much sever side javaScript, or general programing style javaScript if you prefer, and as such it is important to know how to make a script file into something that can be used as a stand alone command that can be executed in a command line such as bash. So I thought I would put a post together to help remind me of the few steps to make in order to [make a global CLI tool in javaScript with node.js](https://blog.bitsrc.io/how-to-build-a-command-line-cli-tool-in-nodejs-b8072b291f81).

The basic process is that I just need to have a [nodejs shebang](/2017/03/26/linux_shebang/) at the top of a javaScript file that will be the main file that will run to start the program. In addition to this I just need to have a bin key in my package.json file that will serve as a way to name what the command will be and to point to the file that will run when that command is called. After that I just need to install the nodejs project globally to make it a command that I can run anywhere on my computer.

In this post I will be going over just the basics of making a simple node CLI tool that is just a hello world starting point. However I am sure that I will get into at least a few more things beyond this that are closely related to this sort of thing, such as working with [positional arguments](/2020/12/10/linux-bash-script-parameters-positional/) when calling the script.

<!-- more -->

## 1 - Getting started

I assume that node.js is installed, and that you have [basic working knowledge of javaScript in general](/2018/11/27/js-getting-started/). I also assume that you know a thing or two about how to work with a Command Line Interface such as bash in Linux, or cmd in windows. In any case what I am going over in this post should work okay in any Operating system environment, or at least I can not thing of any reasy why it would not. It is largely a problem of concern when using the [child process module](/2018/02/04/nodejs-child-process/) that you might want to be careful about what commands you are using and how you are using them as what it is might not always be there.

To make a CLI tool with node.js I would start by making a new folder in a place where I get projects done such as the home folder, or my documents folder in windows. At which point I would make it the current working directory, and set up a new node project by calling npm init to make my starting package.json file for the new project.

```
$ mkdir cli-tool
$ cd cli-tool
$ npm init
```

The next steps will involve setting a bin name for the command line tool, and start a main index.js file for it, so lets get to doing that.

## 2 - Adding the bin entry to package.json for the command name

One of the most important steps to making a script global is setting the name that is to be called from the command line, and the script to be called when doing so. This is done by adding a bin entry to package.json file of my project.

So insert this anywhere into the package.json file.
```
"bin": {
    "cli-tool" : "./index.js"
}
```

This means that I will be calling my tool like this

```
$ cli-tool
```

So then a file called index.js at the root name sapce along with the package.json file is what will be called to start a command called cil-tool. I do what I can to make sure that I am not using a name that is all ready in use with the operating system that I am using by taking the time to be familiar with what is all ready there. 

It also stands to reason that it would be a good idea to make sure that I am not using a name that is used by another popular project in general when it comes to the possibly that other people might use my command line tool. So even when it comes to just checking out what is installed in my local system it also makes sense to check out what is popular in terms of projects in order to make sure that I am not going to be causing any conflicts.

If need be I can always make the actual command names a little lengthly, and then just encourage people who use it to learn how to set up there own [bash command aliases](/2020/11/30/linux-bashrc-aliases/).

## 3 - The node.js shebang

In short a shebang is just something that I need to place at the very top of a script to help state the binary that needs to be used in oder to run the script. Because I am using javaScript as my programing environment, I need to use the node.js shebang that will typically look like something like this:

```
#!/usr/bin/env node
```

The path might need to change a little from time to time but the end result is more or less the same. In any case this is just a way of letting something like bash know where the binary should be in order to run this script.

## 4 - The index.js file

So yes I will want a JavaScript file called index.js in the root name space of the project for starters I might do something like just log the message hello world to the standard output of the console.

```js
#!/usr/bin/env node
console.log('hello CLI!');
```

This is just a getting started post after all, in a real project I would want to have at least a few dependencies to work with that have to do with things like option parsing and so forth. However I do not want to get to deep into those kinds of things here, and the kind of packages I would add would change from one project to another depending on what the tool does.

So now that I have my starting npm package folder, a binary name set in the package.json file, and a starting file to run for the command, the  next thing to do is to make it a global command.

## 5 - Making the script global

So while still in the working directory of the project I just need to use npm to install the project globally by calling npm install and making sure to use the global flag like so:

```
npm install -g
```

Now I can cd to any path in my CLI and call cli-tool to get 'hello-CLI!' logged to the console. Of course in order to start doing some things more interesting it is going to take more than just that, but this is the depth of just getting started with making a node Command Line Interface tool. In rest of this post I might just start touching base on a few more things that come to mind when it comes to making this kind of project with javaScript.

## 6 - Option parsing in node.js

I will not get into detail with it here, but I have written a post on a dependency that I use to help with option parsing called [nopt](/2017/05/05/nodejs-nopt/). If you want to go vanilla process.argv is what is of interest when it comes to doing something involving arguments accepted from the CLI.

```js
console.log(process.argv); // what arguments there are to work with
```

## 7 - Styling terminal output

For this [I have found chalk](/2017/05/31/nodejs-chalk/) be sure to check that out if you want to do anything with color in the console.

## 8 - Looping over files recursively

I have wrote a [post on an npm package called node-dir](/2017/11/05/nodejs-node-dir/). It allows for working with the content of a bunch of files that are placed in a complex file structurer. I can set a match pattern using regular expressions, and I find it more useful then just using readDir in the fs module of node itself.

## 9 - Conclusion

Maybe I will make some more examples that do something a bit more interesting. For now I guess I will just reference some posts that I have written before that are relevant to this sort of thing. Of course I have many [posts on node.js](/categories/node-js/) that are worth checking out.
