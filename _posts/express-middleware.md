---
title: Writing my own middleware methods in express.js
date: 2018-06-25 20:24:00
tags: [js,express,node.js]
layout: post
categories: express
id: 216
updated: 2018-06-27 17:06:25
version: 1.3
---

So after getting into [express.js](https://expressjs.com/) for about a month now, I find myself writing my own middleware methods now. If you do not know what middleware is then this post might be of help. A middleware is a module, or actually even just a method that does something with incoming traffic in an express.js application. There is moddleware for doing all kinds of things, like authentication, setting http headers, and parsing cookies just to mention a few things that can be done with middleware. In other words it is a term given to plugins, or extensions for express.js, as by itself I can only do so much. So this is where middleware comes in. 

<!-- more -->

In this post I will be writing about making my own middleware methods, rather than using what is out there. However do look at what is out there for sure, however when making my own app there is going to be a need to write at least a few of my own, so I will be giving some examples here.


## 1 - What to know before hand.

This is an advanced post on [express.js](https://expressjs.com/), if you are new to express.js or just want to check out what else I have on express you might want to check out my [main post on the subject](/2018/02/12/nodejs-csv-to-json/).

## 2 - Some basic examples


## 2.1 - Just a function literal that is used with app.use

So a simple middleware can be just be a single method that is given to app.use like this.

```js
let express = require('express'),
 
app = express();
 
app.use(function (req, res, next) {
 
    console.log('this is a middleware!');
 
    // populating something  on req
    req.obj = {
 
        platform: process.platform,
        arch: process.arch
 
    };
 
    // call next to continue
    next();
 
});
 
app.get('/', function (req, res) {
 
    res.json(req.obj);
 
});
 
app.listen(8080);
```

This middleware appends an object in the request object that can then be used later in the app, as I get to another section that responds to get requests I send that object as a response. Many middlewares do something like this, they append some kind of useful data to a response object that can later be used with other middlewares, and paths when it comes to rendering.