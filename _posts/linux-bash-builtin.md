---
title: Linux Bash builtin command(s)
date: 2021-02-12 13:58:00
tags: [linux]
layout: post
categories: linux
id: 802
updated: 2021-02-12 14:36:13
version: 1.3
---

In Linux bash defines a number of built in commands, there is also the [builtin command](https://www.geeksforgeeks.org/builtin-command-in-linux-with-examples/) itself which is also a built in command of bash. This builtin command is usful for createing functions in bash scripts that have the same name as a built in command. However there is also the question of what the built in commands are and how to go about confirming if a command is built in or not. So in this post I will be going over some basic examples of the builtin command, but I will also be doing a general overview of all the built in commands in bash.

<!-- more -->

## 1 - The bash builtin command and bash built in command basics

In this section I will be going over a simple example of the builtin bash built in command, but I will also be touching base on the basics of built i commands in general. The bash builtin command is a way to call a bash built in command in the body of a function that has the same name as the built in command. However this post is not just on this command, but built in commands in general. So in this section I will be touching base on another bash built in command called type that can be used to find out if a command is a built in command or not.

### 1.1 - Know if you are dealing with a built in command

To know if a given command is a built in command or not it might be best to look over the bash man page of the version of bash that is being used. However in any case there should be a way to confirm first hand if a command name is a bash built in, or a command that is an actual file in one of the folders where commands are such as the bin folder. For this there is another bash built in called type that will tell be if a command is a built in command, or a file command.

So if I use the type command and pass the -t option for it that will cause the type command to give me a string value that is the type of the given command name. An example of a bash built in command is the cd or change directoy command, so if I give this to type I get the exspected result which is builtin.

```
$ type -t cd
builtin
```

If I give a command that is not a bash built in command such as the mkdir command that is a file command that is in the bin folder then I get the string value file.

```
$ type -t mkdir
file
```

There is a lot more to say about the type command, but I will not be getting into detail about it here as I have [wrote a post on type](/2021/02/11/linux-type/) all ready. However I just wanted to cover the basic idea of what a built in command is, and how to find out if a given command is indeed a built in command or not.


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