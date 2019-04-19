---
title: Express Middleware
date: 2018-06-25 20:24:00
tags: [js,express,node.js]
layout: post
categories: express
id: 216
updated: 2019-04-19 13:13:40
version: 1.14
---

So after getting into [express.js](https://expressjs.com/) for about a month now, I find myself writing my own [middleware methods](https://expressjs.com/en/guide/using-middleware.html) now. If you do not know what middleware is then this post might be of help. A middleware is a module, or actually even just a method that does something with incoming traffic in an express.js application. There is middleware for doing all kinds of things, like authentication, setting http headers, and parsing cookies just to mention a few things that can be done with middleware. In other words it is a term given to plugins, or extensions for express.js, as by itself I can only do so much. So this is where middleware comes in. 

<!-- more -->

In this post I will be writing about making my own middleware methods, rather than using what is out there. However do look at what is out there for sure, however when making my own app there is going to be a need to write at least a few of my own, so I will be giving some examples here.


## 1 - Express middleware, and what to know before hand.

This is an advanced post on [express.js](https://expressjs.com/), if you are new to express.js or just want to check out what else I have on express you might want to check out my [main post on the subject](/2018/02/12/nodejs-csv-to-json/).

## 2 - Express Middleware basics

So I did write a post on [the basics of express middleware](/2019/04/19/express-middleware-basics/) in which I cover some very basic examples of how to go about writing middleware for an express application. I will go over a quick basic example hear as well though.

### 2.1 - Just a function literal that is used with app.use


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

### 2.2 - When doing some kind of async task make sure you call next in the right place

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

### 2.3 - An array of methods

An array of methods can be given to app.use. This is useful when I need to do something that involves many different steps, as I can break it down into many smaller parts.

```js
let express = require('express'),
fs = require('fs'),
app = express();
 
app.use([
 
        // get a and b, from query string
        // or default to 0
        function (req, res, next) {
 
            req.a = req.query.a || 0;
            req.b = req.query.b || 0;
 
            next();
 
        },
 
        // add a + b
        function (req, res, next) {
 
            req.n = Number(req.a) + Number(req.b);
 
            next();
 
        }
 
    ]);
 
app.get('/', function (req, res) {
 
    res.json({
 
        a: req.a,
        b: req.b,
        n: req.n
 
    });
 
});
 
app.listen(8080);
```

Also I can pull each of these methods into a sepearte file in which I am exporting them, then bring them into this with require.

### 2.4 - Other app example

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

### 3 - Conclusion

This post does not do everything that there is to write about with middleware justice, but if you are new to this sort of thing hopefully this post has help gave you a good starting point.