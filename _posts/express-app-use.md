---
title: The app.use method in express.js
date: 2018-06-18 10:46:00
tags: [js,express,node.js]
layout: post
categories: express
id: 210
updated: 2021-12-28 09:16:18
version: 1.9
---

When making an [express.js](https://expressjs.com/) application one of the most important methods in the app object is the [app use](https://expressjs.com/en/api.html#app.use) method. This method is important for making use of middleware modules, as well making your own middle ware methods. I will not be getting into middleware in depth here though but I have a post that is a good starting point for [express middleware](/2018/06/25/express-middleware/). There is also the [app all](/2018/06/05/express-app-all/) method that does work in a similar way to that of app.use, but they are not the same thing.

<!-- more -->

## 1 - Express app use and what to know for starters

This is a post on a certain methods in an instance of an [app object](/2018/06/15/express-app-object/) in the node.js powered framework known as expressjs. It is not a getting started post on express.js, javaScript, node.js or any additional skill required before hand. If you are new to express you might want to start at my [express.js mega post](/2018/06/12/express/), or my post on [getting started with express](/2018/05/21/express-getting-started/).

## 2 - An example of the express app use method and custom middleware

For a basic example of app.use I came up with a quick demo that just sets a property called useClient in the request object. In a more advanced project this might be used as a means to set what client system to use for certain browsers.

### 2.1 - Setup the demo folder

To start things off just like any other express demo I create a new folder, and cd into it to make it the current working folder. Once that is done I use npm init to set up a new package.json file for the demo, and then install express as one of the dependencies.

```
$ mkdir app-use-demo
$ cd app-use-demo
$ npm init
$ npm install express@4.16.3 --save
```

When making this demo I was using express 4.16.3, but if you aim to make an actual production app chances are you will want to always use the latest version.

### 2.2 - The set-client.js file

In this file I will be using the app.use method to define what will be done with incoming requests. It will look for a user agent header in the request headers using req.get. Base on what is there it may set a value that will eb appended to the request object to something other than what it is by default. In any case it will then call next to continue on with the normal flow of things.

```js
let express = require('express'),
 
// export the app object
app = module.exports = express();
 
// custom middle ware that sets a req.useClient value
app.use(function (req, res, next) {
 
    let agent = req.get('user-agent').toLowerCase();
 
    // default to generic
    req.useClient = 'generic';
 
    // use a bootstrap client, but only for chrome users
    if (agent.indexOf('chrome') > -1) {
 
        req.useClient = 'bootstrap';
 
    }
 
    next();
 
});
```

It is also possible to have it so it will look at query strings, or set the value by another means, but you get the idea. If I had a project in which there was more than one client system this can work as a way to set which client system to use based on the incoming request http headers.

### 2.3 - The app.js file

In the main app.js file I again use app.use to use the middleware that I have defined in my set-client.js file.

```js
let express = require('express'),
app = express();
 
// using the custom middle ware
// to have a req.useClient value
app.use(require('./set-client.js'));
 
app.get('/', function (req, res) {
 
    res.send('so we will be useing the ' + req.useClient + ' client system.');
 
});
 
app.listen(8080, function () {
 
    console.log('the app is up on port 8080');
 
});
```

I do so before anything else as it will not work if I set up my handler for the root path before hand, as the order in which things happen in express does very much matter.

### 2.4 - start up the demo

So now that I have everything in order I start up the demo by calling the main app.js file with node in the command line.

```
$ node app.js
the app is up on port 8080
```

Once I have the message displayed in the command line I should be able to see what will happen when I navigate to localhost:8080 in my browser. If I do so in chrome I will get a different message compared to if I do so with some other browser as expected.

## 3 - Conclusion

The Express app use method is an important part of the app object in express. The method is needed to make use of express middleware that is made from the ground up for your own project, or added in via an additional module like with [body-parser](/2018/05/27/express-body-parser/).
