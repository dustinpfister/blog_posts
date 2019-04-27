---
title: Getting and setting cookies in express.js with cookie-parser
date: 2018-05-30 16:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 198
updated: 2019-04-27 12:30:13
version: 1.6
---

Cookies are still a great way of tracking visitors to a website including node.js projects made with [express.js](https://expressjs.com/). In express the usual choice for parsing cookies is the [cookie-parser](https://www.npmjs.com/package/cookie-parser) module. In this post I will be covering a basic demo that makes use of cookie parser, as well as some other pitfalls that are common with cookies in express.

<!-- more -->

## 1 - Express cookie parser and what to know before hand

This is a post in which I am writing about a simple demo that makes used of the cookie-parser module in an express.js project. This is not a getting started post on express.js, node.js, or javaScript in general. I am also using express 4.x in this post and version 1.4.3 of cookie-parser. For more express related content on this site check out the [main post on express](/2018/06/12/express/).

### 1.1 - Setting up the demo folder

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

## 2 - Basic cookie parser demo

For a basic cookie parser demo I just wanted to have a simple routes file that will set a cookie if one is not there to begin with, and then allow for things to just continue as normal. In any case there will always be an id in req.cookies.

### 2.1 - The /routes/cookies.js file

So then cookie.js file that looks like this:

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

This will be used in my main app.js file with app.use.

### 2.2 - The /app.js file

In the app.js file I use my cookie.js file with app.use, and do so first before doing anything else with paths.

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

## 3 - Conclusion

I will likely update this post at some time in the future if I get to it, and there is a demand for doing so. For now I just wanted to make, and write about a basic demo centering around cookie parser. In the mean time you might want to check out some of my other [posts on express.js](/categories/express/).