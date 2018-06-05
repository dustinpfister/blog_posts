---
title: Express.js app.all method for handing all incoming requests
date: 2018-06-05 11:41:00
tags: [js,express,node.js]
layout: post
categories: express
id: 202
updated: 2018-06-05 11:50:03
version: 1.0
---

So one of the applaction methods in [express.js](https://expressjs.com/) is app.all, which is a method that can be used to work with any kind of http request method. The most commonly used methods are of course 'GET', and 'POST'. However there are many more that also make sense for what they are, and at times it might be desirable to have a way work with any kind of incoming request regardless of the certain method. This is where app.all can be of help. In this post I will be writing about the app.all method in express, I will be showing some use case examples, and will touch base on the different http methods.

<!-- more -->

## What to know

This is a post on the app.all method in express.js, it is not a getting started post on express.js or any additional subjects that relate to express.js. If you are new to express, you might wan to start with my getting started post on express.js. Also in this post I am using express 4.16.3, and yes express is something where the version number matters a lot.

## Basic Example of app.all in express


### The /app.js file

```js
let express = require('express'),
 
port = process.env.PORT || process.argv[2] || 8080,
 
app = express();
 
// log info about ALL requests to ALL paths
app.all('*', function (req, res, next) {
 
    console.log('*** A request ***');
    console.log('method: ' + req.method);
    console.log('url: ' + req.url);
    console.log('*****************');
 
    next();
 
});
 
// host some static assets in a public folder
app.use('/', express.static('public'));
 
// What to do for ALL requests for ALL Paths 
// that are not handled above
app.all('*', function (req, res) {
 
    console.log('*** 404 ***');
    console.log('404 for url: ' + req.url);
    console.log('***********');
 
    res.send('404');
 
});
 
app.listen(port, function () {
 
    console.log('app.all demo is up on port: ' + port);
 
});
```

