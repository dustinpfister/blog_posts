---
title: Setting up a view in hapi js
date: 2019-06-24 11:46:00
tags: [js,node.js,hapi]
layout: post
categories: hapi
id: 487
updated: 2019-06-24 11:57:36
version: 1.1
---

So when starting out with hapi js one of the first things that comes up is how to go about setting up a client system, serve static assets, and provide a view. A view can be set up by just hosting static assets, but what about server side, on demand rending with templates? In this post I will be going over how to get started with a view in hapi js.

<!-- more -->

## 1 - hapi view basics

To set up a view more dependencies need to be installed into a project beyond just hapi itself. Of course the layout engine of choice needs to be installed, but also an additional plug in as well at least in hapi 17.x.