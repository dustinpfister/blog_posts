---
title: The yargs option parser for node.js
date: 2018-07-24 19:53:00
tags: [js,node.js]
layout: post
categories: node.js
id: 241
updated: 2019-10-22 21:42:28
version: 1.7
---

So this week I have been looking into option parsers, for the sake of expanding my horizons when it comes to what the options are for parsing options. I have writing a [post on nopt](/2017/05/05/nodejs-nopt/) a long time ago, which was one of the first option parsers I have dealt with. It works fine, but so far I think I am liking [commander](/2018/07/10/nodejs-commander/) the best. However this post is about another popular option parser for node.js called [yargs](https://www.npmjs.com/package/yargs).

<!-- more -->

## 1. - What to know

This is a quick post on the [node.js](https://nodejs.org/en/) option parser known as [yargs](https://www.npmjs.com/package/yargs). This is not a getting started post on node.js in general, or any additional skills that are required before hand. However if you are someone that has at least some background with node.js, and javaScript, and are using node.js to make some command line tools then an option parser like yargs might be of interest.

## 2 - Some basic examples of yargs

When making on of my posts on an npm package I start out with simple examples, then I might progress into some more advanced stuff from there. When it comes to an option parser at a minimum I would want to know how to define one or more options, and then I would want to also know how to set some defaults for them as well.

## 2.1 - just a single boolean option.

For starters I made a basic.js file where I just log to the console the value of a single option that I have called basic. When options are parsed with yargs they will be a value of the argv object when bringing yargs into a project with require.

```js
console.log(require('yargs').argv.basic);
```

So when I call my basic.js file from the command line with node it works as expected. When I give the basic option the value is true, and if I give a no-basic option then it has a value of false.

```
$ node basic --basic
true
$ node basic --no-basic
false
$ node basic
undefined
```

However if I do not give any option then I get a value of undefined, however this can be resolved by setting some defaults.

### 2.1 Set some defaults

So if I want to set some defaults for an option then that is just a matter of using the defaults method.

```js
console.log(require('yargs').default('basic','true').argv.basic);
```

So when I just call my defaults.js file from the command line, and do not give any option at all, as expected the set default is assumed. I can then use the --no-basic option to set the basic option to false.

```
$ node defaults
true
$ node defaults --no-basic
false
```

## 3 - An example that walks a file system for html

For a more interesting example I put together a quick script that can be used to walk a file system and log any html files that it finds.

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

 In this example I am setting up a default command that will display a usage example when the script is called without a command given. I am also defining my commands by giving an object rather than three sets of arguments.

## 4 - Using external files

So the way I often like to use yargs in actual projects is to create a commands folder that will contains a whole bunch of scripts and each script is a command. So I will want to make it so each script exports an object that is formated the same way as the obejcts that I use to define what a command is.