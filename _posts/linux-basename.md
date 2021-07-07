---
title: Linux basename command to get just the file name of a path
date: 2021-07-07 12:54:00
tags: [linux]
layout: post
categories: linux
id: 905
updated: 2021-07-07 13:07:48
version: 1.3
---

When working out a bash script I might want to get just the base name of a path to a file or folder, one way to do so might be to use the [linux cut](/2020/11/19/linux-cut/) command, but there is also the [linux basename](https://www.geeksforgeeks.org/basename-command-in-linux-with-examples/) command that can be used for this task. The command works by passing a single argument to the command that should be a string value of a path to a file, the result that will be spit out to the standard output will then just be the base name of the path.


<!-- more -->

## 1 - Basic example of the Linux basename command

```
$ basename /foo/bar/baz.txt
baz.txt
```

## 2 - Piping a url to the basename command with xargs

```
$ echo /foo/bar/baz.txt | xargs basename
baz.txt
```

## 3 - Using the find command with exec option

```
$ find /usr/lib/nodejs -name "*.js" -exec basename {} ';'
```