---
title: Getting started with mongoose
date: 2018-07-02 16:40:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 219
updated: 2018-07-05 15:04:16
version: 1.2
---

So these days I have been experimenting with express as a way to make node.js powered full stack applications. In many of these simple projects I have been using lowdb as a database solution, which works fine when it comes to simple projects that are going to be used off line. However if I aim to make something that will be deployed to a server, I am going to want to use something a little more professional, for this there is of course mongodb, and mongoose.js. This post will be a getting stared post on using mongoose.js to work with mongodb as a database solution.

<!-- more -->

## 2 - A Basic Example using mongoose.js

So This basic example of using mongoose to work with mongodb will be a simple command line interface tool that will create, and list instances of a Model called Day that represents the amount of users that visit a site in a certain day. This will be a basic exercise of using mongoose to connect to the mongodb service that should be running in the os, and add a few instnaces of a Model to a collection of models in a database.

### 2.1 - setup 



### 2.2 - The basic.js file



#### 2.2.1 - Make the connection

```js
// grab mongoose
let mongoose = require('mongoose');
 
// the mongodb url
let mongoURL = {
    host: 'localhost',    // assuming localhist will work, change if different
    port: 27017,          // default port change this if different
    db: 'mongoose_basic'  // name of database
};
mongoURL.url = 'mongodb://' + mongoURL.host + ':' + mongoURL.port + '/' + mongoURL.db;
 
// make a connection to mongoDB
mongoose.connect(mongoURL.url);

// ref mongoose.connection
let db = mongoose.connection;
```

#### 2.2.2 - The Day Model

```js
// a Box Model
let Day = mongoose.model('Day', {
        date: String,
        users: Number
    });
```

#### 2.2.3 - The Options object

```js
// options for creating Days, getting Days, and Droping the database
let options = {
 
    // create a new date
    create: () => {
 
        // return a promise
        return new Promise((resolve, reject) => {
 
            // default to '1/1/10' for date, and 0 for users
            let date = process.argv[3] || '1/1/10',
            users = process.argv[4] || 0,
 
            // create the day
            day = new Day({
                    date: date,
                    users: users
                });
 
            // save the day
            day.save(function (e, day) {
 
                if (e) {
 
                    console.log('create: error');
                    reject(e.message);
 
                } else {
 
                    console.log('create: saved new day');
                    resolve(day);
 
                }
 
            });
 
        });
 
    },
 
    // drop (delete) the database
    drop: () => {
 
        // return a promise
        return new Promise((resolve, reject) => {
 
            db.dropDatabase(function (e) {
 
                if (e) {
 
                    console.log('drop: error');
                    reject(e.message);
 
                } else {
 
                    console.log('drop: databse droped.');
                    resolve('done');
 
                }
 
            });
 
        });
 
    },
 
    // get by date, or list all
    getbydate: () => {
 
        // query defaults to an empty object
        let query = {};
 
        // set date if given
        if (process.argv[3]) {
            query.date = process.argv[3];
        }
 
        // return a promise
        return new Promise((resolve, reject) => {
 
            Day.find(query, (e, days) => {
 
                if (e) {
 
                    console.log('getByDate: error');
                    reject(e.message)
 
                } else {
 
                    console.log('getByDate: listing days:');
                    resolve(days);
 
                }
 
            });
 
        });
 
    }
 
};
```

#### 2.2.4 - On Error, and once open

```js
// on error
db.on('error', (e) => {
 
    console.log('error');
    console.log(e);
 
});
 
// once the database is open
db.once('open', function () {
 
    // default to getbydate
    let opt = process.argv[2] || 'getbydate';
 
    // if we have that option...
    if (opt in options) {
 
        // ... then call it
        options[opt]().then((res) => {
 
            // log any response
            console.log(res);
 
            // close the connection
            db.close();
 
        }).catch ((e) => {
            // if an error happens
 
            // log error message
            console.log(e);
 
            // close the connection
            db.close();
 
        });
 
    } else {
 
        // else log that the option is not known
        console.log('unknown option: ' + opt);
 
        // close the connection
        db.close();
    }
 
});
```