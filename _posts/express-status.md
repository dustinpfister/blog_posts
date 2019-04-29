---
title: Express status getting and setting a http status code
date: 2019-04-29 17:48:00
tags: [express,node.js]
layout: post
categories: express
id: 429
updated: 2019-04-29 19:00:37
version: 1.2
---

In express status codes can be both get and set with properties and methods in an express response object. There is the res.statusCode property than can be used to find out the current http status code, and the [res.status](https://expressjs.com/en/api.html#res.status) method that can be used to set that code. In addition there is the res.sendStatus method that can be used to just set a status code and end the request without sending any data in the same way as the express end response method. So this will be a post on http status codes in express, getting it, setting it and some status code use examples.

<!-- more -->

## 1 - Express status and just getting the current http status code.

```js
let express = require('express'),
app = express();
 
// default status code is 200 (OK)
app.get('/', (req, res) => {
    res.send('status: ' + res.statusCode); // status: 200
});
 
app.listen(8080);
```

## 2 - Express status send and end

```js
let express = require('express'),
app = express();
 
// the sendStatus method can be used to just
// send a status with no data
app.get('/send1', (req, res) => {
    res.sendStatus(404);
});
 
// the status method with the end method
// can also be used
app.get('/send2', (req, res) => {
    res.status(404).end();
});
 
// the status and send method with no
// argument also seems to work okay
app.get('*', (req, res) => {
    res.status(404).send();
});
 
app.listen(8080);
```

## 3 - An Express Status example that involves a 500 (Server Error) status code

```js
let express = require('express'),
fs = require('fs'),
path = require('path'),
app = express();
 
app.set('port', process.argv[2] || process.env.PORT || 8080);
 
// get requests to root (/)
app.get('/', (req, res, next) => {
    fs.readdir(process.cwd(), (e, files) => {
        if (e) {
            // if error
            next(e);
        } else {
            // send index of CWD
            let html = '';
            files.forEach((file) => {
                html += '<p><a href=\"/' + file + '\">' + file + '<\/a><\/p>'
            });
            res.set('Content-Type', 'text/html');
            res.send(html);
        }
    });
});
 
// all other get requests
app.get('*', (req, res, next) => {
    fs.readFile(path.join(process.cwd(), req.path), 'utf8', (e, text) => {
        if (e) {
            // if error
            next(e);
        } else {
            // else send file as text
            res.set('Content-Type', 'text/plain');
            res.send(text);
        }
    });
});
 
// Error / 400 handler
app.use([
 
        (err, req, res, next) => {
            if (err) {
                res.status(500).send(err.message || 'Internal Server Error');
            } else {
                next();
            }
        },
 
        (req, res) => {
            res.status(400).send('Bad request');
        }
 
    ]);
 
app.listen(app.get('port'), () => console.log('app is up on port: ' + app.get('port')));
```