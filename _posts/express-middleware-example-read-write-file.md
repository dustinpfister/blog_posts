---
title: Express Middleware Example Read and Write to a file
date: 2019-04-21 20:17:00
tags: [express,node.js]
layout: post
categories: express
id: 421
updated: 2019-04-22 06:34:34
version: 1.2
---

maybe one of the best ways to learn about the value of express middleware is to just start developing example after example in which one uses express middleware to accomplish all kids of tasks. So this post will be one of several posts on express middleware examples. Today in this post I will be going over a very simple example of router level middleware that just reads and writes to a file. It will also involve a very basic client system that exists as some static files hosted via express.static.

<!-- more -->

## 1 - The Express Middleware That will read and write to the file

```js
let express = require('express'),
fs = require('fs'),
dir_file = './file.txt';

// create a router, and use body-parser
router = module.exports = express.Router();
router.use(require('body-parser').json());

// what to do for GET and Post requests
router.get('*', function (req, res) {
    fs.readFile(dir_file, 'utf-8', (e, text) => {
        if (e) {
            res.send('');
        } else {
            res.send(text);
        }
    })
});
router.post('*', function (req, res) {
    fs.writeFile(dir_file, req.body.text, (e) => {
        res.send(JSON.stringify({
                e: e
            }))
    });
});
```

## 2 - The App.js file

```js
let express = require('express'),
app = express();
 
app.use('/', express.static('public'));
 
app.use('/file', require('./file.js'))
 
app.listen(8080);
```

## 3 - The public folder

### 3.1 - The index.html file

```html
<html>
  <head>
    <title>Express Middleware Example read and write file</title>
  </head>
  <body>
    <h1>Read and Write file</h1>
    <textarea id="text">
    </textarea>
    <input id="button_save" type="button" value="save">
    <script src="/client.js"></script>
  </body>
</html>
```

### 3.2 - The client.js file

```js
var getIt = function (cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/file', true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            cb.call(this, this.response, xhr);
        }
    };
    xhr.send();
};
 
var postIt = function (obj, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/file', true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            cb.call(this, this.response, xhr);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(obj));
 
};
 
var el_text = document.getElementById('text'),
el_button_save = document.getElementById('button_save');
 
getIt(function (res) {
    el_text.value = res;
});
 
el_button_save.addEventListener('click', function () {
    postIt({
        text: text.value
    }, function (res) {
        console.log(res);
    });

});
```