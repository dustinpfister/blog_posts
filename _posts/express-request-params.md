---
title: Params in express
date: 2021-03-26 13:41:00
tags: [express,node.js]
layout: post
categories: express
id: 832
updated: 2021-03-26 14:14:17
version: 1.5
---

When working out what a [path should be for some expressj middleware](https://expressjs.com/en/guide/routing.html) it is possible to make use of some parameters for paths. These parameters are a way to make it so that a part of a path is a kind of parameter, the value of which can then in turn be obtained in a request object property called req.params. 

For example say that you have a folder that contains a whole collection of project folders. With that said lets say you want to create an express script where there will be an examples path, and then there can be a folder name that will correspond with s folder name in this examples folder. In each example folder there is a file that I would like to send for the project folder when that path is requested. One way to go about doing so would be to make use of these path parameters.

So then in todays express post I will be going over just a few quick, simple, examples of path parameters.

<!-- more -->

## 1 - Basic params path example

To start out with how about a simple copy and past example that will just be a single app.js file. When it comes to this example I start out by just requiring in express and creating an app object just like any other express.js project.

```js
let express = require('express'),
app = express();
 
// getting port this way
app.set('port', process.env.PORT || process.argv[2] || 8080 );
 
app.get('/', (req, res) => {
   let exampleName = 'the_foo_project';
   res.send('<a href=\"/examples/' + exampleName + '\">' + exampleName + '</a>');
});
 
// a single path for /
app.get('/examples/:exampleName', (req, res) => {
    res.send('example Name: ' + req.params.exampleName);
});
 
// listen on the port app setting
app.listen(app.get('port'), () => {
    console.log('app is up on port: ' + app.get('port') );
});
```

## 2 - Having an examples folder

```js
let express = require('express'),
path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir),
readFile = promisify(fs.readFile),
app = express();
 
// getting port this way
app.set('port', process.env.PORT || process.argv[2] || 8080 );
 
app.get('/', (req, res) => {
    readdir(path.resolve(__dirname, 'examples'))
    .then((folders) => {
        let html = '';
        folders.forEach((folderName)=>{
            html += '<a href=\"/examples/' + folderName + '\">' + folderName + '</a><br>';
        });
        res.send(html);
    })
    .catch((e) => {
        res.send(e.message);
    });
});
 
// a single path for /
app.get('/examples/:exampleName', (req, res) => {
    readFile(path.resolve(__dirname, 'examples', req.params.exampleName, 'outline.txt'))
    .then((text)=>{
        res.send('<pre>' + text + '</pre>');
    })
    .catch((e)=>{
        res.send(e.message);
    });
});
 
// listen on the port app setting
app.listen(app.get('port'), () => {
    console.log('app is up on port: ' + app.get('port') );
});
```
