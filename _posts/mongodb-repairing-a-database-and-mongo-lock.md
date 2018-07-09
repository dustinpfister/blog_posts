---
title: Repairing a mongodb database folder after an unclean shutdown
date: 2018-07-08 13:05:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 229
updated: 2018-07-09 09:24:36
version: 1.3
---

When playing around with mongodb I once ended up with an [unclean shutdown](https://docs.mongodb.com/manual/tutorial/recover-data-following-unexpected-shutdown/) as a result of just killing the process without allowing for mongod to gracefully shutdown. As such I ended up with a non empty mongod.lock file, and I could not restart mongod. For a while I could not figure out what was wrong, but afyer checking the logs and doing a little research it turns out I just need to repair the database by juts giving a few options to mongod, and sure enough I was back up and running in no time. This will be a quick post about that experience.

<!-- more -->

## 1 - what to know

This is a quick post on how to go about repairing a mongodb database when it has become corrupted as a result of an unclean shutdown. I will also be briefly covering some related topics as well, but will not be getting into them in detail.


## 2 Start the repair

To start the repair just start mongod with the repair option and also give the location to the database.

```
$ mongod --repair --dbpath /var/lib/mongodb
```

### 2.1 - Restarting mongod

After that if all goes well I should be able to restart mongod. In both Linux, and Windows I often run mongod as a service so I would do this in Linux:

```
$ sudo service mongodb start
```

And in windows I would use the services administrative tool to start up the mongod service again.

