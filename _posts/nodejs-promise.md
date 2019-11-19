---
title: Node promise basics and beyond
date: 2019-11-18 12:13:00
tags: [node.js]
layout: post
categories: node.js
id: 565
updated: 2019-11-19 07:03:32
version: 1.18
---

Looking back I have wrote a few posts on [promises]https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise() in [nodejs](https://nodejs.org/en/), and a few when it comes to using them in javaScript in general. However I have not yet wrote a main post on [node promise](https://medium.com/dev-bits/writing-neat-asynchronous-node-js-code-with-promises-32ed3a4fd098) topics in general. From just starting out with the Promise constructor, and the using the promisify utility method to convert old callback style methods to methods that return promises.

It would also be nice to have one post where I go beyond just the basics of promises, and give some real solid examples that outline why they are great for handing a whole bunch of async tasks.

<!-- more -->

## 1 - Node promise basics

So in the section I will start out with the basics surrounding node promise topics. Starting out with just a simple example of an old callback style use example of the read file file system module method. I will then give two examples that do the same thing with promises. One of which will use the Promise Constructor, and the other will use the promisify method of the util method to quickly create a method that returns a promise for the read file file system module.

This section serves as the getting start point of promises in nodejs, if you have some experience with promises all ready and want to go beyond the basics of them in node, then you should maybe skip over this section.

### 1.1 - The old node callback style way

So here I have an example of the old callback style way of using a method that accepts a callback method that will fire when the task is finished. That is I call the method, give it some arguments, and one of the arguments is a function that will fire when the task is done. Within this callback method I then do what it is that I want to do with the result of that task, or handle and error that might happen.

So this example is an example of the read file file system method in the file system module of node. I call the method pass the path to the file that I want to read as the first argument, followed by an option encoding, or options object, and finally pass a callback that will fire when the file is read, or an error happens.

```js
let fs = require('fs');
 
fs.readFile('./README.md', 'utf8', function (e, data) {
    if (e) {
        // error message if there is a problem
        console.log(e.message);
    } else {
        // the content of the file if it is there
        // and all id well
        console.log(data.toString());
    }
});
```

The problem here is that I have to do both error handing, and what it is that I do if all goes well in the body of the same function. However this also causes things to get yet even more messy when I need to do several tasks like this on top of each other. When doing so this results in what is often called callback hell.

So promises then are a way to go about breaking down what to do into septate functions that are called in the event of an error, and if all goes well. In addition things can be chained together, resulting in code that is easier to follow and debug. So lets look as some more examples that do the same thing only this time with node promises.

### 1.2 - The Node Promise native constructor

So one way to get started with promises in node is to create one with the promise constructor. As long as you are using a recent version of node the promise constructor should be there, all I have to do is just call it with the new keyword just like any other constructor, and pass it a function where I will define what needs to get done for the promise.

The function that I pass to the constructor will have two arguments a resolve and reject argument. These arguments are functions that are to be called when the task that needs to happen is done. The resolve argument is to be called if all has gone well, passing the result as an argument when calling it. The reject method in turn is the argument to call if there is a problem, passing an error object as an argument.

```js
let fs = require('fs');
 
let readFile = (filePath, encoding, flag) => {
    encoding = encoding || 'utf8';
    flag = flag || 'r';
    if (!filePath) {
        return Promise.reject(new Error('file path not given to readFile method.'))
    }
    // return a new Promise created with the
    // promise constructor
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, {
            encoding: encoding,
            flag: flag
        }, function (e, data) {
            if (e) {
                reject(e);
            } else {
                resolve(data);
            }
        });
    });
};
 
readFile('./README.md')
.then((data) => {
    // the content of the file if it is there
    // and all id well
    console.log(data.toString());
})
.catch((e) => {
    // error message if there is a problem
    console.log(e.message);
});

```

So then this example works more or less the same way as the first example that just used callbacks. So far it would seem that I just made something that could be very simple far more complex. That is the case hear actually, there is a far more simple way to go about doing this.

In late versions of node you do not need to bother making a readFile method like this, as the native read file method returns a promise to begin with. Using the Promise constructor is not maybe the best option to do something like this, when it comes to supporting older versions of node as well. If I just want to make sure read file will return a promise on all versions of node concerned, it might be better to use a promsify method of one type or another

Still this example is here to serve as an example of using the promise constructor to create a method that returns a promise. In some situations it might make sense to make a method with the promise constructor if the aim is to make some kind of custom method where the use of the constructor is really called for.

Any way lets look at some more examples of promises in nodejs.

### 1.3 - THe Util module and the promisify method

So then thee is the [promsify method of the node core util module](/2019/06/22/nodejs-util-promisify/). I use this method all the time as a node built in way to convert an old callback style method into a method that will return a promise.

```js
let fs = require('fs'),
promisify = require('util').promisify;
 
let readFile = promisify(fs.readFile);
 
readFile('./README.md')
.then((data) => {
    // the content of the file if it is there
    // and all id well
    console.log(data.toString());
})
.catch((e) => {
    // error message if there is a problem
    console.log(e.message);
});
```

This example once again does the same thing as the others, but now it does so with promises, and is far more concise then the example that used the promise constructor. So whenever I want to make sure a node method will return a promise, I use this method. If I need to work out some custom logic, or create an abstraction for whatever the reason the promise constructor would be a better option.

## 2 - node promise map file collection and index example

In this section I will be going over a note so basic example of using promises, that involves creating and indexing a collection of map files. These map files are a resource that could be used in a game of sorts, but I have not went that far with this example. The main index here is to just create an example of using promises as a way to keep things organized, and to wait until a bunch of aysn tasks complete before continuing on to the next thing.

The basic process of all of this is to create a maps folder at a root folder it it is not there, then create a bunch of maps in that maps folder, then build an index for the collection of the maps at the root folder.

### 2.1 - Make maps folder method

The example starts off with using require to make use of the core node file system module, and the util module promisify method to make sure the file system methods that I will be using return promises. I  then start out with my make maps folder helper method.

The make maps folder method uses the mkdir file system method that has been promisifyed, I then also use the Promise resolve and reject static methods to make sure that the helper method always returns a resolve promise even if there is an error, but the error is a code that means the file is there all ready. As such the method will only return a rejected promise in the event that there is some other kind of error that might have to do with file access permissions for example.

```js
// using node modules
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify;
// promisify file system methods
let mkdir = promisify(fs.mkdir),
writeFile = promisify(fs.writeFile),
readFile = promisify(fs.readFile),
readdir = promisify(fs.readdir);
// make the maps folder
let mkMapsFolder = (root) => {
    root = root || process.cwd();
    // attempt to make a new maps folder
    return mkdir(path.join(root, 'maps'))
    // if successful just resolve
    .then(() => {
        return Promise.resolve();
    })
    // folder is there or other error
    .catch((e) => {
        // if it is just there all ready resolve
        if (e.code === 'EEXIST') {
            return Promise.resolve();
        } else {
            // else reject because of other error
            return Promise.reject(e);
        }
    });
};
```

This method will be used in a later method, and its only purpose is to make sure that a folder is at a given root path.

### 2.2 - Write Map file method

Here I have a method that is used to write a single map file in the maps folder.

```js
// write a map file
let writeMapFile = (opt) => {
    opt = opt || {};
    opt.name = opt.name || '';
    opt.root = opt.root || path.resolve('./');
    opt.fileName = opt.fileName || 'map_' + opt.name + '.json';
    opt.width = opt.width || 4;
    opt.height = opt.height || 4;
    opt.forCell = opt.forCell || function (cell) {
        return cell;
    };
    opt.forMap = opt.forMap || function (map) {
        return map;
    };
    // create cells
    let i = 0,
    cells = [],
    len = opt.width * opt.height;
    while (i < len) {
        cells.push(opt.forCell({
                type: 'blank',
                i: i,
                x: i % opt.width,
                y: Math.floor(i / opt.width)
            }, i));
        i += 1;
    }
    // create map object
    let map = opt.forMap({
            name: opt.name,
            width: opt.width,
            height: opt.height,
            cells: cells
        });
    console.log('writing map: ' + opt.fileName);
    // write map
    return writeFile(path.join(opt.root, opt.fileName), JSON.stringify(map), 'utf8');
};
```

### 2.3 - build index

Now for the method that will build the index for the map files.

```js
// build an index
let writeMapIndex = (opt) => {
    opt = opt || {};
    opt.root = path.resolve(opt.root || process.cwd());
    opt.indexBy = opt.indexBy || function (a, b) {
        return 0;
    };
    return readdir(path.join(opt.root, 'maps'))
    .then((files) => {
        // read all map files
        return Promise.all(files.map((fileName) => {
                return readFile(path.join(path.join(opt.root, 'maps', fileName)), 'utf8')
                .then((map) => {
                    console.log('read ' + fileName);
                    map = JSON.parse(map);
                    map.fileName = fileName;
                    return map
                });
            }))
        // build index for all map files
        .then((maps) => {
            console.log('building index for ' + maps.length + ' map files');
            let json = JSON.stringify(maps.sort(opt.indexBy).map((map) => {
                        return path.join(opt.root, 'maps', map.fileName);
                    }));
            return writeFile(path.join(opt.root, 'map_index.json'), json, 'utf8');
        });
    });
};
```

### 2.4 - write map file collection and index

Here is the method that will create the whole collection of map files in the map folder, and then build the index.

```js
// make maps folder with all maps
let writeMapsFolder = (opt) => {
    opt = opt || {};
    opt.root = opt.root || process.cwd();
    opt.forCell = opt.forCell || function (cell) {
        return cell;
    };
    opt.forMap = opt.forMap || function (map) {
        return map;
    };
    opt.indexBy = opt.indexBy || function (a, b) {
        return 0;
    };
    opt.mapCount = opt.mapCount || 10;
    opt.cellWidth = opt.cellWidth || 12;
    opt.cellHeight = opt.cellHeight || 12;
    // start by making maps folder if it is not there
    return mkMapsFolder(opt.root)
    // then write a map file for each mapCount
    .then(() => {
        console.log('all is good with maps folder, creating maps.');
        let maps = [],
        i = 0;
        while (i < opt.mapCount) {
            maps.push(writeMapFile({
                    root: path.join(opt.root, 'maps'),
                    name: i + 1,
                    forCell: opt.forCell,
                    forMap: opt.forMap,
                    width: opt.cellWidth,
                    height: opt.cellHeight,
                }));
            i += 1;
        }
        // resolve when map writes resolve
        return Promise.all(maps);
    })
    // then build index
    .then(() => {
        console.log('done writing map files building index now.');
        return writeMapIndex({
            root: opt.root,
            indexBy: opt.indexBy
        });
    })
};
```

### 2.5 - demo

Now to take all of this for a test drive.

```js
// demo
writeMapsFolder({
    root: './',
    mapCount: 5,
    cellWidth: 2,
    cellHeight: 2,
    // worth value for each cell
    forCell: function (cell) {
        cell.type = 'grass';
        cell.worth = 50 + Math.round(50 * Math.random());
        return cell;
    },
    // tabulate map cell worth
    forMap: function (map) {
        map.worth = map.cells.reduce((acc, cell) => {
                acc = typeof acc === 'object' ? acc.worth : acc;
                return acc + cell.worth;
            });
        return map;
    },
    // index maps by worth
    indexBy: function (a, b) {
        if (a.worth > b.worth) {
            return -1;
        }
        if (a.worth < b.worth) {
            return 1;
        }
        return 0;
    }
}).then(() => {
    console.log('done creating map files and map index');
})
.catch((e) => {
    console.log(e.message);
});
```

## 3 - Conclusion

So there is way more to cover on promises in nodejs, as well as in javaScript in general. I have other posts on the promise all method, the promise resolve and reject Promise object static methods. In addition I have posts on the npm package bluebird that provides way more to work with beyond what is provided with just native Promises.