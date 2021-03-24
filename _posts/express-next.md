---
title: Express text built in middleware
date: 2021-03-23 13:24:00
tags: [express,node.js]
layout: post
categories: express
id: 830
updated: 2021-03-24 15:05:29
version: 1.2
---

When working out a simple [expressjs](https://expressjs.com/) project for the first time there is starting out with some very basic hello world type examples that involve just a single middleware function atatched for a single path of a project. When doing so there is a request object and response object that are bolth given as arguments for the middleware function. These two objects are useful for working with an http request, as well as creating and sending a response for that request. However there is another typical parameter for these functioins that is the express next middleware parameter. This parameter of a middleware function is a function that can be called to allow for express to continue to the next middleware function to be called. The next middileware function can be the next function in an array of functions rather than just a single function, however in other cases it can result in continuing to a whole other path pattern in the main app.js file also.

<!-- more -->


## 1 - Basic express next example

```js
let express = require('express'),
app = express();
 
app.set('port', process.argv[2] || process.env.PORT || 8080);
 
app.get('*', [
    // log request url to the console
    (req, res, next) => {
        console.log(req.url);
        next();
    },
    // send hello message
    (req, res) => {
        res.send('Hello User');
    }
]);
 
// listen on app port
app.listen(app.get('port'), () => {
    console.log('app up on port: ' + app.get('port'));
});
```

## 2 - Send a favicon example

```js
let express = require('express'),
path = require('path'),
app = express();
 
app.set('port', process.argv[2] || process.env.PORT || 8080);
 
app.get('*', [
    // log request url to the console
    (req, res, next) => {
        console.log(req.url);
        next();
    },
    // send favicon file
    (req, res, next) => {
        // if the request is for /favicon, send a favicon.ico file for the request
        if(req.url.toLowerCase() === '/favicon.ico'){
            res.sendFile( path.join(__dirname, 'favicon.ico') );
        }else{
            next();
        }
    },
    // send hello message
    (req, res) => {
        res.send('Hello User');
    }
]);
 
// listen on app port
app.listen(app.get('port'), () => {
    console.log('app up on port: ' + app.get('port'));
});
```

## 3 - The user agent header.

```js
let path = require('path');
 
module.exports = [
    // log request url to the console
    (req, res, next) => {
        console.log(req.url);
        next();
    },
    // send favicon file
    (req, res, next) => {
        // if the request is for /favicon, send a favicon.ico file for the request
        if(req.url.toLowerCase() === '/favicon.ico'){
            res.sendFile( path.join(__dirname, 'favicon.ico') );
        }else{
            next();
        }
    },
    // set a req.platform prop based on user agent header
    (req, res, next) => {
        var userAgent = req.get('user-agent');
        // default to an 'Unkown platform'
        req.platform = 'Unkown';
        if(userAgent.match(/\(X11/)){
            req.platform = 'Linux';
        }
        if(userAgent.match(/\(Windows/)){
            req.platform = 'Windows';
        }
        if(userAgent.match(/\(Macintosh/)){
            req.platform = 'Macintosh';
        }
        next();
    }
];
```

```js
let express = require('express'),
path = require('path'),
app = express();
 
app.set('port', process.argv[2] || process.env.PORT || 8080);
 
// use all_requests.js for '*' path
app.all('*', require( path.join(__dirname, 'all_requests.js') ))
 
app.get('/', (req, res) => {
    res.send('Hello ' + req.platform + ' OS User');
});
 
// listen on app port
app.listen(app.get('port'), () => {
    console.log('app up on port: ' + app.get('port'));
});
```

## 4 - Conclusion

