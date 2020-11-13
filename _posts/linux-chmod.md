---
title: Linux chmod command, file permissions and bash scripts
date: 2020-11-13 11:03:00
tags: [linux]
layout: post
categories: linux
id: 741
updated: 2020-11-13 11:09:41
version: 1.0
---

The Linux chmod command is the tool that is used to set file acess permissions in a Linux system, along with most other POSIX systems for that matter. The chmod command can be used with other commands such as ls -l to find out what the current state is with permissions, and do something to chnage that state.

The chmod command also comes into play when it comes to making a bash script, or any script exacute without having to call the command to do so first. When working out a script for automating work there is placing a shebang at the top of the file to let Linux know what binary needs to be used to run the script. However in order to make use of it the script needs to become exacutabule first, and one way to do that is by using the Linux chmod command.

<!-- more -->
