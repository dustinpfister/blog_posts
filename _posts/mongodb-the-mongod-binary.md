---
title: The mongod binary for starting a process that responds to queries
date: 2018-07-08 09:58:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 228
updated: 2018-07-12 16:54:51
version: 1.7
---

The [mongod binary](https://docs.mongodb.com/manual/reference/program/mongod/) in [mongodb](https://www.mongodb.com/) is what is used to start a process, daemon, or service if that is what you prefer to call such things. In other words it is something that runs in the background, and it listens on a port waiting to respond to requests. As such when working with mongodb it is important to at least know a thing or two about this process, such as what port it is listening on, and how to change settings for it assuming that you have the authority to do so. This binary is not to be confused with [another binary called just mongo](/2018/07/08/mongodb-the-mongo-binary/) which is used to interact with mongodb, and preform certain tasks. In this post I will be writing about this binary, I might not touch base on everything but I will be covering a few must know things about it.

<!-- more -->

## 1 - what to know

This is a post on the mongod binary that is used to run the process that responds to requests, and works with the dbpath that holds the actual data. Another major binary of interest whe working with mongodb is the mongo binary that is used to connect to this process

## 2 - Restarting mongod service

Often I will want to restart the mongod service, because I made some kind of change to the mongodcfg file for example. Knowing how to do this right is important, when I just killed the process in Linux I ended up with an unclean shutdown, and had to repair my database folder. So always make sure to do a clean shotdown when possible 

### 2.2 - In windows 10

In windows I would use the services administrative tool. A quick way to start it is windows+r, and then run services.msc. Once that is up and running just find the mongod service, stop it by right clicking and selecting stop, and then start it again. Not much to it in windows.

### 2.1 - In Ubuntu Linux

If running as a service there is the service command that is used to start ad stop services in ubuntu linux. So to stop the service I would call:

```
$ sudo service mongodb stop
```

At this point I can now save any changes to the conf file that I am using, often stored at a location such as /etc/mongodb.conf. At which point I can then start up the service again.

```
$ sudo service mongodb start
```

## 3 - File permissions of the database folder

When using the mongod service in ubuntu linux, for some reason some of my files ended up being owned by root rather than the mongodb user to fix this I just needed to set the ownership of the files to mongodb.

```
$ sudo chown -R mongodb:mongodb /var/lib/mongodb
```

Where /var/lib/mongodb is if course the database folder that is used by the mongodb service.