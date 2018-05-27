---
title: Request objects in express.js
date: 2018-05-26 20:48:00
tags: [js,express,node.js]
layout: post
categories: express
id: 195
updated: 2018-05-26 21:44:37
version: 1.1
---

When making a node.js application using [express.js](https://expressjs.com/) there is a need to handle incoming requests. To do this there is the request object that is one of three arguments that can be used when making a function that will be given as a callback when using an app or router method like get, or post. The request object contains all kinds of useful information when it comes to working with requests. In this post I will be writing about some of the must know features of request objects when working with express.js.

<!-- more -->

## req.body - Get data payloads send from a client system

The req.body property can be used to get a data payload that was sent from the client system when working with post requests. In order to use this a body parsing middle ware will need to be used, luckily one comes with express itself.

### /public/index.js

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Request Objects</title>
        <meta charset="utf-8">
    </head>
    <body>
 
        <span>req.body:</span>
        <input id="app_body_text" type="text" value="foo">
        <input id="app_body_send" type="button" value="send"><br>
 
        <textarea id="app_out" cols="80" rows="20"></textarea>
 
        <script src="/js/axios.js"></script>
        <script src="/js/ping.js"></script>
    </body>
</html>
```

### /public/js/axios.js

### /public/js/ping.js

```js

var g = function (id) {

    return document.getElementById(id);

};

g('app_body_send').addEventListener('click', function (e) {

    axios.post('/body', {
        action: g('app_body_text').value
    }).then(function (res) {


        g('app_out').value += '**********\n'
        g('app_out').value += JSON.stringify(res) + '\n\n';
        g('app_out').value += JSON.stringify(res.data) + '\n\n';

    }).catch (function (e) {

        console.log('bad');

    });

});
```

### /routes/static.js

```js
let express = require('express');
 
// the router
router = module.exports = express.Router();
 
// just use everything in the public folder for now
router.use('/', express.static('public'));
```

### /routes/body.js:
```js
let express = require('express'),
bodyParser = require('body-parser'),
 
// the router
router = module.exports = express.Router();
 
// using body parser for req.body
router.use(bodyParser.json());
 
// add body path
router.post('/', function (req, res) {
 
    var data = {
        mess: 'what?'
    };
 
    if (req.body) {
 
        if (req.body.action === 'foo') {
 
            data.mess = 'bar';
 
        }
 
        if (req.body.action === 'answer') {
 
            data.mess = '42';
 
        }
 
    }
 
    res.json(data);
 
});
```

### /app.js

```js
let express = require('express'),
path = require('path'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
app.use('/', express.static('public'));
app.use('/body', require('./routes/body'))
 
app.listen(port, function () {
 
    console.log('request object demo is up on port: ' + port);
 
});
```
