---
title: Network Pointers Express Example
date: 2021-03-25 16:46:00
tags: [express,node.js]
layout: post
categories: express
id: 831
updated: 2021-03-25 17:09:03
version: 1.6
---

I would like to make at least a few simple [express.js examples](/2019/04/30/express-example/) just for the sake of making a few actual projects with the framework. There is learning the basics of working with express, or any framework for that matter, but sooner or later I have to make a few actual projects with it or move on to something else.

This express.js example aims to just be a simple little projects that is not intended to be used in production, but just a simple silly little thing to have up and running on a local network for a little while. The idea here is to make use of nodejs, express, ejs, and express session, to just have a simple little canvas powered client system with little pointer circles in it. Each circle in the canvas is a client currently connected to the server on the local network.

I am going to be keeping this example simple in the sense that I am not going to be doing anything fancy with authentication, making use of a database and so forth. When it comes to session storage I am just going to be using the default memory store. However I think that doing so is okay sense I intend for this to just be a simple little thing that will only have a few computers connected to it at any given time, and it is just going to be a simple little think where there is just serves as a crude starting point for something that will end up getting very complicated when it comes to making this into some kind of real project.

<!-- more -->

## 1 - The public folder

First off I will be starting with the public folder that will be at the root of the project folder. In here I have a javaScript folder that will contain a few javaScript files that will compose the client system.

### 1.1 - The /public/js/http.js file that will be my simple http client

I have an http.js file that will serve as my custom http client for this project.

```js
var sendObject = function(obj, done){
    obj = obj || {};
    obj.action = obj.action || 'info_request';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/', true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            //document.getElementById('out').innerHTML = this.response;
            done.call(this, this.response, obj);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(obj));
};
 
var sendDeltaObject = function(obj, done){
    obj = obj || {};
    done = done || function(){};
    obj.action = obj.action || 'delta';
    obj.deltaY = opt.deltaY || 0;
    obj.deltaX = obj.deltaX || 0;
    sendObject(obj, done);
};
```

### 1.2 - utils.js

```js
var utils = {};
// create a canvas
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// save a state
utils.save = function(appName, slotID, state){
    var key = appName + '-' + slotID;
    var str = JSON.stringify(state);
    localStorage.setItem(key, str);
};
// load a state
utils.load = function(appName, slotID){
    var key = appName + '-' + slotID;
    var str = localStorage.getItem(key);
    if(str){
        try{
            return JSON.parse(str);
        }catch(e){
            return false;
        }
    }
    return false;
};
```

### 1.3 - client.js 

```js
// set up canvas
var canvasObj = utils.createCanvas({
    width: 320,
    height: 240
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
 
// info object
var save = utils.load('network_pointers', 0);
save = save || {};
var infoObj = {
    action: 'info',
    name: save.name || 'user_' + (1 + Math.floor(Math.random() * 9998))
};
 
// update
var update = function(res, obj){
   var obj = JSON.parse(res);
   ctx.fillStyle = 'black';
   ctx.fillRect(0,0, canvas.width, canvas.height);
   ctx.strokeStyle = 'white';
   Object.keys(obj.pointers).forEach(function(key){
       var pt = obj.pointers[key];
       ctx.fillStyle = 'blue';
       ctx.beginPath();
       ctx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
       ctx.stroke();
       ctx.fill();
       ctx.fillStyle = 'white';
       ctx.textAlign = 'center';
       ctx.fillText(pt.name, pt.x, pt.y);
   });
};
 
// info loop
var loop = function(){
    sendObject(infoObj, update);
    setTimeout(loop, 3000);
};
loop();
 
// set name
var setName = document.getElementById('set_name');
setName.value = infoObj.name;
setName.addEventListener('change', function(e){
    infoObj.name = e.target.value;
    var save = {
        name: infoObj.name
    };
    utils.save('network_pointers', 0, save);
});
```

### 1.4 - style.css

```css
body{
  background: white;
}
.wrap_main{
  padding: 10px;
  background: #2a2a2a;
  color: #ffffff;
  margin-left:auto;
  margin-right:auto;
  width:90%;
}
.wrap_header{
  padding: 10px;
  text-align:center;
  min-height:150px;
  background:#5a5a5a;
}
.wrap_content{
  margin-top:10px;
  padding: 10px;
  text-align:center;
  min-height:150px;
  background:#8a8a8a;
}
```

## 2 - The ejs files

### 2.1 - index.ejs

```
<!doctype html>
<html lang="en">
<head>
    <title>Express EJS and static file hosting.</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/style.css">
    <script src="/js/utils.js"></script>
    <script src="/js/http.js"></script>
</head>
<body>
    <div class="wrap_main">
        <div class="wrap_header">
            <h1>EXpress EJS Demo</h1>
        </div>
        <div class="wrap_content">
            <%- include('layouts/'+ layout +'.ejs') %>
        </div>
    </div>
</body>
```


### 2.2 - home

```
<h1>Client</h1>
 
<input id="set_name" type="text" ><br><br>
<div id="canvas-app"></div>
<script src="/js/client.js"></script>
```

### 2.3 - 404

```
<h1>404 Page not found</h1>
<p>The page was not found</p>
```

## 3 - The main app.js file

```js
let express = require('express'),
session = require('express-session'),
path = require('path'),
app = express();
 
// pointer max age in seconds
app.set('pointer_age', 30);
 
// getting port this way
app.set('port', process.env.PORT || process.argv[2] || 8080 );
app.set('public_html', path.resolve( __dirname, 'public') );
 
// view engine setup
app.set('view engine', 'ejs'); // the render engine
app.set('views', path.resolve( __dirname, 'views') ); // the views folder for the *.ejs files
 
// use express session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    name: '_network_pointer_id',
    secret: '1234',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: app.get('pointer_age') * 1000 }
}));
 
// the collection of pointers
let pointers = {};
 
// create a new pointer
let createPointer = function(sessionID, name){
    return pointers[sessionID] = {
        x: 10 + Math.random() * 300,
        y: 10 + Math.random() * 220,
        name: name,
        made: new Date()
    };
};
 
// get a pointer for the given sessionID,
// or create and return a new one if not there
let getPointer = function(sessionID, name){
   if(pointers[sessionID]){
      return pointers[sessionID];
   }
   return createPointer(sessionID, name);
};
 
// purge old objects
let purgeOld = () => {
    let now = new Date();
    Object.keys(pointers).forEach((key) => {
        let pt = pointers[key],
        t = now - pt.made;
        if(t > app.get('pointer_age') * 1000){
            delete pointers[key];
        }
    });
};
 
// one main middleware for / using express.static and res.render
app.use('/', express.static( app.get('public_html') ));
 
// get request for / and only /
app.get('/', (req, res, next) => {
    if(req.url === '/'){
        res.render('index', {layout: 'home' });
    }else{
        next();
    } 
})
 
// post requests to /
app.use('/', express.json());
app.post('/', [
    // get pointer
    (req, res, next) => {
        // purge any old objects
        purgeOld();
        // get the pointer for the current session
        req.pointer = getPointer(req.sessionID, req.body.name);
        next();
    },
    // if info action
    (req, res, next) => {
        if(req.body.action === 'info'){
           res.json({
               action: 'info',
               pointer: req.pointer,
               sessionID: req.sessionID,
               pointers: pointers,
               body: req.body
           });
        }else{
            next();
        }
    },
    // action now known
    (req, res, next) => {
        // unkown action
        res.json({
               action: 'unkown'
        });
    }
]);
 
// 404
app.get('*', function(req, res){
    res.render('index', {layout: '404' });
});
 
// listen on the port app setting
app.listen(app.get('port'), function () {
    console.log('app is up on port: ' + app.get('port'));
});
```