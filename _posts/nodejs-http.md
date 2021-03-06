---
title: The node.js http module and setting up a simple web server with just native javaScript.
date: 2018-02-06 20:32:00
tags: [js,node.js]
layout: post
categories: node.js
id: 146
updated: 2019-07-20 12:11:59
version: 1.7
---

There are many frameworks that help to make the process of making a node.js powered full stack web application a quick process compared to working with just the core node.js modules. Frameworks like express, and hapi just to name a few. I might prefer to use express when I make such projects, but still on occasion I find myself writing at least a few simple demos using just the [node http module](https://nodejs.org/api/http.html) by itself without any additional framework on top of nodejs.

<!-- more -->

## 1 - A basic example of the built in node http module in action.

For a basic hello world example I made a new instance of a server object, by calling http.createServer, and then used the 'request' event with the server object to respond to any incoming request with 'hello world' by way of res.end. Finally the server is started my calling server.listen, and giving a port to listen on.

```js
let http = require('http'),
 
server = http.createServer(),
 
port = process.env.PORT || process.env[2] || 8080;
 
server.on('request', function (req, res) {
 
    res.end('hello world');
 
});
 
server.listen(port);
```

## 2 - A not so basic example

Some times I find myself in a situation in which I need to do something with streams. This often the case with post requests as the incoming body can be large and needs to be processed on a per chunk basis. However the same can be said of outgoing data as well when it comes to get requests. The response object of a request is a kind of stream so the write method of the request object can be used to send data on a per chunk basis.

```js
let http = require('http'),
fs = require('fs');
 
let server = http.createServer();
 
// on request
server.on('request', (req, res) => {
 
    if (req.url === '/' && req.method === 'GET') {
 
        let reader = fs.createReadStream('./public/index.html', {
                highWaterMark: 128
            });
 
        res.setHeader('Content-Type', 'text/html');
 
        reader.on('data', (data) => {
            console.log('sent chunk: ')
            res.write(data);
        });
 
        reader.on('end', () => {
            console.log('done');
            res.end();
        });
 
    } else {
        res.end();
 
    }
 
});
 
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
 
server.listen(8080, 'localhost', 200, () => {
    let add = server.address();
    console.log('static server up on http://' + add.address + ':' + add.port);
});
 
```

## 3 - Processing a post request

When making a simple project that will end up doing something with post requests there is a need to process the incoming body of the post request. That is to parse the body into an Object that can be worked with.

To do this there is the 'data', and 'end' events  that can be used with a request object to concatenate the incoming Buffer chunks into a single String or Buffer, and then do something with the payload before sending a response.

```js
let http = require('http'),
 
server = http.createServer(),
 
port = process.env.PORT || process.env[2] || 8080;
 
server.on('request', function (req, res) {
 
    if (req.method === 'POST') {
 
        let body = '';
        req.on('data', function (chunk) {
 
            body += chunk.toString();
 
            // do some basic sanitation
            if (body.length >= 200) {
 
                // if body char length is greater than
                // or equal to 200 destroy the connection
                res.connection.destroy();
 
            }
 
        });
 
        // once the body is received
        req.on('end', function () {
 
            if (body) {
 
                res.end('okay thank you for: ' + body);
 
            } else {
 
                res.end('thanks for the post request, but it would be nice if it had something');
 
            }
 
        });
 
    } else {
 
        res.end('not a post');
 
    }
 
});
 
server.listen(port);
```

## 4 - http request for making server side requests

There are many npm packages for this that may help to make requests easier, or add helpful features, but it is not to hard to just make requests from node.js with the built in http module by using the [http request method](https://nodejs.org/docs/latest-v8.x/api/http.html#http_http_request_options_callback).


This basic example will make a get request for www.google.com
```js
let http = require('http'),
 
req = http.request({
 
        hostname: 'www.google.com'
 
    }, function (res) {
 
        res.on('data', function (chunk) {
 
            // log each chunk as 'ascii' encoded string
            console.log(chunk.toString('ascii'));
 
        });
 
    });
 
req.end();
```

## 5 - Conclusion

So the built in nodejs http module can be used to make http requests from node, as well as set up a server that can respond to requests from a client system. When it comes to checking out a package that might make things a litter easier there is the [node request](/2017/05/23/nodejs-request) npm package that might be of interest though. Also when it comes to setting up a web server it might still be best to go with a framework such as express.