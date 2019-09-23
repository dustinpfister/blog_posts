---
title: A simple Node file generator example
date: 2019-09-23 13:48:00
tags: [node.js]
layout: post
categories: node.js
id: 538
updated: 2019-09-23 16:37:44
version: 1.1
---

So way back I made a post on a simple static web sever using nodejs. Sense then I have not really continued with posts that have to do with making very simple versions of basic actual projects rather than simple demo like scripts for just one little native method or npm package with nodejs development. So I thought it would be a nice change of pace to start making a few more posts like that, starting with this one that has to do with just making a simple file generator.

<!-- more -->

## 1 - The simple node project setup

For this project I am just using one npm package called [mkdirp](/2017/11/14/nodejs-mkdirp) that I am using for just the one method that is returned when requiring it into a script. This method makes quick work of creating a path if it is not there to begin with, a feature that is in many other file io frameworks, but for this one I just need that only.

So the baic setup looks like this then

```
$ mkdir file-gen
$ cd file-gen
$ npm init
$ npm install mkdirp --save
```

Once I have my project folder set up it is not tile to work out the main index.js file for the project. For this it will be just one file for the sake of keeping things real simple.

## 2 - The Simple node file generator main index.js file

So then in this section I will be going over the index.js file of the project. In here I am using the mkdirp method that I made the only dependency of course, and on top of that I am also using a few nodejs build in modules also.

```js
let fs = require('fs'),
util = require('util'),
path = require('path'),
writeFile = util.promisify(fs.writeFile),
mkdirp = util.promisify(require('mkdirp'));
 
// the genFile method
let genFile = (filePath, data, options, forGen) => {
    // make path absolute
    filePath = path.resolve(filePath);
    // using given options or these defaults
    options = options || {
        encoding: 'utf8',
        mode: 0o666,
        flag: 'w'
    };
    forGen = forGen === undefined ? (filePath, data) => {
        console.log('\u001b[32m' + 'genFile: ' + filePath + '\u001b[39m');
    }: forGen;
    // mkdirp the path to the file
    return mkdirp(path.dirname(filePath))
    // then write the data to the file
    .then(() => {
        return writeFile(filePath, data, options);
    })
    // call forGen
    .then(() => {
        forGen(filePath, data)
    })
};
 
// the main method
module.exports = (fileObjects, options, forGen) => {
    // if Array call genFile for each fileObject
    if (Array.isArray(fileObjects)) {
        return Promise.all(fileObjects.map((fileObj) => {
                return genFile(fileObj.path, fileObj.data, options, forGen);
            }));
    }
    // else just call genFile once for the single FileObject
    return genFile(fileObjects.path, fileObjects.data, options, forGen)
};
```