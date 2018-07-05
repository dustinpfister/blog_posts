---
title: Getting started with mongoose
date: 2018-07-02 16:40:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 219
updated: 2018-07-05 15:34:39
version: 1.5
---

So these days I have been experimenting with express as a way to make node.js powered full stack applications. In many of these simple projects I have been using lowdb as a database solution, which works fine when it comes to simple projects that are going to be used off line. However if I aim to make something that will be deployed to a server, I am going to want to use something a little more professional, for this there is of course mongodb, and mongoose.js. This post will be a getting stared post on using mongoose.js to work with mongodb as a database solution.

<!-- more -->

## 1 - What to know

This is a getting started post on using [mongoose](http://mongoosejs.com/) to connect to [mongodb](https://www.mongodb.com/) to work with a database when making a node.js powreed applaction the requires the use of a databse solution that is a little more professional then something like [lowdb](/2017/12/28/nodejs-lowdb/). I am not going to get into detail about getting started with node.js, or javaScript in general. Also I am not going to cover getting started with mongodb itself, I assume you have it installed, and have the service up and running on the default port of 27017.

### 1.1 Version numbers matter

As of the writing of this post I am using nodejs v8.9.3, with mongodb v4.0.0, and mongoose 5.1.7. If you run into trouble reproducing what I have work out here always check the simplest things first.

## 2 - A Basic Example using mongoose.js

So This basic example of using mongoose to work with mongodb will be a simple command line interface tool that will create, and list instances of a Model called Day that represents the amount of users that visit a site in a certain day. This will be a basic exercise of using mongoose to connect to the mongodb service that should be running in the os, and add a few instnaces of a Model to a collection of models in a database.

### 2.1 - setup 

For this project I will just need node.js, and mongodb installed, and the mogodb service running on the default port. When it comes to npm packages the only package I need is mongoose.

```
$ mkdir mongoose_test
$ cd mongoose_test
$ npm init
$ npm install mongoose --save
```

Once I have eventing I need in the demo project folder I will be making just one javaScript file that will be called from the command line.

### 2.2 - The basic.js file

The basic js file will consist of all the code that will connect to mondodb, parse arguments from the command line, and create instances of a model.

#### 2.2.1 - Make the connection

I stared off basic.js, by grabbing a reference to what is reported by the mongoose package, and then proced to write the code that will define the mongodb url that is used to connect to mongo db. This is a sting that defined the protocol to use to connect to mongodb, as wel as the hostname, port, and the name of the database.

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

Once I have the mongodb url in order I can then use that to make a connection to the mongodb service that should be up and running. If you run into trouble look into the port and hostname values and make sure they will work with your setup.

I then finish up my making a reference to mongoose.connection.

#### 2.2.2 - The Day Model

After that I define the code that will define my Model.

```js
// a Box Model
let Day = mongoose.model('Day', {
        date: String,
        users: Number
    });
```

Nothing fancy here I just create an instance of a Day Model by calling mongoose.model, followed by the name of the model, and the schema of the model. There is a great deal more to write about when it comes to models, But this is a basic example so I will be keeping it basic.

#### 2.2.3 - The Options object

After I have my connection setup, and a model defined, then I define an object that will be used to create instnaces of that model, as well as get a list of them, and drop the whole databse.

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

These methods will of course be used in the next portion of the script in which I am defining some event handers as to what to do when a connection has been established successfully.

#### 2.2.4 - On Error, and once open

Once I have the bulk of my logic together then it is just a matter of doing what is to be done when everything goes as plain, or not. Here I use the reference to mongoose.connection to set up when is to be done in the event of an error, or once the database is open and ready to be used.

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

When the script is called from the command line, by default it will just list any instances of the Day model that might be in the database. I can then give it arguments to create instances of day, or drop the whole database and start over.