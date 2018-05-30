---
title: Getting and setting cookies in express.js with cookie-parser
date: 2018-05-30 16:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 198
updated: 2018-05-30 16:56:37
version: 1.1
---

Cookies are still a great way of tracking visitors to a website including node.js projects made with [express.js](https://expressjs.com/). In express the usual choice for parsing cookies is the [cookie-parser](https://www.npmjs.com/package/cookie-parser) module. In this post I will be covering a basic demo that makes use of cookie parser, as well as some other pitfalls that are common with cookies in express.

<!-- more -->


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