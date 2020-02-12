---
title: javaScript form basic examples and more
date: 2020-02-11 14:06:00
tags: [js]
layout: post
categories: js
id: 610
updated: 2020-02-11 19:12:28
version: 1.5
---

So then it comes to [javaScript form examples](https://eloquentjavascript.net/2nd_edition/18_forms.html) there is just getting started with input elements and forms on the client side, and then there is working out server for the back end system of a project or simple example. Depending on what it is that you want or need to do with a form and input elements a back end system may not be needed at all, however a typical use case of forms is to involve some kind of back end system. Still that might not always be the case, so in this post I will be going over some simple examples that just have to do with the basics of working with form elements and javaScript in a client side javaScript environment. In addition I might get around to one or two examples that make use of a nodejs back end system also though.

<!-- more -->


## 1 - javaScript form input elements the basics

To get started with javaScript forms it might be best to know a thing or two about input tags, which are used to make fields for a form. There is a great deal to cover just with them when it comes to the various types of input tags, as well as how to get the current value of an input tag when attaching events for them, and so forth. In this section I will just be going over the basics and more when it comes to input tags, so lets get started.

```html
<html>
    <head>
        <title>javaScript form input example</title>
    </head>
    <body>
        <input id="seed" type="text" value="1234"><br><br>
        <div id="out"></div>
        <script>
var disp = function(text){
    document.getElementById('out').innerText = text;
};
var input = document.getElementById('seed');
input.addEventListener('keyup', function(e){
    disp(e.target.value);
});
disp(input.value);
        </script>
    </body>
</html>
```

## 2 - Node sever script javaScript form example with query string and get requests

In order to really get into what javaScript forms are for I need to have at least one or two examples in this post that involve some back end javaScript code. So with that said in this section I will be going over a very basic example of using a javaScript from to navigate to a search path with some query strings that are set with a form.

### 2.1 - The query-string.html file

```html
<html>
    <head>
        <title>javaScript form input example</title>
    </head>
    <body>
        <form action="/search" method="GET">
            <input id="filename" name="q" type="text" value="javaScript form"><br><br>
            <button type="submit">Search</button>
        </form>
        <div id="out"></div>
        <script>
        </script>
    </body>
</html>
```


### 2.1 - The server.js file

```js
let http = require('http'),
path = require('path'),
fs = require('fs'),
url = require('url'),
port = process.env.port || process.argv[2] || 8080;
 
let server = http.createServer();
 
let getHandler = function (req, res) {
 
    return new Promise((resolve, reject) => {
        if (req.method === 'GET') {
            if (req.url === '/') {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                fs.createReadStream(path.join(__dirname, 'query-string.html')).pipe(res, function () {
                    resolve();
                });
            } else {
                let qs = url.parse(req.url, true).query;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write('query for: ' + qs.q);
                resolve();
            }
        } else {
            reject(new Error('not a get request'));
        }
    });
};
 
server.on('request', function (req, res) {
    getHandler(req, res)
    .catch((e) => {
        res.writeHead(501, {
            'Content-Type': 'text/plain'
        });
        res.write(e.message);
        res.end();
    })
    .then(() => {
        res.end();
    });
});
 
server.listen(port, () => {
    console.log('web server is up on port: ' + port);
});
```