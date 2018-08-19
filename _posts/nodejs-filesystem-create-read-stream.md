---
title: The fs.createReadStream method
date: 2018-08-18 22:06:00
tags: [js,node.js]
layout: post
categories: node.js
id: 263
updated: 2018-08-19 10:47:29
version: 1.2
---

In the post I will be writing about read streams in [node.js](https://nodejs.org/en/) using the fs.createReadStream. This method is one of many examples of streams in node.js, so if you are new to streams it makes sense to just start playing around with some of these methods. The fs.createReadStream is an example of a readable stream, and as such it can only be used to read data from a file, which differs from Writable and Duplex streams. This methods can be used in conjunction with a writeable stream, including the fs.createWriteStream method. So lets take a look as some examples of working with readable streams with node.js, and it's built in filesystem module.

<!-- more -->
