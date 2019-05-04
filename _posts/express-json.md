---
title: Express JSON receiving parsing and sending
date: 2019-05-04 15:27:00
tags: [express,node.js]
layout: post
categories: express
id: 434
updated: 2019-05-04 17:47:41
version: 1.1
---

In express json can be sent from the server to a client with response methods like res.json, it can also be received from clients by baking post requests from a client system, and then parsing the incoming body with the body parser middleware. In this post I will be coving some basics and more about expressjs and json.

<!-- more -->

## 1 - Express JSON - Sending JSON from expressjs

```js
let express = require('express'),
app = express();
app.set('port', process.env.PORT || process.argv[2] || 8080);
// path for root
app.get('/', (req, res) => {
    // The res.json response method can be used to
    // send json to a client
    res.json({
        foo: 'bar'
    });
});
// listen
app.listen(app.get('port'), () => console.log('app up on port: ' + app.get('port')));
```

## 2 - Express JSON - Receiving from a client parsing and sending

```js
let express = require('express'),
app = express();
app.set('port', process.env.PORT || process.argv[2] || 8080);
 
// send basic client system that sends json
// to the server with XMLHttpRequest
app.get('/', (req, res) => {
    res.send(
        '<script>\n' +
        'var xhr = new XMLHttpRequest();\n' +
        'xhr.open(\'POST\', \'\/\', true);\n' +
        'xhr.onreadystatechange = function () {\n' +
        '  if (this.readyState === 4) {\n' +
        '    document.body.innerHTML += \'<span>\' + this.response + \'<\/span>\';\n' +
        '  }\n' +
        '};\n' +
        'xhr.setRequestHeader(\'Content-type\', \'application\/json\');\n' +
        'xhr.send(JSON.stringify({x: 40}));\n' +
        '<\/script>');
});
 
// body parser can be used to parse the incoming json into 
// a workable object via req.body
app.use(require('body-parser').json());
app.post('/', (req, res) => {
    let obj = {
        x: req.body.x,
        y: 2
    };
    obj.n = obj.x + obj.y;
    res.json(obj);
});
 
// listen
app.listen(app.get('port'), () => console.log('app up on port: ' + app.get('port')));
```