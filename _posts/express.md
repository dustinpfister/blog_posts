---
title: My Express.js mega post
date: 2018-06-12 11:18:00
tags: [js,express,node.js]
layout: post
categories: express
id: 205
updated: 2018-06-12 11:36:05
version: 1.5
---

For my posts on [express.js](https://expressjs.com/) I want to try something difrenet, have a post that acts as an index for all my content on express.js. This will of course act as an index for all the content on my site for express.js, and serve as a central guide for all things with express.js. Getting solid with express.js is not something that will happen over night, and it branches off into other subjects like database management, deployment, front end frameworks, and security. So this seems like it might be a good idea to help keep things more organized.

<!-- more -->

## What to know

This is my main post on the node.js powered, server side web application framework known as express.js  this is not a getting stared post on node.js, javaScript, html, css, git, cli tools, and many other subjects of interest that have to do with full stack web application development. I assume that you have at least some background in these subjects, and are here to because you are seeking a guide on learning the ropes when it comes to express.js.

## The version number matters with express.js

Yes express.js is a project where the version number matters a whole lot. As of this writing I am using [express 4.16.3](https://github.com/expressjs/express/tree/4.16.3) with many of the posts that I have written so far, so assume that unless noted otherwise. If you run into issues with the content in my posts, aways remember to check the simplest things first like spelling mistakes, and yes the version number relative to what I am using in the content.

## Getting started with express.js

To get started with express.js you will need node.js installed, which should come with the package manager known as npm as well. There is other software of interest as well such as mongoDB, and having a recent web browser, but at a minimum you will need node.js installed.

### Manual install of express.js

Once node is installed, and hopefully npm as well. Getting started with any express.js project manually is just a matter of creating a new project folder, using npm to set up a new package.json file, and installing express.js with npm adding it to the package.json file with the save option.

```
$ mkdir express-demo
$ cd express-demo
$ npm init
$ npm install express --save
```

read my [full post on getting started with express.js](/2018/05/21/express-getting-started/)