---
title: Using klaw, and through2 to walk a file system in node.js.
date: 2018-07-19 13:22:00
tags: [js,node.js]
layout: post
categories: node.js
id: 236
updated: 2018-07-19 13:28:45
version: 1.0
---

When making a command line interface program in node.js that needs to walk a file system recursively there are many options. If you do want to work within the core set of node.js modules without installing any additional from npm there is of course the nodedir method in the file system module that may be of interest. However in this post I will be writing about an npm package option that I seem to like a little for this known as [klaw](https://www.npmjs.com/package/klaw), that can also be used with another popular project known as [through2](https://www.npmjs.com/package/through2). I will be giving file system walking examples mainly using this, but will also touch base on some alternatives as well.

<!-- more -->

