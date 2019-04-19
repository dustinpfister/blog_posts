---
title: Express Middleware Basics
date: 2019-04-19 12:58:00
tags: [express,node.js]
layout: post
categories: express
id: 419
updated: 2019-04-19 14:42:37
version: 1.2
---

In [express.js](https://expressjs.com/) the concept of middleware is something that should be grasped in order to make significant headway with express applications. If you have fiddled around with express a little so far, chances are you have used some middleware so far without even realizing it. There is some express built in middleware, one example if this would be the express.js body parser, but for the most part express itself is fairly minimal. So as such creating a fairly capable express.js application will involve installing additional middleware, as well as writing original middleware functions. So then in this post I will be covering express middleware basics.

<!-- more -->


## 1 - Express Middleware Basic example

So a middleware method can be just a function that receives arguments for an incoming request, a response, and the next middleware to call after what has been done in the middleware method is completed. This method is then often used with a method like app.use as a way to preform some kind of task involving an incoming http request of one type of another.

```js
let express = require('express'),
app = express();
 
// express middleware basic example
app.use((req, res, next) => {
    req.rnd = Math.random() + '';
    next();
});
 
app.get('/', (req, res) => res.send(req.rnd));
app.listen(8080);
```

## 2 - Express Middleware Functions can be chained

```js
let express = require('express'),
app = express();
// express middleware can be chained like this
app.use(
    (req, res, next) => {
        req.rnd = Math.random();
        next();
    },
    (req, res, next) => {
        req.n = Math.floor(req.rnd * 90) + 10;
        next();
    }
);
app.get('/', (req, res) => res.send(req.n + ''));
app.listen(8080);
```

## 3 -  Express Middleware can be required in from an external javaScript file

```js
let express = require('express'),
app = express();
// express middleware can be required in 
app.use(require('./middleware/getn')());
app.get('/', (req, res) => res.send(req.n + ''));
app.listen(8080);
```

```js
module.exports = () => {
    return (req, res, next) => {
        let x = Math.pow(10, 12);
        req.n = Math.floor(new Date().getTime() + Math.random() * x - (x / 2)) / x;
        next();
    }
};
```