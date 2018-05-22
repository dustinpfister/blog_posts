---
title: Working with Routers in express.js
date: 2018-05-22 10:50:00
tags: [js,express,node.js]
layout: post
categories: express
id: 192
updated: 2018-05-22 14:46:22
version: 1.0
---

When making a node.js project with [express.js](https://expressjs.com/) I am going to end up setting up a static server, and or defining some paths that will respond to incoming requests with some kind of custom behavior. [Routers](https://expressjs.com/en/4x/api.html#express.router) are a useful way of defining these paths and pulling them into separate javaScript files that can then be linked to from the main script of an app using app.use.

<!-- more -->

## Keeping your code more organized

So Routers are a good way of keeping things more organized compared to defining all of this logic in the main script that is called to start the project. After all when working on something that does become a little complicated I can end up with a lot of code when it comes to defining these paths. This is often the case when defining a path that will handle post requests where sanitation is of concern.
