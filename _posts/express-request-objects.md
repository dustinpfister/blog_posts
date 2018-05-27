---
title: Request objects in express.js
date: 2018-05-26 20:48:00
tags: [js,express,node.js]
layout: post
categories: express
id: 195
updated: 2018-05-26 20:53:35
version: 1.0
---

When making a node.js application using [express.js](https://expressjs.com/) there is a need to handle incoming requests. To do this there is the request object that is one of three arguments that can be used when making a function that will be given as a callback when using an app or router method like get, or post. The request object contains all kinds of useful information when it comes to working with requests. In this post I will be writing about some of the must know features of request objects when working with express.js.

<!-- more -->


