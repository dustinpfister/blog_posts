---
title: Getting and setting cookies in express.js with cookie-parser
date: 2018-05-30 16:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 198
updated: 2018-06-04 14:02:44
version: 1.2
---

Cookies are still a great way of tracking visitors to a website including node.js projects made with [express.js](https://expressjs.com/). In express the usual choice for parsing cookies is the [cookie-parser](https://www.npmjs.com/package/cookie-parser) module. In this post I will be covering a basic demo that makes use of cookie parser, as well as some other pitfalls that are common with cookies in express.

<!-- more -->

## Setting up the demo folder

To set up a new demo I just make a new folder, cd into it, and do an npm init. Once I have my new demo folder complete with a package.json file I then install the modules that I want to use for the demo. In the case of this demo it is express, and cookie-parser.

```
$ mkdir cookie-parser-demo
$ cd cookie-parser-demo
$ npm init
$ npm install express@4.16.3 --save
$ npm install cookie-parser@1.4.3 --save
$ mkdir routes
```

Once that is all done I can make my app.js file that I will be calling from the command line with node to start the demo. As you can see I also made a routes folder wich is pretty standard for most express.js projects along side things such as a public, and or views folder. The routes folder is where I will place all the files that will make use of a router that I will then use in my main app.js file. For more information on this you might want to read [my post on routers](/2018/05/22/express-routers/).

## Basic cookie parser demo

For a basic cookie parser demo I just wanted to have a simple routes file that will set a cookie if one is not there to begin with, and then allow for things to just continue as normal. In any case there will always be an id in req.cookies.

so then I have a /routes/cookies.js file that looks like this:
```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.use(require('cookie-parser')());
 
router.use(function (req, res, next) {
 
    // let my cookie be (or not be) here
    let mc = req.cookies._mc;
 
    // if not make it
    if (!mc) {
 
        // crude id gen for now
        let id = new Date().getTime().toString();
        res.cookie('_mc', id);
        req.cookies._mc = id;
 
    }
 
    next();
 
});
```

And then I use it in my main app.js like this:

```js
let express = require('express'),
app = express(),
port = process.env.PORT || process.argv[2] || 8080;
 
// check for cookies
app.use(require('./routes/cookie'));
 
app.get('/', function (req, res) {
 
    res.send(JSON.stringify(req.cookies));
 
});
 
app.listen(port, function () {
 
    console.log('cookie-parser demo is up on port: ' + port);
 
});
```

This works okay, but there is a problem when someone blocks cookies, it will keep assigning a new id each time the site is visited. Thats not a big deal here, but it can become one if I introduce a database and a new record is created each time.