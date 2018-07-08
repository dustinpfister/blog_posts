---
title: The mongo binary for interacting with mongodb
date: 2018-07-08 09:57:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 227
updated: 2018-07-08 10:46:03
version: 1.5
---

The [mongo binary](https://docs.mongodb.com/manual/reference/program/mongo/) in [mongodb](https://www.mongodb.com/) is a tool that can be used to interact with mongodb. It is not the service that runs in the background that responds to requests that would be [mongod](/2018/07/08/mongodb-the-mongod-binary/). Still the mongo binary is a usful tool that can be used to run [mongodb shell scripts](/2018/07/05/mongodb-making-shell-scripts/) that can be used for various admin tasks such as setting up a user account with read only access.

<!-- more -->

## 1 - what to know

This is a post on the mongodb binary known as just simply mongo, it is what I use in the command line to work with mongodb. This post does not cover everything when it comes to setting up, and using mongo, but it is an important part of doing so.

## 2 - The basics of the mongo shell.

If I just call mogno from the command line, and do not give it any arguments. I will end up dropping into the mongo shell. Here I can enter certain commands to look around at things, but when it comes to doing anything advanced I will want to use a shell script to do so. A shell script can be run from here, with the load command, but is can also be executed from the command line. In any case I will use this section to cover some basic examples of using the mogno binary to work with mongodb.

### 2.1 - Entering mongodb without logging in first

If I do not have to do anything special before hand, just simple calling the mongo binary from the command line will drop me into the mongo shell.

```
$ mongo
MongoDB shell version v4.0.0
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.0
>
```

The problem with this is that I did not set a username and password, as well as a database that I have access to with said account. If I am running mongodb locally, and I have authentication disabled, this is not a problem, otherwise it is as I might be able to get into the shell, but I will not be able to do much of anything.

### 2.2 - logging into the shell with a username and password

If authentication is enabled, and I want to work with a database that I do have a username, and password for, I can log in from the command line. To do this I just need to use the -u, and -p options that are short for --username and --password, and then use the --authticationDatabase option to set the name of the database to wich the given user has access.

```
$ mongo -u "dustin" -p "1234" --authenticationDatabase "mongoose_users"
MongoDB shell version v4.0.0
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.0
>
```

### 2.3 - listing, and using a databases in the mongo shell

Once in it is nice to see what databases are available, to do this I just need to use the show dbs command. There is also a need to know what database I am currently using, for this there is the db.getName() database method that can be used to get the name of the current database. Once I have that figured out I might want to switch to a different database, for that there is the use command.

```
> show dbs
admin           0.000GB
config          0.000GB
local           0.000GB
mongoose_basic  0.000GB
mongoose_test   0.000GB
mongoose_users  0.000GB
test            0.000GB
> db.getName()
test
> use mongoose_users
switched to db mongoose_users
> db.getName()
mongoose_users
>
```

### 2.4 -- help, and db.help

In the console there is both help, and db.help. help will give a list of commands, while db.help will give a list of databse methods. It would apear that these are not full lists, but they are a quick list of common ones. If what you want is not there, then it has to be looked up [in the docs](https://docs.mongodb.com/manual/reference/mongo-shell/).
