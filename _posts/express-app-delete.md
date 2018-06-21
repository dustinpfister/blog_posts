---
title: Using app.delete, to delete a server side file via the http delete method in express.
date: 2018-06-21 12:10:00
tags: [js,express,node.js]
layout: post
categories: express
id: 213
updated: 2018-06-21 15:25:15
version: 1.8
---

Today for my quick morning post on [express.js](https://expressjs.com/) I wanted to start taking a look at some of the other http request methods other than get, and post. So for today I put together a quick demo that makes use of the app.delete method.

<!-- more -->

## 1 - what to know before hand

This is a post on the app.delete method of the app object in express.js. This is a method that is used to define logic that is used to handle http 1.1 delete requests. This is not a getting started post on express.js, or any additional skills that are required before hand to get something of value from this. If you are new to express you might want to check out my [main post on express](/2018/06/12/express/).

## 2 - Setup

The setup process was not all that different from many of my other examples on express. I just created a new folder, made it the current working folder. I also made a public folder to house a simple static client with express.static. Also I set up a routes folder as a way to keep things a little more organized compared to having everything in the main app.js file.

```
$ mkdir app-delete
$ cd app-delete
$ mkdir public
$ mkdir routes
$ npm init
$ npm install express --save
```

## 3 - The public folder

The public folder will hold the crude yet effective client system for this example. It consists of just an index.html file, and a single client.js file that will house my front end javaScript code.

### 3.1 - The /public/index.html

Just a simple html file that will have a textarea message that can be used to define some text that will then be posed to the back end when clicking a post button element. It will also have another button that will make a delete request as well. The javaScript that will power all of this on the front end will be in a client.js file that will be used in the index via a script tag.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>express demo</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1>app.delete</h1>
 
    <!-- text input and post button -->
    <textarea id="text" rows="10" cols="80"></textarea><br>
    <input id="post" type="button" value="post">
    <input id="delete" type="button" value="delete">
 
    <script src="client.js"></script>
  </body>
</html>
```

### 3.2 - The /public/client.js

This file will house the front end javaScript of the example. For the purpose of this simple example I did not choose to use or do anything fancy, or modern. I just used the good old tired yet true XMLHttprequest to make the requests from the browser.

This file includes methods for making a get request for the file, making a post request to create or overwrite the file, and of course a method to make the delete request.

```js

// warping document.getElementById
var get = function (id) {
 
    return document.getElementById(id);
 
};
 
// get the file
var getFile = function () {
 
    var xhr = new XMLHttpRequest();
 
    xhr.open('get', '/file');
 
    xhr.onreadystatechange = function () {
 
        if (this.readyState === 4) {
 
            console.log(this.response);
 
            try {
 
                var data = JSON.parse(this.response);
                get('text').value = data.text;
 
            } catch (e) {
 
                console.log(e.message);
                get('text').value = e.message;
 
            }
 
        }
 
    };
 
    xhr.send(null);
 
};
 
// send a delete request
var deleteFile = function (e) {
 
    var xhr = new XMLHttpRequest();
 
    xhr.open('delete', '/file');
 
    xhr.onreadystatechange = function () {
 
        if (this.readyState === 4) {
 
            console.log('status: ' + this.status);
            console.log(this.response);
 
            // confirm
            getFile();
 
        }
 
    };
 
    xhr.send(null);
 
};
 
// send a post request
var sendPost = function (e) {
 
    var xhr = new XMLHttpRequest();
 
    xhr.open('post', '/post');
    xhr.setRequestHeader('Content-Type', 'application/json');
 
    xhr.onreadystatechange = function () {
 
        if (this.readyState === 4) {
 
            console.log(this.response);
            getFile();
 
        }
 
    };
 
    //xhr.send(JSON.stringify({mess: 'i am the egg man.'}));
    //xhr.send(null);
    xhr.send(JSON.stringify({
            mess: get('text').value
        }));
 
};
 
// attach
get('post').addEventListener('click', sendPost);
get('delete').addEventListener('click', deleteFile);
 
// first get
getFile();
```

## 4- The routes folder

### 4.1 - The /routes/post.js file

```js
let express = require('express'),
path = require('path'),
fs = require('fs'),
 
app = module.exports = express();
 
app.use(require('body-parser').json());
 
app.post('/post',
 
    // check body
    function (req, res, next) {
 
        if (req.body) {
 
            if (req.body.mess) {
 
                next();
 
            }else{
 
                res.json({
 
                    mess: 'no message given',
                    body: req.body
 
                });
 
            }
 
        }else{
 
            res.json({
 
                mess: 'no body parsed',
                body: req.body
 
            });
 
        }
 
    },
 
    // write file
    function (req, res) {
 
        fs.writeFile(path.join(__dirname, 'file.txt'), req.body.mess, 'utf8', function (e) {
 
            var mess = 'looks good';
            if (e) {
 
                mess = e.message;
 
            }
 
            // respond
            res.json({
 
                mess: mess,
                body: req.body
 
            });
 
        });
 
    }
 
);
```

### 4.2 - The /routes/file.js file

```js
let express = require('express'),
path = require('path'),
fs = require('fs'),
 
app = module.exports = express();
 
app.set('file-path', path.join(__dirname, 'file.txt'));
app.set('mess', 'foo');
 
app.get('/file',
 
    // read file if there
    function (req, res, next) {
 
    fs.readFile(app.get('file-path'), 'utf8', function (e, data) {
 
        if (e) {
 
            app.set('mess', e.message);
            next();
 
        } else {
 
            res.json({
 
                mess: 'got the file',
                text: data.toString()
 
            })
 
        }
 
    });
 
},
 
    // if this far
    function (req,res) {
 
    res.json({
 
        mess: app.get('mess'),
        text: ''
 
    })
 
});
```

### 4.3 - The /routes/delete.js file

```js
let express = require('express'),
path = require('path'),
fs = require('fs'),
 
app = module.exports = express();
 
app.set('file-path', path.join(__dirname, 'file.txt'));
app.set('mess', '');
 
app.delete ('/file', function (req, res, next) {
 
    fs.unlink(app.get('file-path'), function (e) {
 
        if (e) {
 
            app.set('mess', e.message);
            next();
 
        } else {
 
            res.json({
 
                mess: 'file deleted',
                path: app.get('file-path')
 
            });
 
        }
 
    });
 
}, function (req, res) {
 
    res.json({
 
        mess: app.get('mess')
 
    });
 
});
```

## 5 The app.js file

Because I have placed the bulk of the examples logic off into the additional files in the route folder, the size of my main app.js file is very small. Here I am just using app.use to use each of the route files to handle GET requests for file.txt, post requests to create or overwrite file.txt, and delete requests to delete file.txt.

```js
let express = require('express'),
 
app = express();
 
// find out the port to listen on
app.set('port', process.argv[2] || process.env.PORT || 8080);
 
// serve a static client
app.use('/', express.static('public'));
 
app.use(require('./routes/post.js'));
app.use(require('./routes/file.js'));
app.use(require('./routes/delete.js'));
 
// start listening
app.listen(app.get('port'), function () {
 
    console.log('the demo is up on port: ' + app.get('port'));
 
});
```

## 6 - Starting the app.

## 7 - Conclusion