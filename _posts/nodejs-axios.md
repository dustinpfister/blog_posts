---
title: Using the axios promise based http client in node.js.
date: 2018-01-10 10:25:00
tags: [js,node.js]
layout: post
categories: node.js
id: 130
updated: 2018-04-07 16:30:32
version: 1.5
---

Axios is a javaScript promise based http client for node.js, and the browser. making requests with axios is pretty simple, however if need be I can still set all relevant options like headers, and url parameters. In short it is yet another way to make get, and post requests to a server on the web somewhere via scripting http.

<!-- more -->

## Getting started

Of course I assume you have a decent understanding of javaScript, node.js, and git as this is not a post intended for beginners of web development.

As with all my projects where I am just testing something out for the first time, I created a folder called test_axios, cd into it, do an npm init, and install what I am testing out via npm install. In this test folder on top of using axios, I am also using [cheerio](/2017/11/28/nodejs-cheerio/) to help work with html that I am grabbing at.

```
$ mkdir test_axios
$ cd test_axios
$ npm init
$ npm install axios
```

If you want you can also just clone in the demos I am making here with git as I have placed the [test folder on my github account](https://github.com/dustinpfister/test_axios).

So you can just clone in the folder, cd into it, and run the basic demo I made like this:
```
$ git clone https://github.com/dustinpfister/test_axios
$ cd test_axios
$ node basic
```

## Basic use case of axios (node.js GET example with no options)

For by basic example I am using axios to get the html of the webpage [https://www.google.com](https://www.google.com), then loading the html into cheerio to help get the href attributes and inner text of each link.

```js
let axios = require('axios'),
cheerio = require('cheerio');
 
axios.get('http://www.google.com/').then(function (html) {
 
    let $ = cheerio.load(html.data);
 
    // loop all links
    $('a').each(function (i, span) {
 
        let href = $(this).attr('href'),
        text = $(this).text();
 
        // log the inner text, and the href of the link
        console.log(text + ' : ' + href);
 
    })
 
}).catch (function (e) {
 
    console.log(e);
 
});
```

So right off the bat axios strikes me as one of the best options for making get requests. That is pretty simple, and easy to remember. This is of course just a get request I am making for a public web page, but don't worry when it comes to doing something more complicated everything I need is there.

## Setting up a simple server

For this project I experimented with making a server from the ground up, which I something I do now and then rather than installing [hapi](https://www.npmjs.com/package/hapi), or [express](https://www.npmjs.com/package/express).

So this is not something that I would use in production, just a custom hack job that I made while experimenting with axios, as I wanted something that I can run that will just respond to requests.

```js
let http = require('http'),
fs = require('fs'),
path = require('path'),
url = require('url'),
port = process.argv[2] || 8080,
dir_public = 'public';
 
let forMethod = {
 
    get: function (req, res) {
 
        let ext = path.extname(req.url).toLowerCase(),
        uri = path.join(dir_public, req.url);
 
        // if no ext then assume index.html of path
        if (!ext) {
 
            uri = path.join(dir_public, req.url, 'index.html');
            ext = '.html';
 
        }
 
        fs.readFile(uri, 'utf-8', function (e, data) {
 
            if (e) {
 
                res.writeHead(500);
                res.end(e.message);
 
            } else {
 
                // default mime to html
                let mime = 'text/html';
                // set plain text for *.js
                mime = ext === '.js' ? 'text/plain' : mime;
 
                res.setHeader('Content-Type', mime);
                res.writeHead(200);
                res.end(data, 'utf-8');
 
            }
 
        });
    },
 
    post: function (req, res) {
 
        let body = '',
        query = url.parse(req.url, true).query;
 
        if (query) {
 
            console.log(query);
 
        }
 
        req.on('data', function (chunk) {
 
            body += chunk;
 
        });
 
        req.on('end', function () {
 
            // parse what should be JSON
            body = JSON.parse(body);
 
            if (body.iwant) {
 
                if (body.iwant === 'theanwser') {
 
                    res.end('42');
 
                } else {
 
                    res.end('sorry');
 
                }
 
            } else {
 
                res.end('sorry');
 
            }
        });
 
    }
 
};
 
let server = http.createServer(function (req, res) {
 
        let method = forMethod[req.method.toLowerCase()];
 
        if (method) {
 
            method(req, res);
 
        } else {
 
            res.end('unsupported method');
 
        }
 
    });
 
server.listen(port, function () {
 
    console.log('check it on : ' + port);
 
});
```

It's a bit crude, but I just wanted something in place for this test project when it comes to using axios as a way to make requests from a browser.

## The public folder

For the purpose of this test project I quickly threw together a simple static website that I coded by hand. When the server script is started I can visit the site and test out my demos with my server.

The public folder just contains a main index.html, and two demos do far for making get requests, and post requests from the browser.

## Simple post example (client)

For a post request example I just made a project where I make a post request to the server, and get a response if the text matches a certain something.

```html
<html>
    <head>
        <title>test_axios</title>
    </head>
    <body>
        <h2>Post example: </h2>
        <hr>
        <p>simple post example</p>
        <script src="/js/axios.js"></script>
        <script>
            var send = function () {
                var el = document.getElementById('text'),
                text = el.value;
                axios.post('/',{iwant: text}).then(function(res){
                    console.log(res.data);
                    document.getElementById('out').innerHTML = res.data;
                });
            };
        </script>
        <span>I want: <input id="text" type="text" value="theanwser"></span>
        <input type="submit" value="send" onclick="send()">
        <p id ="out"></p>
    </body>
</html>
```

## Url parameters, and post example

Working with Url parameter is as simple as just giving an object with key value pairs rather than a sting that looks like this:

```
/?foo=bar&anwser=42
```

Although if you want to to it that way then it can just be appended to the url property given.

```js
axios({
 
    method: 'post',
    url: '/',
    params: {
 
        sort: 'date'
 
    },
    data: {
 
        iwant: 'theanwser'
 
    }
 
}).then(function (res) {
 
    console.log(res);
 
}).catch (function (e) {
 
    console.log(e);
 
});
```

If you want a quick solution for parsing the url parameters back into an object on the server side check out url.parse in the [built in node.js url module](https://nodejs.org/api/url.html).

## Using axios as a client side library

Axios is a javaScript library that works the same way in both a server side, as well as client side environment. In the npm package the axios.js file that will work in both environments is in the dist folder. In my test project I just copied and pasted what is there to a name space in the public html folder to be used in my client side demos of this project.

## Beware of Browser Promise Support

When using axios on the client side, axios depends on native Promise support. Promise are of course an es2015+ javaScript feature, so it goes without saying that can cause your code to break on some older browsers. If the browser share of older browsers that do not support promises is hight, you could just use [good old XMLHttpRequest](/2018/03/28/js-xmlhttprequest/), or try something that will bring Promises to these older platforms. The axios developers seem to recommend a project called [es6-promise](https://github.com/stefanpenner/es6-promise). Another popular solution for adding Promises to older browsers is [bluebird](/2017/12/02/nodejs-bluebird/).

## Conclusion

Axios is a good solution for making requests from a node.js, and browser environment. In the future I might update this post to cover some more advanced examples. This is a great project, it deserves a great post.