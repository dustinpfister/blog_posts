---
title: The node.js http module and setting up a simple web server with just native javaScript.
date: 2018-02-06 20:32:00
tags: [js,node.js]
layout: post
categories: node.js
id: 146
updated: 2022-07-29 14:04:00
version: 1.37
---

There are many frameworks that help to make the process of making a node.js powered full stack web application a quick process compared to working with just the core node.js modules. Frameworks like [express](/2018/05/21/express-getting-started/), and [hapi](/2017/09/28/hapi-getting-started/) just to name a few. 

I might prefer to use express when I make such projects, but still on occasion I find myself writing at least a few simple demos using just the [node http module](https://nodejs.org/api/http.html) by itself without any additional framework on top of nodejs. This kind of approach may be a poor decision when it comes to making any kind of real serious full stack project when working on everything by oneself at least. The situation might be different when it comes to having a large team of people working on something, but even then it is going to be a lot more work, and there are going to be a lot of bugs.

<!-- more -->

## - What to know before getting into the http module

This is not any kind of [getting started type post on nodejs](/2017/04/05/nodejs-helloworld/), let alone [javaScript in general](/2018/11/27/js-getting-started/). Also in these various nodejs source code examples I am making use of many features of nodejs beyond just that of the http module, such as the [file system module](/2018/02/08/nodejs-filesystem/), [paths](/2017/12/27/nodejs-paths/), and the [process object](/2018/02/11/nodejs-process/) just to name a few. So I assume that you have at least some background with these topics thus far, and are now just looking for some souce code examples that will help you work out some basics when it comes to getting started with the http module in nodejs as you want to set up a basic web server type project.

### - The souse code examples here can be found in my node-js-core-demos Github respiratory

The source code examples I am going over for this post can be [found in the for post folder of this blog post](https://github.com/dustinpfister/node-js-core-examples/tree/master/for_post/nodejs-http) on my node js core demos repository on Github. If I have any additional changes that I have made to source code exampes that have not found there way into this post just yet they can be found there. That would also be a good place to make any and all pull requests if you see something that is bad news bears for one reason or another.

## 1 - Basic examples of the built in node http module in action.

In this section I will be going over a few basic examples when it comes to just getting started with the http module. Most of these basic examples involve creating a simple sever that will respond to incoming http requests from a web browser. However even when it comes to just seeing a simple hello world type text message in a web browser window there is a far amount of things to cover. For example there is the question of how to go about getting a port number to listen on, and how to attach events to a sever object created with the create sever method of the http module.

### 1.1 - The listen method hello world example

For a basic hello world example I made a new instance of a server object, by calling the http.createServer method of the http module. I can then use the on method of the returned sever object to add a on 'request' event with the server object to respond to any incoming request with 'hello world' by way of res.end method. Finally the server is started my calling server.listen, and giving a port to listen on.

```js
// require in the http module
let http = require('http'),
// need a port number
port = process.env.PORT || process.env[2] || 8080,
// create a server
server = http.createServer((req, res) => {
        res.end('hello world');
    });
// listen on the port
server.listen(port, () => {
    console.log('server is up on http://localhost:' + port);
});
```

### 1.2 - The listen method and getting an OS assigned random port number

When it [comes to port numbers](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports) the [port number 0 is reserved for the task of requesting a port from the operating system](https://stackoverflow.com/questions/9901043/how-does-node-js-choose-random-ports). If I want to get a port number this way I can pass 0 as the port number when calling the listen method of the sever object. Inside the body of an event handler for the listening event I can then call the address method of the server object to get an object that will contain the port given, along with many other relevant properties.

```js
let http = require('http');
let server = http.createServer();
server.listen(0, () => {
    let address = server.address();
    console.log('listening on random port: ' + address.port);
});
```

### 1.3 - attaching events to a server object

Thus far I have created basic http server examples just using the callback methods given as a argument when calling the the create server method, and the listen prototype method of the Server class. However when it comes to starting to make a more complex script I think it is a good idea to start attaching handlers by way of the on method of a sever object. When it comes to setting up what to do for an incoming request there is the request event that can be used in place of the callback given when calling the create server method. When it comes to a callback given to the listen method of the server object in place of that I can attach and event hander for the listening event.

```js
let http = require('http'),
port = process.env.PORT || process.env[2] || 8080,
server = http.createServer();
// on request event
server.on('request', (req, res) => {
    res.end('hello world');
});
// on listening event
server.on('listening', () => {
    let address = server.address();
    console.log('server is up on http://localhost:' + address.port);
});
server.listen(port);
```

## 2 - Responding to GET requests

Now that I have got many of the basics when it comes to getting started setting up a basic web server with just nodejs and a little vanilla javaScript I think that now it is time to get into some script examples that are different ways of responding to get requests. There are a few different kinds of http requests of course such as POST, HEAD, and DELETE requests. However the main two of interest when getting started with this kind of thing would be GET, and POST requests. POST requests are for allowing the client system to send some data to a server, and GET requests as the name implies are just for allowing a client to download some data from a server. This data can be a static file of some kind on the severs file system, or it can be some kind of generated content.

### 2.1 - A simple script that responds to GET request by looking at the url property of a request object.

An impotent part of responding to get requests and requests in general is to look at the url property of the request object. When going a callback to the create server method or attaching an event handler for the request event, there will be two objects to work with as arguments for this function that is used for a callback or event handler. The first argument is the request object, and the second argument is the response object. It is in this response object that we have a url property that is the requested url when the request was made from the browser.

The url property of the request object can be used as one way to change what the content is for a given get request. For a very simple examples of this say I have a request event handler that will look to see if the request url is the root url, if so send something that is a crude yet functional index. All other requests can then be handled in anything way.

```js
let http = require('http'),
server = http.createServer(),
port = 8080,
host = 'localhost';
// on request
server.on('request', (req, res) => {
    if (req.url === '/') {
        console.log('request for root path');
        res.write('<a href="/foo">foo path</a><br><a href="/bar">bar path</a><br>');
        res.end();
    } else {
        res.write('this is non-root path ' + req.url);
        res.end();
    }
});
// on listening
server.on('listening', () => {
    let add = server.address();
    console.log('static server up on http://' + add.address + ':' + add.port);
}); ;
// listen
server.listen(port, host);
```

This might not be the post practical example of how to go about responding to post requests, but I have to start somewhere with this. When it comes to making some kind of real example I would want to have a better way of breaking things down by path, and also even go so far as have more than one way to respond based not just on the url requested, but also the kind of http request.

### 2.2 - Getting into something involving an array of paths objects

As a project grows more complex I am going to want to come up with some kind of system to break things down. When it comes to working on a real project often I would go with some kind of server side framework [such as express, which works great for routing](/2018/05/22/express-routers/) and many other things. However when it comes to just working with built in features of nodejs I would have to come up with my own system for basic routing.

So then in this example I am creating a kind of standard for making one or more paths objects. This path object will contain a pattern such as a string or regular expression that will be used with the url property of a request object to see if the path object applies to the request or not. In the event that it does apply then a GET method of the paths object will be used for the GET request of it is indeed a GET request. When it comes to supporting the additional kinds of requests then it is just a matter of adding anything response function, or middle ware function if you prefer to one of these paths objects.

```js
let http = require('http'),
server = http.createServer(),
port = 8080,
host = 'localhost';
 
// path objects
let pathObjects = [];
pathObjects.push({
    pattern: '/',
    GET: function (req, res, next) {
        res.mess = 'this is root';
        next();
    }
});
 
// get a path object by the given pattern
let getPathObj = (pattern) => {
    let i = 0,
    len = pathObjects.length;
    while (i < len) {
        var pathObj = pathObjects[i];
        if (typeof pathObj.pattern === 'string') {
            if (pathObj.pattern === pattern) {
                return pathObj;
            }
        }
        i += 1;
    }
    return null;
};
 
let sendMess = (req, res, mess) => {
    res.write(mess);
    res.end();
};
 
let sendMessObj = (req, res) => {
    sendMess(req, res, res.mess);
};
 
// on request
server.on('request', (req, res) => {
    res.mess = 'unkown path';
    let pathObj = getPathObj(req.url);
    if (pathObj) {
        let forMethod = pathObj[req.method];
        if (forMethod) {
            forMethod(req, res, () => {
                sendMessObj(req, res)
            });
        } else {
            sendMess(req, res, 'unsuppored http method: ' + req.method);
        }
    } else {
        sendMess(req, res, 'no path object for: ' + req.url);
    }
});
// on listening
server.on('listening', () => {
    let add = server.address();
    console.log('static server up on http://' + add.address + ':' + add.port);
}); ;
// listen
server.listen(port, host);
```

### 2.3 - Responding to get requests with streams

Some times I find myself in a situation in which I need to do something with streams. This is often the case with post requests as the incoming body can be large and needs to be processed on a per chunk basis. However the same can be said of outgoing data as well when it comes to get requests. The response object of a request is a kind of stream so the write method of the request object can be used to send data on a per chunk basis.

This example is then a simple static server that will send an index.html file at a given public folder location that defauts to the current work folder when the script was called.

```js
let http = require('http'),
path = require('path'),
fs = require('fs'),
server = http.createServer(),
// port, host, public dir
port = 8080,
host = 'localhost',
dir_public = process.argv[0] || process.cwd();
// on request
server.on('request', (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        let uri_index = path.join(__dirname, 'index.html');
        let reader = fs.createReadStream(uri_index, {
                highWaterMark: 128
            });
        res.setHeader('Content-Type', 'text/html');
        reader.on('data', (data) => {
            console.log('sent chunk: ')
            res.write(data);
        });
        reader.on('error', (e) => {
            console.log(e.message)
            res.write(e.message);
            res.end();
        });
        reader.on('end', () => {
            console.log('done');
            res.end();
        });
    } else {
        res.end();
    }
});
// on listening
server.on('listening', () => {
    let add = server.address();
    console.log('static server up on http://' + add.address + ':' + add.port);
});
// on client error
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
// listen
server.listen(port, host, 200);
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

There are many npm packages for this that may help to make requests easier, or add helpful features, but it is not to hard to just make requests from node.js with the built in http module by using the [http request method](https://nodejs.org/docs/latest-v8.x/api/http.html#http_http_request_options_callback). I wrote a full post on this [nodejs built in http request method](/2019/07/22/nodejs-http-request/) also, but I will be covering a basic example of it at least here.


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

So the built in nodejs http module can be used to make http requests from node, as well as set up a server that can respond to requests from a client system. When it comes to checking out a package that might make things a litter easier there is the [node request](/2017/05/23/nodejs-request) npm package that might be of interest, although there are many other user space solutions for this sort of thing. 

Also when it comes to setting up a web server it might still be best to go with a framework such as express. When it comes to express I have a [getting started type post on the express framework](/2018/05/21/express-getting-started/), as well as many other related posts on responding to incoming http requests from a client system using express. I also have a [post on making a simple reusable static sever nodeje file](/2017/12/04/nodejs-simple-static-sever-file/) that I often copy and past into various projects where I want and need such a script. I also have yet another simple example type post on yet another file that is based off of my simple [static sever file example, but it will also respond to post requests](/2021/09/10/nodejs-simple-http-request-get-post-system/).
