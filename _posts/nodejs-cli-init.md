---
title: A node cli project initialization tool
date: 2019-10-18 21:25:00
tags: [js,node.js]
layout: post
categories: node.js
id: 547
updated: 2019-10-21 10:53:43
version: 1.4
---

So I thought I would write a whole bunch of posts on [node cli](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js) tool examples. This is of course one of the many reasons why one would want to get into nodejs development. Sure there is writing server side systems with nodejs, but I have started enjoying writing simple command line interface tools using node and javaScript. So in this post I will be starting out with a node cli tool that is a tool that initializes a project folder.

<!-- more -->

## 1 - The index.js file of the node cli ini command

So I started out by making a init folder in the bin folder of my [node_cli_tools repository](https://github.com/dustinpfister/node_cli_tools). In this folder I have several javaScript files, but in this section I will be going over the file that will be called when the command is used.

The index javaScript file has the [nodejs shebang](/2017/03/26/linux_shebang/) on the top of the file, I will not be getting into detail with that here, it is just a line of code that I want to have at the top of the file that will be the starting point of the command.

After the shebang I am requiring in two other scripts that I have thrown together that have to do with the general process of what I want my initialization command to do. The first thing to come to mind is to check that a target folder is exists, and if so if it is empty, for this there is the check target module. Once that check works out okay, I then want another module that is used to create a starting point for a new project.

```js
#!/usr/bin/env node
 
let checkTarget = require('./check-target.js'),
createProject = require('./create-project.js'),
 
target = process.argv[2] || process.cwd();
 
checkTarget(target)
 
.then(() => {
    return createProject(target);
})
 
.catch((e) => {
 
    console.log(e.message);

})
```

## 2 - Check the target path


```js
// using the fs module, and the promisify method
// of the util module
let fs = require('fs'),
promisify = require('util').promisify,
 
// promisify fs.stat, and fs.readdir
stat = promisify(fs.stat),
readdir = promisify(fs.readdir);
 
// the check target method is the only thing exported
module.exports = (target) => {
 
    // get stats
    return stat(target)
 
    // if the target is a dir, read the contents
    .then((stat) => {
        if (stat.isDirectory()) {
            return readdir(target);
        }
        // if not a dir fail
        return Promise.reject(new Error('target is not a directory.'));
    })
 
    // just resolve if dir contents are empty
    .then((files) => {
        if (files.length === 0) {
            return Promise.resolve();
        }
        // fail if there are contents
        return Promise.reject(new Error('The directory is not empty'));
    });
 
};
```

## 3 - The create project module

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
 
mkdir = promisify(fs.mkdir),
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile);
 
// create a new project at target
module.exports = (target) => {
 
    // make posts folder
    return mkdir(path.join(target, '_posts'))
 
    // read demo post
    .then(() => {
        return readFile(path.join(__dirname, 'demo-post.md'));
    })
 
    // write demo post in new _posts folder
    .then((data) => {
        return writeFile(path.join(target, '_posts', 'first-post.md'), data);
    })
 
};
```