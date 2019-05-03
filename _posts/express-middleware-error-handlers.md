---
title: Express Middleware Error handlers
date: 2019-05-02 08:30:00
tags: [express,node.js]
layout: post
categories: express
id: 433
updated: 2019-05-03 19:52:05
version: 1.0
---

With express middleware there is a default error handling middleware that works okay for simple projects, but there will come a time now and then where it might be necessary to write custom [error handling middleware](https://expressjs.com/en/guide/error-handling.html). When writing an error handling middleware for express the process of doing so is more or less the same as writing any other middleware in express only there are four arguments to be aware of rather than the usual three.

<!-- more -->

