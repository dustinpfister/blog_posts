---
title: Express.js app.all method for handing all incoming requests
date: 2018-06-05 11:41:00
tags: [js,express,node.js]
layout: post
categories: express
id: 202
updated: 2019-11-15 19:52:29
version: 1.7
---

So one of the application methods in [express.js](https://expressjs.com/) is app.all, which is a method that can be used to work with any kind of http request method. The most commonly used methods are of course 'GET', and 'POST'. However there are many more that also make sense for what they are, and at times it might be desirable to have a way work with any kind of incoming request regardless of the certain method. This is where app.all can be of help. In this post I will be writing about the app.all method in express, I will be showing some use case examples, and will touch base on the different http methods.

<!-- more -->

## 1 - Express app all method and what to know before starting

This is a post on the app.all method in express.js, it is not a getting started post on express.js or any additional subjects that relate to express.js. If you are new to express, you might wan to start with my [getting started post on express.js](/2018/05/21/express-getting-started/), or my [main post on express](/2018/06/12/express/). Also in this post I am using express 4.16.3, and yes express is something where the version number matters a lot.

## 2 - Example of app.all in express

For a basic example of app.all I thought it would be a good idea to use it to log info for any incoming request first, then call the next method to continue with the normal flow of the demo. The normal flow of this basic demo will be to just provide some static assets in a public folder that is an index.html file, and some javaScript files that will be used to make requests of different types to the back end script.

So to set this up I made my demo folder, made it the current working directory, and did a npm init to set up the package.json file. Once that was done the only package that I will be installing via npm is express itself, using the --save flag to add it to package.json.

```
$ mkdir app-all
$ cd app-all
$ npm init
$ npm install express@4.16.3 --save
$ mkdir public
$ cd public
$ mkdir js
$ cd ..
```

I also added a public folder, and a js folder inside of it. This will house some simple static assets that I will used to make requests.

### 2.1 - The /public folder

So in this simple demo I have a public folder that will just house an index.html file, and a /public/js folder that will house some javaScript files that will be used to make requests.

#### 2.1.1 - The /public/index.html file

So in the root of the public folder I made a basic index.html file that will be used to serve up some javaScript files. One will be axios.min.js which is a great promise based http client that I will used to make requests in another javaScript file called client.js

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Express app.all demo</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>The app.all demo</h1>
        <script src="/js/axios.min.js"></script>
        <script src="/js/client.js"></script>
    </body>
</html>
```

For now this index.js file does not do much of anything aside from loading, and running these two scripts. In a more advanced version I have this do a bit more, but for now this is just the basic demo here.

#### 2.1.2 - Using axios for a http client at /public/js/axios.min.js

So for this demo I just grab a copy of axios at the official repository dist folder found at github at [https://github.com/axios/axios/blob/master/dist/axios.min.js](https://github.com/axios/axios/blob/master/dist/axios.min.js). I just copied and pasted it in there to keeps things simple when it comes to including front end code in a simple demo like this.

#### 2.1.3 - The /public/js/client.js file

So for this demo I have a client.js file in which I will be making some additional requests aside from the GET requests for the static assets.

```js
axios({
 
    method: 'GET',
    url: '/not/a/path'
 
}).then(function (res) {
 
    console.log(res);
 
});
```

For now I am just making a GET request for a path that does not exist, in a more advanced demo I could do some other kinds og requests other than GET requests.

### 2.2 - The /app.js file

So in the root of the demo folder is where I typically place my main app.js file that will be called with node to start the demo. I am using app.all to define middleware for all types of requests, coming from all possible paths by using an asterisk for the path.

```js
let express = require('express'),
 
port = process.env.PORT || process.argv[2] || 8080,
 
app = express();
 
// log info about ALL requests to ALL paths
app.all('*', function (req, res, next) {
 
    console.log('*** A request ***');
    console.log('method: ' + req.method);
    console.log('url: ' + req.url);
    console.log('*****************');
 
    next();
 
});
 
// host some static assets in a public folder
app.use('/', express.static('public'));
 
// What to do for ALL requests for ALL Paths 
// that are not handled above
app.all('*', function (req, res) {
 
    console.log('*** 404 ***');
    console.log('404 for url: ' + req.url);
    console.log('***********');
 
    res.send('404');
 
});
 
app.listen(port, function () {
 
    console.log('app.all demo is up on port: ' + port);
 
});
```

In here I am using app.all to log to the console, any kind of incoming request. For this basic example so far it will only be GET requests, but app.all differs from other methods like app.get, or app.post in that it will apply to any kind of http method.

I also set the path to '\*' this will make it so the method I give to app.all will not just respond to any kind of request, but also at any path. This allows for a sure 'catch all' method of sorts in which I want to do something for any kind of request made to any kind of path. So it goes without saying that app.all can come in handy with many kinds of scenarios.

Notice that I have one such method at both the beginning, and end of the file. When adding one at the very beginning it allows for me to do something that should be done first before proceeding with anything else. In this simple demo I am just logging what is going on to the console, but it could be some kind of request sanitation check when making a real project. In addition I also have one at the very end, which can be used to respond to what should typically be 404 requests, but also any other kind of request that was not satisfied by any anything that is going on above.


## 3 - Conclusion

So the app.all method is the most versatile express.js app method of the app methods that have to do with handing incoming http requests. There are many other methods such as app.get, and app.post that can also be used, but they are reserved to just requests of a certain http method. It does make sense to use those of course as a way of breaking code up more, but if for some reason I do want to write something that will apply to all requests there is of course app.all for that.

Thank you for reading, if you enjoyed this post you might want to check out my other posts on [express.js](/categories/express/).
