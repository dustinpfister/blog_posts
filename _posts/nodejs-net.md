---
title: Node net module basic examples and more
date: 2019-07-18 17:58:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 504
updated: 2019-11-19 13:57:11
version: 1.8
---

This post will be on the [node net](https://nodejs.org/api/net.html) module that can be used to accomplish tasks involving the [tcp protocol](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) rather than [http](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). The net module includes constructors that return insistences of streams that allow for data to be transmitted on a per data chunk basics like that of the createReadStream method in the file system module.

<!-- more -->

## 1 - Node net basic example

For a basic example of the nodejs net module here is a hello world example of using the create server net method to set up a TPC server on localhost at port 8080.

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

Once this example is up and running I can use a TCP client like telnet to connect to it an sure enough I get the message hello world. However if you do not have a TCP client installed it is also possible to connect to the server with another script so lets look into how to do that as well.

## 2 - Using the Socket Constructor to connect to a server

So the socket constructor can be used to connect to a server by creating and instance of socket and then connecting to a server by using the connect method of socket.

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

## 3 - Conclusion

So the net module can be used to set up and connect to TCP servers, it is also the base class for the create server constructors used in the http module as well.