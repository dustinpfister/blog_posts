---
title: The node.js shebang
date: 2017-03-26 11:48:00
tags: [linux,js,node.js]
layout: post
categories: linux
id: 6
updated: 2020-10-02 14:44:31
version: 1.4
---

The definition of the word [shebang](https://en.wikipedia.org/wiki/Shebang_&#40;Unix&#41;) is "a matter, operation, or set of circumstances." so then the set of circumstances in the case of using Linux is what scripting language is being used when running a script file. In other words it is important for a program loader to know what interpreter should be used to run a script in question, in the case of server side JavaScript it is typically [node.js](https://nodejs.org/en/).

I tend to like to use javaScript for anything and everything that has to do with scripting, operating system automation, writing my own commands and so forth so for me I would use something like this:

```
#!/usr/bin/env node
```

At the very top of my javaScript files that will be used as starting points for any type of command. The shebang text will of course differ a little from one environment to another but it will always look at least something like that.

<!-- more -->

## 1 - Do you need to use the shebang?

It depends on the situation if you are calling your node script like this:

```
# node myscript.js
```

Then it is not at all important as you are directly calling node. It becomes important to use it when developing a stand alone Command Line Interface tool using node.

## 2 - Check your jsMin, or jsFormat tools.

If you use formating or minification tools it can sometimes mess up the shebang, so if you are using one make sure that it leaves it alone.

## 3 - This is an important step in making a CLI tool with node.js

I have written a newer post that covers in greater detail [how to go about getting started making a CLI tool in node.js](/2017/11/13/linux-nodejs-cli-tools-getting-started/). Be sure to check that out if you want to learn more about how to make global scripts that you can call from anywhere within the Command Line Interface.

## 4 - Conclusion

That's it, this is a short post aimed at a very specific topic of interest. It is a relevant part of getting into what is needed to be understood when it comes to developing CLI tools with node.js, but that is a whole other ball of wax as I see it. When it comes to it I will link and and expand this post accordingly.