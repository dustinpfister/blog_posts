---
title: Linux free command
date: 2021-03-08 12:20:00
tags: [linux,js]
layout: post
categories: linux
id: 818
updated: 2021-03-08 13:19:10
version: 1.7
---

The [Linux free](https://linuxize.com/post/free-command-in-linux/) command is how to go about getting an idea as to how much memory is being used by the system at a given moment in the command line and when creating bash scripts. WHen it comes to getting an idea of how much memory is being used there is not just knowing how much there is installed, and how much is being used. There is knowing how much physical memory there is, knowing how much swap space there is on the hard drive in terms of a file or partition. There is then also know what the difference is between free, and available when it comes to using the Linux free command.

When it comes to knowing how much free space I have with something the Linux free command is just a simple tool that helps me keep an eye on how much physical ram and spawn space I have. However it will not help me when it comes to creating or resizing a spawn file or spawn partition. It will also not help me to find out how much free space I have on any hard drives or other devices in which I am storing files. When it comes to checking a file system to know how much free space i have there I will want to use the df command. Also the Linux free command will not give me a break down when it comes to how much memory a certain process is using, the free command will just give me over all totals.

So in this post I will be going over a few quick examples of the Linux Free command, but I will also be touching base on a few other topics when it comes to not just checking how much free space I have in general with things, and also some other related topics when it comes to taking a look at processes and so forth.

<!-- more -->


## 1 - Basic Linux free examples

When it comes to using the free command one way would be to just enter the command free into the bash command prompt. The result of doing so will be a bunch of columns for total memory, used, free, shared, buffers, and available. The free amount of memory might be a bit misleading, it is not really the amount of memory that is free. A better term for it might be unused memory, as long as there is a fair amount of memory in the available column then there is still a fair amount of memory for applications.

```js
$ free
#              total        used        free      shared  buff/cache   available
#Mem:         946392      374608       54864       45020      516920      474404
#Swap:       1048572       90880      957692
```

By default the numbers given are in [kibibytes AKA 1024 byte units](https://www.logicmonitor.com/blog/what-the-hell-is-a-kibibyte), which is a good standard to use considering that physical memory is always in base2, rather than base 10 units. However there are a number of formating options for the free command to format the output in other units. One such option is the -h option that will format things automatically in terms of bytes and other base 2 units.

``` 
$ free -h
#              total        used        free      shared  buff/cache   available
#Mem:          924Mi       377Mi        47Mi        43Mi       499Mi       451Mi
#Swap:         1.0Gi        90Mi       933Mi
```

## 2 - Conclusion

So the Linux free command is used to find out the current state of affairs is when it comes to physical memory and virtual memory, aka swap space. However this command is just one way to go about getting an idea of what is going on, the free command can not help when it comes to taking some kind of action when it comes to process and service managment. It is also not the only thing that comes to mind when it comes to just checking the status of something, even when it comes to just memory, there is also the top command that might be a better option for tracking what is going on with ram. The top command will show what is going one with processes and display a percentage when it comes to ram use, it will also kep running rather than just pull a status at the time that it is called.



