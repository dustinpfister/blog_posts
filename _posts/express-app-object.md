---
title: The Express app object list of must know features
date: 2018-06-15 09:27:00
tags: [js,express,node.js]
layout: post
categories: express
id: 209
updated: 2018-06-15 10:12:41
version: 1.5
---

The app object in [express.js](https://expressjs.com/) is what is returned when calling the express top level function by itself, rather than one of the additional methods attached to it like express.static. The app object contains many useful methods for working with http requests, setting up a rendering engine like ejs, an using additional middle like express-session, and passport. This post will serve as an overview of that app object, and everything that is of great importance when developing an node.js powered web applaction with express.js as part of the stack.

<!-- more -->


## What to know before continuing to read.

This is an advanced post on the app object in express.js, it is not a getting started post on express.js, javaScript, node.js or any additional skills required before hand. When I was first writing this post I was using express 4.16.3, and yes the version number is something you want to keep a clone eye on with this project.


## Basic example of the app object

If I have a new express project set up by manually installing express rather than using a generator like this:

```
$ mkdir express-demo
$ cd express-demo
$ npm init
$ npm install express --save
```

Then the next step would be to have an app.js file in the root of the demo. When writing this file one of the first things I would do is use require to get what is exported by express, which is the top level express function. Calling this function will give me a new app object that I can then use to do things like set up a handler for get requests, and start listening on a port for requests.

```js
let express = require('express'),
app = express();
 
app.get('/', function(req,res){
    res.send('hello world');
});
app.listen(8080);
```

The app.get, and app.listen are often the first methods one will become aware of when getting started with express. The app.get method is one of many methods that are used to respond to a certain find of http method know as a GET method. There are of course other methods for other kinds of requests, and even one that will work with all requests called app.all. The app.listen method is what can be used often in the main app.js file of a project to start the express app by having it listen on a given port for incoming traffic.

However this is much more to the object that an express developer should be aware of so lets get to it.

## Making and Using routers, and middle ware, with app.use

If you are not all ready aware of app.use this would be a good one to play with a little when it comes to making your own catalog of express demos for the sake of learning express. This methods is what is used to well use additional middle ware, including your own middle ware that can do a whole range of things when working with incoming http requests.

For example if I want a middel ware that just logs the incoming request headers to the conolse, and then continues on like normal I would just give app.use a single function literal log the headers in that function, and then call the next method that is provided as the third argument in that function.

```js
app.use(function (req, res, next) {
 
   console.log(req.headers);
 
   next();
   
});
```

There is a great deal more to write about with app.use, but I have much to cover in this post.