---
title: Working with glob patterns in node.js using the glob npm package
date: 2017-11-28 14:25:00
tags: [js,node.js]
layout: post
categories: node.js
id: 101
updated: 2022-07-29 14:05:17
version: 1.38
---

If you have been using computers as long as I have you might have by now come across the use of [glob patterns](https://en.wikipedia.org/wiki/Glob_%28programming%29) as a way to use a \* wildcard to represent any string of characters. Although this kind of pattern may not always be a full replacement for [regular expressions](/2019/03/20/js-regex/), I am pretty comfortable with this method of selecting files that fit a certain pattern this way. So it would be nice to quickly go about doing so in a nodejs programing environment. 

I could go about writing my own solution for doing so, but why bother putting time and energy into that when there is all ready the popular npm package called simply [glob](
https://www.npmjs.com/package/glob). The npm package glob is a great solution for selecting files in a [node.js](https://nodejs.org/en/) environment with glob patterns, so lets take a moment to look at some examples of glob in action.

<!-- more -->

## 1 - What to know

This is a post on the npm package known as glob that allows for matching files that fit a given glob pattern. Out of the box it might not be a complete file system walker depending on how you would go about defining such a thing. However for more information on file system walkers you might want to check out my [post on ways to walk a file system in nodejs](/2018/07/20/nodejs-ways-to-walk-a-file-system/) to know about some options that are all ready out there before taking the time to make a file system walker.

I will be keeping the examples in this section farily simple, however this is still not a [getting started type post on nodejs](/2017/04/05/nodejs-helloworld/), or [javaScript in general](/2018/11/27/js-getting-started/).

### 1.1 - Version numbers matter

In this post I am also using version 7.1.3 of glob, so if you run into problems check the version number you are using, mainly the major or left most number. This also should go without saying when it comes to the version of nodejs that is being used also.

### 1.2 - The source code examples here are up on github

The source code examples that I am writing about in this post are up on github in my [test\_glob repository](https://github.com/dustinpfister/test_glob). I have a lot of projects that I am working on that compete with my time on my github account. However never the less if you see something wrong with on or more of the source code examples here that would be where to go about making a pull request.

### 1.3 - What are globs and the \* wildcard

The major feature of glob patterns is having a way of making use of a wildcard character \* to represent zero or more characters so that:

```
*.txt
```

Will match any file with a .txt extension which will match helloworld.txt, and readme.txt, but not index.js in a given directory. This is something that I have been using for years when it comes to filtering files in file system managers, command line interface terminals an so forth. Globs might be less powerful then regEx patterns, but for most use case examples simplified glob patterns are still good enough to get the job done when it comes to pattern matching and paths.

## 2 - Basic usage of a glob in nodejs

In this section I will be going over a few basic examples of the npm package known as glob. This is not a built in package, but a user space module that can be installed to a project by way of the default package manager for node called npm. So then there is creating a new test project folder and then doing an:

```
$ npm init
```

In the root name space of the folder. Also there is looking at the github folder that I linked to in the first section of this post. When it comes to starting from the ground up the name of the package is just simply glob, so it can be added to an node project with the usual syntax like this:

```
$ npm install glob --save
```

Once the glob npm package is installed it can then be required into a script just like with any other built in nodejs module or user land project that has been installed into a node modules folder of a project. In a test project folder I made a simple basic.js file that will match any javaScript file in the current working path.

### 2.1 - A basic gloab hello world example

So then now that I have a test folder set up it is noe time to create a basic hello world style example of this module. For this I just require in the glob module as with any other module built in or user space. Once I have the glob module to work with I can then call the main function that is exported by the module and pass a glob pattern as the first argument of the main function. After that for the second argument I can pass a call back function that will be called with the results of the glob pattern call.

```js
const glob = require('glob');
 
glob('*.js', (err, files) => {
    if (err) {
        console.log(err);
    } else {
        // a list of paths to javaScript files in the current working directory
        console.log(files);
    }
});
```

By default glob will search for files that fit the given pattern in the current working directory. So then when I call this from the folder in which I have it in my github repository it will list all the examples in that folder. When it comes to making some kind of global script that is more or less what I will want to happen. However when it comes to making some kind of actually command line tool I will typically want to make this a positional argument. However for now this will work fine as a basic example.

### 2.2 - The ** wildcard

The \*\* wildcard can be used to search for what is in the current working directory, and any additional subdirectories so that:

```js
const glob = require('glob');
 
let forFiles = (err,files) => console.log(files);
glob('../**/*.md', forFiles);
```

will search for and compile a list a file names for each mark down file found in the current working path and any additional path in the current working folder.

### 2.3 - Changing the current working path

If three arguments are passed to to glob the second can be an options object, and one of the many options that can be changed is the current working directory which by default is what is returned by process.cwd\(\) in node.js. However another option for this sort of thing would be to just do something with the paths module like the \_\_dirname global, or the process cwd method. Which is what I often do not just when using this module, but in general with nodejs scripts when it comes to creating script and current working directory relative absolui5te paths.

```js
const glob = require('glob'),
// some options
options = {
    cwd: '../'
},
// for Files
forFiles = (err,files) => console.log(files);

// glob it.
glob('**/*.md', options, forFiles);

console.log(process.cwd());
```

### 2.4 - Reading files

I looks like glob is just for matching files, but when it comes to actually [reading the contents of the files](/2020/05/12/nodejs-filesystem-read-file/), and other file system related tasks, an additional solution will need to be used in conjunction with glob. So out of the box it is not really a complete file system walker, depending of course on how you go about defining such a thing, but it is a valuable tool to create a walker from the ground up that will have support for glob patterns.

```js
const glob = require('glob'),
fs = require('fs');
 
const readFiles = function (pat, forFile) {
    // pattern
    pat = pat || '*.js';
    // for file method
    forFile = forFile || function (content, file) {
        console.log('');
        console.log(file);
        console.log('*****');
        console.log(content);
        console.log('*****')
    };
    // using glob
    glob(pat, function (err, files) {
        if (err) {
            console.log(err);
        } else {
            files.forEach(function (file) {
                fs.readFile(file, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        forFile(data.toString(), file);
                    }
                });
            });
        }
    });
};
 
readFiles();
```

There is of course much more then just reading the contents of files but also mutating the contents also. However Maybe much of that would need to be covered in detail in an additional section, or post completely even. This is after all just a basic section of the glob package, so for now maybe this will do.

## 3 - Absolute paths and the glob module

This might be a bit off topic, but it might be a good idea to quickly go over this when it comes to using the glob package, and paths in general in nodejs, and that is the topic of absolute, and relative paths. Whenever I am working on a nodejs script there are two general kinds of paths that come to mind. one kind of path is getting a path that is relative to a script, and the other is getting one relative to the current working directly. There are then two kinds of ways of getting these kinds of paths, one way is to use a relative path relative to a value such as what is in the \_\_dirname global. This kind of path would involving using .. with such a value to get a path that is relative to whatever the location of the script is in a file system. Another kind of path would be an absolute path from the root of the file system to the location that I want.

So then in this section I will be going over a few examples that involve glob as well as the [paths module](/2017/12/27/nodejs-paths/) and the [nodejs globals](/2018/02/10/nodejs-globals) that is built into nodejs. Also theses examples make use of the \_\_dirname global that is another useful value that you should be aware of if you are not all ready, and features of the [process object](/2018/02/11/nodejs-process/) also.

### 3.1 - The __dirname global

This example makes use of the dir name global along with the join method of the nodejs built in path module to resolve a relative path from the location of the script file to an absolute path that is the root of the project folder. The location of this script is just one folder up from the root of the root project folder, so then a relative path from the current script to one parent folder back would get me to the root folder. The dir name global is the folder of the current script, so then joining that with the .. will result in a relative pattern to the root folder of the project. The use of the path join method will result in this being an absolute path of this location.

```js
const glob = require('glob'),
path = require('path');
// list markdown files at root of project folder
const dir_root = path.join(__dirname, '..'),
patt = path.join(dir_root, '*.md');
console.log( 'globing: ' + patt );
glob(patt, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
    }
});
```

### 3.2 - The process global to get positional arguments

So then there is also the question of how to make use of [positional arguments](/2020/12/10/linux-bash-script-parameters-positional) to create a path to search with glob. This is another basic feature when it comes to writing nodejs scripts that I think I should also mention while I am at it. So say I want a script where I can pass a single positional argument from the command line when calling the script with node, or when making a script a global command of one kind or another. For this there is the process argv array that will contains all of the positional parameters when the script was called.

```js
const glob = require('glob'),
path = require('path');
// resolve first positional argument or ./*.js
const patt = path.resolve(process.argv[2] || './*.js');
console.log( 'globing: ' + patt );
glob(patt, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
    }
});
```

## 4 - Using promises

It would seem that out of the box with glob there is no support for promises. However in the util module of versions of nodejs that support it there is a nodejs built in method that can be used to promisify a method that just uses old nodejs style callback functions. I often use this with the nodule built in file system module to make it so that those methods will return promises when I use them. However it would seem that this method also works well with the main function returned by the glob package also.

```js
const globMod = require('glob'),
promisify = require('util').promisify,
path = require('path'),
glob = promisify(globMod);
// glob now returns a promise
const dir_root = path.join(__dirname, '..'),
patt = path.join(dir_root, '*.md');
glob(patt)
.then((files)=>{
    console.log(files);
})
.catch((e)=>{
    console.log(e.message);
})
```

## 5 - conclusion

This is a great node.js solution to get working with glob patterns quickly. I might expand more on this with respect to the many different options that can be given, but for now there is the [readme](https://github.com/isaacs/node-glob/blob/master/README.md) of the project that details more of the options not covered in the content of this post. In addition to expanding more so on what the full features of the glob package are there is also writing some more actuality use case examples which is something else that I am planing for in future edits of this post.


