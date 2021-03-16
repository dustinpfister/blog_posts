---
title: Node copy directory example
date: 2020-03-19 11:12:00
tags: [node.js]
layout: post
categories: node.js
id: 631
updated: 2021-03-16 15:51:09
version: 1.10
---

This [nodejs example](/2021/03/16/nodejs-example/) post of mine will be on some javaScript code I put together for copying a directory. This might not be the best solution for all projects, but I am using some code to this effect in a project I am working on. There are [many other node copy options](https://www.npmjs.com/package/copy) out there on the web, many of which are packed with features that I will not use, I do not want, or I think should be pulled into another library. However in some respects they might also be a bit more robust compared to what I have worked out here.

<!-- more -->

## 1 - Log, copy, and mkdirp

before I get into the lib that is used to copy a directory I first want to go over the other files I have worked out for this node example. One of which is a way to define what logging is in place of using console.log, another is a lib that is used to copy just one file, and another is a rendition of mkdirp. All of these files will be used in the copy directory library that I will be going over in the next section.

### 1.1 - The log.js module

For this project I worked out a module that I am using for project wide logging. This allows for me to have better control over what is logged to the console. For example I can just comment out the code inside of the inner function, and that will make it so there is no logging at all for all modules. Another thing I can do is redefine what logging is, by using console.log rather than process.stdout.write, or logg to a file instead.

```js
let colors = {
    normal: '\u001b[37m',
    info: '\u001b[36m',
    success: '\u001b[32m',
    error: '\u001b[31m',
    reset: '\u001b[0m'
};
module.exports = (opt) => {
 
    opt = opt || {};
    opt.modName = opt.modName || false;
    opt.EOL = opt.EOL || '\n';
 
    return (data, type) => {
        type = type === undefined ? 'normal' : type;
        process.stdout.write(colors[type]);
        if (opt.modName) {
            process.stdout.write(opt.modName + ': ');
        }
        process.stdout.write(data + opt.EOL);
        process.stdout.write(colors.reset);
    };
 
};
```

I know this is a little off topic, but it was something else I was doing for this project, as this is something I find myself coming back to now and then.

### 1.2 - The copy module

Now for the copy module, this module exports a single method that can be used to copy just a single file by going a source and target path.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
log = require('./log.js')({
        modName: 'copy.js'
    });
 
let copy = function (source, target) {
    source = path.resolve(source);
    target = path.resolve(target);
    return readFile(source)
    .then((data) => {
        return writeFile(target, data);
    })
    .then(() => {
        log(source + ' > ' + target, 'success');
    })
    .catch((e) => {
        log(e, 'error');
    });
};
 
exports.copy = copy;
```

### 1.3 - mkdirp

Another library that I am using for this project is an mkdirp lib. This is a function that will make sure that a folder path exists if it is not there to begin with.

```js
let fs = require('fs'),
path = require('path');
 
let mkdirp = (p, cb) => {
    p = path.resolve(p);
    fs.mkdir(p, (e) => {
        if (!e) {
            cb(null);
        } else {
            if (e.code === 'ENOENT') {
                // if 'ENOENT' code error call mkdirp
                // again with the dirname of current dir
                mkdirp(path.dirname(p), (e) => {
                    if (e) {
                        cb(e);
                    } else {
                        mkdirp(p, cb);
                    }
                });
            } else {
                // else some other error happened
                if(e.code === 'EEXIST'){ // if folder is there we are good
                    cb(null);
                }else{
                    cb(e);
                }
            }
        }
    });
};
 
module.exports = (p) => {
    return new Promise((resolve, reject)=>{
        mkdirp(p, (e) => {
            if(e){
                reject(e);
            }else{
                resolve();
            }
        });
    });
}
```

## 2 - Copy dir

Now to get into the actually copy directory library now that I have covered the other files that it depends on. This library exports just one method called copyDir that takes a source path to a folder that is to be copied, and then a target path that the contents are to be copies too.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
stat = promisify(fs.stat),
readdir = promisify(fs.readdir),
 
copy = require('./copy.js').copy,
mkdirp = require('./mkdirp.js'),
log = require('./log.js')({
        modName: 'copydir.js'
    });
 
let copyDir = function (source, target) {
 
    source = path.resolve(source);
    target = path.resolve(target);
 
    log('making sure target folder ' + target + ' is there.', 'info');
    return mkdirp(target) // make sure target folder is there
    .then(() => { // read dir
        log('target folder good, reading source dir: ' + source, 'info');
        return readdir(source);
    })
    .then((items) => { // get dir stats
        log('reading stats for all items in source: ' + source, 'info');
        return Promise.all(items.map((itemName) => {
                let itemPath = path.join(source, itemName);
                return stat(itemPath)
                .then((stats) => {
                    return {
                        itemPath: itemPath,
                        itemName: itemName,
                        stats: stats
                    }
                });
            }));
    })
    .then((itemObjs) => { // copy files
        log('copying files', 'info');
        let files = itemObjs.filter((itemObj) => {
                return itemObj.stats.isFile();
            });
        return Promise.all(files.map((itemObj) => {
                return copy(itemObj.itemPath, path.join(target, itemObj.itemName));
            }))
        .then(() => {
            return itemObjs;
        });
    })
    .then((itemObjs) => { // copy folders
        log('copying folders for: ' + source, 'info');
        let folders = itemObjs.filter((itemObj) => {
                return itemObj.stats.isDirectory();
            });
        return Promise.all(folders.map((itemObj) => {
                return copyDir(itemObj.itemPath, path.join(target, itemObj.itemName));
            }));
    })
    .catch((e) => {
        log(e, 'error');
        return e;
    });
 
};
 
exports.copyDir = copyDir;
```

## 3 - Making a quick bin.js file

So now that I have all my libraries worked out it is time to see if what I worked out works as expected.

```js
let copyDir = require('./lib/copydir.js').copyDir,
log = require('./lib/log.js')({
        modName: 'bin.js'
    });
 
let source = process.argv[2],
target = process.argv[3];
 
if (source && target) {
    log('starting copy of ' + source + ' to ' + target, 'info');
    copyDir(source, target)
    .then(() => {
        log('done', 'success');
    })
    .catch((e) => {
        log(e, 'error');
    });
} else {
    log('must give a source and target folder', 'info');
}
```

## 4 - Conclusion

So far this way of making a copy dir library seems to work okay at least, however there are some things that come to mind that are of concern. Mainly using streams rather than readFile, and writeFile in the copy.js file, and seeing about better error handing. There are thoughts that come to mind such as what will happen if I copy a folder that contains recursive symbolic links, I have not battle tested this after all. Still when it comes to the project that I am working on this seems to work okay for what I want it to do at least.