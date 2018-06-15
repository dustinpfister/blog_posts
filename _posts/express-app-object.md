---
title: The Express app object list of must know features
date: 2018-06-15 09:27:00
tags: [js,express,node.js]
layout: post
categories: express
id: 209
updated: 2018-06-15 09:37:46
version: 1.2
---

The app object in [express.js](https://expressjs.com/) is what is returned when calling the express top level function by itself, rather than one of the additional methods attached to it like express.static. The app object contains many useful methods for working with http requests, setting up a rendering engine like ejs, an using additional middle like express-session, and passport. This post will serve as an overview of that app object, and everything that is of great importance when developing an node.js powered web applaction with express.js as part of the stack.

<!-- more -->


## What to know before continuing to read.

This is an advanced post on the app object in express.js, it is not a getting started post on express.js, javaScript, node.js or any additional skills required before hand. When I was first writing this post I was using express 4.16.3, and yes the version number is something you want to keep a clone eye on with this project.