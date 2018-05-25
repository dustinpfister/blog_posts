---
title: Rendering with ejs in express.js
date: 2018-05-25 15:27:00
tags: [js,express,node.js]
layout: post
categories: express
id: 194
updated: 2018-05-25 15:53:31
version: 1.1
---

When rendering a template in [express.js](https://expressjs.com/). there are many options to choose from, however so far I seem to prefer Embedded javaScript or EJS for short. I have written a post on using the ejs module by itself in node.js, however this post is more about using it in an express.js environment. As Such I will be covering how to set up a renderer with ejs.

<!-- more -->



## Basic example

To get started with a basic example start a new project folder, install express, and ejs. In this post I am using express 4.16.x, and ejs 2.6.x. In no major code breaking changes have happened this post should still be up to date.

```
$ mkdir render-ejs
$ cd render-ejs
$ npm init
$ npm install express@4.16.3 --save
$ npm install ejs@2.6.1 --save
```

### The app.js for the basic example

The main file that is called to start the project is often called app.js in an express.js project, often located at the root of the project folder. In this basic example of using ejs to render a template using express.js and node.js, I just need to set the views path to the folder where my ejs template are, and set the view engine to ejs.

```js
let express = require('express'),
path = require('path'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.get('/', function (req, res) {
 
    res.render('index',{});
 
});
 
app.listen(port, function () {
 
    console.log('app is up on port: ' + port);
 
});
```

When I start this and go to localhost:8080 in my browser I am greeted with the hello ejs message. Simple enough, but maybe I will cover a few more things about this in this post as to keep it from being to thin.