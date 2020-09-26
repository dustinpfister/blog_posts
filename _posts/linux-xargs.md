---
title: Cretaing arguments from standard input with the Linux xargs command
date: 2020-09-26 18:44:00
tags: [linux]
layout: post
categories: linux
id: 712
updated: 2020-09-26 19:59:53
version: 1.1
---

So you have some standard output from one command, and you want to use that standard output to create values for arguments to another command rather than pipe it to the standard input of that command. One command that can be used to do so is the [Linux xargs](https://en.wikipedia.org/wiki/Xargs) command.

<!-- more -->

## 1 - Just pipe something into a command

So when it comes to just piping the standard input into a command I can just call call xargs followed by the command. I can then write some additional options for the command, and then just stop when it comes to where I want the standard input to go.

```
$ echo B | xargs echo A C
A C B
```

## 2 - Have a string for the standard input when writing the command

```
$ echo B | xargs -I stdin echo A stdin C
A B C
```

## 3 - two or more arguments

So what if you [have two or more arguments](https://stackoverflow.com/questions/3770432/xargs-with-multiple-arguments) that you want to pass for each command?

```
$ echo -e 'f *.js\nd lib' | xargs -l bash -c 'find . -maxdepth 3 -type $0 -name $1'
```