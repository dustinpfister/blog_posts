---
title: Getting started making a CLI tool with node.js
date: 2017-11-13 14:41:00
tags: [linux,js,node.js]
layout: post
categories: linux
id: 90
updated: 2017-11-13 15:21:07
version: 1.2
---

{% mytags_postwords js,javaScript,shebang,linux,node.js,CLI %}

So because I have been messing around with node.js a whole lot more lately, and have written a number of posts on it including many npm packages. So I thought I would put a post together to help remind me of the few steps to make in order to make a global CLI tool in javaScript with node.js.

<!-- more -->

## Getting stared

I assume that node.js is installed, and that you have basic working knowledge of javaScript and know a thing or two about how to work withing a Command Line Interface such as bash in Linux, and most posix systems, and cmd.exe or powerShell in windows.

To make a CLI tool with node.js I would start by making a new folder in a pace where I get projects done such as the home folder, or my documents folder what have you. At which point I would make it the current working directory, and set up a new node project by calling npm init to make my package.json file.

```
$ mkdir cli-tool
$ cd cli-tool
$ npm init
```

## Adding the bin entry to package.json

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

and a file called index.js is what will be called when doing so.


## The node.js shebang

I have wrote a [post on the node.js shebang](/2017/03/26/linux_shebang/) a few months ago, but did not get into detail about how to make a full featured CLI tool using node.js. In short it is just something that I need to place at the very top of a script to help state the binary that needs to be used in oder to run the script. Because I am using javaScript as my programing environment, I need to use the node.js shebang that looks like this:

```
#!/usr/bin/env node
```

## The index.js file

So yes I will want a JavaScript file called index.js in the root name space of the project for starters I might do something like this:

```js
#!/usr/bin/env node
console.log('hello CLI!');
```

## Making the script global

So while still in the working directory of the project I just need to use npm to install the project globally by calling npm install and making sure to use the global flag like so:

```
npm install -g
```

Now I can cd to any path in my CLI and call cli-tool to get 'hello-CLI!' logged to the console, pretty sweet hua? Of course in order to start doing some things more interesting it is going to take more than just that, but this is the depth of this post.

## Option parsing in node.js

I will not get into detail with it here, but I have written a post on a dependency that I use to help with option parsing called [nopt](/2017/05/05/nodejs-nopt/). If you want to go vanilla process.argv is what is of interest when it comes to doing something involving arguments accepted from the CLI.

```js
console.log(process.argv); // what arguments there are to work with
```

## Styling terminal output

For this [I have found chalk](/2017/05/31/nodejs-chalk/) be sure to check that out if you want to do anything with color in the console.

## Looping over files recursively

I have wrote a [post on an npm package called node-dir](/2017/11/05/nodejs-node-dir/). It allows for working with the content of a bunch of files that are placed in a complex file structurer. I can set a match pattern using regular expressions, and I find it more useful then just using readDir in the fs module of node itself.

## Conclusion

maybe I will make some more examples that do something a bit more interesting. For now I guess I will just reference some posts that I have written before that are relevant to this sort of thing. Of course I have many [posts on node.js](/categories/node-js/) that are worth checking out.
