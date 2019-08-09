---
title: Express stream and the XMLHttprequest on process event
date: 2019-08-09 15:30:00
tags: [js,express,node.js]
layout: post
categories: express
id: 519
updated: 2019-08-09 18:32:30
version: 1.14
---

So I am working on a [express](https://expressjs.com/) project in which I would like to stream to the client progress that is being made. I have some more demos to work out until I get a better grasp on what I want to go with, but have learn some great stuff in the process, about [express streams](https://stackoverflow.com/questions/38788721/how-do-i-stream-response-in-express). So it turns out that the response object in middle ware methods is a kind of stream and it inherits from the node http response method. So in express streams can be used by way of the response object to send data to the client in a chunk by chunk basis. In this post I will be going over some examples of how to do this, and how to check on progress on a request with the on process XMLHttpRequest event.

<!-- more -->

## 1 - A Express stream basic example

For starters with express streams can be used when working with the response object. The reason why is because the response object inherits from the native node [http server response class](https://nodejs.org/api/http.html#http_class_http_serverresponse) which inherits from [stream](https://nodejs.org/api/stream.html#stream_stream).

So because the response object inherits from stream it has a write method that can be used to write data on a per chunk basis and then once that is done the res.end method can be used to end the stream.
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

So this can be used to write and send data to the client on a per chunk basis rather than always sending giving a whole body at once by way of the response object send or json methods. A response body is always streamed when sent to the client, but if done right this can conserve memory, and it also helps when dealing with a stream source as a way to send a body.


## 2 - Express stream get request and on process XMLHttpRequest event example.

So What I want to work out with my project is to have a progress bar when the server is doing something that will require a little leg work. The project is a CLI tool that will be used locally and not be deployed and used by tones of visitors, but I still want to know what the state of progress is when the server is busy.

I will be working out something that has to do with streams using express, and I will also have to work out something on the client side as well. The XMLHttpRequest constructor is a tired yet true way to go about making http requests from the client, and it has an event called on progress that can be used to create my progress bar. In this section I will be writing about one demo that I worked out while exploring solutions for this.

### 2.1 - The express stream app file

So this is just a far more advanced version of the basic example earlier I am not getting the stats of a file, and using the size property to set the content length of the content length header when writing the response headers for the response. The reason why I do this is so when I am using the on progress event in the client system the method knows the total size of the file that is being upstreamed to the client. By knowing the current count of bytes received and the total yet to be received that can be used to create the progress bar I want.

I then create a file read stream and then use the express stream response object write method to write the chunks of the read stream one chunk at a time. When the read stream is closed I then call the response end method to end the response.

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

So in express streams can be used to send large amounts of data on a per chunk basis, rather than eating up a bunch of memory in order to build an object that I than pass to response json, or response send. So now lets take a look at the simple client system that I am hosting via express static.

### 2.2 - The /public/index.html file

So here is the html file that is served up by way of express static. The client side javaScript will change the width of the inner div as the data rolls in from the express stream.

```html
<h1>Express Stream Example</h1>
<div style="width:320px;height:20px;background:#afafaf;">
    <div id="process-bar" style="width:0px;height:20px;background:#00af00;"></div>
</div>
<div id="out"></div>
<script src="client.js"></script>
```

### 2.3 - The /public/client.js file

So here is the client side javaScript file that is making the get request with XMLHttpRequest. I am uisng the on progress evtn to change the size of the progress bar.

```js
// new GET Request to /file
var xml = new XMLHttpRequest();
xml.open('GET', '/file');
// on ready state
xml.onreadystatechange = function () {
    if(this.readyState === 4 && this.status === 200){
        document.getElementById('out').innerText = this.response;
    }
};
// update process bar
xml.onprogress = function (a) {
    var per = a.loaded / a.total,
    w = 320 * per,
    bar = document.getElementById('process-bar');
    bar.style.width = w + 'px';
};
xml.send();

```