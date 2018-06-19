---
title: Using the express.js helmet.js middleware to set dns prefetch control headers
date: 2018-06-19 11:56:00
tags: [js,express,node.js]
layout: post
categories: express
id: 211
updated: 2018-06-19 12:30:57
version: 1.5
---

When making an [express.js](https://expressjs.com/) application security, and privacy should be of at least some concern. A good start with express might be to check out [helmet.js](https://www.npmjs.com/package/helmet). This express.js middleware is actually a collection of middleware modules that can be used to set some headers that may help to improve security, and privacy to some extent. It is not an end all solution of course, but it might be a good start to say the least. In this post I will be writing about one of the middleware methods that is used to set a header that will disable dns prefetching.

<!-- more -->

## 1 - what to know before hand

This is an advanced post on express.js, and the use of the helmet.js middeware module to help better secure a node.js application. This is not a getting started post on express.js, node.js, javaScript, or any other additional skills required.

### 1.1 - wire shark

I used a well known tool called wireshark to help confirm to myself first hand that setting this browser header does have an effect that can help improve privacy. If you wish to do the same you may want to install it yourself as well if you have not done so before hand. It is a very helpful tool to have at the ready if you really want to get into this sort of thing.

## 2 - Example of helmet dns prefetch control

To make an example of how this works I quickly put together an index.html file that has a few links to some domains. This index.html file is then served up using express.static, but only after I use helmet to set a header called X-DNS-Prefetch-Control. By doing this it stops the browser from prefetching the DNS of the links before hand so that they do not show up from the perspective of an observer using wireshark.

So to do this I will need to set up a demo folder, and install express, and helmet.

```
$ mkdir helmet-prefetch
$ cd helmet-prefetch
$ mkdir public
$ npm init
$ npm install express@4.16.3 --save
$ npm install helmet@3.12.1 --save
```

I put the version numbers in to indicate what versions I am using in this demo, so if you run into problems reproducing this check the version numbers.

### 2.2 - The /public/index.html file

So In the public folder I put together a simple index.html file that I will serve up using express.static. This file just has some outgoing links to some websites.

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

So it is true that if I where to click one of these links the dns would have to be resolved for the domain. However the thing about dns prefetching is that the browser will prefetch the dns of these links even if I do not click on them. I have confirmed this by using wireshark, and sure enough that is the case with the late version of chrome that I am using.

### 2.3 - The app.js file

I this file I am just using helmet with the app.use method. By doing so it will always set the header to off unless I set the allow option for dns prefect control to false.

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

### 2.4 - Starting the app.

When all is done I just stared the app up by the usual way from the command line.

```
$ node app
```

When doing so I then went to localhost:8080 in the browser, to see if it had any effect when looking at what is going on in wireshark. Sure enough setting this header does get chrome to stop preferhing dns, and not it only does so when actually clicking a link as expected.