---
title: The mongod binary for starting a process that responds to queries
date: 2018-07-08 09:58:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 228
updated: 2018-07-08 20:35:19
version: 1.4
---

The [mongod binary](https://docs.mongodb.com/manual/reference/program/mongod/) in [mongodb](https://www.mongodb.com/) is what is used to start a process, daemon, or service if that is what you prefer to call such things. In other words it is something that runs in the background, and it listens on a port waiting to respond to requests. As such when working with mongodb it is important to at least know a thing or two about this process, such as what port it is listening on, and how to change settings for it assuming that you have the authority to do so. This binary is not to be confused with [another binary called just mongo](/2018/07/08/mongodb-the-mongo-binary/) which is used to interact with mongodb, and preform certain tasks. In this post I will be writing about this binary, I might not touch base on everything but I will be covering a few must know things about it.

<!-- more -->

## 1 - what to know


## 2 - Restarting mongod service

Often I will want to restart the mongod service, because I made some kind of change to the mongodcfg file for example. Knowing how to do this right is important, when I just killed the process in Linux I ended up with an unclean shutdown, and had to repair my database folder.

### 2.1 - In Xubuntu Linux