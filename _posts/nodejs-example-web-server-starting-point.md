---
title: A web server starting point node example
date: 2020-02-06 10:55:00
tags: [node.js]
layout: post
categories: node.js
id: 607
updated: 2020-02-06 10:57:24
version: 1.1
---

I thought I would start a collection of posts that are node examples, that is examples of simple projects that just make use of nodejs.

<!-- more -->

## 1 - A very basic Node Example of a web server starting point

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