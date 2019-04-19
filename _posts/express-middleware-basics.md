---
title: Express Middleware Basics
date: 2019-04-19 12:58:00
tags: [express,node.js]
layout: post
categories: express
id: 419
updated: 2019-04-19 13:13:40
version: 1.1
---

In [express.js](https://expressjs.com/) the concept of middleware is something that should be grasped in order to make significant headway with express applications. If you have fiddled around with express a little so far, chances are you have used some middleware so far without even realizing it. There is some express built in middleware, one example if this would be the express.js body parser, but for the most part express itself is fairly minimal. So as such creating a fairly capable express.js application will involve installing additional middleware, as well as writing original middleware functions. So then in this post I will be covering express middleware basics.

<!-- more -->


## 1 - Express Middleware Basic example

So a middleware method can be just a function that receives arguments for an incoming request, a response, and the next middleware to call after what has been done in the middleware method is completed. This method is then often used with a method like app.use as a way to prefrom some kind of task involving an incomeing http request of one type of another.