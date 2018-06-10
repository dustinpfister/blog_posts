---
title: Getting started with micro services using node.js, and express.js
date: 2018-06-08 11:41:00
tags: [js,express,node.js]
layout: post
categories: express
id: 203
updated: 2018-06-10 13:35:32
version: 1.2
---

In my experience so far when making some kind of full stack web application I run into problems with the programing becoming to complex. Often is the case so far that I end up doing everything in a single application. That is rendering and delivering the client system, authentication, database management, and so forth all within a single package. When it comes to simple hobby apps that are  not that complex, and may never have more than 50 visitors at any given moment, maybe this is not such a bad thing. However as a project grows in both complexity, and or popularity there is a threshold where it becomes desirable or necessary to break things down more. 

<!-- more -->

One way to do this is to start to get into micro services using node.js, and the popular [express.js](https://expressjs.com/) framework. In this post I will be writing about a simple example that will be just that.

## What defines a micro service?

There might be a lot that comes to mind when aiming to not just make a micro service, but a production code worthy micro service. When this is the case a great deal of things might come to mind like scaling to meet demand for the service that is being provided, and how to go about sharing information between services. However as I understand it a micro serive just needs to meet two simple criteria.

* It provides one or more services of some kind.
* It is deployed to the web, and can be used by way of an http request.

In other words if you take a complex full stack web application, and break it down into smaller pieces, and have each pieces deployed separately. I would say that one of the pieces fits a loose definition of a micro service. There is a great deal more to it than that of course, but at the core of it that is the idea.

## A basic micro service example about keywords

I have been toying with the idea of making a game about bogging. The idea is that people sign up to start an account, and then write short simple blog posts to make in game currency. The amount of currency made depends on how well the posts rank, and how many other people visit them. This might just be yet another one of my unfinished prototypes, but at the very least I should end up making at least one simple micro service example in the process.

I am sure that I will want to keep track of the volume of certain keywords to be used as a way to determine keyword value. So for a simple example of a micro service how about something that just keeps track of a simple count of keywords.

For this demo I will want to make a keyword service that just keeps a simple count for each given keyword. It will have to except post requests for a keyword, and create a database record, or update an existing one. In addition it will have to respond with a count for the given keyword as well.

Also I will need another separate project that will make use of this service.

### Getting started

So for this demo I will actually be making two projects, one will be my micro service, and the other will be an app that makes use of this service. For the keyword service I will want to use express.js, and some kind of database solution. For a simple hobby project like this lowdb will work just fine for now. The other app will be something that just provides a client system, and back end that makes use of this service. This app will not be the highlight of this post, so I can just quickly throw something together involving something like express, and jQuery maybe.

```
$ mkdir micro_keywords_logger
$ cd micro_keywords_logger
$ npm init
$ npm install express --save
$ npm install lowdb --save
$ npm install mkdirp --save
$ cd ..
$ mkdir micro_keywords_main
$ cd micro_keywords_main
$ npm init
$ npm install express --save
$ mkdir public
$ cd public
$ mkdir js
```

So the micro_keywords_main demo will just serve up some static assets, and make post requests either directly to the service from the client, or indirectly via it's back end by making the request with the node.js http module for example. The other project micro_keywords_logger will be the actual micro service demo for this post.

### The app.js file for my keywords micro service

```js
let express = require('express'),
FileSync = require('lowdb/adapters/FileSync'),
low = require('lowdb'),
mkdirp = require('mkdirp'),
port = process.env.PORT || process.argv[2] || 8080,
kw,
app = express();
 
// using the body-parser json to parse incoming
// post requests with keyword json data
app.use(require('body-parser').json());
 
// about path
app.get('/about', function (req, res) {
 
    res.json({
 
        service_name: 'micro_keywords_logger'
 
    });
 
});
 
// GET requests at /
app.get('/', function (req, res) {
 
    // just serve up the whole database for now
    res.json(kw.get('keywords').value());
 
});
 
// POST incoming keywords
app.post('/', function (req, res) {
 
    // response object to respond with
    let resObj = {
        success: true,
        mess: '.',
        data: {}
    },
 
    // the keyword
    keyword = req.body.keyword,
 
    // the count of that keyword
    count = 1,
 
    // get the record for the given keyword
    record = kw.get('keywords').find({
            keyword: keyword
        });
 
    // get or update the count of the keyword
    if (!record.value()) {
 
        // write a new record
        kw.get('keywords').push({
 
            keyword: keyword,
            count: 1
 
        }).write();
 
    } else {
 
        // add to an existing record
        count = record.value().count += 1;
        kw.write();
 
    }
 
    // set the keyword, and count for the response object
    resObj.data.keyword = keyword;
    resObj.data.count = count;
 
    res.json(resObj);
 
});
 
// make sure db folder is there
mkdirp('db', function () {
 
    // create keywords.json if it is not there
    kw = low(new FileSync('db/keywords.json'));
 
    // default to empty keyword array
    kw.defaults({
        keywords: []
    }).write();
 
    // start service with the value of port
    app.listen(port, function () {
 
        console.log('micro_keywords_logger is up on port: ' + port);
 
    });
 
});
```