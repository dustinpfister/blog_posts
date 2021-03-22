---
title: Express example of serve index middleware
date: 2021-03-22 13:54:00
tags: [express,node.js]
layout: post
categories: express
id: 828
updated: 2021-03-22 14:21:24
version: 1.1
---

When working out a nodejs project it would be nice to have a way to just quickly create something that will just serve an index of a public html folder and that is it. I could take the time to work out my own solution when it comes to that, but even simple things like this can often prove to be a little time consuming. If I am willing to make [expressjs](https://expressjs.com/) part of the stack, and often that is one npm package that I do not mide using, then there is a middleware for express called serve index that can make quick work of this kind of task.

The serve index middleware can be combined with the built in [express static function](https://expressjs.com/en/starter/static-files.html) as a way to serve an index for a path, while serving up files when a full path with file name is given. So then bu just using express and one additional package I can qucikly have a system that will work well as a way to serve up and index of files for a path of files some of which might be html files. In addition when a user clicks an html file all the assets will load thanks to the built in express static function.

<!-- more -->
