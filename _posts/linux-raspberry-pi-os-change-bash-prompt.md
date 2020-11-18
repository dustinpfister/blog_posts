---
title: Change Bash prompt in Raspberry PI OS and most Linux Systems
date: 2020-11-18 12:53:00
tags: [linux]
layout: post
categories: linux
id: 744
updated: 2020-11-18 13:05:53
version: 1.0
---

One of the many little things that I like to change when working with a clean image of Raspberry PI OS is the bash prompt format. The file of interest is the .bashrc file that should be found in the root folder of the home folder of the current user to which I would like to change the bash prompt for. There are several options when it comes to how to go about coming up with a format when it comes to having the current user, full path of the current working path, and so forth. That is of course one of the reasons why I would like to change it actually.

By default when I start a new lxterminal session I get a bash prompt that will contain the current full path of the current working directoy. Maybe this is called for when it comes to people that are new to Linux and bash, but I have been at this for a while, and long story short I know about the pwd command. So there is at least one little chnage that I would like to make this is to just have the current base name of the current working directoty in the prompt.

In any case this post will be a quick overview of how to go about changing what the prompt is for a bash shell session my chaning the value of the PS1 variable, and also how to make that change stick by ediitng the ~/.bashrc file. In this post I am using Raspberry PI OS, but the process should be simular in just about all Linux systems that use bash.

<!-- more -->
