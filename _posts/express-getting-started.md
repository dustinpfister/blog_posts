---
title: getting started with express
date: 2018-05-18 10:50:00
tags: [js,express,node.js]
layout: post
categories: express
id: 191
updated: 2018-05-21 18:21:46
version: 1.1
---

The node.js powered server side framework [express.js](https://expressjs.com/) is a pretty when it comes to making full stack web applications with [node.js](https://nodejs.org/en/). It is part of the MEAN stack, and is also a major component of many other projects like [sails](https://www.npmjs.com/package/sails), and [keystone](https://www.npmjs.com/package/keystone). In any case express is worthy of a series of posts on it for starting with the typical getting started post, so lets get this one out of the way so we can get into making some interesting stuff.

<!-- more -->

## What to know before getting started with express

This is a getting started post on the server side web application framework known as express.js, it is not a getting started post on javaScript in general as that is outside the scope of this post and any additional posts that I will write in the future. So I assume that you have at least some knowledge of javaScript. I also assume that you have node.js installed, and have some experience with that as well.

## Just getting started without express-generator

So far when I work with express I just start a new npm project, and install express.js as one of the dependencies like with any other node.js project.

```js
$ mkdir helloworld
$ cd helloworld
$ npm init
$ npm install express --save
```

## Getting started with express-generator
