---
title: Getting started with micro services using node.js, and express.js
date: 2018-06-08 11:41:00
tags: [js,express,node.js]
layout: post
categories: express
id: 203
updated: 2018-06-08 14:02:23
version: 1.0
---

In my experience so far when making some kind of full stack web application I run into problems with the programing becoming to complex. Often is the case so far that I end up doing everything in a single application. That is rendering and delivering the client system, authentication, database management, and so forth all within a single package. When it comes to simple hobby apps that are  not that complex, and may never have more than 50 visitors at any given moment, maybe this is not such a bad thing. However as a project grows in both complexity, and or popularity there is a threshold where it becomes desirable or necessary to break things down more. 

<!-- more -->

One way to do this is to start to get into micro services using node.js, and the popular [express.js](https://expressjs.com/) framework. In this post I will be writing about a simple example that will be just that.