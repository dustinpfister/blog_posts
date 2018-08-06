---
title: The node.js readline module, for making a cli shell.
date: 2018-08-06 11:08:00
tags: [js,node.js]
layout: post
categories: node.js
id: 251
updated: 2018-08-06 11:17:24
version: 1.1
---

When making [node.js](https://nodejs.org/en/) command line tools there might be a desire to make a command line tool where I drop into a shell in which I can enter commands to preform certain actions. Some examples of this might be the shell in mongodb where I can call methods, and full scripts from a shell that I can enter when calling the mongodb binary. Another example would be some of these command line text editors that involve entering commands to insert text, delete, and so forth. Once node.js built in module of interest when it comes to this might be the [readline module](https://nodejs.org/api/readline.html), it allows for me to write an event handler for each time return is entered from the standard input in a command line interface. In this post I will be writing about this module, and give some copy and paste examples.

<!-- more -->

## 1 - What to know

This is a post on the readline module in node.js. I will not be getting into the basics of working with node.js, and javaScript in general. I assume that you have some background with these things, but do not have a great deal of experience working with the readline module.