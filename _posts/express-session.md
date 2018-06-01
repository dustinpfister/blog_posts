---
title: Using express-session for session data, and primitive authentication in express.js
date: 2018-06-01 10:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 200
updated: 2018-06-01 10:30:38
version: 1.0
---

As of late I have been writing some content on [express.js](https://expressjs.com/), and as such it was only a matter of time until I came to a point where it is time to look into how to handle session data, and user authentication. If I want to implement user authentication in a way that I perceive as the right way, I will want to use [passport](/2018/05/31/express-passport/). However so far I often find myself making simple hobby apps, as such I can take a more informal route to handling authentication involving some system that is just assignment of a unique id to each client by way of a cookie file for example. In any case this post is about [express-session](https://www.npmjs.com/package/express-session), a great project for working with session data in an express.js project

<!-- more -->

## Authentication With express-session only?

With authentication in express.js it may be best to go with [passport](/2018/05/31/express-passport/), this is defiantly a professional and versatile way of making quick work of setting up some kind of system that involves user registration and authentication (aka logging in). However if you are just making some simple little hobby app there might be a desire to have some kind of primitive yet effective way of doing this.

Express session involves the use of cookies, and it is possible to have the cookies not expire resulting in a persistent way of setting a unique id to each visitor to the app. The id set in the cookie could be used as a replacement for a user login, and password. Yes there are many draw backs to this, but I see simple games, and projects using this kind of system, and it works for what it is worth.

## Basic example

For a Basic example I will be writing about a quick demo that just focus on a very basic use case that does not even involve a client database of any kind, just a single hard coded object.

```
$ mkdir passport-demo
$ cd passport-demo
$ npm init
$ npm install express@4.16.3 --save
$ npm install ejs@2.6.1 --save
$ npm install express-session@1.15.6 --save
$ npm install passport@0.4.0 --save
$ npm install passport-local@1.0.0 --save
```

```js
let express = require('express'),
passport = require('passport'),
Strategy = require('passport-local').Strategy,
 
// my not so secret secret
secret = 'eeeek',
 
user = {
    username: 'foo',
    id: 0,
    password: '123'
},
 
port = process.env.PORT || process.argv[2] || 8080,
app = express();
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('body-parser').urlencoded({
        extended: true
    }));
 
app.use(require('express-session')({
        secret: secret,
        resave: false,
        saveUninitialized: false
    }));
 
passport.use(new Strategy(function (username, password, cb) {
 
        if (username === user.username && password.toString() === user.password) {
            return cb(null, user);
        }
 
        // null and false for all other cases
        return cb(null, false);
 
    }));
 
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
 
passport.deserializeUser(function (id, cb) {
 
    cb(null,user);
 
});
 
app.use(passport.initialize());
app.use(passport.session());
 
app.get('/', function (req, res) {
 
        res.render('index',{layout:'home',user: req.user});
 
});
 
app.get('/login',
    function (req, res) {
    res.render('index',{layout:'login',user: req.user});
});
 
app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    function (req, res) {
    res.redirect('/');
});
 
app.get('/logout',
    function (req, res) {
    req.logout();
    res.redirect('/');
});
 
app.listen(port, function () {
 
    console.log('passport-local demo up on port: ' + port);
 
});
```

## Conclusion

This is my two hundredth blog post here at my [github pages site](https://dustinpfister.github.io), thought I would just throw that in at the end here.
