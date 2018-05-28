---
title: Request objects in express.js
date: 2018-05-26 20:48:00
tags: [js,express,node.js]
layout: post
categories: express
id: 195
updated: 2018-05-28 12:01:54
version: 1.2
---

When making a node.js application using [express.js](https://expressjs.com/) there is a need to handle incoming requests. To do this there is the request object that is one of three arguments that can be used when making a function that will be given as a callback when using an app or router method like get, or post. The request object contains all kinds of useful information when it comes to working with requests. In this post I will be writing about some of the must know features of request objects when working with express.js.

<!-- more -->

## req.body - Get data payloads send from a client system

The req.body property can be used to get a data payload that was sent from the client system when working with post requests. In order to use this a body parsing middle ware will need to be used, luckily one comes with express itself.

A full working demo of this is a little involved as a front end is needed on top of back end code that uses the body-parser module. I have [written a post](/2018/05/27/express-body-parser/) where I get into this in detail.
