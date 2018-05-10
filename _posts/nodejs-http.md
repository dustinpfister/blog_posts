---
title: The node.js http module
date: 2018-02-06 20:32:00
tags: [js,node.js]
layout: post
categories: node.js
id: 146
updated: 2018-02-11 11:14:12
version: 1.3
---

There are many frameworks that help to make the process of making a node.js powered full stack application a quick process compared to working with just the core node.js modules. I might prefer to use hapi, or express, but still it is important to at least write a few simple demos using just the node.js [http module](https://nodejs.org/dist/latest-v8.x/docs/api/http.html).

<!-- more -->

# Basic example of http.

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

## Processing a post request

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

## Making http requests from node.js

There are many npm packages for this that may help to make requests easier, or add helpful features, but it is not to hard to just make requests from node.js with the built in http module.


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