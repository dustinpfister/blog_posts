---
title: Enabling authentication in mongodb
date: 2018-07-06 11:47:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 222
updated: 2018-07-07 12:50:53
version: 1.17
---

So I have been experimenting with [mongodb](https://www.mongodb.com/) a little these days as I am interesting in writing some content on the subject, aside from the fact that it will typically be the database solution I will run into when working in a node.js environment. In this post I will be writing abut [enabling authentication](https://docs.mongodb.com/manual/tutorial/enable-authentication/) for a database.

<!-- more -->

## 1 - what to know

This is a post on [enabling authentication](https://docs.mongodb.com/manual/tutorial/enable-authentication/) in [mongodb](https://www.mongodb.com/) so that a user name and password must be provided in order to do anything with the database.

### 1.1 - Might not need to bother with this when working locally

Out of the box authentication is disabled when working with mongodb locally, but often when I go to deploy a user name and password is required as part of the mongodb connect string. So this is something that is typically setup before hand on the node that I will be deploying the app, and in that case I just need to know the username and password to connect to mongodb.

So enabling authentication is something that I often will only need to bother with when trying to reproduce a similar environment locally to that of what I am dealing with when deploying.

## 2 - Enabling or disabling authentication via mongod.cfg

So far my preferred way of enabling or disabling authentication is by editing the [mongod.cfg file](https://docs.mongodb.com/manual/reference/configuration-options/). As you would expect this is a configuration file for mongodb that is stored in several different locations depending on the version of mongodb, the os, or the setup. In any case I would want to know where this file is, and make sure I have the authority to edit it if I want to get this working, or disable it for that matter.

### 2.1 - Editing mongod.cfg, and restarting mongod in windows 10 with mongodb server 4

The mongo.conf file that I am using in a windows environment is located in the bin folder of the programFiles folder for mongodb.

Anyway it currently looks like this:
```
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: C:\Program Files\MongoDB\Server\4.0\data
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path:  C:\Program Files\MongoDB\Server\4.0\log\mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1

# security settings including user password protection
security:
  authorization: enabled
```

This is a yaml formated file, and the particular value of interest is the authorization property under security. This can have two possible string values 'enabled' or 'disabled'. In order to edit this file I need the proper access permissions, and once I make a change I will want to restart the mongod service that uses this file. In windows I would want to use services administrative tool to stop, and then restart the service.


## 3 - The mongoose_model_user demo

To help show how to set things up with this I made a project complete with mongodb shell scripts, and a simple User model, along with scripts that connect to and use that model.

### 3.1 - setup

If you want to follow along locally you can clone down this demo, and do an npm install.

```
$ git clone https://github.com/dustinpfister/mongoose_model_user
$ cd mongoose_model_user
$ npm install
```

### 3.2 - The mongo_shell folder

The mongo_shell folder is a folder that I have started placing in projects that involve mongodb. These are shell scripts, that are not intended to be used from any kind of client system, unless I am willing to take the chance to implement some kind of admin user account. In any case as far as I am concerned with the content of this post, these are scripts that must be called from the command line, either locally, or by remote when dealing with a deployment.

In this project there are just a few scripts that I have put together that have to do with setting up a user and password for a database, these scripts must be used when authentication is disabled, and the values are hard coded into them. However as far as this post is concerned they should do the job just fine.


#### 3.2.1 - Using one of these scripts

To use one of these scripts authentication must be disabled, and the script must be called with mongo, or from within the mongo shell with the load command.

```
$ cd mongo_shell
$ mongo users_list.js
MongoDB shell version v4.0.0
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.0
{
        "dbName" : "mongoose_users",
        "users" : [
                {
                        "_id" : "mongoose_users.dustin",
                        "user" : "dustin",
                        "db" : "mongoose_users",
                        "roles" : [
                                {
                                        "role" : "dbOwner",
                                        "db" : "mongoose_users"
                                }
                        ],
                        "mechanisms" : [
                                "SCRAM-SHA-1",
                                "SCRAM-SHA-256"
                        ]
                }
        ]
}
```

#### 3.2.2 - Using authentication

If authentication is enabled these scripts can still be used just by supplying an auth object to them, via the eval option, or by placing it in another javaScript file and running that first.

```js
$ mongo users_list.js --eval "var auth={username:\"dustin\",password:\"1234\"}"
```

#### 3.2.3 - The users_add.js file

Here is the shell script for creating a user. I start by making an instance of the Mongo Constructor, then get the database I want to create a user for, in this case it is a database called 'mongoose_users'. Once I have the database I just need to get the user to find out if the user is there before hand as it will return null if the user is not there, and give me the user object if it is. In the event that the user is not there, the user is created with a hard coded name, and password.

```js
// create a Mongo instance
var conn = new Mongo(),
 
// get the database
db = conn.getDB('mongoose_users'),
 
// get the user if it is there
user = db.getUser('dustin'),
 
auth = auth || null;
 
if (auth) {
 
    db.auth(auth.username, auth.password);
 
}
 
// if we do not have the user, create the user
if (!user) {
 
    // then create the user
    db.createUser({
        user: 'dustin',
        pwd: '1234',
        roles: [{
                role: 'dbOwner',
                db: 'mongoose_users'
            }
        ]
    });
 
} else {
 
    // the user exists, print info.
    printjson({
        "dbName": db.getName(),
        "adminUser": user
    });
 
}
```

In a more professional script these values will not be hard coded, but this still is a huge improvement from having to hand code this into the mongo shell each time I need to do this, no way am I ever doing that.

#### 3.2.4 - the users_list.js file

This mongo shell script can be used to list the users in the database.

```js
// create a Mongo instance
var conn = new Mongo(),
 
// get the database
db = conn.getDB('mongoose_users'),
 
auth = auth || null;
 
if (auth) {
 
    db.auth(auth.username, auth.password);
 
}
 
// the user info.
printjson({
    "dbName": db.getName(),
    "users": db.getUsers()
});
```

#### 3.2.5 - the users_drop.js file

If I want to drop the user in order to start over I can do so with this.

```js
// create a Mongo instance
var conn = new Mongo(),
 
// get database
db = conn.getDB('mongoose_users'),
 
auth = auth || null;
 
if (auth) {
 
    db.auth(auth.username, auth.password);
 
}
 
// get the user
var user = db.getUser('dustin');
 
// if we have the user drop them
if (user) {
 
    // drop the user
    db.dropUser('dustin');
 
} else {
 
    // the user is not there to drop
    print('the user is not there to drop');
 
}
```

### 3.3 - The user folder

The user folder contains a simple set of javaScript files that connect to, and use the 'mongoose_users' database. Nothing fancy, just simple scripts that I can call from the command line using node. In a real project these might be express.js middleware functions, or something to that effect.

#### 3.3.1 - The connect.js file

This is the file that I use to connect to mongodb.

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

#### 3.3.2 - The user.js file

This is just a simple user model that is used for this simple example project.

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
 
// export it
module.exports = User;
```

#### 3.3.3 - The create.js file

This is the script that I call to create an instance of the User model that is defined in user.js.

```js
// create a user
require('./connect')(require('../conf.json')).then(function (mongoose) {
 
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
 
    console.log(e);
 
});
```

#### 3.3.4 - The list.js file

This script will list all the instances of the User model in the database, this is not to be confused with the users that are defined that have access to the database.

```js
// list users
require('./connect')(require('../conf.json')).then(function (mongoose) {
 
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
 
    console.log(e);
 
});
```

#### 3.3.5 - The dropall.js file

I have made this script for the purpose of dropping the whole database if I want to in order to quickly start over.

```js
// list users
require('./connect')(require('../conf.json')).then(function (mongoose) {
 
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
 
    console.log(e);
 
});
```

## 3.4 - the conf.json file

The conf.json file that I have at the root of the project is used to provide login credentials to scripts that use the connect.js file. What I have in the conf.json file will be passed as an options object to connect.js, and will result in a connection string that uses the credentials defined here.

Here I am using login credentials
```js
{
   "username": "dustin",
   "password": "1234"
}
```

This will result in a connection string that does not have login credentials
```js
{
   "username": null,
   "password": null
}
```


## 4 - Using the project

So now I should cover how to use this project to point out some basic things about setting up authentication in mongodb.

### 4.1 - authentication failure when using a /user script

So the main conf.json file in the root of the demo is where I am storing options that will be used in my connect.js file to make the connection to mongodb. This can include a few values, but for the purpose of this post the two key values are of course username, and password.

So If I have a conf.json file like this:
```js
{
   "username": "dustin",
   "password": "1234"
}
```

And I have not created a user for the 'mongoose_users' database, then authentication will fail even if I do not have authtaction enabled yet in the mongod.cfg file.

```
$ cd user
$ node create
Authentication failed.
```

However this can easily be fixed by setting the values for username, and password to null.

```js
{
   "username": null,
   "password": null
}
```

At which point it will work just fine if authentication is disabled in the mongod service.

```
$ cd user
$ node create
create: saved new user
{ _id: 5b3fb20adf7b9427ac961f34,
  name: 'foo',
  password: '123',
  createDate: 2018-07-06T18:16:42.151Z,
  lastOn: 2018-07-06T18:16:42.151Z,
  __v: 0 }
```

So if I want to password protect this database I will need to set up a user for this database, and I will also want to enable authentication in mongod.cfg.

### 4.2 - Using the /mongo_shell/users_add.js file to add a user when authentication is disabled

So to set up the user that I defined in my users_add.js mongo shell script, I just need to go to my mongo_shell script folder, and call that script with mongo.

```
$ cd mongo_shell
$ mongo users_add.js
MongoDB shell version v4.0.0
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.0
Successfully added user: {
        "user" : "dustin",
        "roles" : [
                {
                        "role" : "dbOwner",
                        "db" : "mongoose_users"
                }
        ]
}
```

This will create the user 'dustin' with the password '1234' that I hard coded in the js file users_add.js, This could be treated differently, but yo get the idea. I set the user up with the role of 'dbOwner' this is a mongodb hard coded role that gives be full control over the database, even droping the whole thing if I want.

### 4.3 - /user scripts now work

So now with the conf.json file set like this

```js
{
   "username": "dustin",
   "password": "1234"
}
```

Authntacton does not fail, becuase the user is now there.

```
$ cd user
$ node list
********** list users **********
name: foo ; laston Fri Jul 06 2018 13:59:54 GMT-0400 (Eastern Daylight Time);
name: foo ; laston Fri Jul 06 2018 14:16:42 GMT-0400 (Eastern Daylight Time);
********** **********
```

### 4.4 - but I can still connect without a password

Event though I have an user set up, I can still just use the database without a password. Thats because authentication will only fail if I give incorrect credentials, or if I drop the user like before. However if I just do not give anything I can still just use it.

```
{
   "username": null,
   "password": null
}
```

```
$ cd user
$ node list
********** list users **********
name: foo ; laston Fri Jul 06 2018 13:59:54 GMT-0400 (Eastern Daylight Time);
name: foo ; laston Fri Jul 06 2018 14:16:42 GMT-0400 (Eastern Daylight Time);
********** **********
```

This is because I have not actually enabled authentication in the mongod.cfg file that I mentioned above.

### 4.5 - enabling authentication

So to enable authentication I need to find the mongod.cfg file that the mongod service is using and just make sure the follwing is in there.

```
security:
  authorization: enabled
```

This will of course enable authentication when I restart the service. after restarting mongod, I will run into an authentication failure when trying to do something with the database when no credentials are given as expected.

```
$ cd user
$ node list
********** list users **********
command find requires authentication
********** **********
```

So now I just need to use the proper credentials when connecting.

```js
{
   "username": "dustin",
   "password": "1234"
}
```

And of course I can use it agin juts fine then.

```
$ cd user
$ node list
********** list users **********
name: foo ; laston Fri Jul 06 2018 13:59:54 GMT-0400 (Eastern Daylight Time);
name: foo ; laston Fri Jul 06 2018 14:16:42 GMT-0400 (Eastern Daylight Time);
********** **********
```