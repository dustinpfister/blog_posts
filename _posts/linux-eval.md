---
title: Linux eval bash built in command
date: 2021-02-09 14:10:00
tags: [linux]
layout: post
categories: linux
id: 799
updated: 2021-02-09 18:06:54
version: 1.4
---

The [linux eval](https://www.computerhope.com/unix/bash/eval.htm) command is a bash built in command that will take a string as an argument and evaluate that string as if it was entered into the command line. This is a built in command that I find myself using once in a while when working out a bash script there I need to create a string and then run that string value.

<!-- more -->

## 1 - Basic linux eval example

For a basic example of the eval built in just call the eval command, and then pass it a string that contains a command.

```
$ eval "ls *.txt"
```

Another way to do the same thing would be to call bash with the -c option.

```
$ bash -c "ls *.txt"
```

## 2 - Conclusion

Any command in string form can be called with eval.