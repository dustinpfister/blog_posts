---
title: Piping with nodejs thanks to the process stdin global
date: 2019-07-09 11:47:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 502
updated: 2019-07-09 11:53:43
version: 1.0
---

So when it comes to doing something in the command line in a posix system, or windows system there is the subject of piping in the command line. That is taking the output of one command line tool and piping it to another tool. For example taking the output of a command that spits out a list of information about the computer the operating system is running on and then piping it to a terminal based txt editor that then saves it as a file in the current working directory.

As of late I wanted to write a nodejs script that can accept input from the standard input, but oddly enough that is something I have not done before, so I had to look into it. In nodejs there is the process global that contains many useful properties, some of which can be used pipe in data from the standard input, as well as out to the standard error and standard output as well.

<!-- more -->
