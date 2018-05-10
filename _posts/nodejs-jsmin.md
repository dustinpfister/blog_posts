---
title: Compressing javascript files with jsmin
date: 2017-08-18 12:58:23
tags: [js,node.js,js13k]
layout: post
categories: node.js
id: 31
updated: 2017-09-30 18:43:22
version: 1.2
---

Today I am working on my 2017 submission to [js13kgames.com](http://js13kgames.com/) in which I must make a JavaScript game in which all the source code and any additional assets takes up 13kb or less of space. As such it is important to crunch the size of the source code down, as the development form of any game I make often surpasses that limit in a heart beat. There are many solutions for this, but for this post I will be writing on [jsmin](https://www.npmjs.com/package/jsmin).


<!-- more -->

## Using jsmin from the command line

If I want to just quickly compress some file that is pretty easy. Just install jsmin as a global script.

```
$ npm install -g jsmin
```

Once jsmin is installed as a global script it can then be used from the command line.

```
$ jsmin -o main.min.js main.js
```

Here I just created a minified version on my development file main.js. As of this writing the size of my main.js dev file is 3.41KB, and the main.min.js file is now 1.16KB only 34% of the original size. After doing this with all of my source files I am at 6KB, and I have my game about half done. As such it looks like this solution is working pretty great for me, and I may not need to result to all those little tricks to crunch things down more (such as the !0 in place of true trick).

## Using jsmin in a script

I have a few files that I would like to combine together in a single js file that is minified. this is something that would not take that long to do manually, but I have gotten into the habit of throwing together quick little scripts that automate process like this.

To use jsmin in a script I will want to install it as a dev dependency of my node project.

```
$ npm install --save-dev jsmin
```

Once installed I can use it in my node scripts, for the project I have in mind I put this together in a flash.

```js
var jsmin = require('jsmin').jsmin,
fs = require('fs'),

// the file names of my project, the order matters.
files = [
    'world',
    'canvas',
    'main'
],
buildFile = '',
i = 0;

// the build method
var build = function () {
 
    if (i < files.length) {
 
        fs.readFile('../js/' + files[i] + '.js', 'utf8', function (e, data) {
 
            buildFile += jsmin(data);
 
            i += 1;
 
            // call build recursively until i reaches the length of the files array.
            build();
 
        });
 
    } else {
 
        console.log(buildFile);
 
        fs.writeFile('../build.js', buildFile, 'utf8', function (e) {
 
            if (e) {
 
                console.log('error');
                console.log(e);
 
            } else {
 
                console.log('build file done');
 
            }
 
        });
 
    }
 
};
 
build();
```

The script recursively keeps calling itself until all of the files have been opened the js inside minified, and added to a variable that is then written to build.js in the root folder of my project. this as you may gather is the fine that I will eventfully be using in my zip file that I will be submitting to the competition. 

## Conclusion

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).

Thats it for now, happy coding.