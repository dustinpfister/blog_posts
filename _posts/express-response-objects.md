---
title: Express response objects
date: 2019-04-27 09:00:00
tags: [express,node.js]
layout: post
categories: express
id: 427
updated: 2019-04-27 10:56:44
version: 1.8
---

An [express response](https://expressjs.com/en/api.html#res) object is one of four possible arguments that is passed to an [express middleware](/2018/06/25/express-middleware/) function. Expressjs has to do with the use of middleware that does something with incoming http requests. So [request objects](/2018/05/26/express-request-objects) have to do with the incoming http request from a client system, and response objects have to do with the response to that system. The other two arguments in an middleware method have to do with error handling, and passing along control to another middleware method. However in this post I will be focusing on just response objects today.

<!-- more -->

## 1 - Express Response and what to know before continuing

In this post I might not go over every property of a express response object, the official documentation does a good job of that. However I will of course be touching base on each of the most important properties and methods of a response object in express. I also assume that you have at least some background with node.js and JavaScript in general. This is also not a getting started post on express, if you are new to express you might want to check out my [main post on express](/2018/06/12/express), as well as by [getting started post on express](/2018/05/21/express-getting-started/).

## 2 - Express response methods

The response methods in a express response object can be used to end an htp request and respond to that request for some kind of data or at least a status of some kind to let the client know what might have went wrong. In this section I will be going over the options when it comes to the response methods in an express response object. In addition I will link to additional posts for each that will go into these methods in further detail as there is much to cover with them.

### 2.1 - Express res.send response method

One of the most simple and easy to use response methods is [res.send method](/2019/04/23/express-send). This comes in handy if I just want to send a string as a response when it comes to simple projects and demos. It might not be the best option when it comes to a more advanced project though, for that I often get into using a template system and the use of express.static.

```js
let express = require('express'),
app = express();
app.get('/', (req, res) => res.send('foo'));
app.listen(8080);
```

If I where to pass an object rather than a string the res.send methods will send json, a number will be recognized as status code but it is not a good idea to use res.send to do so for these tasks. There is of course res.json, and res.sendStatus.

### 2.2 - Express res.render response method

The render express response object method is what can be used in conjunction with template files and a view engine to render html server side, or [express view](/2019/04/25). In this basic example I am [using ejs](/2018/05/25/express-rendering-with-ejs) as a template system, but there are many other options with this as well such as [pug](/2019/04/16/express-pug/).

```js
let express = require('express'),
app = express();
 
app.set('view engine', 'ejs');
 
app.get('/', (req, res) => {
    res.render('index', {});
});
 
app.listen(8080);
```

In the above example I am passing an empty object as the second argument after the name of the template I wan tot use in the view folder. This empty object can contain local variables for the template though that can be used in the rendering process.

### 2.3 - The res.redirect response method

Another way to end a request is to redirect the request to another path, this can be done with the [express redirect](/2019/04/26/express-redirect/) response method.

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res) => {
    res.send('you can not escape me');
});
 
app.get('*', (req, res) => res.redirect('/'));
 
app.listen(8080);
```
