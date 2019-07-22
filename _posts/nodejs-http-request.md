---
title: The nodejs native http request method
date: 2019-07-22 19:29:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 506
updated: 2019-07-22 19:35:20
version: 1.1
---

In nodejs there is the built in http module, this module can be used to set up a basic web server, but there are some additional features as well. One such feature is the http request method that can eb used to script http request from a nodejs environment.

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
