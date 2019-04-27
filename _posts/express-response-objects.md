---
title: Express response objects
date: 2019-04-27 09:00:00
tags: [express,node.js]
layout: post
categories: express
id: 427
updated: 2019-04-27 09:06:46
version: 1.0
---

An express response object is one of four possible arguments that is passed to an express middleware function. Expressjs has to do with the use of middleware that does something with incoming http requests. So request objects have to do with the incoming http request from a client system, and response objects have to do with the response to that system. The other two arguments in an middleware method have to do with error handling, and passing along control to another middleware method. However in this post I will be focusing on just response objects today.

<!-- more -->
