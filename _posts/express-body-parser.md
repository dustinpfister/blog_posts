---
title: The express.js body parser
date: 2018-05-27 08:51:00
tags: [js,express,node.js]
layout: post
categories: express
id: 196
updated: 2018-05-27 21:21:55
version: 1.3
---

Being able to parse a payload given to a node.js back end typically via a post request is a very common task when doing something with [express.js](https://expressjs.com/). As such there is a built in way to quickly dpo this thanks to the body-parser module that is included with every express.js install. In order to get into body parsing it is necessary to put together at least a basic full stack application. So in this post I will be giving a an example that included both front and back end code, but I will be mostly covering the body parser module.

<!-- more -->

## An express.js Body Parser example

In this example I will of course be using express.js as a node.js back end framework, but I will also be installing ejs as a rendering engine. In terms of npm packages that is all that I installed in my demo folder. Everything else I used in this demo is just my own vanilla code. In a more advanced project I might be using additional javaScript projects like angular, and mongoose, but I do not want to take the focus away from express.js at least not in this post.


```
$ mkdir body-parser
$ cd body-parser
$ npm init
$ npm install express@4.16.3
$ npm install ejs@2.6.1
$ mkdir public
$ mkdir routes
$ mkdir views
```

## The routes folder

It has become standard practice to always have a routes folder in which I am using routers to help better manage paths when making an express application. In this demo I am using a separate javaScript file for both json and text paths that will serve as two separate examples of using the body parser to parse json, and plain old text given from the client system.

### /routes/static.js

The static routes file is where I define my plain old static paths, with this demo I am just adding a static js folder in the public folder at the root of the project file system. Inside this js folder is where I will place javaScript files that will compose my simple crude client system for the sake of this demo. More on the front end code later.

```js
let express = require('express');
 
// the router
router = module.exports = express.Router();
 
// a static js path in public
router.use('/js', express.static('public/js'));
```

### /routes/json.js

In the routes folder I have a json.js file that will serve as an example of using the body parser to parse json given from a client system via a post request. This file will be used in my main app.js file at the root of the project folder to create a json path by mounting what I am doing inside this file to a json path there in app.js.

```js
let express = require('express'),
bodyParser = require('body-parser'),
 
// the router
router = module.exports = express.Router();
 
// using body parser for req.body
router.use(bodyParser.json());
 
router.get('/', function (req, res) {
 
    res.render('index', {
 
        layout: 'json'
 
    });
 
});
 
// post request
router.post('/', function (req, res) {
 
    var data = {
        mess: 'yes this is dog.',
        body: req.body
    };
 
    if (req.body.action) {
 
        if (req.body.action === 'foo') {
 
            data.mess = 'bar';
 
        }
 
    }
 
    res.json(data);
 
});
```

## The main app.js of this demo

Here in the main app.js file that I can start with node in the command line is where I will add in what I am doing in the routes folders

```js
let express = require('express'),
path = require('path'),
app = express(),

// getting port this way
port = process.env.PORT || process.argv[2] || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// using what is in the routes folder
app.use('/', require('./routes/static'));
app.use('/json', require('./routes/json'));
app.use('/text', require('./routes/text'));
 
app.get('/', function (req, res) {
 
    res.render('index', {});
 
});
 
app.listen(port, function () {
 
    console.log('request object demo is up on port: ' + port);
 
});
```

## the public/js folder

### http.js

```js
// just wrapping document.getElementById
var g = function (id) {
 
    return document.getElementById(id);
 
};
 
// my http method
var http = function (argu, done, fail) {
 
    var xhr = new XMLHttpRequest();
 
    // if first argument is a string, assume it is a url for a get request
    if (typeof argu === 'string') {
 
        argu = {
            url: argu
        }
 
    }
 
    // use given argu object or default to an empty object
    argu = argu || {};
 
    // default method is GET, payload is null, and URL is location.href
    argu.method = argu.method || 'GET';
    argu.playload = argu.payload === undefined ? null : argu.payload;
    argu.url = argu.url || location.href;
 
    // default done and fail callbacks
    argu.done = done || argu.done || function (res) { console.log(res);};
    argu.fail = fail || argu.fail || function () {};
 
    // given, or default beforeSend method
    argu.beforeSend = argu.beforeSend || function (xhr, next) {
 
        // if POST request, assume JSON
        if (argu.method.toUpperCase() === 'POST') {
 
            xhr.setRequestHeader('Content-type', 'application/json');
 
            // custom send that uses JSON
            argu.send = function (xhr,argu) {
 
                xhr.send(JSON.stringify(argu.payload));
 
            };
 
        }
 
        next();
    };
 
    // given or default send method
    argu.send = argu.send || function (xhr,argu) {
 
        // just send
        xhr.send(argu.payload);
 
    };
 
    // open the request
    xhr.open(argu.method, argu.url, true);
 
    // setup on ready state method to call done or fail methods
    xhr.onreadystatechange = function () {
 
        if (this.readyState === 4) {
 
            if (this.status === 200) {
 
                argu.done.call(this, this.response);
 
            } else {
 
                argu.fail.call(this);
 
            }
 
        }
 
    };
 
    // call before send, and send request
    argu.beforeSend(xhr, function () {
 
        argu.send(xhr,argu);
 
    });
 
};
```

### body-json.js

```js
g('app_send').addEventListener('click', function (e) {
 
    http({
        url: '/text',
        method: 'POST',
        payload: 'foo',
        beforeSend: function (xhr, next) {
 
            xhr.setRequestHeader('Content-type', 'text/plain');
            next();
 
        }
    }, function (res) {
 
        g('app_out').value += res + '\n\n';
 
    });
 
});
```

### body-text.js

```js
g('app_send').addEventListener('click', function (e) {
 
    http({
        url: '/json',
        method: 'POST',
        payload: {
 
            action: 'foo'
 
        }
    }, function (res) {
 
        g('app_out').value += res + '\n\n';
 
    });
 
});
```

## The views folder

### _parts/nav.ejs

```
<div class="wrap_nav">
 
   <span>
   
       <a href="/">HOME</a>
       <a href="/json">JSON</a>
       <a href="/text">TEXT</a>
   
   </span>
 
</div>
```

### _layouts home.ejs, json.ejs, and text.ejs

views/_layouts/home.ejs
```
<h2>Home</h2>
<p>These are some express.js body parser demos.</p>
```

views/_layouts/json.ejs:
```
<h2>JSON</h2>
 
<input id="app_send" type="button" value="post"><br>
<textarea id="app_out" rows="20" cols="60"></textarea>
 
<script src="/js/body-json.js"></script>
```

views/_layouts/text.ejs:
```
<h2>text</h2>
 
<input id="app_send" type="button" value="post"><br>
<textarea id="app_out" rows="20" cols="60"></textarea>
 
<script src="/js/body-text.js"></script>
```

### index.ejs

```
<%
 
   if(!this.layout){
   
       this.layout = 'home';
   
   }
 
%>
 
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Request Objects</title>
        <meta charset="utf-8">
    </head>
    <body>
 
        <%= layout %>
        <%- include('_parts/nav') %>
 
        <script src="/js/http.js"></script>
 
        <%- include('_layouts/' + layout) %>
 
    </body>
</html>
```