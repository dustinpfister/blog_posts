---
title: Linux free command
date: 2021-03-08 12:20:00
tags: [linux,js]
layout: post
categories: linux
id: 818
updated: 2021-03-08 12:28:39
version: 1.1
---

The [Linux free](https://linuxize.com/post/free-command-in-linux/) command is how to go about getting an idea as to how much memory is being used by the system at a given moment in the command line and when creating bash scripts. WHen it comes to getting an idea of how much memeory is beging used there is not just knowing how much there is installed, and how much is being used. There is knowing how much physical memory there is, knowing how much swap space there is on the hard drive in terms of a file or partation. There is then also know what the diference is between free, and available when it comes to using the Linux free command.

<!-- more -->


## 1 - Basic Linux free examples

```js
free
#              total        used        free      shared  buff/cache   available
#Mem:         946392      374608       54864       45020      516920      474404
#Swap:       1048572       90880      957692
 
free -h
#              total        used        free      shared  buff/cache   available
#Mem:          924Mi       377Mi        47Mi        43Mi       499Mi       451Mi
#Swap:         1.0Gi        90Mi       933Mi
```