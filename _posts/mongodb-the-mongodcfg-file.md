---
title: The mongod.cfg file for configuring the mongod process
date: 2018-07-08 09:05:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 226
updated: 2018-07-08 09:16:58
version: 1.0
---

So with [mongodb](https://www.mongodb.com/) there is the [mongod binary](https://docs.mongodb.com/manual/reference/program/mongod/) that is the actually process daemon or service that handles requests for data in a database. It other words it is what always runs in the background on the computer that is hosting the database that is being used in a project that makes use of mongodb. Well one thing that might come of interest with this is how to configure mongodb with settings like the port to listen on, and if authentication should be enabled or not. Well one way is to give some of these options to the binary via the command line when staring it, but maybe a better way is to park these settings in a configuration file of sorts, thats where [the mongod.cfg file](https://docs.mongodb.com/manual/reference/configuration-options/) comes into play. In this post I will be giving a quick overview of

<!-- more -->

## 1 - what to know


### 2 An example of mongod.cfg

