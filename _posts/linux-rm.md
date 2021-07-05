---
title: Linux rm command for deleting files from the command line
date: 2021-07-05 10:57:00
tags: [linux]
layout: post
categories: linux
id: 903
updated: 2021-07-05 11:10:32
version: 1.5
---

The [Linux rm](https://linux.die.net/man/1/rm) command is how to go about deleting files from the command line. The basic use case of the command is simple enough I just need to call the command and pass the path to the file that I want to delete as the first and only argument. However things might get a little complicated when it comes to things like, deleting folders, deleting files recursively, or running into problems with things that have to do with files access permissions. So in this post I will be going over a few simepl example of the Linux rm command, and also write about some other closely related topics such as the chown, and sudo commands.

<!-- more -->


## 1 - Basic Linux rm command example

The

```
$ echo 'test' > test.txt
$ ls *.txt
test.txt
$ rm test.txt
$ ls *.txt
ls: cannot access '*.txt': No such file or directory
```