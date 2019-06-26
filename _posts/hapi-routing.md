---
title: Routing in hapi js
date: 2019-06-26 11:03:00
tags: [hapi]
layout: post
categories: hapi
id: 491
updated: 2019-06-26 11:52:41
version: 1.9
---

In this post I will be going over some examples of how to go about getting started with [routing](https://hapijs.com/tutorials/routing) and creating paths in hapi js. The basic components of a route in hapi is a path, a method, and a handler for incoming http requests. These comments are given to hapi in the from of an object to the server.route method. There are many little things here and there to be awre of when setting up some routes in hapi though so lets look at a few examples of routes in hapi js.

<!-- more -->

## 1 - Getting started with routes and hapi

It is worth noting this post I was using hapi 17.9.0, in older versions of hapi the code examples here will most likely not work, and might also break in more resent versions as well. This is not a geting started post on hapi, nodejs, or javaScript in general, but I will try to keep things more or less basic here.

## 2 - A Basic hapi route example

So a very basic example of setting up a route in hapi 17.x might involve just calling the server.route method, and passing an object that contains a method, path, and handler properties. The method property can be a string or an array of strings where each string is the type of http request method that this route will respond to such as GET and POST. The Path property must be a string but it can be formated in a certain way to include some parameters. The handler must be a function and that function will receive a request option and a response toolkit object as its arguments.

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

Here I have a basic example that just responds to get requests to the root path with the string get request to root. Of course when it comes to an actual project of some kind there might be some async tasks that might need to be accomplished, and some response toolkit methods might need to be used when it comes to furnishing a response, but this is just a basic hello world style example for now.

## 3 - Methods

So lets take a closer look at the method property in this section. In the more basic examples thus far the method property can be just a string, however sometimes you might want to have a route that will respond to more than one type of http request rather than just GET. For example say I want a route that will always respond with the same data for both GET and POST requests. To do so I just need to give an array rather than a string for the method property, and have an array of strings where each string is a type of http request.

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

## 4 - Paths

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