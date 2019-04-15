---
title: App listen method in express and the native node.js alternative
date: 2019-04-15 15:42:00
tags: [express,node.js]
layout: post
categories: express
id: 415
updated: 2019-04-15 16:08:39
version: 1.1
---

In express.js there is the app.listen convenience method that can be used to get an express app to start listening for requests on a given port. In many projects this express.js app object method will work just find, but in some situations you might want to use the native node.js http or https methods to get your express app up and running. In this post in will be giving some quick examples of app.listen in express.js as well as the http.createServer node.js http modules methods as well.

<!-- more -->

## 1 - App listen method in express

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