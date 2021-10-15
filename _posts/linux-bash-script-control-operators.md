---
title: Control Operators in bash
date: 2021-10-15 12:24:00
tags: [linux]
layout: post
categories: linux
id: 933
updated: 2021-10-15 13:41:53
version: 1.1
---

It would seem that I have not got around to writing a post on control operators in bash, so today I will be writing a thing or two about this little aspect of bash scripts, and working with in a Command Line Interface in Linux. Control operators are just one of many little details that one will need to learn a thing or two about in order to become more professional with bash, and operating system automation tasks in Linux systems by way of bash scripts. There are three general things to be aware of when it comes to this, one is to end a command, and start a new one which can be done with a semicolon \(\;\). Another thing to be aware of is to use \(&&\) as a way to run another command after a command, but only if the first one ends with a status code of zero. There is then using the \(\|\|\) control operator if I want to run another command, but only if the command before it failed or for one reason or another exited with a non zero exit code status.

<!-- more -->

## 1 - Basics of Control Operators in Bash

### 1.1 - Semicolon \(\;\)

```
$ test -e ~/foo.txt; echo $?
```

### 1.2 - And \(&&\)

```
$ test -e ~/Documents && ls -l
```

### 1.3 - Or \(\|\|\)

```
test -e ~/foo.txt || test -e ~/.bashrc; echo $?
```

