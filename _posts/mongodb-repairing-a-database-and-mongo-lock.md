---
title: Repairing a mongodb database folder after an unclean shutdown
date: 2018-07-08 13:05:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 229
updated: 2018-07-08 20:30:38
version: 1.2
---

When playing around with mongodb I once ended up with an [unclean shutdown](https://docs.mongodb.com/manual/tutorial/recover-data-following-unexpected-shutdown/) as a result of just killing the process without allowing for mongod to gracefully shutdown. As such I ended up with a non empty mongod.lock file, and I could not restart mongod. For a while I could not figure out what was wrong, but afyer checking the logs and doing a little research it turns out I just need to repair the database by juts giving a few options to mongod, and sure enough I was back up and running in no time. This will be a quick post about that experience.

<!-- more -->

## 1 - what to know


## 2 Start the repair

To start the repair just start mongod with the repair option and also give the location to the database.

```
$ mongod --repair --dbpath /var/lib/mongodb
```
