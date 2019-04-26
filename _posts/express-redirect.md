---
title: Express redirect
date: 2019-04-26 14:34:00
tags: [express,node.js]
layout: post
categories: express
id: 426
updated: 2019-04-26 14:38:34
version: 1.0
---

An express redirect is one of several options when it comes to responding to an incoming http request. Often a response will involve just sending some json, text, or html, but in some cases a redirect is called for. In express redirects can be done with the res.redirect response method, for the most part just the url of the resource to redirect to is all that needs to be passed, but some times it is not that simple when it comes to the response status codes. So in this post I will be writing about all things express redirect related that I come across that are note worthy.

<!-- more -->

## 1 - Express redirect basic example
