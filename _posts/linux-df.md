---
title: Linux df command examples
date: 2020-11-23 14:19:00
tags: [linux]
layout: post
categories: linux
id: 747
updated: 2020-11-23 15:13:06
version: 1.4
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

Often I might want to get the size of not just a file sytem as a whole, but how much space a single file or folder takes up. When it comes to this there is a diference between actual apparent size of a file, and how much space a file takes up in a file system. By default the du comand will give a size that is how much space the file takes up in terms of file system blocks. So the results given can be a lot higher then one might exspect for small files. However this is easily addresses with the --apparent-size option.

The du command is the better tool of choice when I want to find out how much space a file or folder takes up as df will just give stats that have to do with the whole file system.

### 2.1 - Getting actual Size of a file

First off I should cover how to get an actual file size with the du command. For this I would want to pass the --apparent-size option. On top of that I might want to set the block size to one byte by way of a --block=1 option. In this section I will be going over a quick example that will help to confirm first hand that this works.

So if I go to my home path and use Linux redirection to create a file that is five bytes I should be able to get a result of five in the command line with du if given the right options.

```
$ cd ~
$ mkdir foo
$ cd foo
$ echo -n "12345" > bar.txt
$ du --apparent-size --block=1 bar.txt
5
```

Seems to work as exspeted, I used Linux redirection to create a file with the string _12345_ so I am sticking to the ascii range. I then know that the file should be five bytes when it comes to the actual file size. When given the proper options the du command gives a result that is in fact just that.

### 2.1 - Getting the size that a file takes up in the file system

If I do not give the propper options to get actual file size then I might get a result that is a lot higher than exspected.

```
$ du --block=1 bar.txt
4096    bar.txt
```

This is not wrong actually as this is the amount of space that the file is taking up in terms of blocks on the actual file system. In widows there is Size, and then Size on Disk that you might be familior with, this is more or less the same think in Linux or any file system for that matter. There is the actual size of the file, and then there is how much space a file takes up when you take into account how many blocks it is taking up, and any additional file system meta data for the file. 

### 2.2 - Get the size of a folder

The Linux du comand can also be used to add up how much space a folder takes up also.

```
$ du --apparent-size --block=1M ./Downloads
182     ./Downloads/foo
1340    ./Downloads
```