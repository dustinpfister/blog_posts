---
title: Linux tee command and redirecting output to more than one command and file.
date: 2020-10-08 14:44:00
tags: [linux]
layout: post
categories: linux
id: 719
updated: 2020-10-08 14:54:38
version: 1.1
---

The [Linux tee](https://linuxize.com/post/linux-tee-command/) command can be used to redirect the standard output of one command to [one or more files and or commands](https://unix.stackexchange.com/questions/28503/how-can-i-send-stdout-to-multiple-commands). In this post I will be going over several examples of the linux tee command combined with both pupping and redirection of standard out pout two many files at once in one command line.

<!-- more -->

## 1 - Two or more files

The Linux tee command can be used in combination with piping and redirection to create two or more files from the standard output of one command. In addition I can not just redirect to files but also run the results threw some additional commands like grep

```
$ free -m | tee >(grep Mem > mem.txt) >(grep Swap > swap.txt) > free.txt
```

Contents of mem.txt:
```
Mem:            925         364          94          96         466         411
```

Contents of swap.txt:
```
Swap:          1023           7        1016
```

Contents of free.txt:
```
              total        used        free      shared  buff/cache   available
Mem:            925         364          94          96         466         411
Swap:          1023           7        1016
```