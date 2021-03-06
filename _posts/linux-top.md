---
title: Linux Top command for keeping an eye and process activity
date: 2021-06-28 13:45:00
tags: [linux]
layout: post
categories: linux
id: 898
updated: 2021-06-28 14:28:27
version: 1.9
---

Coming from a Windows environment to Linux one thing that I would often like to do in Windows is keep an eye on what is going on with process activity. In fact I would say that these days that is one of the major reasons why I am becoming more of a Linux user rather than a Windows user, because I am getting tired of things running in the background slamming my system none stop. In windows there are all kinds of background processes like windows telemetry that eat up way to much overhead, and interfere with me using my computer without issue. So far that seems to not be a problem with Linux, but still I like to have ways to keep an eye on things just to make sure nothing weird is going on.

I have wrote a [post on the ps command](/2019/08/16/linux-ps/) a while back, and that would seem to be one tool in the Linux tool box when it comes to polling what the status of processes are. However there are a number of other options for this sort of thing, and one such options would be the [Linux Top command](https://man7.org/linux/man-pages/man1/top.1.html). So then in this post I will be going over a few quick examples of using the linux top command as a way to see what is going on with Linux processes.

<!-- more -->

## 1 - Basic example

To get started with top the most basic way would be to just ender top in a new bash window without any options at all. After doing so I see end up seeing what the top process commands currently are. The info will update by the default delay rate which would seem to be around to seconds. It also seems like the top will keep updating forever until I quite from it by typing q, or the usual ctrl+c.

```
$ top
```

By default it would seem that the processes are sorted by cpu usage rather than memory, or anything other then that. However right off the bat it would seem that this is yet another tool that can help me to know what is going on with my computer.

## 2 - Set the delay time

One thing that I would like to be able to change is the delay between refresh points, be default it would seem that this is about 2 seconds. One way to change the refresh rate is to set the delay in the command line when starting top with the -d option. When doing so I can give an integer value in seconds, but I can also set refresh rates faster than a second, by given a floating point value.

```
$ top -d 0.5
```

## 3 - Set a number of times and exit

Another option is the n option that can be used to set a number of times to refresh before exiting. So I can set the delay to 0.1 which would be about 100 ms, and then set the -n option to 30 which would result in the top program exiting after 30 refresh instances in about 3 seconds.

```
$ top -d 0.1 -n 30
```

## 4 - Other Linux tools that are worth checking out

The Linux top command is a great basic tool for keeping tack of what is going on with Linux processes. Also what is nice about the command as so far it would seem that it is often comes with Linux just like the ps command. However I can not say that the Linux top or ps commands are what I am used to when it comes to the task manager in windows. So with that said there is another tool that I have found can often be easily installed in all Linux systems that I have worked with so far and that is [gkrellm](http://gkrellm.srcbox.net/).

