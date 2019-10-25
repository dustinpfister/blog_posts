---
title: A node cli tools project
date: 2019-10-23 16:04:00
tags: [node.js]
layout: post
categories: node.js
id: 550
updated: 2019-10-24 21:24:54
version: 1.5
---

So this post is a general overview of [my node cli tools project](https://github.com/dustinpfister/node_cli_tools), that is a collection of nodejs powered command line interface tools. The main idea of this project is to just have a collection of node cli tools to write about for the sake of new content for my site here. However the tools also follow a general theme of creating tools that help with the process of creating and maintaining one ore more simple static websites.

<!-- more -->

## 1 - node cli tools project setup

The way I started this project is by creating a new folder, make it the current working path, and use npm to initialize a new node project. I then npm install all the various npm packages I intend to use with the node cli tools as needed just with any other nodejs project, but I do something different with the package.json file. I added a bin key to the JSON of the package.json file that is an object with a bunch of key object pairs where the key name is the command name that I want to use in the command line when using a command, the the value is a path to the script that I want to run when calling the command.