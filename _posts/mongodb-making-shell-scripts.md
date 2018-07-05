---
title: Making Mongodb Shell scripts, getting started.
date: 2018-07-05 18:45:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 221
updated: 2018-07-05 18:59:41
version: 1.1
---

In this post on [mongodb](https://www.mongodb.com/), I will be writing about making mongodb shell scripts. These are scripts that can be called from the mongodb shell with the load command, or dirrectly from the main os command line interface my calling mongodb and then passing the path of the js file. These scripts can be used to work with any of the [database methods](https://docs.mongodb.com/manual/reference/method/js-database/) in the mongo shell such as db.getName.

<!-- more -->

## 1 - what to know

This is a post on [mongodb](https://www.mongodb.com/) shell scripts. It is not a getting stared post on mongodb, javaScript, node.js or any other topics that you should know at least a thing or two about before hand in order to get anything of value from these posts.

## 2 - writing a hello world mongodb shell script

Start by making a folder that will be used to store the shell scripts. If these scripts will be closely tied to a particular project then I might want to call the folder something like mongo_shell or something to that effect in the root path of a project folder.

```
$ mkdir mongo_shell
$ cd mongo_shell
```

After making a new folder to store shell scripts in I then create a file called  helloworld.js that looks like this:

```js
printjson("hello World");
```

When that is done I can then call the script from the command line, assuming that the current working directory is the same as where the script is located, this will call the script.

```
$ mongo helloworld.js
MongoDB shell version v4.0.0
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.0
"hello World"
```