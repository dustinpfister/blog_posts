---
title: The Linux head command
date: 2021-03-10 12:07:00
tags: [linux,js]
layout: post
categories: linux
id: 820
updated: 2021-03-10 12:43:05
version: 1.2
---

The Linux head command is a way to just print the first few lines of some output rather than the whole thing. In addition there is also the tail command that can be used as a way to print just the last few lines of some output. In some situations this is just what I would want to do with soem command output rather than make use of some other options, such as the less command, or redirection of output to a file that I can then option with a text editor like nano.

<!-- more -->

## 1 - Linux head basic examples

In this section I will be starting out with just some basic examples of the head command, and some related commands, and bash features such as piping, and the echo built in command. There are two general ways of going about using the head command, one is to get the first few lines of output, and the other is to get the first few bytes of output.

The echo built in command is just a way to go about creating some standard output, for the sake of just getting to know how to use the head command this command will work for the ake of just creating some dummy test output. In some real use case examples the output that I am piping into the Linux Head command might come from some other command such as the Linux ps command, or any number of other commands.

### 1.1 - First few lines of standard output with the Linux Head -n option

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

### 1.2 - First few bytes of standard output with the Linux Head -c option

```
$ echo "12345678" | head -c 1; echo ""
1
```
