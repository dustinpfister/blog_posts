---
title: Walking over the contents of a path recursively with fs.readdir
date: 2018-07-20 17:48:00
tags: [js,node.js]
layout: post
categories: node.js
id: 238
updated: 2019-06-15 07:33:19
version: 1.15
---

The subject of walking, or looping over a file system path recursively for the purpose of doing some kind of file operation on a whole bunch of files in a directory that meet a certain criteria is a subject that comes up often with [node.js](https://nodejs.org/en/) development. There are many options when it comes to doing this, some of which are well known npm packages such as [walk](https://www.npmjs.com/package/walk), and [klaw](https://www.npmjs.com/package/klaw). However in this post I will be writing about how to go about doing so with just the node.js build in file system modules [readdir method](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_readdir_path_options_callback), along with some others a well.

<!-- more -->

## 1 - before continuing

This is a post on using the [readdir method](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_readdir_path_options_callback) in the [node.js file system module](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html), along with additional node.js core methods to make a basic file system walker. There are additional ways of doing this, not to mention many npm packages that can be just quickly used to get this done, and move on.

### 1.1 - I am not recommending that this is the best (or worst) option.

I am not suggesting that using fs.readdir along with other node.js built in methods is the best way of going about making a file system walker. It may be better to go with streams, and better yet to just use one of the many walkers that are available to just be done with this, and move on with what the project is really about.

### 1.2 - Be sure to explore other options on this

I have [written a post](/2018/07/20/nodejs-ways-to-walk-a-file-system/) that aims to be a central post of sorts on file system walkers, be sure to check that out if you have not before hand to gain a better sense of what there is to work with when it comes to making a file system walker from the ground up, as well as the many other options when it comes to using one that has been made before hand.

## 2 - Basic example of fs.readdir

Basic use of fs.readdir is fairly straight forward just give the directory that you want to know the contents of as the first argument, and then a callback as the second that will give an error or an array of item names.

```js
let fs = require('fs');
 
fs.readdir(process.cwd(), (e,items)=>{
 
    console.log(items);
 
});
```

This by itself can obviously be used as a way to walk a file system, if it is used in a recursive way. To do that I will need to use more than just fs.readdir, because I need to know if an item in a name space is a file or directory. So A simple file walker solution will also need to involve fs.stat to gain more information about an item. Also Both of these methods will need to be used in a method that will be called recursively as well, so as to walk the whole file system rather than just the contents of a single file system name space.

## 2.1 - Crude single method recursive walker using fs.readdir, fs.stat, and Array.forEach

Maybe it world be helpful to start with a simple, crude single method example of a file system walker. One that just does everything in the body of a single method using just a few file system methods, calls itself recursively. Maybe it does not even have proper error handling, and is the beginning of a kind of callback hell, but might still work find as a kind of starting point.

```js
// just using fs, and path
let fs = require('fs'),
path = require('path');
 
// a simple walk method
let walk = function (dir) {
 
    // get the contents of dir
    fs.readdir(root, (e, items) => {
 
        // for each item in the contents
        items.forEach((item) => {
 
            // get the item path
            let itemPath = path.join(dir, item);
 
            // get the stats of the item
            fs.stat(itemPath, (e, stats) => {
 
                // Just log the item path for now
                console.log(itemPath);
 
                // for now just use stats to find out
                // if the current item is a dir
                if (stats.isDirectory()) {
 
                    // if so walk that too, by calling this
                    // method recursively
                    walk(itemPath);
 
                }
 
            });
 
        });
 
    });
 
};
 
walk(process.cwd());
```

So this is a good start, yes there are things going on that might give many developers a headache, but still the basic process is there. Start at a root name space, get the contents of that name space, for each item get the stats, preform an action for the item, and if it is a directory walk that as well.

The next step might be to break this process down, and start adding some more features, but the general idea is all ready there.

## 3 - A file system walker using fs.readdir

So for a more advanced example of making a file system walker using fs.readdir,  I thought I would start to break things down a bit, by pulling fs.readDir into a function that returns a promise, and do that with fs.stat as well.

### 3.1 - Making a readDir method that returns a promise

So I pulled fs.readdir into a method, and made it so that the method returns a promise. This will help improve error handing, and will also help reduce callback hell as well.

```js
let fs = require('fs'),
path = require('path');
 
// use fs.readDir to get the contents of the given dir
let readDir = (dir) => {
 
    return new Promise((resolve, reject) => {
 
        fs.readdir(dir, (e, contents) => {
 
            if (e) {
 
                reject(e)
 
            } else {
 
                resolve(contents);
 
            }
 
        });
 
    });
 
};
```

### 3.2 - Doing the same with fs.stat

I did the same with the method that will be used to read stats as well.

```js
// get the stats of the given item path
let readStats = (itemPath) => {
 
    return new Promise((resolve, reject) => {
 
        fs.stat(itemPath, (e, stats) => {
 
            if (e) {
 
                reject(e)
 
            } else {
 
                resolve(stats);
 
            }
 
        });
 
    });
 
};
```

### 3.3 - Methods for what to do for files, and dirs

In the more basic example I just looped over all items in a current folder, and for each item I just logged the path to the console after getting the states for it. In a real walker I will want to do more then just that, so I will want to have some way to defined a method that will be called for each item. For this method It would be nice to have some kind of api that can be accessed via the this keyword. The api would have relevant information about the current item, as well as additional things that are helpful when it comes to quickly reading the contents of the current file if needed.

So I have broken things down into two helper methods, one is a method that calls a forItem method. In this forItem method an api is set up, and an onItem method is called with the api as the value of the this keyword for the onItem method. This onItem method is given when I call the main walk method.

```js
// what to do for all items
let forAllItems = (opt, items) => {
 
    items.forEach((item) => {
 
        forItem(opt, item);
 
    });
 
};
 
// what to do for a single item
let forItem = (opt, item) => {
 
    let itemPath = path.join(opt.root, item);
 
    // read stats
    readStats(itemPath).then((stats) => {
 
        // the api
        let api = {
 
            opt: opt,
            fs: fs,
 
            // read file convenience method
            read: function (cb) {
 
                let api = this;
 
                return fs.readFile(api.item.path, (e, data) => {
 
                    if (e) {
 
                        cb(e, null);
 
                    }
 
                    if (data) {
 
                        let ext = api.item.ext;
 
                        if (ext === '.js' || ext === '.html' || ext === '.css') {
 
                            data = data.toString();
 
                        }
 
                        cb(null, data);
 
                    }
 
                });
 
            },
            item: {
 
                path: itemPath,
                filename: item,
                ext: path.extname(item).toLowerCase(),
                isDir: stats.isDirectory()
 
            }
 
        };
 
        opt.onItem.call(api, api.item);
 
        // find next level
        let nextLevel = opt.level + 1;
 
        // if level is less than maxLevel, or the no maxLevel flag of -1 is set
        if (opt.level < opt.maxLevel || opt.maxLevel === -1) {
 
            // if dir
            if (stats.isDirectory()) {
 
                walk(Object.assign({}, opt, {
                        root: itemPath,
                        level: nextLevel
                    }));
 
            }
 
        }
 
    }).catch ((e) => {
 
        opt.onError.call(opt, e, item);
 
    });
 
};
```

I included references to the fs module, as well as a read method that can quickly be used to read the contents of the current item.

### 3.4 - The walk method

So then there is also of course the main walk method that is what will be called to start a file system walk. I can just give a string that is the root path to start walking, and then a single onItem method if I want. If I want to take advantage of more advanced options I can also give just an object with all options, and methods that are to be used as well.

```js 
// walk
let walk = (opt, onItem, onError) => {
 
    // if opt is a string
    if (typeof opt === 'string') {
 
        opt = {
 
            root: opt
 
        };
 
    }
 
    opt = opt || {};
    opt.root = path.resolve(opt.root || process.cwd());
    opt.level = opt.level === undefined ? 0 : opt.level;
    opt.maxLevel = opt.maxLevel === undefined ? -1 : opt.maxLevel;
    opt.onItem = opt.onItem || onItem || function (item) {
        console.log(item);
    };
    opt.onError = opt.onError || onError || function (e) {
 
        console.log(e);
 
    };
 
    // read dir, and call forAll items
    readDir(opt.root).then(function (items) {
 
        forAllItems(opt, items);
 
    }).catch ((e) => {
 
        opt.onError.call(opt, e);
 
    });
 
};
```

### 3.5 - Basic use case example

So I can start a file system walk by just giving a root path, and then a method that will be called for each item.

```js
walk('./', function (item) {
 
    console.log('level: ' + this.opt.level + ' : ' + item.filename);
 
});
```

### 3.5 - Read file example

I put in a read file method that can be used to quickly get the contents of a file.

```js
walk('./', function (item) {
 
    // only log javaScript files
    if (item.ext === '.js') {
 
        this.read(function (e, js) {
 
            if (js) {
 
                console.log(js);
 
            }
 
        });
 
    }
 
});
```

The way I have it designed I will need to make sure it is a file first by checking the file extension. However you get the idea, anything that would work well as part of the api can go there. I could go in a direction in which I can make a custom file system walker that will work different depending on the project. For example if I am making a walker that will be working closes with markdown files I can add methods that can be used to parse markdown to html, and plain text, as well as preform other relevant actions.

### 3.6 - Using the options object example

It is also possible to use the walker by giving an object as just one argument, and then make full use of all options.

```js
walk({
 
    root: './',
    maxLevel: 0,
    onItem: function (item) {
 
        console.log('********** item **********');
        console.log(this.opt);
        console.log(this.item);
        console.log('********** **** **********');
 
    },
    onError: function (e, item) {
 
        console.log('********** ERROR **********');
 
        console.log(e.message);
 
        if (item) {
 
            console.log(item);
 
        }
 
        console.log('********** ***** **********');
 
    }
 
});
```

For now there are just options for setting the level of recursion, however I could add many more options for filtering, and having more than just the onItem callback.

## 4 - Conclusion

I hope this post has helped you gain some insight of how to make a node.js file system walker with fs.readdir, there are many more ways to go about doing this within node.js by itself, but this way seems to work okay for me. It might be a better choice however to look into some popular solutions for file system walking in node.js thought as well, as such be sure to check out [my main post on this subject](/2018/07/20/nodejs-ways-to-walk-a-file-system/) before starting work on making your own walker.