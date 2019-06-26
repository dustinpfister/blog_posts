---
title: Routing in hapi js
date: 2019-06-26 11:03:00
tags: [hapi]
layout: post
categories: hapi
id: 491
updated: 2019-06-26 11:06:47
version: 1.1
---

In this post I will be going over some examples of how to go about getting started with routing and creating paths in hapi js.

<!-- more -->

## 1 -

```js
let Hapi = require('@hapi/hapi');
let init = async() => {
    let server = Hapi.server({
            port: process.env.PORT || process.argv[2] || 3000,
            host: 'localhost'
        });
    // basic route for the root path
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return 'get request to root';
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
```

## 2 - 

```js
let Hapi = require('@hapi/hapi'),
fs = require('fs'),
path = require('path'),
path_pack = path.resolve('../../package.json');
let init = async() => {
    let server = Hapi.server({
            port: process.env.PORT || process.argv[2] || 3000,
            host: 'localhost'
        });
    // respond to any GET or POST request with the same data
    server.route({
        method: ['GET', 'POST'],
        path: '/package',
        handler: async function (request, h) {
            let pack = await new Promise((resolve, reject) => {
                    fs.readFile(path_pack, 'utf8', (e, data) => {
                        if (e) {
                            reject(e)
                        } else {
                            resolve(data)
                        }
                    })
                });
            response = h.response(pack);
            response.type('application/json');
            return response;
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
```

## 3 - Paths

```js
let Hapi = require('@hapi/hapi'),
fs = require('fs'),
path = require('path'),
util = require('util'),
dir_posts = path.resolve('./posts');
let readdir = util.promisify(fs.readdir);
let readFile = util.promisify(fs.readFile);
let init = async() => {
    let server = Hapi.server({
            port: process.env.PORT || process.argv[2] || 3000,
            host: 'localhost'
        });
    // a path can just be a string
    server.route({
        method: 'GET',
        path: '/',
        handler: async function (request, h) {
            let years = await readdir(dir_posts);
            return years;
        }
    });
    // you can aso have params as well in the string
    server.route({
        method: 'GET',
        path: '/{year}',
        handler: async function (request, h) {
            let months = await readdir(path.join(dir_posts, request.params.year));
            return months;
        }
    });
    server.route({
        method: 'GET',
        path: '/{year}/{month}',
        handler: async function (request, h) {
            let p = request.params;
            let days = await readdir(path.join(dir_posts, p.year, p.month));
            return days;
        }
    });
    server.route({
        method: 'GET',
        path: '/{year}/{month}/{day}',
        handler: async function (request, h) {
            let p = request.params;
            let posts = await readdir(path.join(dir_posts, p.year, p.month, p.day));
            return posts;
        }
    });
    server.route({
        method: 'GET',
        path: '/{year}/{month}/{day}/{post}',
        handler: async function (request, h) {
            let p = request.params;
            file = await readFile(path.join(dir_posts, p.year, p.month, p.day, p.post), 'utf8');
            return file;
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
```