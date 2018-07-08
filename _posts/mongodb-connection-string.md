---
title: The mongodb connection string
date: 2018-07-07 09:37:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 224
updated: 2018-07-08 08:41:53
version: 1.4
---

The [mongodb](https://www.mongodb.com/) [connection string](https://docs.mongodb.com/manual/reference/connection-string/) is one of the first things I have become aware of when getting started with using mongodb as a database solution. Understanding this string is critical not just for the sake of using mongodb locally, but also when it comes to deployment as well as the content of the string will typically differ between those two environments. In this post I will be writing about the mongodb connection string, and relevant must know topics surrounding this when it comes to things like authentication.

<!-- more -->

## 1 - what to know

This is a post on the mongodb connection string that is used to connect to a database. This is not a getting started post on mongodb, express, angular, node.js, javascript or any additional skills that are required before hand. I assume that you are hear becuase you want to learn more about the connection string, and common pitfalls surrounding this topic.

## 2 - Some basic examples of a mongodb connection string

Here in this section of this post I will be outlinng some examples of a connection string it string literal format. With many mongo clients such as [mongoose](http://mongoosejs.com/), and object can be give that will be used to build the connection string, more on that later, for now lets just look at the actual format examples of a connection string.

### 2.1 - The most basic example

So a very basic example of a connection string might just use the mongo connection string prefix, and then just localhost for the host, and then the name of the database, and might look like something like this.

```
let mongoURL = 'mongodb://localhost/mydb';
```

When starting out with a simple project, with mognodb running locally, with authentication disabled, and running on the default port, this might work just fine. However when deploying to a server, chances are it will not. Localhost may need to be replaced with an ip address of another node somewhere other than where the connection is being established, the default port will not do as it is blocked by a firewall, and there may be a username and password that may have to be specified.