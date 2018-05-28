---
title: The express.js body parser
date: 2018-05-27 08:51:00
tags: [js,express,node.js]
layout: post
categories: express
id: 196
updated: 2018-05-27 20:48:57
version: 1.1
---

Being able to parse a payload given to a node.js back end typically via a post request is a very common task when doing something with [express.js](https://expressjs.com/). As such there is a built in way to quickly dpo this thanks to the body-parser module that is included with every express.js install. In order to get into body parsing it is necessary to put together at least a basic full stack application. So in this post I will be giving a an example that included both front and back end code, but I will be mostly covering the body parser module.

<!-- more -->

## An express.js Body Parser example

In this example I will of course be using express.js as a node.js back end framework, but I will also be installing ejs as a rendering engine. In terms of npm packages that is all that I installed in my demo folder. Everything else I used in this demo is just my own vanilla code. In a more advanced project I might be using additional javaScript projects like angular, and mongoose, but I do not want to take the focus away from express.js at least not in this post.

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
