---
title: Deleting a collection of files recursively with rimraf
date: 2017-05-14 16:41:38
tags: [js,node.js]
layout: post
categories: node.js
id: 19
updated: 2021-06-11 10:29:19
version: 1.7
---

Some times I might want to delete a whole bunch of files that exist in a file system structure on the host operating system of a script that will run on top of [nodejs](https://nodejs.org/en/about/). If the project I am making is aways going to be running in a POSIX environment, I could use the rm command with a child process, but say I want to make the app more portable and work okay in a win32 environment also. This is where something like the npm package [rimraf](https://www.npmjs.com/package/rimraf) may come in handy when it comes to making use of what there is to work with in user space.

<!-- more -->

## My test_rimraf project

When testing out any kind of node.js project I often make a test\_\[name-of-project\] folder, and test it out in there, often writing some demo scripts that make use of that project.

If you want to check out my test\_rimraf on this post you can [find it here](https://github.com/dustinpfister/test_rimraf). 

## Making some files

To test out rimraf I first need a way to make some files in a path, so I made a mkfiles.js script that provides a method that helps me make a bunch of files at a given path. I then made two scripts make-basic.js, and make-junk.js that can be used to simulate the creation of a basic file structurer that contains files that I might want to keep, and files that I want gone.

In a real life situation you might have some kind of file system structure composed of an array of different file types, or maybe they follow a certain pattern in the filename. For example you might want to delete all of the \*.md files in your node_modules folder, but preserve everything else that may be of use. If this is the case you can skip over this making some files section, and get on with it.

Here is the source of mkfiles if interested.

```js
var fs = require('fs'),
path = require('path'),
mkdirp = require('mkdirp');
 
// make a path of do nothing
var mkPath = function (p) {
 
    return new Promise(function (resolve, reject) {
 
        mkdirp(p, function (e) {
 
            if (e) {
 
                reject(e);
 
            }
 
            resolve();
 
        });
 
    });
 
},
 
// make a file
mkFile = function (p, end, prefix, data) {
 
    p = p || '.source';
    end = end || '.txt';
    prefix = prefix || 'test_';
    data = data || 'test_data';
 
    return new Promise(function (resolve, reject) {
 
        mkPath(p).catch (function (e) {
 
            reject(e);
 
        }).then(function () {
 
            fs.writeFile(path.join(p, prefix + end), data, 'utf-8', function (e) {
 
                if (e) {
 
                    reject(e)
 
                }
 
                resolve();
 
            });
 
        });
 
    });
 
};
 
// make files
exports.mkFiles = function (options) {
 
    options = options || {};
 
    var p = options.p || './source',
    type = options.type || '.txt',
    count = options.count || 10,
    prefix = options.prefix || 'test_';
 
    console.log('making files.');
 
    var i = 0;
    var make = function () {
 
        var fix = prefix + i;
 
        mkFile(p, type, fix).then(function () {
 
            console.log(p + '/' + fix + type);
 
            i += 1;
 
            if (i < count) {
 
                make();
 
            }
 
        }).catch (function (e) {
 
            console.log(e)
 
        });
 
    };
 
    make();
 
};
```

I Then used this in my make-basic script:

```js
var mkFiles = require('./mkfiles.js');
 
mkFiles.mkFiles();
```

and also a make-junk script, that builds a more complex example structure.

```js
var mkFiles = require('./mkfiles.js');
 
// source/
mkFiles.mkFiles({
 
    p: './source',
    type: '.txt'
 
});
 
// source/html
mkFiles.mkFiles({
    p: './source/html',
    type: '.txt'
});
mkFiles.mkFiles({
 
    p: './source/html',
    type: '.html'
 
});
 
// source/html/css
mkFiles.mkFiles({
    p: './source/html/css',
    type: '.txt'
});
mkFiles.mkFiles({
 
    p: './source/html/css',
    type: '.css'
 
});
```

So when calling my make-junk script I end up with a bunch of \*.html, \*.css, and \*.txt files. This represents a situation in which I want to delete the \*.txt files while not touching everything else. Get it? good moving on.


## Deleting all files of a certain type recursively

So this is pretty much the whole point of using rimraf, to go over the whole of a file structure and delete all files that fix a certain [glob](https://en.wikipedia.org/wiki/Glob_(programming) pattern.

```js
var rimraf = require('rimraf');
 
rimraf('./source/**/*.txt', function (e) {
 
    console.log(e);
    console.log('okay');
 
});
```

Notice the \*\* [glob](https://en.wikipedia.org/wiki/Glob_(programming), this will cause rimraf to search the whole structure in the source folder for text files and delete them.

## Plain JS alternative

You may be of a mindset where you always think to yourself "do I really need this dependency". You may often think about how hard it might be to put together something on your own, just working with what there is to play with when it comes to the node.js core modules.

As such yes it is not to hard to get something together to do this. I was able to quickly throw together something using fs.readdir, fs.lstatSync, and fs.unlink.

```js
var fs = require('fs'),
path = require('path'),
 
matchPat = /\.txt$/,
 
readDir = function (dir, forItem) {
 
    forItem = forItem || function (itemLoc) {
        console.log(itemLoc)
    };
 
    // read the given dir
    fs.readdir(dir, function (err, content) {
 
        // for all contents in the path
        content.forEach(function (item) {
 
            itemLoc = path.join(dir, '/' + item);
 
            // if a dir, continue recursively
            if (fs.lstatSync(itemLoc).isDirectory()) {
 
                readDir(itemLoc, forItem);
 
            }
 
            // log the current item
            forItem(itemLoc);
 
        });
 
    });
 
};
 
// call readDir with the given forItem method.
readDir('./source', function (itemLoc) {
 
    // if there is a match
    if (itemLoc.match(matchPat)) {
 
        console.log(itemLoc.match(matchPat));
 
        // unlink (delete)
        fs.unlink(itemLoc, function (e) {
 
            if (e) {
 
                console.log(e);
 
            }
 
        });
 
    }
 
});
```

Keep in mind this is something I put together in about fifteen minutes maybe. I could invest some more time, and make it a bit more robust. It could make use of promises, work well as a CLI tool, so forth, and so on. It may be a bit time consuming to get this solution to work well with respect to a wide range of use case scenarios.

## Conclusion

rimraf works pretty well for this task. It might be nice to have something that does this that also has RegEx support, but most of the time globs get the job done just fine.

Be sure to check out my [other posts on node.js, and npm packages](/categories/node-js/).