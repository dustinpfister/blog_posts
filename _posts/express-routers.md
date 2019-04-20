---
title: Express Router Basics
date: 2018-05-22 10:50:00
tags: [js,express,node.js]
layout: post
categories: express
id: 192
updated: 2019-04-20 10:14:29
version: 1.5
---

When making a node.js project with [express.js](https://expressjs.com/) I am going to end up setting up a static server, and or defining some paths that will respond to incoming requests with some kind of custom behavior. [Routers](https://expressjs.com/en/4x/api.html#express.router) are a useful way of defining these paths and pulling them into separate javaScript files that can then be linked to from the main script of an app using app.use.

<!-- more -->

## 1 - Express Routers and What to know before getting started

This is a post on using Routers in express.js. Routers are useful for creating separate scripts for handling requests that can be used in an express project with the app.use method. It is a great way to keep code more organized, and can also potential be used to define your own middleware. This is not a [getting started](/2018/05/21/express-getting-started/) post on express.js, full stack development aside from just this little aspect of it, let alone javaScript and any additional basic skills required in general.

## 2 - Keeping your code more organized

So Routers are a good way of keeping things more organized compared to defining all of this logic in the main script that is called to start the project. After all when working on something that does become a little complicated I can end up with a lot of code when it comes to defining these paths. This is often the case when defining a path that will handle post requests where sanitation is of concern.

## 3 - Making some files for a routes path

So Routers will come into play if I do get into making my own middleware, however even when it comes to making my own express app from the ground a routes folder is a common folder that will compose most compose an express.js root structure along with things like a view folder.

For now I will be covering making a routes folder for a project, this will be at least one or more javaScript files in a folder typically names "routes" alone side the node_modules, and views folder that will also typically compose an express.js app.

### 3.1 - All requests Router example

A common task in full stack development involving express.js is that for whatever the reason you might want to do something involving all traffic coming through to an app. Say you want to preform some kind of sanitation, or check of some kind, or to keep things simple maybe you just want to log to the console where reach request is going.

So in the routes path I started off with an all.js file like this:

```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.get('*', function (req, res, next) {
 
    console.log('get from: ' + req.url);
 
    next();
 
});
 
router.post('*', function (req, res, next) {
 
    console.log('post from: ' + req.url);
 
    next();
 
});
```

This could be used with app.use in the main script before any others, it will just simple log the url of the request an continue on to whats next. In a more advanced example that could be used for anything that you would want to do for all the traffic coming into the site. Something similar to this could also be made to be used at the end of a project to catch any traffic that has not went to any known path.

### 3.2 - Static paths example

Another file that could be made in the routes folder could make use of simple static paths. In my demo I made a file called static.js that just used some ejs templates to show a simple message.

```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.get('/', function (req, res) {
 
    res.render('index', {});
 
});
 
router.get('/about', function (req, res) {
 
    res.render('about', {});
 
});
```

### 3.3 - Pattern paths example

Regular expressions can also be used to target any path that can match a given regular expression pattern. For this demo I made a file called patt.js that will match any path pattern that begins with "user_" and then any combination of alphanumeric characters.

```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.get(/user_(\w+)/, function (req, res) {
 
    let match = req.url.match(/user_(\w+)/),
    username;
 
    if (match) {
 
        username = match[0].replace(/^user_/,'');
 
    }
 
    if (username) {
 
        res.render('user', {
            username: username
        });
 
    } else {
 
        res.send('no username!?');
 
    }
 
});
```

### 3.4 - Using the files

So in my typical app.js file that will be at the root namespace of the app I will make use of my route files with app.use. The order in which they are added is important, whatever you want used first should be added first, so in this example I would want to start with the all.js file.

```js
let express = require('express'),
path = require('path'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
// all paths
app.use('/', require('./routes/all'));
 
// static paths
app.use('/', require('./routes/static'));
 
// pattern paths
app.use('/', require('./routes/patt'));
 
// start the app
app.listen(port, function () {
 
    console.log('app is up on port: ' + port);
 
});
```

## 4 - Conclusion

Routers are something that I will be using often when making express.js projects. I wanted this to just be a basic post on this subject, but I did not get into something more advanced like making your own middleware, or some kind of actual useful project rather than just a simple demo.