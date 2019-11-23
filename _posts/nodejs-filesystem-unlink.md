---
title: node delete files with fs.unlink
date: 2019-11-22 18:19:58
tags: [js,node.js]
layout: post
categories: node.js
id: 569
updated: 2019-11-23 10:58:20
version: 1.8
---

The way to go about deleting files in nodejs with the built in file system module is with the [fs.unlink](https://nodejs.org/docs/latest/api/fs.html#fs_fs_unlink_path_callback) method. So there is no node delete method, but there is fs.unlink, and fs.rmdir that can be used to delete files an folders. There is also of course all kinds of user space npm packages that can help making the process of deleting recursively, and selectively easy, such as rimraf, but in this post I will be sticking to vanilla javaScript examples.

<!-- more -->

## 1 - Some basic node delete file examples

In this section I will be going over some basic node delete file examples, using the fs.unlink method in the file system module. There is an older callback style way of using it and then there is doing what is squire to ensure a promise is returned.

### 1.1 - Node delete file basic callback style example

Here we have a basic example of the fs.unlink method example that will delete a file that is given as an argument when used in the command line with node. In this example I am using the old callback style of these kinds of method where I just call the method, pass the path to the file I want to delete, and then pass a callback that will fire when the task is over.

```jslet fs = require('fs'),
path = require('path'),

filePath = path.resolve(process.argv[2]);

fs.unlink(filePath, (e) => {
    if (e) {
        console.log(e);
    } else {
        console.log('delete ' + filePath);
    }
});
```

If there is an error there will be an error object, if not the value of the argument will be null. This style of example will work on a wide range of node versions, but most developers myself included prefer promises these days, o lets look at another basic example of the node delete fs.unlink method.

### 1.2 - delete files promise style

Then there is making sure that the use of the fs.unlink method will return a promise when used.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
deleteFile = promisify(fs.unlink),
 
filePath = path.resolve(process.argv[2]);
 
deleteFile(filePath)
.then(() => {
    console.log('delete ' + filePath);
})
.catch(() => {
    console.log(e);
});
```

## 3 - Count example

So now for a more advanced example that is starting to look like some kind of project. This will still be a very simple example just for the sake of this post, that involves creating a json file that will just store a count. This json file is created if it is not there, is opened stepped, and saved if it is there, and of course there is a command to delete the file.
So this example might serve as a good starting point when it comes to getting use to how to go about using not just the node delete fs.unlink method, but also methods like fs.readFile, fs.writeFile, and the use of promises as a way to keep things well structured.

I have a step count method that will read a json file that stores a current count. In the event that it is there to begin with it will step the current value by one and then write the updated state to the file. In the event that it is not there it will write a new json file at start it off with some default values. In any case it will resolve with the current state, unless some error other than just a ENOENT error happens when reading the json file.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
 
deleteFile = promisify(fs.unlink),
writeFile = promisify(fs.writeFile),
readFile = promisify(fs.readFile);
 
command = path.resolve(process.argv[2] || 'step'),
filePath = path.join(process.cwd(), 'count.json');
 
let stepCount = () => {
    let state = {};
    return readFile(filePath)
    .then((json) => {
        state = JSON.parse(json);
        state.mess = 'count updated: ' + new Date();
        state.count += 1;
        return writeFile(filePath, JSON.stringify(state), 'utf8');
    })
    .catch((e) => {
        if (e.code === 'ENOENT') {
            state = {
                mess: 'new count created: ' + new Date(),
                count: 1
            };
            let json = JSON.stringify(state);
            return writeFile(filePath, json, 'utf8');
        } else {
            return Promise.reject(e);
        }
    })
    .then(() => {
        return Promise.resolve(state);
    });
};
 
let deleteCount = () => {
    return deleteFile(filePath)
    .then(() => {
        return Promise.resolve({
            count: 0,
            mess: 'count file deleted'
        });
    })
}
 
let Run = (command) => {
    command = command || 'step';
    if (command === 'step') {
        return stepCount();
    }
    if (command === 'kill') {
        return deleteCount();
    }
    return Promise.reject(new Error('unknown command'));
};
 
Run(process.argv[2])
 
.then((state) => {
    console.log('mess: ' + state.mess);
    console.log('count: ' + state.count);
})
 
.catch((e) => {
 
    console.log(e);
 
});
```

