---
title: Express set
date: 2019-04-18 20:39:00
tags: [express,node.js]
layout: post
categories: express
id: 418
updated: 2021-03-23 14:25:37
version: 1.9
---

This will be a quick post on the [express set](https://expressjs.com/en/api.html#app.set) method in [express.js](https://expressjs.com/) which can be used in conjunction with the express get function when it comes to working with application settings. 

The app.set method to be specific can be used to set application settings like the view engine to use, or a post number to listen on when starting a main server script. In addition it can be used as an alternative to defining global variables for just about anything that has to be stored and accessed at a later point elsewhere in the app. The app get method as you might know can be used to define middleware to use with get requests, but if it is used with just one argument and given a string value the get method can be used as a way to get rather than set application values.

So then in this post I will be going over a few simple quick examples of the app.set method along with the app.get method when working out an express.js project on top of nodejs.

<!-- more -->

## 1 - Express set basic example

When it comes to using the express app.set method as a way to store an application setting I can use any key name that I want, but some names are reserved because they are used by express internally such as 'view engine', and 'env'. So for example if I want to store the port number that I will be listening on as an application setting I can use the app.set method as a way to do just that.

```js
let express = require('express'),
app = express();
 
// set  value for port
app.set('port', process.env.PORT || process.argv[2] || 8080);
 
// define one or more paths
app.get('/', (req, res) => res.send('foo'));
 
// listen on port
app.listen(app.get('port'), ()=> console.log('app up on port: ' + app.get('port')));
```

The express app.set method is used in conjunction with the [app.get](/2018/06/20/express-get/) method as a way to get application setting values, however the app.get method has more than one function depending on how it is used. In the above example the app.get method is used to get the port application setting, but it is also used to define what to do for http get requests for the root path.

## 2 - Express setting view engine

One of the express application settings is the view engine, this is a setting that lets express know what template engine I am using such as [ejs](/2018/05/25/express-rendering-with-ejs/) or [pug](/2019/04/16/express-pug/).

```js
// get express and create an
// express app object
let express = require('express'),
app = express();
 
// set pug as the view engine
app.set('view engine', 'pug');
 
// use the render method to render
// a pug template
app.get('/', (req, res) => {
    res.render('index');
});
 
// use listen or createServer to
// listen on a port
app.listen(8080);
```