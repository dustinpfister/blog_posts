---
title: Managing file downloads in express with the response download method
date: 2018-06-11 11:01:00
tags: [js,express,node.js]
layout: post
categories: express
id: 204
updated: 2018-06-11 11:06:26
version: 1.0
---

As I continue expanding on [express.js](https://expressjs.com/) this month today I thought I would write about the response download method, which is one of the many methods in express that are part of the standard response object that I might more about this week. This method is useful if you want to have some kind of path that will work as a way to deliver a file as a download when a link is clicked, or something to that effect. It is very easy to use, you do not have to worry about setting the proper headers or anything like that it does it all for you so all that has to be done basicly is to just call a method in the response object.

<!-- more -->

