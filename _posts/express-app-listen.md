---
title: App listen method in express and the native node.js alternative
date: 2019-04-15 15:42:00
tags: [express,node.js]
layout: post
categories: express
id: 415
updated: 2021-03-23 14:47:14
version: 1.8
---

In [express.js](https://expressjs.com/) there is the [app.listen](https://expressjs.com/en/api.html#app.listen) convenience method that can be used to get an express app to start listening for requests on a given port. In many projects this express.js app object method will work just find, but in some situations you might want to use the native node.js http or https methods to get your express app up and running. In this post in will be giving some quick examples of app.listen in express.js as well as the [http.createServer](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener) node.js http module method as well.

<!-- more -->

This is not a getting started post with express, node.js, or javaScript in general. If you are new to express, or just want to check out other express.js related topics on this site, then my [main post on expressjs](/2018/06/12/express/) might be a good starting point.

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

If for some reason I need to use the native node.js createServer method in the http or https modules doing so is very easy. I can just pass the app object as the first argument to createServer and then call the listen method of what is returned by create server is more or less the same way as the app listen method in express.

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

## 3 - Using just node.js without express

I will not be getting into how to go about doing just that in detail in this post, if interested I have written a post on using just the [http module](/2018/02/06/nodejs-http/) by itself before. However I will quickly go over just a simple example of using the native node.js method behind app listen here.

```js
let http = require('http'),
port = process.env.PORT || process.env[2] || 8080;
 
// using create server
server = http.createServer(),
 
// handle requests like this
server.on('request', function (req, res) {
    res.end('hello world');
});
 
// listen
server.listen(port, function () {
    console.log('server is up on port: ' + port);
});
```

## 4 - Conclusion

That is it for now when it comes to the app listen method that is used to start a express server script. It is a good idea to always pass a port number as the first argument when calling the method, and a callback for it is also a good idea also as a way to know that the server is up and running when calling the script.

