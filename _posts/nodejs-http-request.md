---
title: The nodejs native http request method
date: 2019-07-22 19:29:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 506
updated: 2019-07-22 20:03:43
version: 1.4
---

In nodejs there is the built in http module, this module can be used to set up a basic web server, but there are some additional features as well. One such feature is the [http request method](https://nodejs.org/api/http.html#http_http_request_url_options_callback) that can eb used to script http request from a nodejs environment. There are many options when it comes to having a server side http client, one of the most best known might be axios, but in this post I will be writing about just the plain old native JavaScript option in node today.

<!-- more -->

## 1 - http request basic example

So a basic Get request example can be just a url as the first argument followed by a callback that will fire when that resource has loaded.

```js
let http = require('http');
let req = http.request('http://www.google.com', (res) => {
        let html = '';
        res.on('data', function (chunk) {
            html += chunk.toString('ascii');
        });
        res.on('end', () => {
            console.log(html);
        })
    });
req.end();
```

This will work okay it most situations with just plain od get requests, but if I need to set some additional options, or do something involving a post request then there is a more complicated way of doing the same thing that involves giving an object as the first argument.

## 2 - Options example

So and Object can be given as the first argument in place of a url string that can be used to set various options just as port number, method and so forth.

```js
let http = require('http');
let req = http.request({
        hostname: 'www.google.com',
        port: 80,
        path: '/',
        method: 'GET'
    }, (res) => {
        let html = '';
        res.on('data', function (chunk) {
            html += chunk.toString('ascii');
        });
        res.on('end', () => {
            console.log(html);
        });
    });
req.end();
```

## 3 - Conclusion

So the node http request method can be used as a way to script http requests in a nodejs environment, there is much more to the http module though when it comes to responding to http requests.