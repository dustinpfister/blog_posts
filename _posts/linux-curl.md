---
title: Linux find command
date: 2020-09-25 17:23:00
tags: [linux]
layout: post
categories: linux
id: 711
updated: 2020-10-01 07:28:05
version: 1.7
---

the [Linux curl](https://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html) command is a way to download a file from a given URL, but it is also a bit more than just that. It can also be used to make various kinds of http requests from the command line such a POST requests, and can also be used as an FTP client. So the curl command is a helpful little command to be aware of when it comes to getting data from a public URL, or anything to that effect outside of a web browser.

<!-- more -->


## 1 - basic Linux curl command for just downloading a fil from URL

One way to use curl is to use it to just download a file from a public URL. To do this I often just need to pass the URL as the first argument. Just passing the URL alone will result in curl downloading that resource and spiting out the results to the standard output of the console. So to save the file I will need to pipe that output to something that will save the file, or use the output option of curl to save to a file

So say I just want to pull the index file of my website I can just call curl and pass the URL to that index file.

```
$ curl https://dustinpfister.github.io/index.html
```

Which will result in the HTML being loaded to the standard out of the console. To save the file I can use the output option of curl to do so. This option works by using \-\-output or just \-o followed by the filename that I would like to save the file as.
```
$ curl https://dustinpfister.github.io/index.html -o index.html
```
Another option is the output option but with an uppercase \-O this should just save file file as the filename in the URL


```
$ curl https://dustinpfister.github.io/index.html -O
```

## 2 - keep output of curl silent

When using curl it would seem that I often get a process bar in the standard output. This could cause problems when it comes to piping what I am getting to some other command. If I am getting some data I would wan to pipe the results to another command rather than the process bar. So there is of course an option to silent that kind of output, and for that there is the silent option.

```
$ curl https://dustinpfister.github.io/index.html -s
```

## 3 - make a HEAD request

It is possible to do just a HEAD request rather than a full get request just like in a browser when it comes to scripting http with javaScript and XMLHttpRequest. To do a head request for a file I just need to use the \-I optiin and then pass the URL to the file where I want to make a HEAD request.

```
$ curl -I https://dustinpfister.github.io/index.html
```

## 4 - conclusion

So the Linux curl command is there to work with when it comes to doing many tasks that have to do with getting data from the open web, or pushing data up to it. The data of a file at a URL can be pulled down and save to a file, or piped to another command when it comes to the basic use of Linux curl. However the Linux curl command can also be used to simulate POST requests, and function as an FRP client.