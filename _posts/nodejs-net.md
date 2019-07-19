---
title: Node net module basic examples and more
date: 2019-07-18 17:58:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 504
updated: 2019-07-18 20:28:28
version: 1.2
---

This post will be on the node net module that can be used to accomplish tasks involving the tpc protocol rather than http. The net module includes constructors that return insistences of streams that allow for data to be transmitted on a per data chunk basics like that of the createReadStream method in the file system module.

<!-- more -->

## 1 - Node net basic example

```js
let net = require('net');
 
let server = net.createServer();
 
// 'connection' listener
server.on('connection', (socket) => {
    console.log('connected');
    socket.on('end', () => {
        console.log('disconnected');
    });
    socket.write('hello world this is node net in action! \r\n');
    socket.end()
});
 
// handle errors
server.on('error', (err) => {
  throw err;
});
 
// listen on port 8080 on local host with a backlog of 200
server.listen(8080, 'localhost', 200, () => {
    console.log('opened server on', server.address());
});
```

## 2 - Using the Socket Constructor to connect to a server

```js
let net = require('net'),
host = process.argv[2] || 'localhost',
port = process.argv[3] || 8080;
 
let socket = new net.Socket();
 
// for incoming data
socket.on('data', (a) => {
    console.log(a.toString());
});
 
socket.on('error', (err) => {
    console.log('error connectng to Server on host: ' + host + ' port: ' + port);
    console.log(err);
});
 
socket.connect(port, host);
```