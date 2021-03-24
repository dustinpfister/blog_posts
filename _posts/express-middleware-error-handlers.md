---
title: Express Middleware Error handlers
date: 2019-05-03 19:44:00
tags: [express,node.js]
layout: post
categories: express
id: 433
updated: 2021-03-24 13:19:24
version: 1.5
---

With express middleware there is a default error handling middleware that works okay for simple projects, but there will come a time now and then where it might be necessary to write custom [error handling middleware](https://expressjs.com/en/guide/error-handling.html) functions and modules for major projects. 

When writing an error handling middleware for express the process of doing so is more or less the same as writing any other middleware in express only there are four arguments to be aware of rather than the usual three. Th additional argument as you might guess contains information about the kind of error that happened.

<!-- more -->

## 1 - Express Error handing middleware sync example

If a middleware throws an error that is not the result of some kind of async type action, then express will just handle the error. The default error handler will fire, unless a custom error handler middleware is defined.

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res, next) => {
 
    throw new Error('My Custom Error');
 
});
 
app.use((err, req, res, next) => {
    let html = '<h1>Custom Error Handler<\/h1>' +
        '<p>ERROR MESSAGE: ' + err.message + '<\/p>' +
        '<p>STATUS CODE: ' + res.statusCode + '<\/p>';
    res.send(html);
});
 
app.listen(8080);
```

To define an error handling middleware in express just do so in the same way as any other middleware, but with just one little difference. The first argument in the function will be for the error object, and not the request object.

## 2 - Express Error handing middleware async example

When it comes to anything async that is happening in a express middleware that might result in an error, the error should be passed as an argument to the next method.

```js
let express = require('express'),
fs = require('fs'),
app = express();
 
app.get('/', (req, res, next) => {
    fs.readFile('./nofile.txt', 'utf8', (err, data) => {
        if (err) {
            next(err);
        } else {
            res.send(data);
        }
    })
});
 
app.use((err, req, res, next) => {
 
    res.status(500);
 
    let html = '<h1>500 Interal Service Error<\/h1>' +
        '<p>ERROR MESSAGE: ' + err.message + '<\/p>' +
        '<p>STATUS CODE: ' + res.statusCode + '<\/p>';
 
    res.send(html); // 'My Custom Error'
 
});
 
app.listen(8080);
```