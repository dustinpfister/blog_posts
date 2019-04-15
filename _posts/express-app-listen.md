---
title: App listen method in express and the native node.js alternative
date: 2019-04-15 15:42:00
tags: [express,node.js]
layout: post
categories: express
id: 415
updated: 2019-04-15 15:47:32
version: 1.0
---

In express.js there is the app.listen convenience method that can be used to get an express app to start listening for requests on a given port. In many projects this express.js app object method will work just find, but in some situations you might want to use the native node.js http or https methods to get your express app up and running. In this post in will be giving some quick examples of app.listen in express.js as well as the http.createServer node.js http modules methods as well.

<!-- more -->

