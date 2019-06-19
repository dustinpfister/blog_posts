---
title: Making a path that may or may not be there in node.js thanks to mkdirp
date: 2017-11-14 12:39:00
tags: [js,node.js,blog,linux]
layout: post
categories: node.js
id: 92
updated: 2019-06-19 13:42:21
version: 1.9
---

When making some kind of CLI tool in node.js there is often a need to test if a certain path exists, and if it does do nothing, else make the path. There are ways of doing so with just plain old vanilla javaScript in node.js itself, there are also many user land projects that bring this functionality along with much more to node.js such as with fs-extra. However if you are looking for a user land npm package that just provides this kind of functionality to node.js then there is the npm package [mkdirp](https://www.npmjs.com/package/mkdirp).

<!-- more -->

## 1 - Mkdirp basics 

In Linux there is giving the parents argument to the mkdir command like this:

```
$ mkdir -p foo/bar
```

But what if I need to do that but with node.js? Well there is using the child process module to just call the command that way. However what if you want things to be more cross platform, including platforms that do not have mkdirp installed out of the box? To solve that problem the functionality of mkdirp will need to exists in some kind of javaScript like form. It is possible to take the time to write such a method, but why bother doing that when there is all ready the npm package mkdirp? So lets take a quick look at this npm package.

### 1.1 - mkdirp and newer versions of nodejs

In this post I am using nodejs 8.x LTS, this major release of nodejs is coming to and end when it comes to its support cycle. Although I have not fiddled with newer versions of node at the time of this writing it would appear that mkdirp style functionality is now baked into node itself in versions of node 10.x+.

## 2 - Basic use example of mkdirp in nodejs

So the mkdirp npm package is a user land nodejs package that must be added to a nodejs project. So then a basic example of mkdirp in nodejs will begin by making it part of the project if it is not there all ready.

```
$ npm install mkdirp --save
```

Then in the javaScript code of the project making a path if it is not there is as simple as this:

```js
var mkdirp = require('mkdirp');
    
mkdirp('/tmp/foo/bar/baz', function (err) {
    if (err){
        console.log(e);
    }else{
        console.log('we are good.')
    }
});
```

Just pass the relative or absolute path at which you want the path created if it is not there, followed by a callback that will fire once the path is created or found to exist. This is of course the async version of mkdirp that is provided, and will typically be what is used in mode cases. There is also however a Sync version of the method that is also provided.

## 3 - fs-extra as an Alternative to mkdirp

mkdirp is great if making a path if it is not there to begin with is all that you care about, however if you are looking for something that will do this, as well as extend and improve the built in node.js file system module, [check out fs-extra](/2018/01/08/nodejs-fs-extra/). In fs-extra a method called fs.ensureDir is added that does the same thing as mkdirp. In addition each file system method returns a promise, but you can also use callbacks as well.

## 4 - vanilla js Mkdirp alternative

So there is The idea of making ones own mkdirp method as an alternative to using the mkdirp package of any other additional framework that adds support for this and much more such as the case with fs-extra.

looking over the mkdirp source code the basic idea is something like this

```js

var fs = require('fs'),
path = require('path');
 
// mkdirp
var mkdirp = function (p, cb) {
    p = path.resolve(p);
    fs.mkdir(p, function (e) {
        if (!e) {
            cb(null);
        } else {
            if (e.code === 'ENOENT') {
                // if 'ENOENT' code error call mkdirp
                // again with the dirname of current dir
                mkdirp(path.dirname(p), function (e) {
                    if (e) {
                        cb(e);
                    } else {
                        mkdirp(p, cb);
                    }
                });
            } else {
                // else some other error happed
                cb(e);
            }
        }
    });
};
 
mkdirp('./test/foo/bar', function (e) {
    if (!e) {
        fs.writeFile('./test/foo/bar/baz.txt', 'okay', function () {
            console.log('wrote a file')
        });
    } else {
        console.log(e.message);
    }
});
```

## 5 - conclusion

Ensuring that path is there if it is not is a pretty common task in most projects, if you are not using mkdirp, make sure that you are using some kind of solution for this task. Many frameworks bring this kind of functionality, along with much more so be sure that adding this in is not redundant.