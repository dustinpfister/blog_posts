---
title: A simple Node file generator example
date: 2019-09-23 13:48:00
tags: [node.js]
layout: post
categories: node.js
id: 538
updated: 2022-07-29 14:01:20
version: 1.10
---

So way back I made a [post on a simple node static web sever](/2017/12/04/nodejs-simple-static-sever-file/) that is a subject that seems to come up now and then. Sense then I have not really continued with posts like that which have to do with making [very simple versions](https://nodejs.org/en/docs/guides/getting-started-guide/) of basic actual projects when [getting started with node](/2017/04/05/nodejs-helloworld/). than simple demo like scripts for just one little native method or npm package with nodejs development. So I thought it would be a nice change of pace to start making a few more posts like that, starting with this one that has to do with just making a simple file generator.

<!-- more -->

## 1 - The simple node file generator overview

All I need for this simple node project to do is create a path of the path does not exsit, and then write some given data to a file in the path that is also given file the path name. I would want to project to return a main method that can be require into other scripts. This main method can then be given an object that will contain just a file path string, and then also another key that contains the data to be written to that path once it has been created if it is not there.

## 2 - The simple node project setup

For this project I am just using one npm package called [mkdirp](/2017/11/14/nodejs-mkdirp) that I am using for just the one method that is returned when requiring it into a script. This method makes quick work of creating a path if it is not there to begin with, a feature that is in many other file io frameworks, but for this one I just need that only.

So the basic setup looks like this then

```
$ mkdir file-gen
$ cd file-gen
$ npm init
$ npm install mkdirp --save
```

Once I have my project folder set up it is not tile to work out the main index.js file for the project. For this it will be just one file for the sake of keeping things real simple. If you are interest I also have a github repository set up for what I am working [out here](https://github.com/dustinpfister/nodejs-simple-file-generator).

## 3 - The Simple node file generator main index.js file

So then in this section I will be going over the index.js file of the project. In here I am using the mkdirp method that I made the only dependency of course, and on top of that I am also using a few nodejs build in modules also. I am using the built in nodejs [file system module](/2018/02/08/nodejs-filesystem/), and I am also using the [util module to promisify](/2019/06/22/nodejs-util-promisify/) the write file method of the file system module as well as mkdirp. I am also using the [path module](/2017/12/27/nodejs-paths/) as a way to make sure that I am working with an absolute path as well as a way to strip that dir part of a path form a full path to what will be a file with the path dirname method.

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

The gen file method will create a filePaths dirname that is the full dirname minus the file name part if the path is not there thanks to mkdirp. The use of mkdirp will return a promise because of the use of the util promisify method, so if all goes well with creating the path I wil then also write the file with the given data.

## 4 - Demos

So now that I have my simple node file generator worked out I can now use it with some simple examples just to make sure that it works as expected.

So a single file can be created like this:

```js
let genFile = require('./index.js');
 
genFile({
    path: './test/foo.md',
    data: 'This is the foo data'
})
.then(() => {
    console.log('generated file');
})
.catch((e) => {
    console.log(e.message);
});
```

And a collection of files can be created like this:

```js
let genFile = require('./index.js');
 
genFile([{
    path: './test/2019/01/index.html',
    data: '<p>This is a foo page</p>'
},
{
    path: './test/2019/02/index.html',
    data: '<p>This is a bar page</p>'
}])
.then(() => {
    console.log('generated file');
})
.catch((e) => {
    console.log(e.message);
});
```

These scripts work as expected so it looks like it is a done deal for what I has in mind. This project could now be made into a public npmjs project which I might do at some point. Of course these simple examples do not reflect any kind of real project one thing that comes to mind is some kind of static site generator where I am building a site with templates markdown and other assets. A simple node file generator such as this could be a small part of a project like that.

## 5 - Conclusion

So this was a fun little project to work out as an example of how to make a simple node project example. I would like to work out many other little projects like this that have to do with all kinds of little tasks like this.