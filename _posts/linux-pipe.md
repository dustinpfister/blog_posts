---
title: Linux pipe redirection of standard output
date: 2020-10-09 12:427:00
tags: [linux]
layout: post
categories: linux
id: 720
updated: 2020-10-09 15:23:30
version: 1.2
---

A [Linux pipe](http://www.linfo.org/pipe.html) is a form of redirection of output of one command to the input of one or more additional commands. This allows for breaking something down into a bunch of steps where one programe dows just one thing and then the output of that command is then passed on to another command that accepts that result as input to which it then uses to preform yet another result.

There is also [linux redirection](/2020/10/02/linux-redirection/) that is simular to a linux pipe, but works a little diferently. With Linux pipes two commands can run in parallel with each other, and data is trasnferd in a per buffer basis. With Linux redirection one command must compleate, before the next can start.


<!-- more -->

## 1 - Using cat to pipe a list of file names to xargs and then cat again

```
$ cat file_list.txt | xargs cat
```