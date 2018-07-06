---
title: Enabling authentication in mongodb
date: 2018-07-06 11:47:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 222
updated: 2018-07-06 12:26:30
version: 1.2
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


## 3 - Making a mongodb shell script that will add a user, when authentication is disabled

```js
// create a Mongo instance
conn = new Mongo();
 
// get the admin db
db = conn.getDB('mongoose_users');
 
// authenticate
//db.auth('mrSmith', '1234');
 
// if the admin account exists get it, or null
user = db.getUser('dustin');
 
// if we do not have the user, create the user
if (!user) {
 
    // then create the user
    db.createUser({
        user: 'dustin',
        pwd: '1234',
        roles: [{
                role: 'readWrite',
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