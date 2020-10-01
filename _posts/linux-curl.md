---
title: Linux find command
date: 2020-09-25 17:23:00
tags: [linux]
layout: post
categories: linux
id: 711
updated: 2020-10-01 06:25:41
version: 1.4
---

the [Linux curl](https://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html) command is a way to download a file from a given URL, but it is also a bit more than just that. It can also be used to make various kinds of http requests from the command line such a POST requests, and can also be used as an FTP client. So the curl command is a helpful little command to be aware of when it comes to getting data from a public URL, or anything to that effect outside of a web browser.

<!-- more -->


## 1 - basic Linux curl command for just downloading a fil from URL

One way to use curl is to use it to just download a file from a public URL. To do this I often just need to pass the URL as the first argument. Just passing the URL alone will result in curl downloading that resource and spiting out the results to the standard output of the console. So to save the file I will need to pipe that output to something that will save the file, or use the output option of curl to save to a file

So say I just want to pull the index file of my website I can just call curl and pass the URL to that index file.

```
$ curl https://dustinpfister.github.io/index.html
```

Which will result in the HTML being loaded to the standard out of the console. To save the file I can use the output option of curl to do so.

```
$ curl https://dustinpfister.github.io/index.html --output index.html
```

## 2 - keep output of curl silent

When using curl it would seem that I often get a process bar in the standard output. This could cause problems when it comes to piping what I am getting to some other command. If I am getting some data I would wan to pipe the results to another command rather than the process bar. So there is of course an option to silent that kind of output, and for that there is the silent option.

```
$ curl https://dustinpfister.github.io/index.html -s
```