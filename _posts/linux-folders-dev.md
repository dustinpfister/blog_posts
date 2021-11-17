---
title: The Linux Dev Folder
date: 2021-11-17 14:18:00
tags: [linux]
layout: post
categories: linux
id: 939
updated: 2021-11-17 15:19:40
version: 1.4
---

As of late I have been looking into the various folders off of a root file system when it comes to typical Linux systems. One of these folders is the [Linux \/dev folder](https://tldp.org/LDP/sag/html/dev-fs.html) that contains [device files](https://en.wikipedia.org/wiki/Device_file). You see it would seem that in Linux file systems everything is treated as a file event hardware. What is nice about this is that it make the process of reading data from a device, as well as writing to it very easy. On top of device files that are ways of interacting with things like a USB mouse there are also a number of pseudo devices also. These pseudo devices are great ways to go about just getting some random data, filling something with zeros, or writing some error output from a command to a void rather than the standard error.

<!-- more -->


## 1 - Basics of the \/dev folder in Linux

In this section I will be starting out with just a few basic examples that have to do with working with device files in the \/dev folder in Linux. These examples will involve the use of commands like the [Linux head](/2021/03/10/linux-head/) command which is a command that can be used to read just the first few bytes of a stream from a file, including device files. There is also using commands like the Linux xxd command which is like the [Linux cat](/2020/11/11/linux-cat/) command but it will dump hex rather than raw text, so it is saver to use when spring things out to the standard output.

### 1.1 - Simple read random example with xxd

### 1.2 - Reading the mouse



## 2 - Pseudo devices

### 2.1 - \/dev\/null

### 2.2 - \/dev\/zero

### 2.3 - \/dev\/random


## 3 - Reading \/dev\/input devices like the mouse and keyboard

### 3.1 - Reading from the mouse

### 3.2 - the event x and the by-id folder

## 4 - Conclusion

