---
title: The Express app object list of must know features
date: 2018-06-15 09:27:00
tags: [js,express,node.js]
layout: post
categories: express
id: 209
updated: 2018-06-15 09:34:28
version: 1.1
---

The app object in [express.js](https://expressjs.com/) is what is returned when calling the express top level function by itself, rather than one of the additional methods attached to it like express.static. The app object contains many useful methods for working with http requests, setting up a rendering engine like ejs, an using additional middle like express-session, and passport. This post will serve as an overview of that app object, and everything that is of great importance when developing an node.js powered web applaction with express.js as part of the stack.

<!-- more -->


