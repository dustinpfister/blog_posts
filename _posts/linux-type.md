---
title: Find if a command is there with the type builtin command in Linux
date: 2021-02-11 12:22:00
tags: [linux]
layout: post
categories: linux
id: 801
updated: 2021-02-11 13:39:02
version: 1.2
---

The [linux type](https://linuxize.com/post/linux-type-command/) command is one of many commands that are built into bash itself, this built in command can be used to find the type of a given command name. When working in the command line interface of a terminal there are a number of differet types of commands. Some commands are actaul files in the form of binaries, or scripts that can be run with another command declared with a shebang. Other commands are not files but functions declared in the body of a bash script. There are a number of commands built into bash itself, inclduing as I have mentioned the type command itself. In bash there are also a number of keywords that are reserved. Also there might be a number of commands that are not even any of these, but an aliaes for a command that may have been set in a bashrc file.

So the type built in command can be used as a way to find out what the type is of a command. In the event that it is an actaul files it can be used as a way to find out where that files is. In additin the type command is also usful to find out of a command is taken or not at all which is usful when it comes to coming up with a name for a command.

<!-- more -->

## 1 - Basic example of the type builtin command

```
$ type cd;echo $?
cd is a shell builtin
0
$ type foo;echo $?
bash: type: foo: not found
1
```
