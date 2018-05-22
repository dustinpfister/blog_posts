---
title: Working with Routers in express.js
date: 2018-05-22 10:50:00
tags: [js,express,node.js]
layout: post
categories: express
id: 192
updated: 2018-05-22 15:15:29
version: 1.1
---

When making a node.js project with [express.js](https://expressjs.com/) I am going to end up setting up a static server, and or defining some paths that will respond to incoming requests with some kind of custom behavior. [Routers](https://expressjs.com/en/4x/api.html#express.router) are a useful way of defining these paths and pulling them into separate javaScript files that can then be linked to from the main script of an app using app.use.

<!-- more -->

## What to know

This is a post on using Routers in express.js. Routers are useful for creating separate scripts for handling requests that can be used in an express project with the app.use method. It is a great way to keep code more organized, and can also potential be used to define your own middleware. This is not a [getting started](/2018/05/21/express-getting-started/) post on express.js, full stack development aside from just this little aspect of it, let alone javaScript and any additional basic skills required in general.

## Keeping your code more organized

So Routers are a good way of keeping things more organized compared to defining all of this logic in the main script that is called to start the project. After all when working on something that does become a little complicated I can end up with a lot of code when it comes to defining these paths. This is often the case when defining a path that will handle post requests where sanitation is of concern.

## Making some files for a routes path

So Routers will come into play if I do get into making my own middleware, however even when it comes to making my own express app from the ground a routes folder is a common folder that will compose most compose an express.js root structurer along with things like a view folder.

### All requests Router example

A common task in full stack development involving express.js is that for whatever the reason you might want to do something involving all traffic coming through to an app. Say you want to preform some kind of sanitation, or check of some kind, or to keep things simple maybe you just want to log to the console where reach request is going.


```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.get('*', function (req, res, next) {
 
    console.log('get from: ' + req.url);
 
    next();
 
});
 
router.post('*', function (req, res, next) {
 
    console.log('post from: ' + req.url);
 
    next();
 
});
```

This could be used with app.use in the main script before any others, it will just simple log the url of the request an continue on to whats next.

### static paths example

```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.get('/', function (req, res) {
 
    res.render('index', {});
 
});
 
router.get('/about', function (req, res) {
 
    res.render('about', {});
 
});
```

### Pattern paths example

```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.get(/user_(\w+)/, function (req, res) {
 
    let match = req.url.match(/user_(\w+)/),
    username;
 
    if (match) {
 
        username = match[0].replace(/^user_/,'');
 
    }
 
    if (username) {
 
        res.render('user', {
            username: username
        });
 
    } else {
 
        res.send('no username!?');
 
    }
 
});
```