---
title: Making a path that may or may not be there in node.js thanks to mkdirp
date: 2017-11-14 12:39:00
tags: [js,node.js,blog,linux]
layout: post
categories: node.js
id: 92
updated: 2018-02-20 18:49:20
version: 1.2
---

When making some kind of CLI tool in node.js there is often a need to test if a certain path exists, and if it does do nothing, else make the path. In Linux there is givinh the parrents argument to the mkdir command like this:

```
$ mkdir -p foo/bar
```

But what if I need to do that but with node.js? For this there is the npm package [mkdirp](https://www.npmjs.com/package/mkdirp).

<!-- more -->

## Basic use example

Start by making it part of the project it it is not there all ready.

```
$ npm install mkdirp --save
```

Then making a path if it is not there is as simple as this:

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

## fs-extra as an Alternative to mkdirp

mkdirp is great if making a path if it is not there to begin with is all that you care about, however if you are looking for something that will do this, as well as extend and improve the built in node.js file system module, [check out fs-extra](/2018/01/08/nodejs-fs-extra/). In fs-extra a method called fs.ensureDir is added that does the same thing as mkdirp. In addition each file system method returns a promise, but you can also use callbacks as well.


## conclusion

Ensuring that path is there if it is not is a pretty common task in most projects, if you are not using mkdirp, make sure that you are using some kind of solution for this task.