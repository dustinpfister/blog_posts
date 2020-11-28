---
title: The node.js shebang
date: 2017-03-26 11:48:00
tags: [linux,js,node.js]
layout: post
categories: linux
id: 6
updated: 2020-11-28 13:20:12
version: 1.7
---

The definition of the word [shebang](https://en.wikipedia.org/wiki/Shebang_&#40;Unix&#41;) is "a matter, operation, or set of circumstances." so then the set of circumstances in the case of using Linux is what scripting language is being used when running a script file. In other words it is important for a program loader to know what interpreter should be used to run a script in question, in the case of server side JavaScript it is typically [node.js](https://nodejs.org/en/).

I tend to like to use javaScript for anything and everything that has to do with scripting, operating system automation, writing my own commands and so forth so for me I would use something like this:

```
#!/usr/bin/env node
```

At the very top of my javaScript files that will be used as starting points for any type of command. The shebang text will of course differ a little from one environment to another but it will always look at least something like that.

<!-- more -->

## 1 - Do you need to use the shebang?

I would say that it depends on the situation, if for example each time I am starting a script by calling node first and then a path to the script like this:

```
# node myscript.js
```

Then it is not at all important as I am directly calling node each time I want to run the script. However I would say that it becomes important to use a Linux shebang when developing a stand alone Command Line Interface tool using node as the environment. When the stand alone command is called Linux or any other program that calls the script is going to need to know what program to use in order to run the script. So using the Linux shebang at the top of the main file is one thing that must be done when it comes to making a nodes project a stand alone command.

## 2 - Check your jsMin, or jsFormat tools.

If you use formating or minification tools it can sometimes mess up the shebang, so if you are using one make sure that it leaves it alone. there are often ways to configure a tool that formates javaScript to ignore the first few lines if so that should be done when using it. If not then I am just going to have to do whatever is necessary to make sure that the shebang does not get messed up.

In major projects I often might take a moment to write a script that will act as a custom build tool for the project. If I am taking the time to make such a tool the shebang should be placed at the very top of the file, followed by legal text, followed then by the compressed javaScript code when making builds of the project.

## 3 - This is an important step in making a CLI tool with node.js

I have written a newer post that covers in greater detail [how to go about getting started making a CLI tool in node.js](/2017/11/13/linux-nodejs-cli-tools-getting-started/). Be sure to check that out if you want to learn more about how to make global scripts that you can call from anywhere within the Command Line Interface.

## 4 - Other examples of shebangs, the shebang should always point to the binary to use to call a script.

A Linux shebang should be placed on top of any script, or source code file that is to be called directly and the script is in a langauge that is not compiled. For example if I where to write a simple little projecty in the C langaue there is no need to place a shebang at the top of a source code file, becuase C lanague source is compiled to a binary, and that binary file is what I can then call directly.

So in other words a shebang is a way of letting bash know what binary to use to call a script when the script is called directly from the command line. With javaScript files it makes sense to place a shebang pointing to the location of where the nodejs binary is in a system. However with other scripting langaues the shebang should point to whatever binary is used to call the script. For example when working out a bash script I would want to have a shebang point to bash.

```
#!/bin/bash
echo "Hello Bash!"
```

## 5 - Conclusion

That's it, this is a short post aimed at a very specific topic of interest. It is a relevant part of getting into what is needed to be understood when it comes to developing CLI tools with node.js, but that is a whole other ball of wax as I see it. When it comes to it I will link and and expand this post accordingly.