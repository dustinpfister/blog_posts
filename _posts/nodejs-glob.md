---
title: Working with glob patterns in node.js using the glob npm package
date: 2017-11-28 14:25:00
tags: [js,node.js]
layout: post
categories: node.js
id: 101
updated: 2020-01-31 18:27:43
version: 1.15
---

If you have been using computers as long as I have you might have by now come across the use of [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming) as a way to use a \* wildcard to represent any string of characters. I am pretty comfortable with this method of selecting files that fit a certain pattern this way, so it would be nice to quickly go about doing so in a nodejs programing environment. 

I could go about writing my own solution for doing so, but why bother putting time and energy into that when there is all ready the popular npm package called simply [glob](
https://www.npmjs.com/package/glob). The npm package glob is a great solution for selecting files in a [node.js](https://nodejs.org/en/) environment with glob patterns, so lets take a moment to look at some examples of glob in action.

<!-- more -->

## 1 - What to know

This is a post on the npm package known as glob that allows for matching files that fit a given glob pattern. Out of the box it might not be a complete file system walker depending on how you would go about defining such a thing. However for more information on file system walkers you might want to check out my [post on them](/2018/07/20/nodejs-ways-to-walk-a-file-system/) to know about some options that are all ready out there before making your own file system walker. 

In this post I am also using version 7.1.3 of glob, so if you run into problems check the version number you are using, mainly the major or left most number.

### 1.1 - what are globs and the \* wildcard

It is a way of making use of a wildcard character \* to represent zero or more characters so that:

```
*.txt
```

Will match any file with a .txt extension which will match helloworld.txt, and readme.txt, but not index.js in a given directory. This is something that I have been using for years when it comes to filtering files in file system managers, command line interface terminals an so forth. Globs might be less powerful then regEx patterns, but for most use case seniors simplified glob patterns are still good enough to get the job done.

## 2 - Basic usage of glob in nodejs

The name of the package is just simply glob, so it can be added to an node project with the usual syntax like this:

```
$ npm install glob --save
```

Once the glob npm package is installed it can then be required into a script just like with any other built in nodejs module or user land project that has been installed into a node modules folder of a project. In a test project folder I made a simple basic.js file that will match any javaScript file in the current working path.

```js
var glob = require('glob');
 
glob('*.js', function (err, files) {
 
    if (err) {
 
        console.log(err);
 
    } else {
 
        // a list of paths to javaScript files in the current working directory
        console.log(files);
 
    }
 
});
```

By default glob will search for files that fit the given pattern in the current working directory. When I call this from there it just gives me \[basic.js\] as that is the only javaScript file in my test folder as of this writing, but I can search recursively using the \*\* pattern.

## 3 - The ** wildcard

The ** wildcard can be used to search for what is in the current working directory, and any additional subdirectories so that:

```js
var forFiles = function(err,files){ console.log(files);};
glob('**/*.md', function (err, forFiles);
```

will search for and compile a list a file names for each mark down file found in the current working path and any additional path in the current working folder.

## 4 - Changing the current working path

If three arguments are passed to to glob the second can be an options object, and one of the many options that can be changed is the current working directory which by default is what is returned by process.cwd() in node.js.

```js
var glob = require('glob'),
 
// some options
options = {
 
    cwd: 'node_modules'
 
},
 
// for Files
forFiles = function(err,files){ console.log(files);};
 
// glob it.
glob('**/*.md', options, forFiles);
```

## 5 - Reading files

I looks like glob is just for matching files, but when it comes to actually reading the contents of the files and additional solution will need to be used in conjunction with glob. So out of the box it is not really a complete file system walker, but it is a valuable tool to create a walker from the ground up that will have support for glob patterns.

```js
let glob = require('glob'),
fs = require('fs');
 
let readFiles = function (pat, forFile) {
 
    pat = pat || '*.js';
    forFile = forFile || function (content) {
        console.log(content);
    };
 
    glob('*.js', function (err, files) {
 
        if (err) {
 
            console.log(err);
 
        } else {
 
            files.forEach(function (file) {
 
                fs.readFile(file, function (err, data) {
 
                    if (err) {
 
                        console.log(err);
 
                    } else {
 
                        forFile(data.toString());
 
                    }
 
                });
 
            });
 
        }
 
    });
 
};
 
readFiles();
```

## 6 - conclusion

This is a great node.js solution to get working with glob patterns quickly. I might expand more on this with respect to the many different options that can be given, but for now there is the [readme](https://github.com/isaacs/node-glob/blob/master/README.md) of the project that details more of the options not covered in the content of this post.