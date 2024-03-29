---
title: Making a Simple build tool in nodejs
date: 2021-09-17 08:45:00
tags: [node.js]
layout: post
categories: node.js
id: 929
updated: 2021-09-17 16:58:53
version: 1.26
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

At which point I can then call the main index file with node to build the demo project folder, or use the build-tool.js file in another script. If I want to make this part of a larger project I will just need to make sure that I make uglify.js part of the dependencies in the package.json file.

## 2 - The build-tool.js library

So there is starting out by going over the main library of interest when it comes to this build tool thus far then maybe writ a thing or two about supporting files beyond that of the single dependency of this tool. The basic process that I have in mind here is that there should be a build-conf.json file located at a root folder of a project folder. This build-conf.json file is where I can then set what the root path is as far as the build tool is concerted, and then all kinds of other relevant paths that are relative to that set root path. This json file will also contain an array of relative paths to each source code file that is to be combined into the various forms of files javaScript files in the dist folder. So then there is having a kind of read conf public method that is used to load this file and create an options object that can then be used with additional methods to create a dist object, and to write that dist object to a dist folder.

The create source public method is a way to go about creating the first raw state of the source code to create files with. What this method needs to do is to just use the root path, and array of source code paths to read each source code file, and concatenate each of them into a single javaScript string. This is achieved by making use of the [promise all method](/2019/06/24/js-promise-all/), and the [array map](/2020/06/16/js-array-map/) prototype method, along with array join. The promise all method will return a promise that will only resolve once all the values that are given in an array will resolve or reject that are promises. So I give the promise all method the result of calling the array map method off of the array of relative paths creating a readFile promise for each path. The end result is then an array fo strings where each string is the javaScript text of each javaScript file. The last step then is to just simply join this array of strings together into a single string.

Once I have a source code string I can then create an options object that can be used to create a dist object. This will be the last kind of options object to make that can then be passed to a method that will use off of this to create the dist folder. Speaking of that last method that would be the write dist method that takes this dist objects object and uses that to write both a developer form and minified form of the files in a dist folder relative to the root path.

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
    let opt = {};
    return readFile(uri, 'utf8')
    .then((text) => {
        let conf = {};
        // try to parse JSON
        try{
            conf = JSON.parse(text);
        }catch(e){}
        // set up opt with what is in JSON or hard coded default
        // RESOLVE opt.dir_root TO AN ABSOLUTE PATH from the location of the conf.json file
        opt.dir_root = path.resolve( path.join( path.dirname(uri), conf.dir_root)) || process.cwd();
        // RESOLVE opt.dir_target TO AN ABSOLUTE PATH from opt.dir_root
        opt.dir_target = path.resolve( path.join( opt.dir_root, conf.dir_target || './dist') );
        opt.fileName = conf.fileName || 'file';
        opt.version = conf.version === undefined ? '' : conf.version;
        opt.sourceFiles = conf.sourceFiles || [];
        // top and bottom strings
        opt.top = conf.top || '';
        opt.bottom = conf.bottom || '';
        return readFile( path.join(opt.dir_root, 'package.json') );
    })
    .then((packageText)=>{
        let pkg = {};
        // try to parse JSON
        try{
            pkg = JSON.parse(packageText);
        }catch(e){}
        opt.version = pkg.version || opt.version;
        opt.author = pkg.author || '';
        // append version folder to dir_target
        if(opt.version){
            opt.dir_target = path.join(opt.dir_target, opt.version);
        }
        return opt;
    }).
    catch((e) => {
        return opt;
    });
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
        fileName : opt.fileName || 'file',
        dir_root: opt.dir_root || process.cwd(),
        // dist.dir_target should be a realtive path from opt.dir_root
        dir_target: opt.dir_target, //path.join(opt.dir_root, opt.dir_target || 'dist'),
        sourceCode : opt.sourceCode || '',
        minCode : '',
        top: opt.top || '',
        bottom: opt.bottom || '',
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
    let dir_target = path.join( dist.dir_target );
    // first make sure the target folder is there
    return mkdirp.promise(dir_target)
    // write the dev version
    .then(() => {
        let text = dist.top + dist.sourceCode + dist.bottom;
        return writeFile( path.join( dir_target, dist.fileName + '.js' ), text, 'utf8' );
    })
    // write the min version
    .then(()=>{
        let text = dist.top + dist.minCode + dist.bottom;
        return writeFile( path.join( dir_target, dist.fileName + '.min.js' ), text, 'utf8' );
    }).
    then(()=>{
        return dist;
    });
};
 
// build by passing a uri to conf
api.build = function(uri_build_conf){
    let opt = {};
    // start by reading the json file
    return api.readConf(uri_build_conf)
    // append build-conf.json values to opt and create source
    .then((conf)=>{
        opt = Object.assign(opt, conf);
        return api.createSource(opt);
    })
    // append opt.sourceCode and create dist options by calling createDist
    // then write dist
    .then((source)=>{
        opt.sourceCode = source.code;
        let dist = api.createDistObj(opt);
        return api.writeDist(dist);
    });
};
 
module.exports = api;
```

However when it comes to just calling one method to do everything and be done with it that would be the one at the very bottom. I have a buildTool.build method to which I can pass the uri to the build-conf.json file that I want to use, and if all goes well that should be the end of it when it comes to creating a build.

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
// the uri of the file
let uri_build_conf = process.argv[2] ||  path.join(process.cwd(), 'build-conf.json');
// build
buildTool.build(uri_build_conf)
.then((dist) => {
    console.log('dist folder created : ');
    console.log('path: ' + dist.dir_target);
})
.catch((e) => {
    console.log(e);
});
```

## 5 - A demo folder

Now to go over a quick demo folder for the sake of just testing out if this works or not. The demo that I made for the project just consists of two javaScript files on of which is a crude game module, and the older is a main loop that makes use of it.

### 5.1 the build-conf.json file

Here then is the build-conf.json file thatI made for this demo.

```json
{
  "fileName": "test_script",
  "dir_root": "./",
  "dir_target": "./dist",
  "topString": "",
  "bottomString": "",
  "sourceFiles": [
     "./src/game.js", "./src/main.js"
  ],
  "top": "(function(){\n\n",
  "bottom": "\n}());"
}
```

### 5.2 - The /src/game.js and /src/main.js files

The game.js and main.js source code files are then as follows.

```js
var gameMod = (function () {
    // public API
    var api = {};
    // a pubic API method
    api.create = function () {
        return { count: 1 };
    };
    api.update = function(game){
        game.count += 1;
    };
    // return the public api
    return api;
}
    ())
```


```js
// create game state
var game = gameMod.create();
// main app loop
var loop = function(){
    setTimeout(loop, 1000);
    gameMod.update(game);
    console.log(game.count);
};
loop();
```

### 5.3 - The output

When I then run the index.js file in root and give the location of the build-conf.json file as the first and only argument then result is then a dist folder with the following output files.


test_script.js

```js
(function(){
 
var gameMod = (function () {
    // public API
    var api = {};
    // a pubic API method
    api.create = function () {
        return { count: 1 };
    };
    api.update = function(game){
        game.count += 1;
    };
    // return the public api
    return api;
}
    ())
// create game state
var game = gameMod.create();
// main app loop
var loop = function(){
    setTimeout(loop, 1000);
    gameMod.update(game);
    console.log(game.count);
};
loop();
 
}());
```

test_script.min.js

```js
(function(){

var gameMod=function(){var o={create:function(){return{count:1}},update:function(o){o.count+=1}};return o}(),game=gameMod.create(),loop=function(){setTimeout(loop,1e3),gameMod.update(game),console.log(game.count)};loop();
}());
```

So thenso far so good it would seem that this built tool is working more or less as expected.

## 6 - Conclusion

That is it for now when it comes to this simple build tool, that is until I come around to edit and expand this post a bit more at some point in the future. Thus far the tool is all ready working for what I want and need this sort of thing for, and the rest of the work to do has more to do with further refining the features in place rather than adding additional features.

One major project that I might use this with is this [game framework that I have been working on lately](https://github.com/dustinpfister/game-framework-clucker). As of this writing I have not yet added some kind of build script to create a dist folder for the project folder, however that is the plan when it comes to this sort of thing. When I use this project with that I will likely make a copy of the source code in the node folder of that repository, and when I do so it is possible that I will add some additional features as needed. I then might add some of those future features that may or may not happen to the state of this project. However I would like to not go nuts with features with this one, as it is a node simple series project.



