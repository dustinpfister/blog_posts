---
title: Express Middleware Example Read and Write to a file
date: 2019-04-22 11:34:00
tags: [express,node.js]
layout: post
categories: express
id: 422
updated: 2019-04-22 16:10:18
version: 1.4
---

So there is a lot to write about concerning [express middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application), I have all ready covered the [basics of middleware in express](/2019/04/19/express-middleware-basics/), and I have a post on [express middleware in general](/2018/06/25/express-middleware/) as well. However in this post I thought I would focus on application level middleware specifically.

<!-- more -->

## 1 - Application level Express Middleware

In express application level middleware is when an app object method like app.use or app.get is used to attach on eor more methods thar are used to respond to incoming http requests. This differers slightly from router level middleware, or built in middleware, but all middleware has to do with handling incoming traffic and requests from client systems.

## 1 - App.get

A simple example of application level middleware in  express would be something just useing the app.get method to respond to GET http requests to a certain path. 

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res) => res.json('foo'));
 
app.listen(8080);
```

Just call app.get pass the path or pattern to attach to, and then the middleware in the form of a function or array of functions involving used the next callback to move between them.

## 2 - App.all

```js
let express = require('express'),
app = express();
 
app.all('*', (req, res, next) => {
    if (req.method === 'GET') {
        res.send('foo');
    } else {
        next();
    }
});
 
app.all('*', (req, res) => {
    res.sendStatus(404);
});
 
app.listen(8080);
```

## 3 - App.all vs app.use

```
let express = require('express'),
app = express();
 
app.use((req, res, next) => {
    req.n = 42;
    next();
});
 
app.all('*', (req, res, next) => res.send(req.n + ''));
 
app.listen(8080);js
```