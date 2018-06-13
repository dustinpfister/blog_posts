---
title: My Express.js mega post
date: 2018-06-12 11:18:00
tags: [js,express,node.js]
layout: post
categories: express
id: 205
updated: 2018-06-13 17:19:14
version: 1.14
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

### Setting up a static server with the express.staic method

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

### Using routers to help break things down, keep things neat and clean.

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


There is a great deal more to know about the top level function that is exported. The main thing to know is that it returns a method that is called to create instances of an app object. However there are also some additional useful methods attached to it as well.

To learn more check out my [full post on the express.js top level function](/2018/06/13/express-top-level-function/)

## The app object

When calling the main top level express function that is exported when importing express into a project, and instance of app is returned. This is one of the most important objects when working with express, as it contains methods for setting paths, and handing http requests.

### The app.get method

The first app object method that most people will use when starting with express.js might be app.get. This is a method that is used to define how to work with incoming http GET requests for a given path or pattern.

```js
// for all incoming get requests
app.get('*', function(req,res,next){
    console.log('a get request');
    console.log('for path: ' + get.path);
    next();
});
 
// if the get request is for root
app.get('/', function(req,res){
    res.send('the index.');
});
 
// if we get here it looks like we do not have it
app.get('*', function(req,res){
    res.send('sorry');
});
```

The order in which I call app.get is important, as the first use of the method is what will be used first for all incoming get requests. The next use of app.get will only fire for the root path, and the last one will fire for all get request that are not satisfied above.

## The app.all method for responding to any kind of request.

So where that methods that I give to app.get will only fire for GET requests, app.all will fire for any kind of request that is received.

```js
app.all('/', function(req,res,next){
    console.log('looks like a ' + req.method + ' request');
    next();
});
```

When using app.all the method property of the request object is of interest, as it will tell me what kind of method has been used.

read more on [app.all](/2018/06/05/express-app-all/)

## The Request Object

## The Response Object

As the name suggests the response object contains methods and properties relevant to the act of responding to an incoming http request. Here I will be taking a moment to cover relevant topics on the response object, and some of the most important aspects to know about.

### The render method for rending templates

The render method is for rendering a view set via app.set. There are many rendering engines to choose from, but so far I have been sticking to [ejs](/2017/12/07/nodejs-ejs-javascript-templates/).

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

## Conclusion

I wanted to try something new when writing my content on express. I think having a main post like this that links to everything else on express is very useful. If This post does well, I might start having posts like this for all of my content categories.

I hope this post has done a decent job of giving a general overview of express.js, if not from here you should be able to navigate to more specific posts on various topics on express.