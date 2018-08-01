---
title: Some ways to parse command line interface options in node.js
date: 2018-07-31 13:13:00
tags: [js,node.js]
layout: post
categories: node.js
id: 243
updated: 2018-08-01 18:54:41
version: 1.3
---

When making a node.js project that is to one extent or another a command line tool, there is often a need to parse options that may be given from the command line when using the tool. In this post i will be breefly covering some options for quickly getting this over with, and continuing with what really matters when making your node.js cli tool.

<!-- more -->

## 1 - what to know

This is a post on how to parse commands from the command line in a node.js project. This is not a getting started post on node.js, or javaScript in general. I assume that you have at least some background on these things, and are not researching how to handle this aspect of making command line tools with node.js.

## 2 - Some npm packages for parsing arguemnts

There are many npm packages that can be installed into a node.js project with npm install to add a dependency for quickly parsing command arguments from the command line, into a object that can be worked with. Many of these projects add additional useful features that allow for defining default values, and what to do for each sub command. In most cases this is best as it helps to save time when making a complex project, however there is also process.argv as well in node.js where the raw array of options are stored.

## 2.1 - commander




## 2.2 - yargs

be sure to check out [Yargs](/2018/07/24/nodejs-yargs/) as it is a great solution for an option parser. In addition to being a great solution for just parsing what is at process.argv into a workable object for me, it also allows for me to set up commands that are a great way of defining the logic of one or more commands that are to happened when my cli tool is called.

For example I can set up a default command that will log a basic usage example, and then one or more additional commands that actually do something.

```js
let yargs = require('yargs'),
klaw = require('klaw'),
path = require('path'),
 
argv = yargs
 
    .command({
 
        command: '*',
        handler: function () {
 
            console.log('use the html command to walk');
            console.log('walker html -p ./public -d 4');
 
        }
 
    })
 
    // html command
    .command({
        command: 'html',
        describe: 'walk for html',
        handler: function (argv) {
 
            // walk with path, and depth
            klaw(argv.path, {
                depthLimit: argv.depth
            })
 
            .on('data', function (item) {
 
                if (path.extname(item.path).toLowerCase() === '.html') {
 
                    console.log(item.path);
 
                }
 
            });
 
        }
 
    })
    // options to set path, and depth
    .option('depth', {alias: 'd',default:'0'})
    .option('path', {alias: 'p',default:'./'})
    .argv;
```