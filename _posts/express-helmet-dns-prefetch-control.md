---
title: Using the express.js helmet.js middleware to set dns prefetch control headers
date: 2018-06-19 11:56:00
tags: [js,express,node.js]
layout: post
categories: express
id: 211
updated: 2018-06-19 12:02:53
version: 1.0
---

When making an [express.js](https://expressjs.com/) application security, and privacy should be of at least some concern. A good start with express might be to check out [helmet.js](https://www.npmjs.com/package/helmet). This express.js middleware is actually a collection of middleware modules that can be used to set some headers that may help to improve security, and privacy to some extent. It is not an end all solution of course, but it might be a good start to say the least. In this post I will be writing about one of the middleware methods that is used to set a header that will disable dns prefetching.

<!-- more -->

