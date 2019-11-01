---
title: A node cli project file system walker example
date: 2019-10-21 20:30:00
tags: [node.js]
layout: post
categories: node.js
id: 548
updated: 2019-10-31 20:47:37
version: 1.10
---

So for todays [node cli](/2019/10/23/nodejs-cli/) tool example I will be writing about a basic file system walker that I have put together for this series of posts. I have wrote a few posts on file system walkers such as klaw, and just simply walk, as well as the many native nodejs module methods that can be used to make a file system walker from the ground up. This is a post on making node cli tools so for todays post I will be making a file system walker using the node file system method like readdir, stat, and so forth.

<!-- more -->

## 1 - node cli walk command example

This is an example of a basic file system walker that can be used from the command line. The idea of the project is to have a command that I can call from the command line where I pass a target folder to walk, and a script that I would like to apply for each file found in that target folder. This command example is one of many node cli examples that I have made for my node\_cli\_tools project that I am working on these days. This command line interface tool, along with many others is still a work in progress along with everything else in the project.

If you would like to reproduce what I am writing about here you might want to start with my main post on the node\_cli\_tools project, as well as check out the repo itself where you can just clone it down, install it globally,  and be done with it. 

I assume that you have a fair amount of experience with javaScript, node.js, and many of the frameworks that I am using in the core of the project. If not covering all of that is outside the scope of this post.


## 2 - The /bin/walk/index.js file

The index.js file for the nc-walk command of my node\_cli\_tools project uses yargs to parse options for the command, as with all my other commands in this project. This is the script that will run first when the nc-walk command is used, so that is what I have the nodejs shebang at the top of the file.

```js
#!/usr/bin/env node

require('yargs')
.command(require('./commands/default.js'))
.argv;
```

So with that out of the way lets move on to the default.js file that contains the rest of the logic for the single default command.

## 3 - The /bin/commands/default.js file

So here I have the default command module for the nc-walk node cli tool example. The builder object of the command outlines the options for the command. The t option is for the target folder to walk, there is a recursive option, and of course a s option to set the script to run for each file in the target folder.

```js
exports.command = '*';
exports.aliases = ['w'];
exports.describe = 'walk command';
 
exports.builder = {
    // target folder to walk
    // default to current working dir
    t: {
    default:
        process.cwd()
    },
    // recursive
    r: {
    default:
        false
    },
    // path to a script that contains
    // a for file method to fire for
    // each file
    s: {
    default:
        false
    },
    // api (data passed via JSON if using command)
    a: {
    default:
        false
    }
};
exports.handler = function (argv) {
 
    let api = {};
 
    // try to load JSON data passed via a option
    try {
        api = JSON.parse(JSON.stringify(argv.a));
    } catch (e) {
        api = {};
    }
 
    require('../../../shared/lib/walk/walk.js')({
        dir: argv.t,
        recursive: argv.r,
        scriptPath: argv.s,
        api: api
    });
};
```

The handler calls the main method of the walk.js shared lib that I have worked out for the nc-walk command, as well as file system walking in general for every command in the project. So now it is just a question of taking a look at that module, and that is all here is to this command.

## 3 - The /shared/lib/walk/walk.js file

So here is the state of my walk.js module as of this writing at least. The general idea here is that I have a walk method that is called just once for the contents of a folder without following any nested folders, but can also be called recursively.

```js
let fs = require('fs'),
path = require('path');
// walk method
let walk = (opt) => {
    // options
    opt = opt || {};
    opt.dir = opt.dir || process.cwd();
    opt.forFile = opt.forFile || function (api, item, next) {
        console.log('');
        console.log('fileName: ' + item.fileName);
        console.log('path: ' + item.path);
        console.log('size: ' + item.stat.size);
        console.log('');
        next();
    };
    opt.api = opt.api || {};
    opt.recursive = opt.recursive || false;
    opt.dirMode = opt.dirMode || false;
    opt.onDone = opt.onDone || function () {};
    opt.start = opt.start === undefined ? true: opt.start;
    // readNext
    let i = 0;
    let readNext = (files) => {
        let fileName = files[i];
        if (i < files.length) {
            let item = {
                fileName: fileName,
                path: path.join(opt.dir, fileName)
            };
            fs.stat(item.path, (e, stat) => {
                i += 1;
                item.stat = stat;
                if (stat.isDirectory()) {
                    if (opt.recursive) {
                        walk(Object.assign({}, opt, {
                                dir: item.path,
                                start: false
                            }));
                    }
                    if(opt.dirMode){
                        opt.forFile(opt.api, item, function () {
                            readNext(files);
                        });
                    }else{
                        readNext(files);
                    }
                } else {
                    //item.stat = stat;
                    opt.forFile(opt.api, item, function () {
                        //console.log(i / files.length, opt.start, opt.dir);
                        if( i / files.length === 1 && opt.start){
                            opt.onDone();
                        }
                        readNext(files);
                    });
                }
            });
        }
    };
    // read dir
    fs.readdir(opt.dir, (e, files) => {
        if (files) {
            readNext(files);
        }
    });
};
// load a forFile Script
let loadScript = (filePath) => {
    // a filePath must be given
    if (!filePath) {
        console.warn('no vaild file path given for a forFile method script. Running built in ForFile method.');
        return Promise.reject(new Error('no vaild script path'));
    }
    return new Promise((resolve, reject) => {
        try {
            let forFile = require(path.resolve(filePath));
            // Must be a function or an object with a forFile method
            if (typeof forFile != 'function') {
                if (!forFile.forFile) {
                    reject(new Error('If not a function must be an object with at least a forFile method'));
                }
            }
            resolve(forFile);
        } catch (e) {
            reject(e);
        }
    });
};
// The public API starting with the main methods used by nc-walk
let api =  (opt) => {
    opt = opt || {};
    opt.beforeWalk = opt.beforeWalk || function (next, opt) {
        next();
    };
    opt.api = opt.api || {};
    // load forFile
    loadScript(opt.scriptPath)
    // deal with forFile script
    .then((forFile) => {
        // assume just an object and merge
        opt = Object.assign(opt, forFile);
        // if just a function with no forFile prop
        if (typeof forFile === 'function' && !forFile.forFile) {
            opt.forFile = forFile;
        }
        // if given bolth use bolth
        if (typeof forFile === 'function' && forFile.forFile) {
            opt.forFile = function (item, next) {
                forFile(opt.api, item, next);
                forFile.forFile(opt.api, item, next);
            };
        }
        // dir option in for file scripts is relative to the forFile script
        if (forFile.dir) {
            let dir_forFile = path.dirname(path.resolve(opt.scriptPath));
            opt.dir = path.join(dir_forFile, opt.dir);
        }
        return Promise.resolve(opt);
    })
    .catch(() => {
        // resolve anyway use defaults
        return Promise.resolve(opt);
    })
    // walk
    .then((opt) => {
        // call onDone once on process exit
        process.on('exit', function () {
            opt.onDone();
        });
        opt.beforeWalk(function () {
            walk(opt);
        }, opt);
    });
};
//export walk and loadScript
api.walk = walk;
api.loadScript = loadScript;
// export the api
module.exports = api;
```