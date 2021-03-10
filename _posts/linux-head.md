---
title: The Linux head command
date: 2021-03-10 12:07:00
tags: [linux,js]
layout: post
categories: linux
id: 820
updated: 2021-03-10 12:33:01
version: 1.1
---

The Linux head command is a way to just print the first few lines of some output rather than the whole thing. In addition there is also the tail command that can be used as a way to print just the last few lines of some output. In some situations this is just what I would want to do with soem command output rather than make use of some other options, such as the less command, or redirection of output to a file that I can then option with a text editor like nano.

<!-- more -->

## 1 - Linux head basic examples

In this section I will be starting out with just some basic examples of the head command, and some related commands, and bash features such as piping.

### 1.1 - Uisng the echo command

```
$ echo -e "one\ntwo\nthree"
one
two
three
```

```
$ echo -e "one\ntwo\nthree" | head -n 1
one
```
