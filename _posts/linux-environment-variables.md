---
title: Linux Environment Variables
date: 2020-10-29 13:53:00
tags: [linux]
layout: post
categories: linux
id: 732
updated: 2020-10-29 14:10:01
version: 1.1
---

When taking the time to get a little more into how to work with Linux, and Bash, the topic of [enviornement variabules](https://en.wikipedia.org/wiki/Environment_variable) will come up from time to time. These are bash values that can effect how programes work in Linux. For example there is a $HOME enviornement variabule that is the home path for the current user, many programes will use this value to know where to place a hidden config file for user settings then. There are many other such enviorment variabules, and there are also ways of creating ones own such variables when doing so is called for, often when working out some kind of bash script.

There is knowing how to at [least list, and set enviornement variabules](https://linuxize.com/post/how-to-set-and-list-environment-variables-in-linux/) for starters. However there is also doing a few simple bash comands, and maybe event go so far as to make a programe or two to really know why they are usfule.

In this post I will be starting out with the basics when it comes to enviorment varaibles in Linux. This is just listing what the current variables are, and setting and eleteing such variables.

<!-- more -->

## 1 - List current Linux Enviorement Variables

First things first, how does one know what the current state of enviorment varaibles are on a system? One such command for getting such a list would be the [linux printenv](https://man7.org/linux/man-pages/man1/printenv.1.html) command.

```
$ printenv
```

This will spit out all of the current enviorment varibels that there are.