---
title: A node cli project initialization tool
date: 2019-10-18 21:25:00
tags: [js,node.js]
layout: post
categories: node.js
id: 547
updated: 2019-10-29 14:18:33
version: 1.8
---

So I thought I would write a whole bunch of posts on [node cli](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js) tool examples. This is of course one of the many reasons why one would want to get into nodejs development. Sure there is writing server side systems with nodejs, but I have started enjoying writing simple command line interface tools using node and javaScript. So in this post I will be starting out with a node cli tool that is a tool that initializes a project folder.

<!-- more -->

## 1 - The index.js file of the node cli ini command

So I started out by making a init folder in the bin folder of my [node_cli_tools repository](https://github.com/dustinpfister/node_cli_tools). In this folder I have several javaScript files, but in this section I will be going over the file that will be called when the command is used.

The index javaScript file has the [nodejs shebang](/2017/03/26/linux_shebang/) on the top of the file, I will not be getting into detail with that here, it is just a line of code that I want to have at the top of the file that will be the starting point of the command.

After the shebang I am requiring in two other scripts that I have thrown together that have to do with the general process of what I want my initialization command to do. The first thing to come to mind is to check that a target folder is exists, and if so if it is empty, for this there is the check target module. Once that check works out okay, I then want another module that is used to create a starting point for a new project, for this there is the create project module.

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

Once the two modules are loaded the script just checks the target folder that is given which by default is the current working directory. If the check works out okay the create project method is then used for the target directory. The basic idea that I have in mind for an initialization command is more or less this, but if the project grows I might want to add additional features.

## 2 - Check the target path

Here is the source code of the check target module. Here I am using the built in nodejs file system module, along with the promisify method of the built in util module, to make sure that the stat and readdir methods return promises in older versions of node.

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

Here I have the source code of the create project module. For now the command just creates a \_posts folder and places a demo post in the folder that is stored in the init folder of this project. If I do continue working on this project it will likely do a great deal more but for now that is it.

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

## 4 - Conclusion

That is it for not on my nc-init command for ny node cli tools project, I am still working on this one and might keep doing so for a while until I have something better to do. So In the future I might get around to editing this post as I keep working on it and have the init command do more.