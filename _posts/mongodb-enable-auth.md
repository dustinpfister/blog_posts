---
title: Enabling authentication in mongodb
date: 2018-07-06 11:47:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 222
updated: 2018-07-06 14:24:38
version: 1.3
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

#### 3.2.1 - the users_add.js file
#### 3.2.2 - the users_list.js file
#### 3.2.3 - the users_drop.js file

### 3.3 - The user folder

#### 3.3.1 - The connect.js file
#### 3.3.2 - The user.js file
#### 3.3.3 - The create.js file
#### 3.3.4 - The list.js file
#### 3.3.5 - The dropall.js file

## 3.4 - the conf.json file


## 4 - Using the project

### 4.1 - authentication failure when using a /user script

So the main conf.json file in the root of the demo is where I am storing options that will be used in my connect.js file to make the connection to mongodb. This can include a few values, but for the purpose of this post the two key values are of course username, and password.

So If I have a conf.json file like this:
```js
{
   "username": "dustin",
   "password": "123"
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

### 4.3 - /user scripts now work

### 4.4 - but I can still connect without a password

### 4.5 - enabling authentication