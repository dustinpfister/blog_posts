---
title: Using CORS in a Heroku app with the cors npm package in node.js
date: 2018-01-28 18:45:00
tags: [heroku, node.js]
layout: post
categories: heroku
id: 138
updated: 2018-01-28 21:58:32
version: 1.0
---

I have been experimenting with making node.js applications that I can then deploy to Heroku lately. Heroku is a great way to host a node.js app up on the web for free, so there is no pressure when it comes to spending money each month just to host some simple hobby, test, or demo app.

<!-- more -->

Anyway one thing I would like to do is to have some kind of json service where I make a request from a client system on my website, and receive back json data. In order to do this I will need to make http requests across origins. To do this it is important to know a thing or two about [CORS (Cross Origin Resource Sharing)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). to help with this there is the npm package [cors](https://www.npmjs.com/package/cors).

## Making the server

So the [cors](https://www.npmjs.com/package/cors) npm package is an [express middleware](http://expressjs.com/en/guide/using-middleware.html), so this means I will have to install the [express](https://www.npmjs.com/package/express) framework along with cors in the project.

## The index.js file of the project

For this project I made just a single index.js file that makes a simple express app. I am of course using cors as a middleware, and also my own method that I use before CORS to check if the origin header is there or not. If it is not there i assume that means it is not a CORS request, and present something different.

```js
let express = require('express'),
cors = require('cors'),
os = require('os'),
app = express(),
 
// hard coded configuration object
conf = {

    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 8080
    port: process.env.PORT || process.argv[2] || 8080,
 
    // origin undefined handler
    // see https://github.com/expressjs/cors/issues/71
    originUndefined: function (req, res, next) {
 
        if (!req.headers.origin) {
 
            res.json({
 
                mess: 'Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined'
 
            });
 
        } else {
 
            next();
 
        }
 
    },
 
    // Cross Origin Resource Sharing Options
    cors: {
 
        // origin handler
        origin: function (origin, cb) {
 
            // setup a white list
            let wl = ['https://dustinpfister.github.io'];
 
            if (wl.indexOf(origin) != -1) {
 
                cb(null, true);
 
            } else {
 
                cb(new Error('invalid origin: ' + origin), false);
 
            }
 
        },
 
        optionsSuccessStatus: 200
 
    }
 
};
 
// use origin undefined handler, then cors for all paths
app.use(conf.originUndefined, cors(conf.cors));
 
// get at root
app.get('/', function (req, res, next) {
 
    res.json({
        mess: 'hello it looks like you are on the whitelist',
        origin: req.headers.origin,
        os_hostname: os.hostname(),
        os_cpus: os.cpus()
    });
 
});
 
app.listen(conf.port, function () {
 
    console.log('CORS-enabled JSON service is live on port: ' + conf.port);
 
});
```

## Using cors for just one path

By using app.use it will result in me using cors for all paths in the app, there is only one path in this demo, but if i had many in an app, and only wanted one path to be a cors path I could do something lime this:

```js
app.get('/', [conf.originUndefined, cors(conf.cors)],function (req, res, next) {
 
    res.json({
        mess: 'hello it looks like you are on the whitelist',
        origin: req.headers.origin,
        os_hostname: os.hostname(),
        os_cpus: os.cpus()
    });
 
});
```

## If you are having problems with req.headers.origin returning undefined

When making the main index.js file for this project I ran into some trouble getting cors to work as expected, because cors has a reputation of being a little complex.  When checking out [issue 71](https://github.com/expressjs/cors/issues/71), and also [issue 89](https://github.com/expressjs/cors/issues/89) It occurred to be that the problem is that req.headers.origin will be undefined when not making a Cross Origin request.

So in other words when req.headers.origin is undefined it should mean that the request was made within the origin of the site, or service. In this case there is no need for cors, and the request can just be handled like a plain old request from within the site.

## A simple client system

For a client system I just put together a simple xhr get method, and then call it at the url that I deployed the app to on heroku. I would just copy and paste this into the javaScript console to make the GET request to the deployment. When I tested it out it was working at the white listed origin (http://dustinpfister.github.io), and not working elsewhere as it should.

```js
var get = function (theUrl, done, fail) {
 
    var xhr = new XMLHttpRequest();
 
    // done call back
    done = done || function (xhr, evt) {
 
        console.log(xhr.response);
        console.log(evt);
 
    };
 
    // if not 200 callback
    fail = fail || function (xhr, evt) {
 
        console.log(xhr);
        console.log(evt);
 
    }
 
    // state change method
    xhr.onreadystatechange = function (evt) {
 
        // ready state 4 means done
        if (xhr.readyState == 4) {
 
            // status 200 means things went smooth
            if (xhr.status == 200) {
 
                done(xhr, evt);
 
            } else {
 
                fail(xhr, evt);
 
            }
 
        }
    }
 
    // open and send a new get request at the given URL
    xhr.open("GET", theUrl, true); // true for asynchronous
    xhr.send(null);
};
 
get('https://dp83-cors.herokuapp.com/');
```

## cloning in this demo, and deploying to heroku

The best way to work with what I am writing about here might be to just clone down what I have worked out.

```
$ git clone https://github.com/dustinpfister/heroku_cors
$ cd heroku_cors
$ npm install
$ heroku login
$ heroku create dp83-cors
$ git push heroku master
```

Just replace 'dp83-cors' with a different app name if I still have this demo live.

## Conclusion

looks like cors is a great way to restrict access for cross orion requests, it is a way in which I can make it so I have a white list of origin names, and the request will only be honored if the request is coming from my domain.