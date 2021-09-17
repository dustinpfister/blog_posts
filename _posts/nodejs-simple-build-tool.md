---
title: Making a Simple build tool in nodejs
date: 2021-09-17 08:45:00
tags: [node.js]
layout: post
categories: node.js
id: 929
updated: 2021-09-17 09:58:59
version: 1.13
---

This week I put together a quick simple build tool solution that I might used in one or more of my nodejs projects. There are of course many popular projects that are this kind of tool that I could just use and move on with, but some times I do just like to make my own solutions for things. 

There are at least two general features that I think a build tool should do when making some kind of javaScript project. One feature is to just simply concatenate two or more source code files into a single string value and write that string file to a development form of a final package of the project. The other major feature is to do more or less the same as the first feature only to produce a minified version of the development form of the file. The first major feature is simple enough, all I have to do is loop over an array of relative paths to source code files to create a single string and then write that file. However the second feature is a little not so simple and will require some kind of library for minifying javaScript code.

Although I do tend to try to avoid using external user space projects when it comes to this series of nodejs examples, I have not got around to making my own simple javaScript tokenizer, let alone any kind of project that will minify javaScript code. At some point in the future I might get around to making my own project for that sort of thing, and try to keep it simple but for now I think I am going to have to just go with some kind of user space option. 

A few years back I wrote a post on a user space package for this sort of thing called [jsmin](/2017/08/18/nodejs-jsmin/), which is a tired yet true solution for minifying javaScript. It looks as though this project is not being maintained though as nothing has changed with the source code for over ten years. I am the kind of person that understands that that is not always such a bad thing, some times you have a project that is pretty darn solid, and still works great for a certain kind of task. However I decided to go with another popular well known option for this [called uglify.js](https://www.npmjs.com/package/uglify-js).

<!-- more -->

## 1 - Making a build tool in nodejs, and what to know first

This is a post on making a simple nodejs build tool that will create a development and minified form of finished javaScript library from a collection of smaller jaavScript source code files. The goal is to keep things simple here by not going to nuts with features and just making something that will just work for what is most important for this kind of project. However there are still a lot of things to know before hand when it comes to making even a simple nodejs project. If you are still fairly new to nodejs and javaScript I have posts on [getting started with nodejs](/2017/04/05/nodejs-helloworld/), as well as a few on [javaScript in general](/2018/11/27/js-getting-started/).


## 1.1 - The full source code that I am writing about here is on my github

The full and up to date source code of [this build tool can be found on my github account](https://github.com/dustinpfister/nodejs-simple-build-tool). I do get around to editing my content on this site now and then, but I have a whole lot of other posts that need to be edited outside of this one. Still the source code there might in some cases be a little better refined compared to what I am writing about here. Also it might be the best way to make use of this rather than copying and pasting source code from this post.

One way to quickly get this up and running then would be to do something like this

```
$ git clone --depth 1 https://github.com/dustinpfister/nodejs-simple-build-tool
$ cd nodejs-simple-build-tool
$ npm install
```

## 2 - The build-tool.js library

So there is starting out by going over the main library of interest when it comes to this build tool thus far then maybe writ a thing or two about supporting files beyond that of the single dependency of this tool. The basic process that I have in mind here is that there should be a build-conf.json file located at a root folder of a project folder. This build-conf.json file is where I can then set what the root path is as far as the buid tool is concerted, and then all kinds of other relevant paths that are relative to that set root path. This json file will also contain an array of relative paths to each source code file that is to be combined into the various forms of files javaScript files in the dist folder. So then there is having a kind of read conf public method that is used to load this file and create an options object that can then be used with additional methods to create a dist object, and to write that dist object to a dist folder.

```js
const UglifyJS = require("uglify-js"),
path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
mkdirp = require( path.join(__dirname, 'mkdirp.js') );
 
const api = {};
 
// read a build-conf.json file to produce an opt object for buildTool.createSource
api.readConf = (uri) => {
 
};
 
// return a promise that will resolve to an object with code and error properties
// using an options object created directly or with buildTool.readConf. The options
// object should have at least a dir_root, and sourceFiles array
api.createSource = (opt) => {
    opt = opt || {};
    // dir_root should be whatever is given. The buildTool.readConf method should resolve this
    // to an absolute path. When using this method directly you should have the freedom to set this
    // to any path value.
    opt.dir_root = opt.dir_root || process.cwd();
    // there should be a sourceFiles array that is an array of relative paths
    // from opt.dir_root to each source code file
    return Promise.all(opt.sourceFiles.map((uri_source)=>{
        return readFile( path.join(opt.dir_root, uri_source), 'utf8' );
    }))
    .then((codeArray) => {
        return {
            error: null,
            code: codeArray.join('')
        };
    }).catch((e)=>{
        return {
            error: e,
            code: ''
        };
    });
};
 
// create a dist object
api.createDistObj = (opt) => {
    opt = opt || {};
    // the starting dist object
    let dist = {
        dir_root: opt.dir_root || process.cwd(),
        // dist.dir_target should be a realtive path from opt.dir_root
        dir_target: path.join(opt.dir_root, opt.dir_target || 'dist'),
        sourceCode : opt.sourceCode || '',
        minCode : '',
        error: null
    };
 
    // try to use uglify.js and set dist.minCode or dist.error
    let ugly = UglifyJS.minify(dist.sourceCode);
    if(ugly.error){
        dist.error = ugly.error;
    }else{
        dist.minCode = ugly.code;
    }
    // return the dist object
    return dist;
};
 
// write th given dist object to the dist.dir_target path
api.writeDist = (dist) => {
    let dir_target = path.join( dist.dir_target, '0.0.0' );
    // first make sure the target folder is there
    return mkdirp.promise(dir_target)
    // write the dev version
    .then(() => {
        return writeFile( path.join( dir_target, 'file.js' ), dist.sourceCode, 'utf8' );
    })
    // write the min version
    .then(()=>{
        return writeFile( path.join( dir_target, 'file.min.js' ), dist.minCode, 'utf8' );
    });
};
 
module.exports = api;
```

## 3 - The mkdirp.js library

When it comes to making the dist folder I will need a way to make sure that the dist folder is created in the event that it is not there. In late versions of nodejs there may now be a native way of doing an mkdirp kind of creating of a path. However often whenI make these kinds of projects I like to push legacy support back more or less as far as I can. Even then going this sort of thing might not really be called for anymore as a recursive option is available for the native mkdir file system method for versions of node as old as 10.x.

Still I went with having a library for this just for the hell of it, and also to get the script to run on old versions of node.I have [wrote a post on mkdirp](/2017/11/14/nodejs-mkdirp/) that is on this old npm package that was used for this sort of thing in which I get into this topic in detail. 

```js
const fs = require('fs'),
path = require('path');
 
const mkdirp = {};
 
// mkdirp.cb(dir) : old cb style method by itself
mkdirp.cb = (p, cb) => {
    cb = cb || function() {} ;
    p = path.resolve(p);
    fs.mkdir(p, (e) => {
        if (!e) {
            cb(null);
        } else {
            if (e.code === 'ENOENT') {
                // if 'ENOENT' code error call mkdirp
                // again with the dirname of current dir
                mkdirp.cb(path.dirname(p), (e) => {
                    if (e) {
                        cb(e);
                    } else {
                        mkdirp.cb(p, cb);
                    }
                });
            } else {
                // if the folder is there, then we are good
                if(e.code === 'EEXIST'){
                    cb(null);
                }else{
                    // else some other error happed
                    cb(e);
                }
            }
        }
    });
};
 
// mkdirp.promise(dir) return a promise
mkdirp.promise = (p) => {
    return new Promise((resolve, reject)=>{
        mkdirp.cb(p, (e) => {
            if(e){
                reject(e);
            }else{
                resolve();
            }
        });
    });
};
 
module.exports = mkdirp;
```


## 4 - The index.js file at root

I then have a main index javaScript file at the root of the project folder. As one might expect this is the file that should be called when it comes to using the build tool as a command line tool, rather than that of a support library for another script.

```js
const path = require('path'),
buildTool = require( path.join(__dirname, 'lib/build-tool.js') );
 
let opt = {
    fileName: "test_script",
    dir_root: path.join(__dirname, 'demo'),
    dir_target: 'dist',
    sourceFiles: [
     "./src/file1.js", "./src/file2.js", "./src/file3.js"
    ],
    version: '0.0.0'
};
 
// create source
buildTool.createSource(opt)
// what to do with source object
.then((source)=>{
   opt.sourceCode = source.code;
   let dist = buildTool.createDistObj(opt);
   return buildTool.writeDist(dist);
})
.then((obj) => {
    console.log(obj);
})
.catch((e) => {
    console.log(e);
});
```

## 5 - Conclusion

That is it for now when it comes to this simple build tool, that is until I come around to edit and expand this post a bit more at some point in the future. Thus far the tool is all ready working for what I want and need this sort of thing for, and the rest of the work to do has more to do with further refining the features in place rather than adding additional features.

One major project that I might use this with is this [game framework that I have been working on lately](https://github.com/dustinpfister/game-framework-clucker). As of this writing I have not yet added some kind of build script to create a dist folder for the project folder, however that is the plan when it comes to this sort of thing. When I use this project with that I will likely make a copy of the source code in the node folder of that repository, and when I do so it is possible that I will add some additional features as needed. I then might add some of those future features that may or may not happen to the state of this project. However I would like to not go nuts with features with this one, as it is a node simple series project.



