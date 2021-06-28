---
title: Linux Top command for keeping an eye and process activity
date: 2021-06-28 13:45:00
tags: [linux]
layout: post
categories: linux
id: 898
updated: 2021-06-28 14:01:16
version: 1.3
---

Coming from a Windows environment to Linux one thing that I would often like to do in Windows is keep an eye on what is going on with process activity. In fact I would say that these days that is one of the major reasons why I am becoming more of a Linux user rather than a Windows user, because I am getting tired of things running in the background slamming my system none stop. In windows there are all kinds of background processes like windows telemetry that eat up way to much overhead, and interfere with me using my computer without issue. So far that seems to not be a problem with Linux, but still I like to have ways to keep an eye on things just to make sure nothing weird is going on.

I have wrote a [post on the ps command](/2019/08/16/linux-ps/) a while back, and that would seem to be one tool in the Linux tool box when it comes to polling what the status of processes are. However there are a number of other options for this sort of thing, and one such options would be the [Linux Top command](https://man7.org/linux/man-pages/man1/top.1.html). So then in this post I will be going over a few quick examples of using the linux top command as a way to see what is going on with Linux processes.

<!-- more -->

## 1 - Basic example

```
$ top
```

## 2 - Set the delay time

```
$ top -d 0.5
```

## 3 - Set a number of times and exit

```
$ top -d 0.1 -n 30
```