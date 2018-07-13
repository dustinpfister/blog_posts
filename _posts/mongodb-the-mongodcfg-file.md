---
title: The mongod.cfg file for configuring the mongod process
date: 2018-07-08 09:05:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 226
updated: 2018-07-13 19:48:34
version: 1.4
---

So with [mongodb](https://www.mongodb.com/) there is the [mongod binary](https://docs.mongodb.com/manual/reference/program/mongod/) that is the actually process daemon or service that handles requests for data in a database. It other words it is what always runs in the background on the computer that is hosting the database that is being used in a project that makes use of mongodb. Well one thing that might come of interest with this is how to configure mongodb with settings like the port to listen on, and if authentication should be enabled or not. Well one way is to give some of these options to the binary via the command line when staring it, but maybe a better way is to park these settings in a configuration file of sorts, thats where [the mongod.cfg file](https://docs.mongodb.com/manual/reference/configuration-options/) comes into play. In this post I will be giving a quick overview of

<!-- more -->

## 1 - what to know

This is a post on the config file that is used to configure the [mongod process](/2018/07/08/mongodb-the-mongod-binary/). In this post I am using mongodb 4.0, and the config file that I am writing about is in the yaml format. In older versions of mongodb this file may be of a different format.


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

Regardless of the operation system environment, you want the paths to be absolute paths. In fact I would say that using absolute paths in general is good practice, but that is getting off topic. In a posix environment that might be the only note worthy difference though. In a Linux environment where I have another setup the config file is in a different format, because it is an older version of mongodb, so I will not be writing about there here.

### 2.1 - Storage Options

For storage options this is where I set the path where the database folder will be by giving an absolute path to the desired location. 

```
storage:
  dbPath: C:\Program Files\MongoDB\Server\4.0\data
  journal:
    enabled: true
```

Here journaling should be enabled, it often is be default. This helps when it comes to unclean shutdowns.

### 2.2 - System log options

here I set the location of the system logs where I should look when something goes wrong to see what the problem might be.

```
systemLog:
  destination: file
  logAppend: true
  path:  C:\Program Files\MongoDB\Server\4.0\log\mongod.log
```