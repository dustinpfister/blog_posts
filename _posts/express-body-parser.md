---
title: The express.js body parser
date: 2018-05-27 08:51:00
tags: [js,express,node.js]
layout: post
categories: express
id: 196
updated: 2018-05-27 10:07:52
version: 1.0
---

[express.js](https://expressjs.com/)

<!-- more -->

## A express.js Body Parser basic example

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
