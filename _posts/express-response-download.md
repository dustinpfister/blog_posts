---
title: Managing file downloads in express with the response download method
date: 2018-06-11 11:01:00
tags: [js,express,node.js]
layout: post
categories: express
id: 204
updated: 2018-06-11 11:15:19
version: 1.2
---

As I continue expanding on [express.js](https://expressjs.com/) this month today I thought I would write about the response download method, which is one of the many methods in express that are part of the standard response object that I might more about this week. This method is useful if you want to have some kind of path that will work as a way to deliver a file as a download when a link is clicked, or something to that effect. It is very easy to use, you do not have to worry about setting the proper headers or anything like that it does it all for you so all that has to be done basicly is to just call a method in the response object.

<!-- more -->


## Basic example of res.download in express.js

For a basic example I have just a single file called doc1.txt in a folder called docs in the root of my demo folder. For this demo the only dependency that is needed is express itself.

```
$ mkdir response-download
$ cd response-download
$ npm init
$ npm install express --save
$ mkdir docs
```

### The app.js file for the basic example of res.download in express.js

This demo has just one javaScript file that is of course the main app.js file that will be started with node in the command line to start the demo. I am just setting up two paths. One path for the root name space of the app, that will provide a link to a path that will result in a file download, and the other is that path that will result in the download.

```js
let express = require('express'),
path = require('path'),
port = process.env.PORT || process.argv[2] || 8080,
app = express();
 
app.get('/', function (req, res) {
 
    res.send('<a href="/getdoc">get a doc</a>');
 
});
 
app.get('/getdoc', function (req, res) {
 
    res.download(path.join(__dirname, 'docs/doc1.txt'), function (err) {
 
        console.log(err);
 
    });
 
});
 
app.listen(port, function () {
 
    console.log('response-download demo is up on port: ' + port);
 
});
``