---
title: Named parameters in Linux Bash scripts
date: 2020-12-09 13:07:00
tags: [linux]
layout: post
categories: linux
id: 758
updated: 2020-12-09 13:11:27
version: 1.0
---

There are basic positional parameters in [bash scripts](/2020/11/27/bash-scripts/) that might be the first way that one learns how to add paramaters to bash scripts. However there should be a way to add named parameters to a script also, and to do so in a way in which it does not take to much time to do so. Often I want to write a bash script that prefroms some kind of task other then that of parsing options.

Well in bash there is a built in command that might prove to be the first solution that comes to midn when it comes to having named paramarters in a script. In this post I will be going over a few examples of that built in command, and also write about other topics that might come up in the process of doing so.

<!-- more -->
