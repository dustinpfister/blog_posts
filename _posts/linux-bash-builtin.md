---
title: Linux Bash builtin command(s)
date: 2021-02-12 13:58:00
tags: [linux]
layout: post
categories: linux
id: 802
updated: 2021-02-12 14:26:55
version: 1.1
---

In Linux bash defines a number of built in commands, there is also the [builtin command](https://www.geeksforgeeks.org/builtin-command-in-linux-with-examples/) itself which is also a built in command of bash. This builtin command is usful for createing functions in bash scripts that have the same name as a built in command. However there is also the question of what the built in commands are and how to go about confirming if a command is built in or not. So in this post I will be going over some basic examples of the builtin command, but I will also be doing a general overview of all the built in commands in bash.

<!-- more -->

## 1 - The bash builtin command and bash built in command basics

In this section I will be going over a simple example of the builtin bash built in command, but I will also be touching base on the basics of built i commands in general. The bash builtin command is a way to call a bash built in command in the body of a function that has the same name as the built in command. However this post is not just on this command, but built in commands in general. So in this section I will be touching base on another bash built in command called type that can be used to find out if a command is a built in command or not.

### 1.1 - Know if you are dealing with a built in command

```
$ type -t cd
builtin
$ type -t wc
file
```

### 1.2 - basic builtin command example

```
#!/bin/bash
# exit function that calls exit builtin
exit(){
   code=${1:-1}
   echo "exiting with code $code"
   builtin exit ${code}
}
exit
```

```
$ chmod 755 exitfunc.sh
$ ./exitfunc.sh
exiting with code 1
```