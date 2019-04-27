---
title: Express Middleware Example Read and Write to a file
date: 2019-04-21 20:17:00
tags: [express,node.js]
layout: post
categories: express
id: 421
updated: 2019-04-27 12:31:49
version: 1.13
---

maybe one of the best ways to learn about the value of [express middleware](https://expressjs.com/en/guide/using-middleware.html) is to just start developing example after example in which one uses express middleware to accomplish all kids of tasks. So this post will be one of several posts on express middleware examples. Today in this post I will be going over a very simple example of router level middleware that just reads and writes to a file. It will also involve a very basic client system that exists as some static files hosted via express.static.

<!-- more -->

## 1 - Express Middleware and what to know before continuing

I have wrote a post before hand in which I cover [the basics of express middleware](/2019/04/19/express-middleware-basics/), and I also have another post on [express middleware in general](/2018/06/25/express-middleware/) also. So I will not be getting into detail about the basics of express here, I also assume that you have at least some background with node.js, and javaScript in general. For more on express realted topics be sure to check out my [main post on expressjs](/2018/06/12/express).

## 2 - The Middleware that will read and write to the file

Here I have the router level middleware file that will use the node.js fs module to read and write just a simple plain text file that can be created and edited from a basic client system that I will be getting to later in this post. For more on router level middleware be sure to check out my post on [routers in express.js](/2018/05/22/express-routers/).

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

In this file I am creating and exporting an express router, and defining what will happen for all get and post requests when this middleware is used in a main app.js file with the [app.use method](/2018/06/18/express-app-use/). For get requests I am just simply reading the file and sending the data of that file or an empty string in the event of an error. For post requests I am parsing some incoming json and using the text property of that object sent from the client to write the contents of the file.

In a more serious example I would do a better job handling errors, but for the sake of keeping this post wimple I will not be getting into that here.

## 3 - The App.js file

Here I have the main app.js file of this example where I am requiring in express, and creating an instance of an app object as always. I am using the express.static built in middleware to host a public folder that contains the crude yet effective client system for this example.

```js
let express = require('express'),
app = express();
 
app.use('/', express.static('public'));
 
app.use('/file', require('./file.js'))
 
app.listen(8080);
```

Just like with the built in middleware express.static I am using the app.use method to use my custom router level middleware to define what will happen for requests to the /file path.

## 4 - The public folder

So I could put togeather some more complex client system involving ejs templates, and a front end library of some kind. However to keep this example simple I am sticking to just what there is to work within the browser by itself. When it comes to scripting http requests in the browser one option is to use XMLHttpRequest, and in this client system I will be using that to make GET and POST requests to the backend code that I went over above.

### 4.1 - The index.html file

For the index html file that will be use for the root path of the project thanks to express.static I am just using a textarea element as a way to write text that is to be transmitted to the backend via a POST request, as well as how to display the content of the file that is retrieve via a GET request as well. I also have a single input button that can be used to send a POST request with what is currently in the textarea element.

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

I am then loading a single client side javaScript file just simply called client.js that will contain the client side javaScrit that I am sing in this example.

### 4.2 - The client.js file

Here I have my client side javaScript where I am using [XMLHttpRequest](/2018/03/28/js-xmlhttprequest/) to send both GET and POST requests.

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