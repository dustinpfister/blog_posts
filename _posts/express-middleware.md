---
title: Express Middleware
date: 2018-06-25 20:24:00
tags: [js,express,node.js]
layout: post
categories: express
id: 216
updated: 2019-04-22 12:16:42
version: 1.23
---

So after getting into [express.js](https://expressjs.com/) for about a month now, I find myself writing my own [middleware methods](https://expressjs.com/en/guide/using-middleware.html) now. If you do not know what middleware is then this post might be of help. A middleware is a module, or actually even just a method that does something with incoming traffic in an express.js application. There is middleware for doing all kinds of things, like authentication, setting http headers, and parsing cookies just to mention a few things that can be done with middleware. In other words it is a term given to plugins, or extensions for express.js, as by itself I can only do so much. So this is where middleware comes in. 

<!-- more -->

## 1 - Express middleware, and what to know before hand.

If you have done even just a little node.js development now and then chances are that you have played around with express a little now and then. In order to have a solid understanding of express, it is important to have a solid understanding of express middleware. middleware can be thought of as something that is placed between one layer and another, and in express that is more or less what it is. 
Middleware does things like populating an object with arguments that where transmitted from a client via a post request body, grabbing data from a database to be used in the rendering of a view, set response headers, preform sever side sanitation tasks, and much more. There is way to much to cover in a single post, so this will be a general overview of express middleware, and I will link to additional posts on this subject to keep this post from being to long winded.

So then this is an advanced post on express.js, if you are new to express or just want to check out what else I have on express you might want to check out my [main post on express](/2018/06/12/express/) that is a good starting point for all this express.js related on my site. I assume that you have at least some background with javaScript, and node.js in general as that is all outside the scope of this post, and the whole collection of content on express here for that matter.

## 2 - [Express Middleware basics](/2019/04/19/express-middleware-basics/)

So I did write a post on [the basics of express middleware](/2019/04/19/express-middleware-basics/) in which I cover some very basic examples of how to go about writing middleware for an express application. I will go over a quick basic example hear as well though.

```js
let express = require('express'),
app = express();
 
app.use((req, res, next) => {
    // populating something  on req
    req.plat = {
        platform: process.platform,
        arch: process.arch
    };
    // call next to continue
    next();
});
 
app.get('/', (req, res) => res.json(req.plat));
app.listen(8080);
```

This middleware appends an object in the request object that can then be used later in the app, as I get to another section that responds to get requests I send that object as a response. Many middlewares do something like this, they append some kind of useful data to a response object that can later be used with other middlewares, and paths when it comes to rendering. However middleware can be used to do a wide range of things beyond just that as well of course.

## 3 - [Application level Express Middleware](/2019/04/22/express-middleware-applaction-level/)

In express Application middleware is any kind of middleware that is used via methods like app.use, or any of the methods that define what to do for an http request like app.get, or app.all.

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res) => res.json('foo'));
 
app.listen(8080);
```

Ultimately the goal with all of this is to respond to http requests with the use of application level middleware, but often there is much to be done before that, such as parsing the body of a post request. When it comes to everything that needs to get done before rendering some kind of response to a request there is router level middleware as well as built in middleware.

## 4 - [Express router level middleware](/2018/05/22/express-routers/)

Router level middleware is what you would want to get into when it comes to offsetting things into independent extremal files.

## 3 - When doing some kind of async task make sure you call next in the right place

When doing some kind of aysnc task, such as reading a file, make sure that you are calling next in the right place.

```js
let express = require('express'),
fs = require('fs'),
app = express();
 
app.use(function (req, res, next) {
 
    req.pack = {};
    fs.readFile('package.json', 'utf8', function (e, json) {
 
        if (e) {
 
            next();
 
        } else {
 
            req.pack = JSON.parse(json);
            next();
 
        }
 
    });
 
});
 
app.get('/', function (req, res) {
 
    res.json(req.pack);
 
});
 
app.listen(8080);
```

in this example I am using the file system module to read the package.json file of the demo I am making for this post. The plain old fs module by itself uses callbacks, it is in that callback where I will be calling next. In other examples that involve promises I would want to call next in a method that is given to then, or catch.

## 4 - Other app example

So I can have a app.js like this:

```js
let express = require('express'),
app = express();
 
app.use(require('./app_two.js')({
        foo: 'bar'
    }));
 
app.listen(8080);
```

That uses another app in another file that is exported like this:

```js
let express = require('express'),
 
otherApp = express();
 
otherApp.get('/', function (req, res) {
 
    res.send('yes this is app two. I have the setting : ' + otherApp.get('foo'));
 
});
 
module.exports = function (options) {
 
    options = options || {};
    otherApp.set('foo', options.foo || 'none');
 
    return otherApp;
 
};
```

### 5 - Conclusion

This post does not do everything that there is to write about with middleware justice, but if you are new to this sort of thing hopefully this post has help gave you a good starting point.