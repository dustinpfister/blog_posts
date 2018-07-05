---
title: Working with models in mongoose
date: 2018-07-03 14:07:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 220
updated: 2018-07-05 16:58:27
version: 1.5
---

In this post I will be giving a quick overview of working with models in [mongoose.js](http://mongoosejs.com/docs/models.html). If you are not aware mongoose.js is a javaScript library to help make it easier to work with [mongodb](https://www.mongodb.com/), a popular javaScript friendly databse solution that is used in node.js powered full stack apps.

<!-- more -->

## 1 - what to know

This is not a getting started post on node.js, or mongodb both of which are required to get anything out of this post. As of this writing I have written a getting started post on mongodb, but will not get into detail about everything in this post, just working with models with mongoose.

## 2 - setup

For this project I will of course need node.js, and mongodb installed, and I assume that the mongodb server is up and running on the default port. If not some values in the project should be changed.

## 3 - An example of a Model in mongoose.

For an example of using mongoose to create an instance of a Model I made a project in which I created a User Model that represents a user in a client database. I made additional scripts for interacting with that model, as well as connecting to mongodb, an droping the database.

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

### 3.3 - The create.js file.

This file uses the connect.js file to connect to mongodb, and then it also imports the User Model from users.js. Once I have those two things to work with I use it to create a new User.

```js
// create a user
require('./connect')().then(function (mongoose) {
 
    let db = mongoose.connection,
    User = require('./user'),
 
    // create the user
    user = new User({
            name: process.argv[2] || 'foo',
            password: process.argv[3] || '123',
            createDate: new Date(),
            lastOn: new Date()
        });
 
    // save the day
    user.save(function (e, day) {
 
        if (e) {
 
            console.log('create: error');
            db.close();
 
        } else {
 
            console.log('create: saved new user');
            console.log(day);
            db.close();
 
        }
 
    });
 
}).catch (function (e) {
 
    console.log('ahh man.');
    console.log(e.message);
 
});
```

So when I call the script from the command line  like this.

```
$ node create Dustin 321
create: saved new user
{ _id: 5b3e8396302df12a286562a8,
  name: 'dustin',
  password: '321',
  createDate: 2018-07-05T20:46:14.401Z,
  lastOn: 2018-07-05T20:46:14.401Z,
  __v: 0 }
```

If all goes well a new user named Dustin is added to the database, and the instance of User is logged to the console. To confirm that the instance of the User model is in the database, I can use another script that will list the users.

### 3.4 - The list.js file.

```js
// list users
require('./connect')().then(function (mongoose) {
 
    let db = mongoose.connection,
    User = require('./user');     // the User model
 
    User.find({}, (e, users) => {
 
        // list the users
        console.log('********** list users **********');
        if (e) {
 
            // if an error happens list the message
            console.log(e.message);
 
        } else {
 
            if (users.length > 0) {
 
                users.forEach(function (user) {
 
                    console.log('name: ' + user.name + ' ; laston ' + user.lastOn + ';');
 
                });
 
            } else {
 
                console.log('no users.');
 
            }
 
        }
        console.log('********** **********');
 
        db.close();
 
    });
 
}).catch (function (e) {
 
    console.log('ahh man.');
    console.log(e.message);
 
});
```

### 3.5 - The dropall.js file

This is a quick script that I use to just drop the whole database, and start over. Not a bit deal for a simple demo project like this.

```js
// list users
require('./connect')().then(function (mongoose) {
 
    let db = mongoose.connection;
 
    db.dropDatabase(function (e) {
 
        if (e) {
 
            console.log('drop: error');
 
        } else {
 
            console.log('drop: database droped!');
 
        }
 
        db.close();
 
    });
 
}).catch (function (e) {
 
    console.log('ahh man.');
    console.log(e.message);
 
});
```

## 4 - conclusion

I have not covered everything these is to know about models in this post. However I will be writing a lot more content on mongoose and mongodb in the coming days, and as such I may get around to revising this further as well as link to more relevant posts on mongoose as my [collection of content on mongodb](/categories/mongodb/) grows.