---
title: Express text built in middleware
date: 2021-03-23 13:24:00
tags: [express,node.js]
layout: post
categories: express
id: 830
updated: 2021-03-24 14:55:12
version: 1.0
---

When working out a simple [expressjs](https://expressjs.com/) project for the first time there is starting out with some very basic hello world type examples that involve just a single middleware function atatched for a single path of a project. When doing so there is a request object and response object that are bolth given as arguments for the middleware function. These two objects are useful for working with an http request, as well as creating and sending a response for that request. However there is another typical parameter for these functioins that is the express next middleware parameter. This parameter of a middleware function is a function that can be called to allow for express to continue to the next middleware function to be called. The next middileware function can be the next function in an array of functions rather than just a single function, however in other cases it can result in continuing to a whole other path pattern in the main app.js file also.

<!-- more -->
