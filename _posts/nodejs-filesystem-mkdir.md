---
title: fs mkdir file system method in nodejs
date: 2019-06-19 13:43:00
tags: [node.js]
layout: post
categories: node.js
id: 482
updated: 2019-11-19 11:06:06
version: 1.8
---

So when it comes to making a new folder in nodejs there is the [fs mkdir](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback) method that can be used to make a folder. If I just want to make a single folder at a given root folder, then the process of doing so is fairly easy with the core node file system module by itself.

There is however how to go about making a whole bunch of folders recursively just like that of the mkdirp command in posixs systems. When it comes to that I could use the child process module as a way to call that external command, but still there should be a way to do so in nodejs.

So in this post I will be going over the fs mkdir method in node in the file system module that can be used to create a new folder in nodjes, and branch off into some other related topics when it comes to making nested folders and so forth linking to other posts where doing so is called for when it comes to npm packages.

<!-- more -->

## 1 - node mkdir basic examples

So lets start off this post with some simple fs mkdir examples in nodejs. The mkdir method can just be used by itself callback style as a way to use the method, and have it work on a wide range version range of nodejs. However these days I would recommend doing something to ensure that the method will return a promise when called by using a npm package to do so, or the built in method in the util module that will work with all modern versions of node that I use at least (8.x+)

So lets look at some examples of this.

### 1.1 - Basic callback style examples of fs mkdir

Here I have a Basic callback style example of the fs mkdir method. This will work on just about any version of node I thing, if not you must be using a crazy old version that is no longer supported.

```js
var fs = require('fs'),
path = require('path');
fs.mkdir(path.join(process.cwd(), 'test'), function (e) {
    if (e) {
        console.log(e)
    } else {
        console.log('created test folder');
    }
});
```

This might work okay for simple examples like this, but it is generally a good idea to work the use of promises into a project to help keep things more organized.

When I call this example it works as expected, creating a new test folder in the current working path where I called the file. It does so the first time at least, any additional calls will result in an error, because the folder is there to begin with.

### 1.2 - Using promisify with fs mkdir

Here we have another example this time using the [util promisify](/2019/06/22/nodejs-util-promisify/) method to make a new method that will return a promise as a way to handy what to do when the process of making a folder works, and what to do when there is a problem.

```js
var fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
mkdir = promisify(fs.mkdir);
 
mkdir(path.join(process.cwd(), 'test'))
.then(() => {
    console.log('created test folder');
})
.catch((e) => {
    console.log(e);
});
```

## 2 - fs mkdir and making folders recursively

Say you want to use mkdir to make a full path if it is there or not, rather than just one folder at a time. Also say that you want to make it so the method will work on older versions of nodejs, before doing so was very simple. There is mush to write about when it comes to what is available in user space which it comes to npm packages such as [mkdirp](/2017/11/14/nodejs-mkdirp/), and [fs-extra](/2018/01/08/nodejs-fs-extra/) when it comes to adding this functionality to a project.

Looking over the source code of mkdirp the basic idea might look something like this:

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

If you are using a late version of nodejs (10.x or later), and you do not care about supporting older versions of node, then using something like this is redundant as the recursive functionality is now baked into nodejs itself.