---
title: Express Next Argument in middleware functions
date: 2021-03-24 16:05:00
tags: [express,node.js]
layout: post
categories: express
id: 830
updated: 2021-03-24 15:31:31
version: 1.9
---

When working out a simple [expressjs](https://expressjs.com/) project for the first time there is starting out with some very basic hello world type examples that involve just a single middleware function attached for a single path of a project. When doing so there is a request object and response object that are both given as arguments for the middleware function. These two objects are useful for working with an http request, as well as creating and sending a response for that request. However there is another typical parameter for these functions that is the express next middleware parameter. This parameter of a middleware function is a function that can be called to allow for express to continue to the next middleware function to be called. The next middileware function can be the next function in an array of functions rather than just a single function, however in other cases it can result in continuing to a whole other path pattern in the main app.js file also.

So then in this post I will be going over a few simple examples of the next argument that is used in middleware design for expressjs projects. In the process of doing so I will also be touching base on a whole bunch of other expressjs, and nodejs related topics.

<!-- more -->

## 1 - Basic express next example

First off lets start with a very sime example of the next argument. Say that I set up a middleware for a path using the app.get method like in so many simple hello world express.js examples. However this time I am not passing just a single function for the middleware of a path, but an array of functions, and the path is an asterisk. So then because I am using an asterisk for the path this means that this middleware will apply for a get request at any path, and on top of that this is an array of functions that will be called in order.

So then when a request is received for this, the first function in the array will be called, at which point the next function can be called to continue on to the next function in the array.

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

In the first example I have noticed that one of the paths that a browser will request on its own is a favicon, so then this can prove as a decent additional example of the next function. Say that I have more or less the same example as before, but now I want to send a favicon.ico file for requests for such a file. For this I can add an addition function in my array of functions, and check the req.url prop of the request object to see if the resource being requested is a favicon. In the event that it is I can respond with such a file by making use of the send file response method. For all other requests I can just call next again.

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

Maybe another good example would be to use an array of functions to preform all of the above, but also attach a special property to a request object that can then be used at a later point to do something deferent depending on the state of some kind of request header.

For this example I took my array of functions and placed it into its own file and called it all\_requests.js, to which I then intend to use in my main app.js file with the app.all method. In this new array of functions I am checking the user agent string of the incoming request and using that to set a platform property of the request object.

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

That is it for the express next argument, helpful this helps to gain some insight on how to go about making some half way decent middleware modules and scripts using express and nodejs.

