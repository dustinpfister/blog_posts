---
title: Express Middleware Basics
date: 2019-04-19 12:58:00
tags: [express,node.js]
layout: post
categories: express
id: 419
updated: 2021-12-28 09:27:24
version: 1.10
---

In [express.js](https://expressjs.com/) the concept of [middleware](https://expressjs.com/en/guide/using-middleware.html) is something that should be grasped in order to make significant headway with express applications. If you have fiddled around with express a little so far, chances are you have used some middleware so far without even realizing it. There is some express built in middleware, one example if this would be the express.js body parser, but for the most part express itself is fairly minimal. So as such creating a fairly capable express.js application will involve installing additional middleware, as well as writing original middleware functions. So then in this post I will be covering express middleware basics.

<!-- more -->

## 1 - Express Middleware Basic example

So a middleware method can be just a function that receives arguments for an incoming request, a response, and the next middleware to call after what has been done in the middleware method is completed. This method is then often used with am express app object method like [app.use](/2018/06/18/express-app-use/) as a way to preform some kind of task involving an incoming http request of one type of another.

So for a very basic example here is a quick express app that just appends an rnd property to the request object of an incoming http request that is then used to render an incoming get request to the root name space.

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

All middleware does something like this, that is creating a property that is to then be used elsewhere, set a response header, get some information from a database or so forth. Once the task is complated the next method is called to continue the flow forward to the next middleware method or path.

## 2 - Express Middleware Functions can be chained

More than one middleware method can be passed to the app.use method in the form of two or more arguments. It is always generally a good idea to break things down, and make things more fine grain. In other words breaking down a complex task into many smaller tasks that are to be preformed in a certain sequence rather than doing everything in a single method.

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

They can also be group together as an array of methods as well.

```js
let express = require('express'),
fs = require('fs'),
app = express();
 
app.use([
        (req, res, next)=> {
            req.a = req.query.a || 0;
            req.b = req.query.b || 0;
            next();
        },
        (req, res, next)=> {
            req.n = Number(req.a) + Number(req.b);
            next();
        }
 
    ]);
 
app.get('/', (req, res)=> {
    res.json({
        a: req.a,
        b: req.b,
        n: req.n
    });
 
});
app.listen(8080);
```

Breaking things down into separate functions is one thing, but it is also a good idea to keep things in separate files as well. 

## 3 -  Express Middleware can be required in from an external javaScript file

It is also possible to define the logic of an express middleware method in an external javaScript file and then export it. That middleware can then be used in an express app by using require. There is more than one way to go about doing this but the most basic form would be to just export a function that is written in the same way as any other middleware function as shown in the previous examples.

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

## 4 - Conclusion

If you found this post helpful, and would like to read into some more advanced topics when it comes writing middleware be sure to check out my [main post on express middleware](/2018/06/25/express-middleware/). For more on express in general you might want to check out my [main post on expressjs](/2018/06/12/express/).