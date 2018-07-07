---
title: The mongodb connection string
date: 2018-07-07 09:42:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 225
updated: 2018-07-07 13:01:37
version: 1.4
---

The process of connecting to a [mongodb](https://www.mongodb.com/) database can some times be a little complicated. When connecting locally the hostname and port might not be of much interest, if the [mongod](https://docs.mongodb.com/manual/reference/program/mongod/) service is running on the default port, and there are no issues with using localhost as the hostname. However the situation can become very different when it comes to deployment, where not only does the hostname and port matter, but there is often a username and password that need to be specified as well in order to connect to and use a database. As such there seems to be a need to create, and maintain a module, that can be used to quickly connect depending on the environment. In many cases this module may need to be custom trailered depending on the environment, or at the very least bust be able to accept arguments, or look for environment variables.

<!-- more -->

## 1 - what to know

This is a post on making a node.js module that connects to mongo db. It is not a getting started post on mongodb, node.js, or javaScript. I assume that you have at least some background in these things.


## 2 - A connect.js file, or index.js of a mongoose_connect module

So for a project in which I am going to be using mongodb as a database solution, and mongoose as a preferred mongodb client, I thought that it might be a good idea to pull everything that has to do with connecting to mongoose into a single js file that is the index.js file of a stand alone module that I might publish to npm, or a js file that I just store in a lib folder of some kind that is just part of a projects source code.

In other worlds something like this:

```js
// connect to mongodb with mongoose, and then return mongoose
module.exports = (options, cb) => {
 
    // grab mongoose
    let mongoose = require('mongoose');
 
    // use give object, or an empty object
    options = options || {};
 
    // host, port, and database name
    options.host = options.host || 'localhost';
    options.port = options.port || 27017;
    options.db = options.db || 'mongoose_users';
 
    // auth
    options.username = options.username || null;
    options.password = options.password || null;
    let logStr = '';
    if (options.username && options.password) {
        logStr = options.username + ':' + options.password + '@';
    }
 
    // use url override if given, or set string based on other given options or defaults
    options.url = options.url || 'mongodb://' + logStr + options.host + ':' + options.port + '/' + options.db;
 
    // use of set callback
    cb = cb || function () {};
 
    // make a connection to mongoDB
    mongoose.connect(options.url, {
        useNewUrlParser: true
    });
 
    // ref mongoose.connection
    let db = mongoose.connection;
 
    return new Promise((resolve, reject) => {
 
        // on error
        db.on('error', (e) => {
 
            // close database, fire callback with error object, and reject.
            db.close();
            cb(e,null);
            reject(e);
 
        });
 
        // once the database is open
        db.once('open', () => {
 
            //  fire any given callback, and resolve with mongoose
            // do not close connection to database
            cb(null, mongoose);
            resolve(mongoose);
 
        });
 
    });
 
};
```

When using this I have the option to use callbacks, or promises. In the event that all goes well it will give me a reference to mongoose that I can then use so I do not have to bring it in with require each time. With some projects it might be necessary to hack over this a little, but in any case I give the option to just directly set the connection string if need be.