---
title: The fs.createReadStream method
date: 2018-08-18 22:06:00
tags: [js,node.js]
layout: post
categories: node.js
id: 263
updated: 2018-08-19 11:23:32
version: 1.3
---

In the post I will be writing about read streams in [node.js](https://nodejs.org/en/) using the [fs.createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options). This method is one of many examples of streams in node.js, so if you are new to streams it makes sense to just start playing around with some of these methods. The fs.createReadStream is an example of a readable stream, and as such it can only be used to read data from a file, which differs from Writable and Duplex streams. This methods can be used in conjunction with a writable stream, including the fs.createWriteStream method. So lets take a look as some examples of working with readable streams with node.js, and it's built in file system module.

<!-- more -->

## 1 - Before continuing reading

This is a post on the fs.createReadStream method in node.js, I will not be getting into streams in Depth, let alone the file system module, node.js, and javaScript by itself.

### 1.1 - Readable, writable, and Duplex streams

The method I will be writing about in this post is an example of a readable stream, this means that certain methods that can be used in writable streams are not present. So this methods is used as a way to just read a file, but not to write to it. However readable streams allow for piping to a writable stream when working with something like fs.createWriteStream. These other kinds of streams will be touched on breafly, but the focus will be on reading streaming data, rather than writing it.