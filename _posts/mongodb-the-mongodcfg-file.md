---
title: The mongod.cfg file for configuring the mongod process
date: 2018-07-08 09:05:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 226
updated: 2018-07-08 09:21:48
version: 1.1
---

So with [mongodb](https://www.mongodb.com/) there is the [mongod binary](https://docs.mongodb.com/manual/reference/program/mongod/) that is the actually process daemon or service that handles requests for data in a database. It other words it is what always runs in the background on the computer that is hosting the database that is being used in a project that makes use of mongodb. Well one thing that might come of interest with this is how to configure mongodb with settings like the port to listen on, and if authentication should be enabled or not. Well one way is to give some of these options to the binary via the command line when staring it, but maybe a better way is to park these settings in a configuration file of sorts, thats where [the mongod.cfg file](https://docs.mongodb.com/manual/reference/configuration-options/) comes into play. In this post I will be giving a quick overview of

<!-- more -->

## 1 - what to know


### 2 An example of mongod.cfg

An example of a mongod.cfg file that I have in a windows environment looks like this.

```
# mongod.conf
 
# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/
 
# Where and how to store data.
storage:
  dbPath: C:\Program Files\MongoDB\Server\4.0\data
  journal:
    enabled: true
 
# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path:  C:\Program Files\MongoDB\Server\4.0\log\mongod.log
 
# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1
 
## security settings
security:
  authorization: enabled
```

Regardless of the operation system environment, you want the paths to be absolute paths. In fact I would say that using absolute paths in general is good practice, but that is getting off topic. In a posix environment that might be the only note worth difference though.

