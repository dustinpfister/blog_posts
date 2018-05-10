---
title: Working with glob patterns in node.js using the glob npm package
date: 2017-11-28 14:25:00
tags: [js,node.js]
layout: post
categories: node.js
id: 101
updated: 2017-12-03 12:06:02
version: 1.5
---

If you have been using computers as long as I have you might have by now come across the use of [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming) as a way to use \* wildcard to represent any string of characters. I am pretty comfortable with this method of selecting files that fit a certain pattern, and the npm package [glob](
https://www.npmjs.com/package/glob) is a great solution for selecting files in a workspace this way.

<!-- more -->

## what are globs and the \* whildcard

It is a way of making use of a wildcard character \* to represent any string of characters so that:

```
*.txt
```

means any file with a .txt extension which will match helloworld.txt, and readme.txt, but not index.js in a given directory.

## Basic usage of glob in nodejs

The name of the package is just simply glob, as such I can add it to a node.js project link this

```
$ npm install glob
```

In a test project folder I made a simple basic.js file that looks like this:

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

## The ** wildcard

The ** wildcard can be used to search for what is in the current working directory, and any additional subdirectories so that:

```js
var forFiles = function(err,files){ console.log(files);};
glob('**/*.md', function (err, forFiles);
```

will search for and compile a list a file names for each mark down file found in the current working path and any additional path in the current working folder.

## Changing the current working path

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

## conclusion

This is a great node.js solution to get working with glob patterns quickly. I might expand more on this with respect to the many diffrent options that can be given, but for now there is the [readme](https://github.com/isaacs/node-glob/blob/master/README.md) of the project. ON MY GLOB!