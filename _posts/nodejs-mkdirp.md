---
title: Making a path that may or may not be there in node.js thanks to mkdirp
date: 2017-11-14 12:39:00
tags: [js,node.js,blog,linux]
layout: post
categories: node.js
id: 92
updated: 2019-06-19 11:57:47
version: 1.5
---

When making some kind of CLI tool in node.js there is often a need to test if a certain path exists, and if it does do nothing, else make the path. There are ways of doing so with just plain old vanilla javaScript in node.js itself, there are also many user land projects that bring this functionality along with much more to node.js such as with fs-extra. However if you are looking for a user land npm package that just provides this kind of functionality to node.js then there is the npm package [mkdirp](https://www.npmjs.com/package/mkdirp).

<!-- more -->

## 1 - Mkdirp basics 

In Linux there is giving the parents argument to the mkdir command like this:

```
$ mkdir -p foo/bar
```

But what if I need to do that but with node.js? Well there is using the child process module to just call the command that way. However what if you want things to be more cross platform, including platforms that do not have mkdirp installed out of the box? To solve that problem the functionality of mkdirp will need to exists in some kind of javaScript like form. It is possible to take the time to write such a method, but why bother doing that when there is all ready the npm package mkdirp? So lets take a quick look at this npm package.

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

Just pass the relative or absolute path at which you want the path created if it is not there, followed by a callback that will fire once the path is created or found to exist.

## 3 - fs-extra as an Alternative to mkdirp

mkdirp is great if making a path if it is not there to begin with is all that you care about, however if you are looking for something that will do this, as well as extend and improve the built in node.js file system module, [check out fs-extra](/2018/01/08/nodejs-fs-extra/). In fs-extra a method called fs.ensureDir is added that does the same thing as mkdirp. In addition each file system method returns a promise, but you can also use callbacks as well.


## 4 - conclusion

Ensuring that path is there if it is not is a pretty common task in most projects, if you are not using mkdirp, make sure that you are using some kind of solution for this task.