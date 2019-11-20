---
title: Node websocket simple vanilla javaScript example
date: 2019-11-20 17:16:00
tags: [node.js]
layout: post
categories: node.js
id: 567
updated: 2019-11-20 18:40:58
version: 1.10
---

So you want to get break ground with a [node websocket](https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61) project, and so you want to write everything vanilla javaScript style? First things first, reconsider and just use a package such as [websocket-node](https://github.com/theturtle32/WebSocket-Node/), trust me this one is going to be time consuming. If you still want to just put together a very simple web socket server, and client then this post is my take on doing so.

Again when it comes to using websockets in an actual project you are going to want to use a well supported npm package, there is allot to this, and handing the handshake, and frames is a little complicated. STill if you just want to make a simple node websocket project working just with the core nodejs modules, maybe this post will help you get started at least.

This post will contain a very simple web [socket server](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers), and a very basic [web socket client](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications) in addition to a simple http server that serves the client system.

<!-- more -->

## 1 - A very simple node websocket project that just streams simple text frames to a client

Making a vanilla javaScript node websocket project is little easier said then done. First there must be a handshake between the client and the server, before frames can be sent to the client. Luckily sending frames tot he client is easier then the other way around that I did not get to in this example (again use an npm package for a real project this one gets involved). In Addition once the handshake process is done, I cant just start streaming data to the client, it must be done so following a certain frame format. 

The handshake process alone was a little tricky to work out, but I managed to find a way by reading other posts on this topic, and studying the source code of npm packages that do a better job abstracting what needs to happen.

The frame format is also a little tricky, not impossible to follow, but a little tricky. You need to be fairly comfortable on how to work with buffers, and the bitwise or operator. The reason why is because there a certain bits that act is flags, and values to inform a client or server about the size, and other aspects of each frame that is set or received.

### 1.1 - The node websocket module

So first for the module that I worked out to make setting up a simple web socket project easy for me, by abstracting things away. The basic process here is to set up a basic http server, and then allow for it to be upgraded to a web socket server when a proper request is made from the client system with the web socket constructor. Then I just need to use a method that I work out to send simple text frames to the client one frame at a time.

I started out by making just a plain old http server with the node http module, and created an handler for the upgrade event of the http server. From there I call my accept upgrade method passing the request object, and the socket. Inside the body of the accept upgrade method I call my generate accept key method passing just the request object, which gives me the sec-websocket-accept key value to inform the client that the server has accepted the request.

```js
let crypto = require('crypto');
let http = require('http');
// Very Simple Web Socket server
module.exports = (opt) => {
    opt = opt || {};
    opt.port = opt.port || 8095;
    opt.host = opt.host || 'localhost';
    opt.onReady = opt.onReady || function (api) {
        api.sendText('Hello World')
    };
    // generate the accept key for the upgrade request
    let genAcceptKey = (req) => {
        let key = req.headers['sec-websocket-key'],
        sha1 = crypto.createHash('sha1');
        sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
        let acceptKey = sha1.digest('base64');
        return acceptKey;
    };
    // accept upgrade handler for upgrade event
    let acceptUpgrade = (req, socket) => {
        // gen accept key
        let acceptKey = genAcceptKey(req);
        // write response
        socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
            'Upgrade: WebSocket\r\n' +
            'Connection: Upgrade\r\n' +
            'Sec-WebSocket-Accept: ' + acceptKey + '\r\n' +
            '\r\n');
    };
    // simple send text frame helper
    let sendTextFrame = function (socket, text) {
        let firstByte = 0x00,
        secondByte = 0x00,
        payloadLength = Buffer.from([0, 0]),
        payload = Buffer.alloc(text.length);
        payload.write(text);
        firstByte |= 0x80; // fin bit true
        firstByte |= 0x01; // opt code of 1 (text)
        secondByte |= text.length; // mask and payload len
        let frame = Buffer.concat([Buffer.from([firstByte]), Buffer.from([secondByte]), payload]);
        socket.write(frame);
    };
    // create the server
    let wsServer = http.createServer();
    // upgrade handler
    wsServer.on('upgrade', (req, socket, head) => {
        // accept upgrade
        acceptUpgrade(req, socket);
        // send simple text frame
        //sendTextFrame(socket, 'Hello');
        opt.onReady({
            socket: socket,
            sendText: function (text) {
                sendTextFrame(this.socket, text);
            }
        }, socket);
    });
    wsServer.listen(opt.port, opt.host, () => {
        console.log('web socket server is up on port: ' + opt.port);
    });
    return wsServer;
};
```

Once the accept upgrade method is done I then call an on ready callback that will provide an api that contains the socket and a send text method that makes streaming text to the client very simple.

### 1.2 - The server.js file

So now that I have my node websocket module, I can now use it in a project. This main server file I work out sets up a simple web server that will just host a basic client system that is independent of the websocket server. I just need for this server to serve up my simple static client system that I will be getting to later.

It also uses the websocket module to set up a web socket server on a different port at the end of the file.

```js
let http = require('http'),
fs = require('fs'),
path = require('path'),
// dirs
dir_root = path.resolve(__dirname),
dir_public = path.join(dir_root, 'public'),
// set ports (just hard coded for now)
port = 8090,
wsPort = 8095;
// The web server
let webServer = http.createServer();
// requests for client system
webServer.on('request', function (req, res) {
    // get the path
    let p = path.join(dir_public, req.url);
    // get stats of that path
    fs.lstat(p, function (e, stat) {
        // if error end
        if (e) {
            res.writeHead(500);
            res.write(JSON.stringify(e));
            res.end();
        }
        // if stats check it out
        if (stat) {
            // if it is not a file append index.html to path, and try that
            if (!stat.isFile()) {
                p = path.join(p, 'index.html');
            }
            // default encoding to utf-8, and get file extension
            let encoding = 'utf-8';
            let ext = path.extname(p).toLowerCase();
            // binary encoding if...
            encoding = ext === '.png' ? 'binary' : encoding;
            // try to read the path
            fs.readFile(p, encoding, function (e, file) {
                // if error end
                if (e) {
                    res.writeHead(500);
                    res.write(JSON.stringify(e));
                    res.end();
                }
                // if file, send it out
                if (file) {
                    // default mime to text/plain
                    let mime = 'text/plain';
                    // text
                    mime = ext === '.html' ? 'text/html' : mime;
                    mime = ext === '.css' ? 'text/css' : mime;
                    mime = ext === '.js' ? 'text/javascript' : mime;
                    // images
                    mime = ext === '.png' ? 'image/png' : mime;
                    res.writeHead(200, {
                        'Content-Type': mime
                    });
                    res.write(file, encoding);
                    res.end();
                }
            });
        }
    });
});
// start server
webServer.listen(port, function () {
    console.log('hosting client at: ');
    console.log('path: ' + dir_public);
    console.log('port: ' + port);
});
// using my simple web socket lib
let sws = require('./server_ws.js');
sws({
    port: wsPort,
    host: 'localhost',
    onReady: function (api) {
        setInterval(function () {
            api.sendText(Math.round(1024 + 1024 * Math.random()).toString(16))
        }, 100)
    }
});
```

### 1.3 - The public folder and websocket client

Now for the public folder that contains the websocket client system. First the html file that is the index of the client system. Here I just have a single text area element that will be used to log data that is being streamed from the web socket server, and a single script tag that links to my client side javaScript for this.

```html
<html>
  <head>
    <title>Node Basic WebSocket example</title>
  </head>
  <body>
    <h1>WebSocket example</h1>
    <textarea id="log" cols="60" rows="30"></textarea>
    <script src="client.js"></script>
  </body>
</html>
```

Here I have the client that just uses the WebSocket constructor to create a new web socket for the server that I have set up, at which point it starts the handshake process. Once that is done, the server starts sending data, and then I just start logging that in the text area element.

```js
let socket = new WebSocket("ws://localhost:8095/"),
log = document.getElementById('log');
socket.onopen = function (e) {
    console.log('okay we opened a connection');
};
socket.onmessage = function (e) {
    console.log('we have a message');
    console.log(e.data.toString());
    log.value += e.data.toString();
};
socket.onclose = function (e) {
    console.log('socket closed')
    if (e.wasClean) {
        console.log('clean close');
        console.log(e.code);
        console.log(e.reason);
    } else {
        console.log('conection died');
        console.log(e.code);
    }
};
```

So when this project Is up and running the client makes a request to the node websocket server which just goes right ahead and accepts the request, and then just starts sending hex strings every second. This example is not all that practical or interesting, but a real example might be some kind of project that steams progress to the client as it does some server side work such as looping over files.

## 2 - Conclusion

That is it for now, just the one simple node websocket example. If I get around to it I might expand this post to get into more details about websockets. In any case when it comes to using node websockets in a real project I am going to be going with a well supported npm package with this one. Still it was fun to do this in order to gain a deeper understanding of these projects and why they help to make the process of working with web sockets a whole world easier.