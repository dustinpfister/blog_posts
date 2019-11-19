---
title: fs mkdir file system method in nodejs
date: 2019-06-19 13:43:00
tags: [node.js]
layout: post
categories: node.js
id: 482
updated: 2019-11-19 10:00:37
version: 1.2
---

So when it comes to making a new folder in nodejs there is the [fs mkdir](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback) method that can be used to make a folder. There is also how to go about making a whole bunch of folders recursively, depending on the version of node that you are using doing so can be very simple, or a little hard.

<!-- more -->

## 1 - fs mkdir and making folders recursively

Say you want to use mkdir to make a full path if it is there or not, rather than just one folder at a time. Also say that you want to make it so the method will work on older versions of nodejs, before doing so was very simple. There is mush to write about when it comes to what is available in user space which it comes to npm packages such as mkdirp, and fs-extra when it comes to adding this functionality to a project.

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