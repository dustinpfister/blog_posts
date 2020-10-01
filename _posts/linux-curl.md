---
title: Linux find command
date: 2020-09-25 17:23:00
tags: [linux]
layout: post
categories: linux
id: 711
updated: 2020-10-01 06:10:40
version: 1.2
---

the [Linux curl](https://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html) command is a way to download a file from a given URL, but it is also a bit more than just that. It can also be used to make various kinds of http requests from the command line such a POST requests, and can also be used as an FTP client. So the curl command is a helpful little command to be aware of when it comes to getting data from a public URL, or anything to that effect outside of a web browser.

<!-- more -->


## 1 - basic Linux curl get request

One way to use curl is to just run curl and pass a URL to a resource. This will result in curl downloading that resource and spiting out the results to the standard output of the console.

```
$ curl https://dustinpfister.github.io/favicon.ico
```