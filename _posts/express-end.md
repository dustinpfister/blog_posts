---
title: Express end response method
date: 2019-04-28 09:02:00
tags: [express,node.js]
layout: post
categories: express
id: 428
updated: 2019-04-28 21:21:33
version: 1.5
---

The [express end](https://expressjs.com/en/api.html#res.end) response method is one of several ways to go about ending an incoming http request from a client system. The express end method is used for situations in which the request is to just simply be put to an end without sending any data to the client. It is true that the method can be used to send data in the form of a string or buffer to the client, but another response method should be used such as res.send, or res.json that are also at hand in a [response object](/2019/04/27/express-response-objects/).


<!-- more -->

## 1 - Express end response method basic example

For a basic example of the express end response method here is an example that uses the app.all method to just simply end any request with the end method. When using the end method there is no need to pass any argument to it, data can be passed in the form of a string or buffer, but if the express end method is being used that way it might be better to use the send response method rather than the end method.

```js
let express = require('express'),
app = express();
 
// any request to any path is just simply ended
app.all('*', (req, res) => res.end());
 
app.listen(8080);
```

## 2 - The Express end method does not set http status

The use of the express end method does not do anything to change the [http status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) of the response. When using the end method to end a request the statusCode property can be used to find out the current http status code, and the status response method can be used as a way to set the desired http status code. The express end response method can then be used to end the request with the set status code.

```js
let express = require('express'),
app = express();
 
// the res.end method does nothing to change
// the default http status code of 200 (OK)
app.get('/foo', (req, res) => {
    console.log(res.statusCode); // 200
    res.end();
    console.log(res.statusCode); // 200
});
 
// the res.status method can be used to change that
app.get('*', (req, res) => {
    console.log(res.statusCode); // 200
    res.status(404).end();
    console.log(res.statusCode); // 404
});
 
app.listen(8080);
```

## 3 - Using Express end to send data to the client

```js
let express = require('express'),
app = express();
 
// sending a string will work
// but res.send should be used
app.get('/str', (req, res) => {
    res.end('foo'); // foo
});
 
// sending a Buffer will work
// but res.send should be used
app.get('/buf', (req, res) => {
    res.end(new Buffer('bar')); // bar
});
 
// sending an object will result in an error
// use res.json
app.get('/obj', (req, res) => {
    let obj = {
        mess: 'okay'
    };
    try {
        res.end(obj);
    } catch (e) {
        obj.mess = e.message;
        res.json(obj); // {"mess":"First argument must be a string or Buffer"}
    }
});
 
// res.send, res.json, or res.redner should
// be used when sending some kind of data
app.get('/', (req, res) => {
    res.send('<ul>' +
        '<li><a href=\"/str\">str<\/a><\/li>' +
        '<li><a href=\"/buf\">buf<\/a><\/li>' +
        '<li><a href=\"/obj\">obj<\/a><\/li>' +
        '<\/ul>');
});
 
app.get('*', (req, res) => {
    res.status(404).send('File Not Found');
});
 
app.listen(8080);
```

## 4 - Conclusion

So then the express end response method is one of several ways to end an http request from a client that is a good choice when no data needs to be sent to the client. For more expressjs related content on this site be sure to check out the main post on [expressjs](/2018/06/12/express/).