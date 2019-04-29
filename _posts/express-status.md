---
title: Express status getting and setting a http status code
date: 2019-04-29 17:48:00
tags: [express,node.js]
layout: post
categories: express
id: 429
updated: 2019-04-29 17:56:33
version: 1.0
---

In express status codes can be both get and set with properties and methods in an express response object. There is the res.statusCode property than can be used to find out the current http status code, and the res.status method that can be used to set that code. In addition there is the res.sendStatus method that can be used to just set a status code and end the request without sending any data in the same way as the express end response method. So this will be a post on http status codes in express, getting it, setting it and some status code use examples.

<!-- more -->
