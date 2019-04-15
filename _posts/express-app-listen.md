---
title: App listen method in express and the native node.js alternative
date: 2019-04-15 15:42:00
tags: [express,node.js]
layout: post
categories: express
id: 415
updated: 2019-04-15 16:23:41
version: 1.4
---

In [express.js](https://expressjs.com/) there is the [app.listen](https://expressjs.com/en/api.html#app.listen) convenience method that can be used to get an express app to start listening for requests on a given port. In many projects this express.js app object method will work just find, but in some situations you might want to use the native node.js http or https methods to get your express app up and running. In this post in will be giving some quick examples of app.listen in express.js as well as the [http.createServer](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener) node.js http module method as well.

<!-- more -->

## 1 - App listen method in express

Any Express.js app will involve creating an instance of an app object my calling the main method that is obtained when requiring express in node.js. This app object can then be used to define what is to be done when certain requests are made from a client, and so forth. However in order to get this app up and running and start listening on a port for requests the app.listen method or something else to that effect must be used to start responding to traffic.

One simple way to use the app listen method is to just call it off the instance of the app object and pass an optional port number, and a callback that will fire once the app has started listening.

```js
let express = require('express'),
app = express();
 
app.get('/', function (req, res) {
    res.send('foo');
});
 
// app.listen can be used to have an app listen
// on a given port
app.listen(8080, function () {
    console.log('foo app is up on port 8080');
});
```

Here I am of course just giving a hard coded port number of 8080, but when creating a more serious project that will be deployed the situation will often be different. Often a port number will be passed as an argument, or will be available via an environment variable.

## 2 - In place of app.listen the node.js http.createServer method can be used also

```js
let express = require('express'),
app = express();

app.get('/', function (req, res) {
    res.send('foo');
});
 
// the node.js native http module can be used
// in place of app.listen
let http = require('http');
http.createServer(app).listen(8080, () => {
    console.log('server up')
});;
```