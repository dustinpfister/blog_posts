---
title: Working with models in mongoose
date: 2018-07-03 14:07:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 220
updated: 2018-07-05 16:25:40
version: 1.2
---

In this post I will be giving a quick overview of working with models in [mongoose.js](http://mongoosejs.com/docs/models.html). If you are not aware mongoose.js is a javaScript library to help make it easier to work with [mongodb](https://www.mongodb.com/), a popular javaScript friendly databse solution that is used in node.js powered full stack apps.

<!-- more -->

## 1 - what to know

This is not a getting started post on node.js, or mongodb both of which are required to get anything out of this post. As of this writing I have written a getting started post on mongodb, but will not get into detail about everything in this post, just working with models with mongoose.

## 2 - setup

For this project I will of course need node.js, and mongodb installed, and I assume that the mongodb server is up and running on the default port. If not some values in the project should be changed.

## 3 - An example of a Model in mongoose.

### 3.1 - The users.js file that will contain the Model

So the most Important file in the project is the users.js file that will contain

```js
// grab mongoose
let mongoose = require('mongoose');
 
// create a Model
let User = mongoose.model('User', {
        name: String,
        password: String,
        createDate: Date,
        lastOn: Date
    });
 
// I can add methods to the prototype
User.prototype.say = function () {
 
    return 'hello I am ' + this.name + ' I was last on at ' + this.lastOn;
 
};
 
// export it
module.exports = User;
```

### 3.2 - The connect.js file

For this demo I started to break everything down into separate files for certain tasks such as listing all the instances of a model, or connecting to mongodb in the first place. So for this demo I made a connect.js file that actually connects to mongodb, and then returns a promise that will resolve if the connection works. It also returns mongoose as the first argument, so I do not need to require it again in a script that makes use of this.

```js
// connect to mongodb with mongoose, and then return mongoose
module.exports = function (options, cb) {
 
    // grab mongoose
    let mongoose = require('mongoose');
 
    options = options || {};
    options.host = options.host || 'localhost';
    options.port = options.port || 27017;
    options.db = options.db || 'mongoose_users';
 
    cb = cb || function () {};
 
    // the mongodb url
    let mongoURL = {
        host: 'localhost', // assuming localhist will work, change if different
        port: 27017, // default port change this if different
        db: 'mongoose_users' // name of database
    };
    mongoURL.url = 'mongodb://' + mongoURL.host + ':' + mongoURL.port + '/' + mongoURL.db;
 
    // make a connection to mongoDB
    mongoose.connect(mongoURL.url);
 
    // ref mongoose.connection
    let db = mongoose.connection;
 
    return new Promise(function (resolve, reject) {
 
        // on error
        db.on('error', (e) => {
 
            db.close();
            reject(e.message);
 
        });
 
        // once the database is open
        db.once('open', function () {
 
            // resolve with mongoose
            resolve(mongoose);
 
        });
 
    });
 
};
```

### 3.4 - The list.js file.