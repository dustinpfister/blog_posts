---
title: Express Middleware Example Read and Write to a file
date: 2019-04-22 11:34:00
tags: [express,node.js]
layout: post
categories: express
id: 422
updated: 2021-03-24 10:24:53
version: 1.11
---

In this post I thought I would focus on application level middleware specifically when working with [expressjs](/2018/06/12/express/) as a server side framework in nodejs. In other words the middleware that I myself make, for a specific application, rather than just using what is built into express itself.

So there is a lot to write about concerning [express middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application), I have all ready covered the [basics of middleware in express](/2019/04/19/express-middleware-basics/) in a previous post and I have a post on [express middleware in general](/2018/06/25/express-middleware/) that is serving as a central point for this topic.

<!-- more -->

## 1 - Application level Express Middleware

In express application level middleware is when an app object method like app.use or app.get is used to attach one or more methods that are used to respond to incoming http requests. This differers slightly from router level middleware, or built in middleware, but all middleware has to do with handling incoming traffic and requests from client systems.

## 1 - App.get

A simple example of application level middleware in express would be something just using the [app.get method](/2018/06/20/express-get/) to respond to GET http requests to a certain path. The get method has to use cases in express actually, if it is just given a string as a first argument it can be used to get an application setting, but for the sake of the topic of middleware the use case in question is to give two arguments. The first is a path to attach for, and the second is the middleware to use for that path.

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res) => res.json('foo'));
 
app.listen(8080);
```

Just call app.get and pass the path or pattern to attach to, then pass the middleware in the form of a function or array of functions. Each function will then be passed a request object as the first argument, and a response object as the second argument, and in situations in which there is an array of functions, or for some reason I want to continue to the next middleware in line there is also a next argument that can be used as a third argument in a middleware function.

## 2 - App.all

Another application level express middleware example would be the use of the app.all method that can be used to respond to all types of http requests regardless if they are GET, POST, HEAD, and so forth requests. The app.all method differs slightly from that of the app.use method, more on that and how it compares to app.all later in this post.

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

## 3 - App.all vs app.use when using paths

For the most part the app.all, and app.use methods work the same way, but with some significant differences. Maybe the most significant thing to mention is the way that they respond to path pattrens with the given middlewares are attached to with them. With the app.use method the middleware will be used when a request matches the path give or any nested path within that path as well, while the app.all method will not.

```
let express = require('express'),
app = express();
 
app.use('/foo', (req, res, next) => {
    req.a = 40;
    next();
});
 
app.all('/foo', (req, res, next) => {
    req.b = 2;
    next();
});
 
app.all('*', (req, res, next) => {
    req.a = req.a || 0;
    req.b = req.b || 0;
    res.send(req.a + req.b + '');
});
 
app.listen(8080);
 
// http://localhost:8080/         <-- 0
// http://localhost:8080/foo      <-- 42
// http://localhost:8080/foo/bar  <-- 40
```

## 4 - Conclusion

In this post I just covered some very basic examples of application level middleware, however in real examples this topic can end up getting a little involved. I have not been doing a lot of work with express these days, but the reason why is mainly because I am not doing that much back end programing in nodejs, or at all in any environment for that matter. If I ever do get around to making some kind of actual project with express it would be nice to expand this post with some more real examples of application level middleware in express.

