---
title: The express.js body parser
date: 2018-05-27 08:51:00
tags: [js,express,node.js]
layout: post
categories: express
id: 196
updated: 2018-05-27 21:09:37
version: 1.2
---

Being able to parse a payload given to a node.js back end typically via a post request is a very common task when doing something with [express.js](https://expressjs.com/). As such there is a built in way to quickly dpo this thanks to the body-parser module that is included with every express.js install. In order to get into body parsing it is necessary to put together at least a basic full stack application. So in this post I will be giving a an example that included both front and back end code, but I will be mostly covering the body parser module.

<!-- more -->

## An express.js Body Parser example

In this example I will of course be using express.js as a node.js back end framework, but I will also be installing ejs as a rendering engine. In terms of npm packages that is all that I installed in my demo folder. Everything else I used in this demo is just my own vanilla code. In a more advanced project I might be using additional javaScript projects like angular, and mongoose, but I do not want to take the focus away from express.js at least not in this post.


```
$ mkdir body-parser
$ cd body-parser
$ npm init
$ npm install express@4.16.3
$ npm install ejs@2.6.1
$ mkdir public
$ mkdir routes
$ mkdir views
```

## The routes folder

It has become standard practice to always have a routes folder in which I am using routers to help better manage paths when making an express application. In this demo I am using a separate javaScript file for both json and text paths that will serve as two separate examples of using the body parser to parse json, and plain old text given from the client system.

### /routes/static.js

The static routes file is where I define my plain old static paths, with this demo I am just adding a static js folder in the public folder at the root of the project file system. Inside this js folder is where I will place javaScript files that will compose my simple crude client system for the sake of this demo. More on the front end code later.

```js
let express = require('express');
 
// the router
router = module.exports = express.Router();
 
// a static js path in public
router.use('/js', express.static('public/js'));
```

### /routes/json.js

In the routes folder I have a json.js file that will serve as an example of using the body parser to parse json given from a client system via a post request. This file will be used in my main app.js file at the root of the project folder to create a json path by mounting what I am doing inside this file to a json path there in app.js.

```js
let express = require('express'),
bodyParser = require('body-parser'),
 
// the router
router = module.exports = express.Router();
 
// using body parser for req.body
router.use(bodyParser.json());
 
router.get('/', function (req, res) {
 
    res.render('index', {
 
        layout: 'json'
 
    });
 
});
 
// post request
router.post('/', function (req, res) {
 
    var data = {
        mess: 'yes this is dog.',
        body: req.body
    };
 
    if (req.body.action) {
 
        if (req.body.action === 'foo') {
 
            data.mess = 'bar';
 
        }
 
    }
 
    res.json(data);
 
});
```

## The main app.js of this demo

Here in the main app.js file that I can start with node in the command line is where I will add in what I am doing in the routes folders

```js
let express = require('express'),
path = require('path'),
app = express(),

// getting port this way
port = process.env.PORT || process.argv[2] || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// using what is in the routes folder
app.use('/', require('./routes/static'));
app.use('/json', require('./routes/json'));
app.use('/text', require('./routes/text'));
 
app.get('/', function (req, res) {
 
    res.render('index', {});
 
});
 
app.listen(port, function () {
 
    console.log('request object demo is up on port: ' + port);
 
});
```
