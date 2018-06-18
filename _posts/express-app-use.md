---
title: The app.use method in express.js
date: 2018-06-18 10:46:00
tags: [js,express,node.js]
layout: post
categories: express
id: 210
updated: 2018-06-18 13:32:59
version: 1.2
---

When making an [express.js](https://expressjs.com/) application one of the most important methods in the app object is the app.use method. This method is important for making use of middle ware modules, as well maing your own middle ware methods.

<!-- more -->


## 1 - A Basic example of a custom middle ware using app.use

For a basic example of app.use I came up with a quick demo that just sets a property called useClient in the request object. In a more advanced project this might be used as a means to set what client system to use for certain browsers.

### 1.1 - Setup the demo folder

To start things off just like any other express demo I create a new folder, and cd into it to make it the current working folder. Once that is done I use npm init to set up a new package.json file for the demo, and then install express as one of the dependencies.

```
$ mkdir app-use-demo
$ cd app-use-demo
$ npm init
$ npm install express@4.16.3 --save
```

When making this demo I was using express 4.16.3, but if you aim to make an actual production app chances are you will want to always use the latest version.

### 1.2 - The set-client.js file



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

### 1.3 - The app.js file
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