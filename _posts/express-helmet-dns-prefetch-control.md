---
title: Using the express.js helmet.js middleware to set dns prefetch control headers
date: 2018-06-19 11:56:00
tags: [js,express,node.js]
layout: post
categories: express
id: 211
updated: 2018-06-19 12:12:13
version: 1.1
---

When making an [express.js](https://expressjs.com/) application security, and privacy should be of at least some concern. A good start with express might be to check out [helmet.js](https://www.npmjs.com/package/helmet). This express.js middleware is actually a collection of middleware modules that can be used to set some headers that may help to improve security, and privacy to some extent. It is not an end all solution of course, but it might be a good start to say the least. In this post I will be writing about one of the middleware methods that is used to set a header that will disable dns prefetching.

<!-- more -->

## 1 - what to know before hand

This is an advanced post on express.js, and the use of the helmet.js middeware module to help better secure a node.js application. This is not a getting started post on express.js, node.js, javaScript, or any other additional skills required.

## 1.1 - wire shark

I used a well known tool called wireshark to help confirm to myself first hand that setting this browser header does have an effect that can help improve privacy. If you wish to do the same you may want to install it yourself as well if you have not done so before hand. It is a very helpful tool to have at the ready if you really want to get into this sort of thing.

## 2 - Example of helmet dns prefetch control

## 2.2 - The /public/index.html file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>HELMET</title>
    <meta charset="utf-8">
    <link rel="dns-prefetch" href="http://localhost:8080" >
  </head>
  <body>
    <h1>helmet prefetch demo</h1>
    <a href="http://www.infowars.com">infowars</a><br>
    <a href="http://www.rightwingwatch.org/">right wing watch</a>
  </body>
</html>
```

## 2.3 - The app.js file

```js
let express = require('express'),
app = express();
 
// use dns prefetch control
app.use(require('helmet')({
    dnsPrefetchControl:{allow: false}
}));
 
// logg set response headers
app.use(function (req, res, next) {
 
    console.log(res.getHeaders());
 
    next();
 
});
 
app.use('/', express.static('public'));
 
app.listen(8080, function () {
 
    console.log('helmet-prefetch demo is up on port ' + 8080);
 
});
```

