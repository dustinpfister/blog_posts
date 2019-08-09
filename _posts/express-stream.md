---
title: Express stream and the XMLHttprequest on process event
date: 2019-08-09 15:30:00
tags: [js,express,node.js]
layout: post
categories: express
id: 519
updated: 2019-08-09 17:44:43
version: 1.4
---

So I am working on a [express](https://expressjs.com/) project in which I would like to stream to the client progress that is being made. I have some more demos to work out until I get a better grasp on what I want to go with, but have learn some great stuff in the process, about [express streams](https://stackoverflow.com/questions/38788721/how-do-i-stream-response-in-express). So it turns out that the response object in middle ware methods is a kind of stream and it inherits from the node http response method. So in express streams can be used by way of the response object to send data to the client in a chunk by chunk basis. In this post I will be going over some examples of how to do this, and how to check on progress on a request with the on process XMLHttpRequest event.

<!-- more -->

## 1 - A Express stream basic example

```js
let express = require('express'),
app = express(),
port = process.argv[2] || 8080;
 
app.get('/', (req, res) => {
 
    res.write('yes');
    res.end();
 
});
 
app.listen(port, () => {
    console.log('app id up on port ' + port);
});
```


## 2 - Express stream get request and on process XMLHttpRequest event example.


### 2.1 - The express app file

```js
let express = require('express'),
fs = require('fs'),
app = express(),
// The port to listen on
port = process.argv[3] || 8080,
// the file to send
file = process.argv[2] || 'file.txt',
// options for the readStream
readStreamOptions = {
    highWaterMark: 16
};
// serving an index.html, and a client.js file
// in a public folder with express static
app.use(express.static('./public'));
// GET requests for a file path
app.get('/file', (req, res) => {
    // get file stats
    fs.stat(file, (e, stat) => {
        // if error send 500
        if (e) {
            res.writeHead(500);
            res.send(e.message);
        } else {
            // else write status 200
            // and set content length to stat.size
            // so that the on progress xhr event knows
            // how much data is coming
            res.writeHead(200, {
                'Content-Length': stat.size,
                'Content-Type': 'text/plain'
            });
            // stream the file
            let reader = fs.createReadStream(file, readStreamOptions);
            // end the response on close stream event
            reader.on('close', () => {
                res.end();
            });
            // write to response on each data event
            reader.on('data', (data) => {
                res.write(data);
            });
        }
    });
});
// listen
app.listen(port, () => {
    console.log('app is up on port ' + port);
});
```

### 2.2 - The /public/index.html file

```html
<h1>Express Stream Example</h1>
<div style="width:320px;height:20px;background:#afafaf;">
    <div id="process-bar" style="width:0px;height:20px;background:#00af00;"></div>
</div>
<div id="out"></div>
<script src="client.js"></script>
```

### 2.3 - The /public/client.js file

```js
let express = require('express'),
fs = require('fs'),
app = express(),
// The port to listen on
port = process.argv[3] || 8080,
// the file to send
file = process.argv[2] || 'file.txt',
// options for the readStream
readStreamOptions = {
    highWaterMark: 16
};
// serving an index.html, and a client.js file
// in a public folder with express static
app.use(express.static('./public'));
// GET requests for a file path
app.get('/file', (req, res) => {
    // get file stats
    fs.stat(file, (e, stat) => {
        // if error send 500
        if (e) {
            res.writeHead(500);
            res.send(e.message);
        } else {
            // else write status 200
            // and set content length to stat.size
            // so that the on progress xhr event knows
            // how much data is coming
            res.writeHead(200, {
                'Content-Length': stat.size,
                'Content-Type': 'text/plain'
            });
            // stream the file
            let reader = fs.createReadStream(file, readStreamOptions);
            // end the response on close stream event
            reader.on('close', () => {
                res.end();
            });
            // write to response on each data event
            reader.on('data', (data) => {
                res.write(data);
            });
        }
    });
});
// listen
app.listen(port, () => {
    console.log('app is up on port ' + port);
});
```