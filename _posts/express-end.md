---
title: Express end response method
date: 2019-04-28 09:02:00
tags: [express,node.js]
layout: post
categories: express
id: 428
updated: 2019-04-28 09:06:55
version: 1.0
---

The express end response method is one of several ways to go about ending an incoming http request from a client system. The express end method is used for situations in which the request is to just simply be put to an end without sending any data to the client. It is true that the method can be used to send data in the form of a string or buffer to the client, but another response method should be used such as res.send, or res.json.


<!-- more -->

## 1 - Express end response method basic example