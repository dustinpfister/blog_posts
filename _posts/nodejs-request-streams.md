---
title: Streams using request the npm package
date: 2018-08-15 13:27:00
tags: [js,node.js]
layout: post
categories: node.js
id: 259
updated: 2018-08-15 13:37:50
version: 1.1
---

So for [yet another post](/categories/node-js/) on [node.js](https://nodejs.org/en/) and the many useful packages that can be installed via [npm](https://www.npmjs.com/) I thought I would write another post on the npm package request, that is a popular http client for scripting http. Although I think this time around I will be focusing on streams. Out of the box request only gives to ways to work with incoming data, callback methods, and streams. Promise support can be added, but that is off topic for this post.

<!-- more -->

## 1 - What to know

This is an advanced post on node.js, and JavaScript that has to do with working streams using request over the built in modules for doing so. I will not be covering everything there is to know about request, let alone all the other topics of interest that branch off from this. If you want to learn the basics about request, I have [an older post on that](/2017/05/23/nodejs-request/).
