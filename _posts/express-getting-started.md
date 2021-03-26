---
title: Getting started with expressjs and nodejs
date: 2018-05-21 10:50:00
tags: [express,node.js]
layout: post
categories: express
id: 191
updated: 2021-03-26 14:59:56
version: 1.13
---

The [node.js](https://nodejs.org/en/) powered server side framework [express.js](https://expressjs.com/) is a pretty great when it comes to making full stack web applications. It is part of the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_%28solution_stack%29), and is also a major component of many other projects like [sails](https://www.npmjs.com/package/sails), and [keystone](https://www.npmjs.com/package/keystone) just to name a few. 

However the framework can just be used by itself, and just a few additional packages as a way to quickly get up and running with a nodejs project compared to doing everything from the ground up. I do not have to go with angular when it comes to a client side framework, in fact as of the last time I edited this post I enjoy using vuejs over angular actually.

In any case express is worthy of a series of posts on it for starting with the typical getting started post, so lets get this one out of the way so we can get into making some interesting stuff.

<!-- more -->

## 1 - What to know before getting started with express

This is a getting started post on the server side web application framework known as express.js, it is not a getting started post on javaScript in general as that is outside the scope of this post and any additional posts that I will write in the future. So I assume that you have at least some knowledge of javaScript. I also assume that you have node.js installed, and have some experience with that as well.

## 2 - Just getting started without express-generator

So far when I work with express I just start a new npm project, and install express.js as one of the dependencies like with any other node.js project.

```js
$ mkdir helloworld
$ cd helloworld
$ npm init
$ npm install express --save
```

## 3 - Basic hello world example

An express.js hello world might involve just getting e reference to what is exported from the express module like with any npm package, then calling the function that is given when doing so which will result in an instance of an express app object.

Once you have the app object you would want to set up one or more paths that will respond to get requests, and use send response method to respond with the sting 'hello world'.

```js
let express = require('express'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
app.get('*', function (req, res) {
 
    res.send('hello world');
 
});
 
app.listen(port, function () {
 
    console.log('app is up on port: ' + port);
 
});
```

It is common to call the main script that will start the project app.js, and to place this file in the root name space of the project. In all my demos I tent to stay true to that practice.

## 4 - Whats next

The next step from your first express.js hello world project might be to get into how to serve up static files, render templates with a rendering engine like ejs, or pug, or learn more about routing. Once you have those things down you might be in a good place to start experimenting with different stacks, including database options if the project has a need for one. In the MEAN stack the front end framework used is angular, however I have come to like vuejs a lot more when it comes to choosing a front end framework.

However there is still a whole lot more to learn just when it comes to using express by itself. With that said I have [my main post on express in general](/2018/06/12/express/) that I put together as a kind of grand central location for all my express content on this site. Maybe the best way to learn express would be to just come up with one or two ideas for some actual projects, start working on them, and just learn as you go. When it comes to that I have a [post in which I outline a number of express project examples](/2019/04/30/express-example/) that I have started thus far.

### 4.1 - Static files

You might want to check out [my post on staic file hosting in express](/2018/05/24/express-static/), but it is not to hard. Just have a public folder in the root of the project, place static assets in there including an index.html file, and add this to the app.js file.

```js
app.use('/', express.static('public'));
```

Of course there are options that can be passed to the express.static method via a second argument, and sometimes you might want to bind to a path other than rough but thats the basic idea.

### 4.2 - Adding a routes folder

I think routers are one of the most important things to be aware of it you are new to express. If not you might find yourself defining all your paths in the main app.js file, eventually ending up with a lengthy mess of code. Routers help to keep things way more neat and organized by allowing me to define a routes folder in which I can add a whole bunch of javaScript files that define all kinds of paths that I can then add into my main app.js file by way of the app.use method.

For example I can make a file at \/routes\/foo.js that responds to any get request with bar.

```js
let express = require('express'),
bodyParser = require('body-parser'),
 
// the router
router = module.exports = express.Router();
 
router.get('*', function (req, res) {
 
    res.send('bar');
 
});
```

And then I can then bind it to a certain path, and add it to my main app.js file using app.use.

```js
let express = require('express'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
// foo
app.use('/foo', require('./routes/foo'));
 
// start the app
app.listen(port, function () {
 
    console.log('app is up on port: ' + port);
 
});
```

As an application grows more complex I can pull paths into these separate files that make used of routers, export thous routers, and then make use of theme in my main script using app.use.

## 3 - Conclusion

Getting started with express is easy enough, just set up a new npm folder, install express, and copy and past a simple app.js file to get up and running with a simple hello world example. However making a real project with express, and full stack development in general can get really involved, this really goes without saying when all the work is being done by just one person.

I am not a full stack developer, I often work on projects all by myself, and when doing so it is just to much for one person. That is unless it is a very simple project that will be running on just one node, or some kind of application that will just be used on a local network, by a small group of people. The of course it becomes more realistic to work on some kind of full stack application. However I really am more of a front end only kind of guy, however even so that might be why I like express, and nodejs in general. Express is great for simple quick little small scale projects, but it can also be used when making some kind of major deal also of course.


