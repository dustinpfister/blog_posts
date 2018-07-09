---
title: Repairing a mongodb database folder after an unclean shutdown
date: 2018-07-08 13:05:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 229
updated: 2018-07-09 10:37:06
version: 1.7
---

When playing around with mongodb I once ended up with an [unclean shutdown](https://docs.mongodb.com/manual/tutorial/recover-data-following-unexpected-shutdown/) as a result of just killing the process without allowing for mongod to gracefully shutdown. As such I ended up with a non empty mongod.lock file, and I could not restart mongod. For a while I could not figure out what was wrong, but afyer checking the logs and doing a little research it turns out I just need to repair the database by juts giving a few options to mongod, and sure enough I was back up and running in no time. This will be a quick post about that experience.

<!-- more -->

## 1 - what to know

This is a quick post on how to go about repairing a mongodb database when it has become corrupted as a result of an unclean shutdown. I will also be briefly covering some related topics as well, but will not be getting into them in detail.

### 1.1 - What can cause it.

In my experience so far what caused it was an unclean shutdown by directly killing the mongod process, rather than shunting it down gracefully. This can result in a non empty mongod.lock file in the database folder that is being used. It could also happen because of an operating system crash, a power outage, or anything else that could result in an unclean shutdown.

### 1.2 - How to know if the database needs a repair.

Check the mongod.lock file in the database folder and see if it is not empty. It should just be a blank file 0kb in size, if this is not the case then the database may need to be repaired. It is also a good idea to look at the logs as well, in my experience it was showing that there where problems with permissions, and it also complained of an unclean shutdown.


## 2 - Start the repair

To start the repair just start mongod with the repair option and also give the location to the database. In my Linux environment the database was located at /var/lib/mongodb, but it could be at another location.

```
$ mongod --repair --dbpath /var/lib/mongodb
```

If you are not sure where the database is located in the files system that would be a good thing to find out when it comes to these things. The location can be set from the command line when mognod is first started, or it can also be set via a configuration file that could at least potential be located anywhere and can be a conf, or yaml formated cfg file.

### 2.1 - Restarting mongod

After that if all goes well I should be able to restart mongod. In both Linux, and Windows I often run mongod as a service so I would do this in Linux:

```
$ sudo service mongodb start
```

And in windows I would use the services administrative tool to start up the mongod service again.

## 3 - Conclusion

This worked for me, but might not work out in all situations. When it comes to a real deployment of a real project the client database is something that should be backed up. If not you are really asking for trouble.