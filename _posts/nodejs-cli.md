---
title: A node cli tools project
date: 2019-10-23 16:04:00
tags: [node.js]
layout: post
categories: node.js
id: 550
updated: 2019-10-31 18:38:13
version: 1.9
---

One of the great things about node.js is that it can be used as a way to create [node cli](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js) tools using javaScript. A node cli tool can be used to create just about any kind of command line interface type application when it comes to general programing style tasks at least. Typically applications might be projects that are static site generators, and projects that involving walking the contents of a file system. However nodejs can be used to create a wide range of command line interface projects, as well as host a server that can be used to do all kinds of things in a browser window.

So this post is a general overview of [my node cli tools project](https://github.com/dustinpfister/node_cli_tools), that is a collection of nodejs powered command line interface tools. The main idea of this project is to just have a collection of [node cli](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js) tools to write about for the sake of new content for my site here. However the tools also follow a general theme of creating tools that help with the process of creating and maintaining one ore more simple static websites.

<!-- more -->

## 1 - node cli tools project setup

The way I started this project is by creating a new folder, make it the current working path, and use npm to initialize a new node project. I then npm install all the various npm packages I intend to use with the node cli tools as needed just with any other nodejs project, but I do something different with the package.json file. I added a bin key to the JSON of the package.json file that is an object with a bunch of key object pairs where the key name is the command name that I want to use in the command line when using a command, the the value is a path to the script that I want to run when calling the command.

### 1.1 - create the project folder

So I started out making a project folder and initializing it just like any other npm project.

```
$ mkdir node-cli-tools
$ cd node-cli-tools
$ npm init
```

### 1.2 - install some npm packages

I installed some packages that I will be using with the various node cli tools such as yargs for option parsing, mkdirp for creating paths, ejs as a template engine, and marked to quickly parse markdown into html.

```
$ npm install yargs --save
$ npm install mkdirp -- save
$ npm install ejs --save
$ npm install marked --save
```

### 1.3 - Create the bin key in the package.json file

The bin key of a package.json file can be used to set the names of the various node cli tools. The value of the key is an object and then each key of the object is the command name I want, along with a path to the javaScript file that will be called for each command.

```js
{
  "name": "node_cli_tools",
  "version": "0.0.0",
  "description": "This project aims to be a collection of node.js powered CLI tool examples.",
  "main": "index.js",
  "bin": {
    "nc-init": "bin/init/index.js",
    "nc-walk": "bin/walk/index.js",
    "nc-ssg": "bin/ssg/index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/dustinpfister/node_cli_tools.git"
  },
  "author": "Dustin Pfister",
  "license": "GPL-3.0",
  "bugs": {
    "url": "https://github.com/dustinpfister/node_cli_tools/issues"
  },
  "homepage": "https://github.com/dustinpfister/node_cli_tools#readme",
  "dependencies": {
    "ejs": "^2.7.1",
    "marked": "^0.7.0",
    "mkdirp": "^0.5.1",
    "yargs": "^14.2.0"
  }
}
```