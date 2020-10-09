---
title: Linux pipe redirection of standard output
date: 2020-10-09 12:427:00
tags: [linux]
layout: post
categories: linux
id: 720
updated: 2020-10-09 14:40:28
version: 1.1
---

A Linux pipe is a form of redirection of standard output of one command to the standard input of another command.


<!-- more -->

## 1 - Using cat to pipe a list of file names to xargs and then cat again

```
$ cat file_list.txt | xargs cat
```