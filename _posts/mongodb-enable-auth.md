---
title: Enabling authentication in mongodb
date: 2018-07-06 11:47:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 222
updated: 2018-07-06 12:16:50
version: 1.1
---

So I have been experimenting with [mongodb](https://www.mongodb.com/) a little these days as I am interesting in writing some content on the subject, aside from the fact that it will typically be the database solution I will run into when working in a node.js environment. In this post I will be writing abut [enabling authentication](https://docs.mongodb.com/manual/tutorial/enable-authentication/) for a database.

<!-- more -->

## 1 - what to know

This is a post on [enabling authentication](https://docs.mongodb.com/manual/tutorial/enable-authentication/) in [mongodb](https://www.mongodb.com/) so that a user name and password must be provided in order to do anything with the database.

## 2 - Enabling or disabling authentication via mongod.cfg

So far my preferred way of enabling or disabling authentication is by editing the [mongod.cfg file](https://docs.mongodb.com/manual/reference/configuration-options/). As you would expect this is a configuration file for mongodb that is stored in several different locations depending on the version of mongodb, the os, or the setup. In any case I would want to know where this file is, and make sure I have the authority to edit it if I want to get this working, or disable it for that matter.

## 2.1 - Editing mongod.cfg, and restarting mongod in windows 10 with mongodb server 4

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