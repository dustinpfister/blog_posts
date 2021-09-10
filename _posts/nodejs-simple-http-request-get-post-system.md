---
title: A Simple nodejs example of a sever that responds to post requests
date: 2021-09-10 12:03:00
tags: [js]
layout: post
categories: js
id: 928
updated: 2021-09-10 12:16:11
version: 1.2
---

A few years back I made a [simple nodejs script that is a basic drop in script that can be used to start a simple static sever](/2017/12/04/nodejs-simple-static-server-file/). I come back to the post now and then, and when I do I often edit the source code and the content a little. Anyway it is the kind of script that might not be a good choice to use in production, but when it comes to a simple pet project where I just want to host a public folder over the http protocol it seems to work okay thus far. Anyway the thought occurred that it would be nice to have another similar vanilla javaScript type solution for setting up this kind of script for a project only this time make it a script that is a slightly more advanced and will respond to post requests.

<!-- more -->

## 1 - What to know first before continuing to read this

### 1.1 - The source code for this can be found at my github

I am going over all the relevant source code in this post, but the full source code can be found at my [Git hub repository on this script](https://github.com/dustinpfister/nodejs-simple-http-request-get-post-system).