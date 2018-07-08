---
title: The mongod binary for starting a process that responds to queries
date: 2018-07-08 09:58:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 228
updated: 2018-07-08 11:02:43
version: 1.2
---

The [mongod binary](https://docs.mongodb.com/manual/reference/program/mongod/) in [mongodb](https://www.mongodb.com/) is what is used to start a process, daemon, or service if that is what you prefer to call such things. In other words it is something that runs in the background, and it listens on a port waiting to respond to requests. As such when working with mongodb it is important to at least know a thing or two about this process, such as what port it is listening on, and how to change settings for it assuming that you have the authority to do so. In this post I will be writing about this binary, I might not touch base on everything but I will be covering a few must know things about it.

<!-- more -->

## 1 - what to know
