---
title: Express status getting and setting a http status code
date: 2019-04-29 17:48:00
tags: [express,node.js]
layout: post
categories: express
id: 429
updated: 2019-04-29 20:19:44
version: 1.11
---

In express status codes can be both get and set with properties and methods in an express [response object](/2019/04/27/express-response-objects/). There is the res.statusCode property than can be used to find out the current [http status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes), and the [res.status](https://expressjs.com/en/api.html#res.status) method that can be used to set that code. In addition there is the res.sendStatus method that can be used to just set a status code and end the request without sending any data in the same way as the express end response method. So this will be a post on http status codes in express, getting it, setting it and some status code use examples.

<!-- more -->

## 1 - Express status and just getting the current http status code.

To get the current http status code of the request object there is the re.statusCode property. By default the status code of a response is 200 with means everything is okay.

```js
let express = require('express'),
app = express();
 
// default status code is 200 (OK)
app.get('/', (req, res) => {
    res.send('status: ' + res.statusCode); // status: 200
});
 
app.listen(8080);
```

Some times there is something that might happen that would call for setting a status code other than that of 200 though. For example if the requested resource does not exist it is typical to send a 404 status code. For this there are methods like res.status, and res.sendStatus.

## 2 - Express status send and end

If a status code is it be sent but with no data body then there is the res.sendStatus response method that can be used. Another option would be to use the status method combined with the end method, or the send method with no arguments given.

```js
let express = require('express'),
app = express();
 
// the sendStatus method can be used to just
// send a status with no data
app.get('/send1', (req, res) => {
    res.sendStatus(404);
});
 
// the status method with the end method
// can also be used
app.get('/send2', (req, res) => {
    res.status(404).end();
});
 
// the status and send method with no
// argument also seems to work okay
app.get('*', (req, res) => {
    res.status(404).send();
});
 
app.listen(8080);
```

## 3 - An Express Status example that involves a 500 (Server Error) status code

Here I put together a quick example that responds with a 500 Internal Server Error if any kind of error happens when attempting to get a resource, it can also potential default to a 400 error for any request that was not handled by any other additional middleware regardless if there is an error or not.

```js
let express = require('express'),
fs = require('fs'),
path = require('path'),
app = express();
 
app.set('port', process.argv[2] || process.env.PORT || 8080);
 
// get requests to root (/)
app.get('/', (req, res, next) => {
    fs.readdir(process.cwd(), (e, files) => {
        if (e) {
            // if error
            next(e);
        } else {
            // send index of CWD
            let html = '';
            files.forEach((file) => {
                html += '<p><a href=\"/' + file + '\">' + file + '<\/a><\/p>'
            });
            res.set('Content-Type', 'text/html');
            res.send(html);
        }
    });
});
 
// all other get requests
app.get('*', (req, res, next) => {
    fs.readFile(path.join(process.cwd(), req.path), 'utf8', (e, text) => {
        if (e) {
            // if error
            next(e);
        } else {
            // else send file as text
            res.set('Content-Type', 'text/plain');
            res.send(text);
        }
    });
});
 
// Error / 400 handler
app.use([
 
        (err, req, res, next) => {
            if (err) {
                res.status(500).send(err.message || 'Internal Server Error');
            } else {
                next();
            }
        },
 
        (req, res) => {
            res.status(400).send('Bad request');
        }
 
    ]);
 
app.listen(app.get('port'), () => console.log('app is up on port: ' + app.get('port')));
```

The example generates an index of files that are in the current working directory when the root path is visited. All other get requests result in the example attempting to read a file at the path relative to the current working directory. In the event that the file is not there, or an attempt is made to read a directory, an error occurs resulting in a 500 error status being sent.

A 500 status code is very general of course, it just means an internal or server side error has occurred. Same has with a 400 status code as well, it just means Bad Request and it is not more specific like a 404 (not found) or a 403 Forbidden. It is a good idea to stick to codes like 500, or 400 when it comes to making things more general. However in a real project it would be more professional to use more specific codes.

## 4 - Conclusion

In express status codes can be set with the res.status response method, and the current http status can always be found via the res.statusCode property. Of course there is much more to write about when it comes to the many different status codes, and writing much more complicated [express middlewares](/2018/06/25/express-middleware/) and client systems. I wanted to at least start a post on this subject though, and hopefully I will get around to expanding on this at some point as well. In the mean time you might want to check out my [main post on express](/2018/06/12/express/) for more content on expressjs related topics.