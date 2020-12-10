---
title: Positional Parameters in Linux Bash scripts
date: 2020-12-10 12:25:00
tags: [linux]
layout: post
categories: linux
id: 759
updated: 2020-12-10 14:33:00
version: 1.2
---

This post on [bash scripts](/2020/11/27/linux-bash-scripts/) will quikly cover the topic of positional parameters.

So In this post I will be going over a few quick examples of Linux bash scripts that make use of one or more arguments in the form of positional parameters that are given at the command line, or wherever the script is called.

<!-- more -->


## 2 - Positional argumnets and special arguments

Although this is a post just on positional arguments alone I should take a moment to at least cover a few basic examples on special arguments in bash. There are a few special parameters in bash that can be used to get things like the name of the current script that is beging called, and so forth. However when it comes to positional parameters there are two special parameters that comes to mind that might be the most important. One of which helps with getting a count of how many argumnets where passed when the script is called, and the other is how to get a collection of all the argumnets that where given.

So in this section I will be going over a few quick examples of special parameartes in bash.

### 2.1 - Special arguments for geting all positionals and count of positionals

```
$ ./basic.sh foo bar baz
number of arguments: 3
arguments: foo bar baz
```