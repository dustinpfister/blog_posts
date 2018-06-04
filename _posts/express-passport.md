---
title: Using passport for authentication in express.js apps
date: 2018-05-31 20:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 199
updated: 2018-06-04 11:49:46
version: 1.2
---

When making a full stack node.js powered application using [express.js](https://expressjs.com/), there will often be a need to set up a way to handle user authentication (aka login in). This process can be a little involved, but there are ways to help make it go a lot faster by using common libraries, and tools to make this process far less painful compared to attempting to do it from scratch. There is a project called [passport](https://www.npmjs.com/package/passport) that can help make authentication a whole word easier.

<!-- more -->

## Basic example

For a Basic example I will be writing about a quick demo that just focus on a very basic use case that does not even involve a client database of any kind, just a single hard coded object.

I will also be using the passport-local strategy, this is a strategy that involves visitors using a username and password with the project itself rather than using a third party like face book to authenticate.

So I stared my passport demo by making a new project folder, making it the current working directory, then do an npm init like always with a node.js project. I then installed express, as well as ejs for rendering views. I then also installed express-session, passport, and the strategy I will be using in this demo called passport-local.

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

Once all that is installed I then made a single app.js file that looks like this:

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

## Passport local Strategy

A strategy must be used with passport for authentication, in this example I am using [passport-local](https://www.npmjs.com/package/passport-local) which is a strategy involving a user name and password that is local with the application itself rather than depending on something like facebook. However many strategies exist for passport that can also be used to authenticate, making passport a great choice with this aspect of development.

## Conclusion

This is my two hundredth blog post here at my [github pages site](https://dustinpfister.github.io), thought I would just throw that in at the end here.
