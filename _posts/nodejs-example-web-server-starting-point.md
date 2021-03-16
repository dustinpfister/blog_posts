---
title: A web server starting point node example
date: 2020-02-06 10:55:00
tags: [node.js]
layout: post
categories: node.js
id: 607
updated: 2021-03-16 15:51:11
version: 1.13
---

I thought I would start a collection of posts that are [nodejs example](/2021/03/16/nodejs-example/), that is examples of simple projects that just make use of nodejs. For the first in the series why not start out with some basic starting points for the beginnings of a web server project. Very basic examples might just involve the use of the create server method of the node built in node module. However when it comes to making a real project there is much more that needs to happen, but still it starts with basic hello world style examples. So lets take a look at a few simple web server node examples and get starting working on something cool.

<!-- more -->

## 1 - A very basic Node Example of a web server starting point

So lets start off this post with a very basic example of a server.js file. Here I am just pulling in a reference to the node built in http module with require. 

I then also create a port variable that will store the port number to use when listening for incoming requests. The expression that I use checks for an environment variable first for a port number, then the arguments when the server was script was started from the command line, and then finally a hard coded port number.

Once I have my http module, and port number to work with I create an instance of an http server by calling the create server method of the http module, after doing so i now have a server instance to attach some handers to and when ready start. I then use the on method of the server instance to attach an event for requests, and pass a function that will fire for any request that the server receives. For now that hander will just write a simple, content type header, and write a hello word message.

Now it is a matter of starting this server when it is stared, to do this I call the listen method of the server instance, passing the port number as the first argument. After that I can also pass a function that will fire when the server starts listening so that I know it is up and ready when started in the command line.

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

Once I have this code together I can save it as something like sever.js, and then call it in the command line with node like this:

```
$ node server.js 8000
'web server is up on port: 8000
```

The server is now up and running and listening on port 8000 because I gave an argument after calling it. If I now go to my web browser and navigate to localhost:8000 then I should see the message in the browser window.

## 2 - The start of a static file server

Now that we have a basic example of a node web server out of the way lets get into a simple example of a static file server. This is a kind of web server where it just needs to respond to incoming requests with static content. Event though that might sound simple on the surface it ca get a little involved. There is much to write about when it comes to mime types, and streams. However I will try to not get to deep into this one here at least because there are many other basic web server examples I would like to get to.

```js
let http = require('http'),
path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
read = promisify(fs.createReadStream),
stat = promisify(fs.stat),
 
port = process.env.port || process.argv[2] || 8080,
dir_publicHTML = path.resolve(__dirname, 'public');
 
let server = http.createServer();
 
server.on('request', function (req, res) {
 
    let encoding = 'binary',
    resource = path.join(dir_publicHTML, req.url),
    resource_ext = path.extname(resource),
    resource_content_type = 'text/html',
    resource_content_length = 0;
 
    // if no file extension append 'index.html'
    resource = !resource_ext ? path.join(resource, 'index.html') : resource;
    resource_ext = !resource_ext ? '.html' : resource_ext;
 
    if (resource_ext === '.html') {
        encoding = 'utf8';
        resource_content_type = 'text/html';
    }
    if (resource_ext === '.ico') {
        encoding = null;
        resource_content_type = 'image/x-icon';
    }
 
    stat(resource).then((stat) => {
        resource_content_length = stat.size;
        res.writeHead(200, {
            'Content-Type': resource_content_type,
            'Content-Length': resource_content_length
        });
        fs.createReadStream(resource, encoding).pipe(res);
    })
    .catch((e) => {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.write('501 server error: ' + e.message);
        res.end();
    })
 
});
 
server.listen(port, () => {
    console.log('web server is up on port: ' + port);
});
```

## 3 - breaking things down by path

So as a web server grows things are going to ge a little complicated. So it is nice to break things down a little into smaller units of code that are modules of sorts. One way to do so is to have a module for each path of the website. For example I might have an idea for a project that is more or less a single page application where a single module for the root path of the website serves up a client system. However that client system then works with a whole bunch of other modules that respond to post requests that are accessible via other paths.


So then the main server file could be fairly small, and just serve as a way to load the current module that is being requested.

```js
let http = require('http'),
path = require('path'),
 
port = process.env.port || process.argv[2] || 8080;
 
let server = http.createServer();
 
server.on('request', function (req, res) {
    let dir_pathmod = path.join(__dirname, 'paths', req.url, 'index.js');
    // try to get the module for the current path if it is there
    try {
        let pathMod = require(dir_pathmod);
        pathMod(req, res);
    } catch (e) {
        // send an error message if something goes wrong
        res.writeHead(501, {
            'Content-Type': 'text/plain'
        });
        res.write('501: ' + e.message);
        res.end();
    }
});
 
server.listen(port, () => {
    console.log('web server is up on port: ' + port);
});
```

And then a path module would just serve a function that contains the rest of the logic for dong everything with requests for a path.

```js
module.exports = function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('index path');
    res.end();
};
```