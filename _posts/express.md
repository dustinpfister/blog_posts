---
title: My Express.js mega post
date: 2018-06-12 11:18:00
tags: [js,express,node.js]
layout: post
categories: express
id: 205
updated: 2018-06-13 16:26:44
version: 1.10
---

For my posts on [express.js](https://expressjs.com/) I want to try something difrenet, have a post that acts as an index for all my content on express.js. This will of course act as an index for all the content on my site for express.js, and serve as a central guide for all things with express.js. Getting solid with express.js is not something that will happen over night, and it branches off into other subjects like database management, deployment, front end frameworks, and security. So this seems like it might be a good idea to help keep things more organized.

<!-- more -->

## What to know

This is my main post on the node.js powered, server side web application framework known as express.js  this is not a getting stared post on node.js, javaScript, html, css, git, cli tools, and many other subjects of interest that have to do with full stack web application development. I assume that you have at least some background in these subjects, and are here to because you are seeking a guide on learning the ropes when it comes to express.js.

## The version number matters with express.js

Yes express.js is a project where the version number matters a whole lot. As of this writing I am using [express 4.16.3](https://github.com/expressjs/express/tree/4.16.3) with many of the posts that I have written so far, so assume that unless noted otherwise. If you run into issues with the content in my posts, aways remember to check the simplest things first like spelling mistakes, and yes the version number relative to what I am using in the content.

## Getting started with express.js

To get started with express.js you will need node.js installed, which should come with the package manager known as npm as well. There is other software of interest as well such as mongoDB, and having a recent web browser, but at a minimum you will need node.js installed.

### Manual install of express.js

Once node is installed, and hopefully npm as well. Getting started with any express.js project manually is just a matter of creating a new project folder, using npm to set up a new package.json file, and installing express.js with npm adding it to the package.json file with the save option.

```
$ mkdir express-demo
$ cd express-demo
$ npm init
$ npm install express --save
```

### Simple express.js hello word

Once I have a demo folder I will want an app.js file at root that wil be the main javaScript file that is called to start the project. For a simle hello world example that app.js file might look something like this.

```js
let express = require('express'),
app = express();
app.get('/', function(req,res){
    res.send('hello world')
});
app.listen(8080);
```
All express projects will involve calling the main method that is given to create an instance of the app object. The app object will then contain methods that I can use to define what to do for certain http methods, and paths.

Here I am responding to get requests to the root path with the string hello word by making use of the send method in the response object. 

read my [full post on getting started with express.js](/2018/05/21/express-getting-started/)

## The main express function, and additional static methods.

So the main express function can be used to create an instance of an app object when called. This app object contains useful methods that can be used to define paths, and get the app to start listening on a given port. However there are also some static methods attached to the function as well that can be used for things like setting up a static path.

```js
let express = require('express'), // get the main express function
app = express(); // call it to create an app object
 
// additional methods are attached to the function
// like express.static that can be used to create 
// a static path.
app.use('/', express.static('public'));
 
// and start the app 
app.listen(8080);
```

## Setting up a static server with the express.staic method

No additional module is needed to set up a static server with express.js, it can quickly and easily be set up using the express.js method with app.use.

```js
app.use('/',express.static('public'));
```

Where public is the name of a folder called public in the root name space of the express.js project. The express.static method can be used to quickly set up one or more static paths, in the event that you want to do something involving the use of a rendering engine for some paths, bust just simply serve static files with other paths.

```js
// static paths
app.use('/js', express.static('public/js'));
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
 
app.get('/', function(req,res){
    res.render('index');
});
```

read [more on express.static here](/2018/05/24/express-static/)

## Using routers to help break things down, keep things neat and clean.

Routers are a great way of keeping things well organized. When making an express.js app I find myself setting up many paths. Some just serve up static assets, some render output using a template, others respond to post requests. If you find yourself having a really long main app.js file in your project you might want to check out routers. They can be used to create separate javaScript files that can then be used in the main app.js file with app.use.

For example I could have a file at \/routes\/main.js like this:

```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.get('/', function (req, res) {
 
    res.render('index', {});
 
});
```

and then use it in my main app.js file like this:

```js
let express = require('express'),
app = express();
 
app.use('/',require('./routes/main'));
 
app.listen(8080);
```

Routers are like little express apps that can be used to help break down routing tasks like this.

read [more on routers here](/2018/05/22/express-routers/)