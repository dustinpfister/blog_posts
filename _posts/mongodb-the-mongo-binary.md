---
title: The mongo binary for interacting with mongodb
date: 2018-07-08 09:57:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 227
updated: 2018-07-08 10:17:33
version: 1.2
---

The [mongo binary](https://docs.mongodb.com/manual/reference/program/mongo/) in [mongodb](https://www.mongodb.com/) is a tool that can be used to interact with mongodb. It is not the service that runs in the background that responds to requests that would be [mongod](/2018/07/08/mongodb-the-mongod-binary/). Still the mongo binary is a usful tool that can be used to run [mongodb shell scripts](/2018/07/05/mongodb-making-shell-scripts/) that can be used for various admin tasks such as setting up a user account with read only access.

<!-- more -->

## 1 - what to know

This is a post on the mongodb binary known as just simply mongo, it is what I use in the command line to work with mongodb. This post does not cover everything when it comes to setting up, and using mongo, but it is an important part of doing so.

## 2 - The mongo shell.

If I just call mogno from the command line, and do not give it any arguments. I will end up dropping into the mongo shell. Here I can enter certain commands to look around at things, but when it comes to doing anything advanced I will want to use a shell script to do so. A shell script can be run from here, with the load command, but is can also be executed from the command line. In any case I will use this section to cover some basic examples of using the mogno binary to work with mongodb.
