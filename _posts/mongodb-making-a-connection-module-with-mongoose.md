---
title: The mongodb connection string
date: 2018-07-07 09:42:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 225
updated: 2018-07-07 09:57:58
version: 1.1
---

The process of connecting to a [mongodb](https://www.mongodb.com/) database can some times be a little complicated. When connecting locally the hostname and port might not be of much interest, if the [mongod](https://docs.mongodb.com/manual/reference/program/mongod/) service is running on the default port, and there are no issues with using localhost as the hostname. However the situation can become very different when it comes to deployment, where not only does the hostname and port matter, but there is often a username and password that need to be specified as well in order to connect to and use a database. As such there seems to be a need to create, and maintain a module, that can be used to quickly connect depending on the environment. In many cases this module may need to be custom trailered depending on the environment, or at the very least bust be able to accept arguments, or look for environment variables.

<!-- more -->

## 1 - what to know

