---
title: Linux df command examples
date: 2020-11-23 14:19:00
tags: [linux]
layout: post
categories: linux
id: 747
updated: 2020-11-23 14:58:44
version: 1.3
---

The [Linux df](http://linuxcommand.org/lc3_man_pages/df1.html) command is what I generaly use to find out how much space is avialbule in a file system in the bash command line. By default with no argumnets it will give the amount of space availabule on all mounted file systems. It can also be given a mount point, or a path of a file, however it will still only give data for the file system as a whole. So then this rasis some questions when it comes to knwoing how much space something takes up also when it comes to files and folders as the Linux df command alone is not enough.

So this will be a qyuck post not just on the Linux df command, but also some related topics when it comes to knwoing not just how much space is avaiable on a file system, but also to knwo how much space certian files and folders take up from a bash command line enviorment.

<!-- more -->

## 1 - Just Linux df by itself

Calling the Linux df command by itself will give a table of how much space is Used and Available on a per file system basis. In most Linux systems there is more than one file system at play, for Example in Raspberry PI OS there is a large partition for the root mount point, but then there is a sepearte file system for the boot folder.

```
$ df
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/root       30466332 8008448  21169436  28% /
devtmpfs          440232       0    440232   0% /dev
tmpfs             473512   53552    419960  12% /dev/shm
tmpfs             473512    6432    467080   2% /run
tmpfs               5120       4      5116   1% /run/lock
tmpfs             473512       0    473512   0% /sys/fs/cgroup
/dev/mmcblk0p1    258095   55170    202925  22% /boot
tmpfs              94700       8     94692   1% /run/user/1000
```

The size should be 1K-blocks by default, but there are of course options to chnage that. There are some additional options and tricks with other commands, but for the most part this is all the Linux df command is good for.

## 2 - Linux du command for geting sizes of files and folders


### 2.1 - Getting actual Size of a file

```
$ cd ~
$ mkdir foo
$ cd foo
$ echo -n "12345" > bar.txt
$ du --apparent-size --block=1 bar.txt
5
```

### 2.1 - Getting the size that a file takes up in the file system

```
$ du --block=1 bar.txt
4096    bar.txt
```

### 2.2 - Get the size of a folder

```
$ du --apparent-size --block=1M ./Downloads
182	./Downloads/foo
1340	./Downloads
```