---
title: Fs exists method in nodejs and better alternatives
date: 2019-06-21 07:42:00
tags: [node.js]
layout: post
categories: node.js
id: 484
updated: 2019-06-21 07:53:44
version: 1.0
---

The fs exists method in the file system module of nodejs should not be used at all these days. In node 8.x it has been deprecated, and it is reasonable that it might not work at all in future versions of nodejs. So then how does one test if a file is there or not, well there are a number of ways to do that by just opening the file, and then handle the error in the event that the file is not there.In all fairness that is how it should be done anyway using the fs exists method just makes things more complacted than they need to be.

<!-- more -->

