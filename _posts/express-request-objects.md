---
title: Request objects in express.js
date: 2018-05-26 20:48:00
tags: [js,express,node.js]
layout: post
categories: express
id: 195
updated: 2018-05-29 09:49:54
version: 1.3
---

When making a node.js application using [express.js](https://expressjs.com/) there is a need to handle incoming requests. To do this there is the request object that is one of three arguments that can be used when making a function that will be given as a callback when using an app or router method like get, or post. The request object contains all kinds of useful information when it comes to working with requests. In this post I will be writing about some of the must know features of request objects when working with express.js.

<!-- more -->

## What is a request object in express.js?

When making any kind of request from a client to an express.js app, the incoming request object is the first argument in the function that you give an express.js app method like app.get.

```js
let express = require('express'),
util = require('util'),
port = 8080,
app = express();
 
app.get('/', function (req, res) {
 
   // util.inspect returns a string representation of
   // the request object with circular
   // references replaced by [Circular]
   let str = util.inspect(req);
 
   // send that string
    res.send(str);
 
});
 
app.listen(port, function () {
 
    console.log('basic example up on port: ' + port);
 
});
```

## req.body - Get data payloads send from a client system

The req.body property can be used to get a data payload that was sent from the client system when working with post requests. In order to use this a body parsing middle ware will need to be used, luckily one comes with express itself.

A full working demo of this is a little involved as a front end is needed on top of back end code that uses the body-parser module. I have [written a post](/2018/05/27/express-body-parser/) where I get into this in detail.

## Conclusion

This post does not do all of what there is to know about in request objects justice, and it may never will. When it comes to updating this content in the future this post will likely serve as a kind of index to additional posts on things like the body-parser module that is used to populate the body property of a request object. As [my content on express.js](/categories/express/) grows so should the content of this post.