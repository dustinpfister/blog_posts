---
title: Using the walk npm package to loop over the  contents of a file system in node.js.
date: 2018-07-23 10:46:00
tags: [js,node.js]
layout: post
categories: node.js
id: 240
updated: 2018-08-01 17:29:03
version: 1.6
---

For the past few days I have been exploring node.js powered options when it comes to walking over the contents of a file system. I have been looking at methods in the node.js fs module that can be used to just start doing something like this from the ground up, as well as npm packages. Im my travels I have found what looks like maybe one of the most popular solutions when it comes to npm packages that is just simply called [walk](https://www.npmjs.com/package/walk). In this post I will be covering the use of walk to just get this aspect of development over with quickly.

<!-- more -->

## 1 - What to know before continuing

This is a post on the npm package known as walk that can be used to walk a file system in a node.js environment. It is not a getting started post on node.js, and JavaScript in general, I assume you have some background on those things.

### 1.1 - Be sure to check out other solutions also

It would seem that walk is a decent solution, with many of the features that I would expect from such a project. There are many others out there as well thought, and it may not be a waste of time to make your own from the ground up as well if it seems like that is what needs to happen. Be sure to check out my [main post on node.js file system walkers](/2018/07/20/nodejs-ways-to-walk-a-file-system/) to gain a batter sense of what is out there.

## 2 - Some basic examples of walk 

So walk works by calling the walk or walkSync method that are in the object the is returned when bringing walk into a project with require. When calling the walk method I will of course want to give the path in the file system where walking is to start, as the first argument I can then set one or more events that are to be called for a file, directory, of if some kind of error happens.

### 2.1 - The files event.

```js
let dir = process.argv[2] || process.cwd();
 
require('walk').walk(dir)
 
// on file
.on('file', function (root, fileStats, next) {
 
    // log absolute path of each file found
    console.log(require('path').join(root,fileStats.name));
    next();
 
});
```

## 3 - A cli tool using walk, and yargs for option parsing

For a full example of uisng walk I made a simple script that will list html files in a given root dir, or read all the html content based on the sub command given when calling the script from the comand line. In this demo I will be using [yargs](/2018/07/24/nodejs-yargs/), which is a great option parser for parsing options from the command line.

### 3.1 - Setup

The setup for this demo was to just install yargs on top of walk, the only additional modules I used where built in ones.

```
$ mkdir 'html-walker'
$ cs html-walker
$ npm init
$ npm install walk --save
$ npm install yargs --save
```

Then I just made a single index.html file that is called from the command line with node.

### 3.2 - The html walker method

I started off the index.js file by bringing in walk, yargs, path, and fs with require. After I have everything that I need I then made an htmlWalker method that will be called within my yargs commands. It creates an api, and if the read option is given, will include the actual html content of each html file found in the given path.

```js
let walk = require('walk').walk,
path = require('path'),
yargs = require('yargs'),
fs = require('fs'),
 
// html walker
htmlWalker = function (opt, forFile) {
 
    opt = opt || {};
    forFile = forFile || function () {};
 
    // dir will be the given dir, or current working dir
    // and it should always be an absolute path
    opt.dir = opt.dir || process.cwd();
    opt.dir = path.resolve(opt.dir);
 
    // default file reading to false
    opt.read = opt.read || false;
 
    // walk the set dir
    walk(opt.dir)
 
    // on file
    .on('file', function (root, stats, next) {
 
        let ext = path.extname(stats.name).toLowerCase(),
        api = {
 
            root: root,
            absPath: path.join(root, stats.name),
            ext: ext,
            stats: stats,
            html: null,
            err: null
 
        };
 
        if (ext === '.html' || ext === '.htm') {
 
            if (opt.read) {
 
                fs.readFile(api.absPath, 'utf-8', function (err, html) {
 
                    api.err = err;
                    api.html = html;
 
                    forFile.call(api, next);
 
                });
 
            } else {
 
                forFile.call(api, next);
 
            }
 
        } else {
 
            next();
 
        }
 
    });
 
};
```

This way I can have many sub commands that will do different things depending on the forFile methods that I give to it, however this method helps to filter out all the files except just the ones I care about, and gives me a standard api that I can then work with further if I want to continuing making a project like this that is a bot more serious.

### 3.3 - The yargs commands

So then after I have my htmlWalker method I can then define my yargs commands. I start off with a default command that will be called if no sub command is given which will result in a simple usage example help like this:

```
$ node index
html file tool demo
node index list -d ./public
node read list -d ./public

```

So each command is defined by supplying an object to the yargs command method that will contain things like the sub command name, and then a handler. There is more to it then that, but this is a post on walk not yargs.

```js
// process cli arguments with yargs
yargs
 
.command({
 
    command: '*',
    handler: function () {
 
        console.log('html file tool demo');
        console.log('node index list -d ./public');
        console.log('node read list -d ./public');
 
    }
 
})
 
// just list all html files
.command({
 
    command: 'list',
    handler: function (argv) {
 
        htmlWalker({dir: argv.dir,read: false}, function (next) {
 
            // just log the absolute path of all files
            console.log(this.absPath);
 
            next();
 
        });
 
    }
 
})
 
// read all html files
.command({
 
    command: 'read',
    handler: function (argv) {
 
        htmlWalker({dir: argv.dir,read: true}, function (next) {
 
            // logg the html
            console.log(this.html);
 
            next();
 
        });
 
    }
 
})
 
.option('dir', {alias: 'd',default:process.cwd()})
 
.argv;
```

## 3.4 - Using the tool

So then If I have a public html folder in the same path as the index.js file then I would call the read sub command like this:

```
$ node index read -d ./public
```

Which would display all the html content in the console that exists in the public folder. I could make this more useful by introducing additional packages like [cheerio](/2017/11/28/nodejs-cheerio/) to help work with the html, and display other useful information, build databses about the content, and so forth. However hopefully you get the basic idea.

## Conclusion

One of the major draw backs that I have noticed is that there does not seem to be an option to limit the depth of recursion, a common feature that I have grown to expect in a file system walker. Other than that walk has an interesting approach to this that presents many things of value that should be taken into consideration when looking into file system walkers. Having a way to set handlers for files, and directories, rather than having a single handler for everything in which filtering is preformed is nice.