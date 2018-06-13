---
title: Sending a file with express.js using the response sendFile method
date: 2018-06-13 15:40:00
tags: [js,express,node.js]
layout: post
categories: express
id: 206
updated: 2018-06-13 15:45:25
version: 1.0
---

When making an [express.js](https://expressjs.com/) project there are a few response methods that can be used to respond to a request with some kind of content. All of these methods of interest are in the standard response object that is one of the three arguments when making a function that will be used with an app method like app.get. In this post I will be writing about the response send file method for just simply sending a file that is to be displayed in the browser. This differs from other methods like the response download method that is useful for serving up a file that is to be downloaded to the client.

<!-- more -->
