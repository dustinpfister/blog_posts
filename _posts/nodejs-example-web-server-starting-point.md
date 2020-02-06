---
title: A web server starting point node example
date: 2020-02-06 10:55:00
tags: [node.js]
layout: post
categories: node.js
id: 607
updated: 2020-02-06 11:53:50
version: 1.4
---

I thought I would start a collection of posts that are node examples, that is examples of simple projects that just make use of nodejs. For the first in the series why not start out with some basic starting points for the beginnings of a web server project. Very basic examples might just involve the use of the create server method of the node built in node module. However when it comes to making a real project there is much more that needs to happen, but still it starts with basic hello world style examples. So lets take a look at a few simple web server node examples and get starting working on something cool.

<!-- more -->

## 1 - A very basic Node Example of a web server starting point

So lets start off this post with a very basic example of a server.js file. Here I am just pulling in a reference to the node built in http module with require. 

I then also create a port variable that will store the port number to use when listening for incoming requests. The expression that I use checks for an environment variable first for a port number, then the arguments when the server was script was started from the command line, and then finally a hard coded port number.

Once I have my http module, and port number to work with I create an instance of an http server by calling the create server method of the http module, after doing so i now have a server instance to attach some handers to and when ready start. I then use the on method of the server instance to attach an event for requests, and pass a function that will fire for any request that the server receives.

```js
let http = require('http'),
 
port = process.env.port || process.argv[2] || 8080;

let server = http.createServer();
 
server.on('request', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('Hello Node.js World!');
    res.end();
});
 
server.listen(port, () => {
 
    console.log('web server is up on port: ' + port);
 
});
```