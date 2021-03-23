---
title: Sending a file with express.js using the response sendFile method
date: 2018-06-13 15:40:00
tags: [js,express,node.js]
layout: post
categories: express
id: 206
updated: 2021-03-23 11:22:50
version: 1.4
---

When making an [express.js](https://expressjs.com/) project there are a few response methods that can be used to respond to a request with some kind of content. All of these methods of interest are in the standard response object that is one of the three arguments when making a function that will be used with an app method like app.get.

In this post I will be writing about the [response send file](http://expressjs.com/en/api.html#res.sendFile) method for just simply sending a file that is to be displayed in the browser. This differs from other methods like the [response download](/2018/06/11/express-response-download/) method that is useful for serving up a file that is to be downloaded to the client as an attachment to the local file system. If I want to make a path where the user will be prompted to download a binary for there operating system I would want to use res.download, but if I just want to display an image file as content to be displayed for a path then I would want to use res.sendFile.

<!-- more -->

## Basic example of the response.sendFile method in express.js

For a basic example of this method I made a simple script that just serves up a single \*.png file. For this demo the only dependency i needed to install is just express.js itself.

```
$ mkdir send-file-demo
$ cd send-file-demo
$ npm init
$ npm install express --save
```

Once express is installed with my demo project folder I quickly put together this demo that serves up a single png file.

```js
let express = require('express'),
path = require('path'),
port = 8080,
app = express();
 
app.get('/', function (req, res) {
 
    // absolute path to the file
    let p = path.join(__dirname, 'img/face1.png');
 
    // send a png file
    res.sendFile(p);
 
});
 
app.listen(port, function () {
 
    console.log('send file demo is up on port: ' + port);
 
});
```

By default the path to the file must be an absolute path, if I want to use a relative path then I need to give a root path with the root option. More on options including root later.

## Options

Like many of these methods there is an options object that can be given to it to set some options for the method.

### Relative paths with the root option

If I want to use relative paths I must give the root path for the relative paths. So in other words if I just want to give a file name for the first argument then I need to set the folder that contains that file with the root option when giving an options object to send file.

```js
app.get('/', function (req, res) {
 
    // send a png file via relative path
    res.sendFile('face1.png', {
 
        root: './img'
 
    });
 
});
```