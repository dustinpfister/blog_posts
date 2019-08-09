---
title: Express stream and the XMLHttprequest on process event
date: 2019-08-09 15:30:00
tags: [js,express,node.js]
layout: post
categories: express
id: 519
updated: 2019-08-09 15:39:41
version: 1.1
---

So I am working on a project in which I would like to stream to the client progress that is being made. I have some more demos to work out until I get a better grasp on what I want to go with, but have learn some great stuff in the process, about express streams. So it turns out that the response object in middle ware methods is a kind of stream and it inherits from the node http response method. So in express streams can be used by way of the response object to send data to the client in a chunk by chunk basis. In this post I will be going over some examples of how to do this, and how to check on progress on a request with the on process XMLHttpRequest event.

<!-- more -->
