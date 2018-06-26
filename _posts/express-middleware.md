---
title: The deal with middleware methods in express.js
date: 2018-06-25 20:24:00
tags: [js,express,node.js]
layout: post
categories: express
id: 216
updated: 2018-06-26 14:44:25
version: 1.1
---

So after getting into [express.js](https://expressjs.com/) for about a month now, I find myself writing my own middleware methods now. If you do not know what middleware is then this post might be of help. A middleware is a module, or actually even just a method that does something with incoming traffic in an express.js application. There is moddleware for doing all kinds of things, like authentication, setting http headers, and parsing cookies just to mention a few things that can be done with middleware. In other words it is a term given to plugins, or extensions for express.js, as by itself I can only do so much. So this is where middleware comes in. 

<!-- more -->

In this post I will be writing about making my own middleware methods, rather than using what is out there. However do look at what is out there for sure, however when making my own app there is going to be a need to write at least a few of my own, so I will be giving some examples here.
