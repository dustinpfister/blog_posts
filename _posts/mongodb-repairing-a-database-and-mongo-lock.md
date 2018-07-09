---
title: Repairing a mongodb database folder after an unclean shutdown
date: 2018-07-08 13:05:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 229
updated: 2018-07-08 20:17:54
version: 1.1
---

[mongod binary](https://docs.mongodb.com/manual/reference/program/mongod/) [unclean shutdown](https://docs.mongodb.com/manual/tutorial/recover-data-following-unexpected-shutdown/)

<!-- more -->

## 1 - what to know


## 2 Start the repair

To start the repair just start mongod with the repair option and also give the location to the database.

```
$ mongod --repair --dbpath /var/lib/mongodb
```
