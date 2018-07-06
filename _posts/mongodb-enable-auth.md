---
title: Enabling authentication in mongodb
date: 2018-07-06 11:47:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 222
updated: 2018-07-06 11:58:05
version: 1.0
---

So I have been experimenting with [mongodb](https://www.mongodb.com/) a little these days as I am interesting in writing some content on the subject, aside from the fact that it will typically be the database solution I will run into when working in a node.js environment. In this post I will be writing abut [enabling authentication](https://docs.mongodb.com/manual/tutorial/enable-authentication/) for a database.

<!-- more -->

## 1 - what to know

This is a post on [enabling authentication](https://docs.mongodb.com/manual/tutorial/enable-authentication/) in [mongodb](https://www.mongodb.com/) so that a user name and password must be provided in order to do anything with the database.

## 2 - Enabling or disabling authentication via mongod.cfg

So far my preferred way of enabling or disabling authentication is by editing the mongod.cfg file



## 3 - Making a mongodb shell script that will add a user, when authentication is disabled