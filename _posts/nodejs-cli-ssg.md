---
title: A node cli project static site generator
date: 2019-10-22 21:27:00
tags: [node.js]
layout: post
categories: node.js
id: 549
updated: 2019-10-22 21:36:57
version: 1.2
---

So for todays node cli project I started working on a basic static site generator. The project makes use of the npm package known as marked which can be used to parse markdown files into html, as well as some of my other node cli projects such as nc-walk.

<!-- more -->

## 1 - the node cli tools project

this is a post on the nc-ssg command for my node cli tools project. I will not be getting into the full depth of the project as a whole here, but I will say that it is a project that is a collection of node cli tools that can be used to create and maintain a website.

## 2 - The node cli ssg bin folder

In the bin folder of the node cli tools project I creates a folder called ssg. This folder will contain the main file that will be called when the nc-bin command is called. In this file I am using yargs to parse options that are passed when calling the command.

```js
#!/usr/bin/env node
 
require('yargs')
.command(require('./commands/default.js'))
.command(require('./commands/gen.js'))
.argv;
```