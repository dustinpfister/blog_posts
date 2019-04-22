---
title: Express Middleware Example Read and Write to a file
date: 2019-04-22 11:34:00
tags: [express,node.js]
layout: post
categories: express
id: 422
updated: 2019-04-22 16:07:25
version: 1.3
---

So there is a lot to write about concerning [express middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application), I have all ready covered the [basics of middleware in express](/2019/04/19/express-middleware-basics/), and I have a post on [express middleware in general](/2018/06/25/express-middleware/) as well. However in this post I thought I would focus on application level middleware specifically.

<!-- more -->

## 1 - Application level Express Middleware

In express application level middleware is when an app object method like app.use or app.get is used to attach on eor more methods thar are used to respond to incoming http requests. This differers slightly from router level middleware, or built in middleware, but all middleware has to do with handling incoming traffic and requests from client systems.

## 1 - App.get

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res) => res.json('foo'));
 
app.listen(8080);
```

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