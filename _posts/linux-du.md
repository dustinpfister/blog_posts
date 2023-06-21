---
title: File Space usage with Linux du command
date: 2023-06-21 10:47:00
tags: [linux]
layout: post
categories: linux
id: 1053
updated: 2023-06-21 12:32:43
version: 1.3
---

The [Linux du](https://man7.org/linux/man-pages/man1/du.1.html) command can be used to get an idea of what is going on with file space usage from the command line. This command is then similar to that of the [df command](/2020/11/23/linux-df) only it world seem that it is more geared for getting a breakdown on how much one or more files use rather than what the state of a whole file system is. With the use of the proper options it might be possible to get similar results in some cases, but not with others. In any case in this post I will be writing more so about what the Linux du command is about rather than df. However I am sure that there will be a bot of overlap here and there.

<!-- more -->


## Human readable and depth options 

Some good options to start out with when it comes to using this command would be the human readable option \( -h \), and the depth option \( -d \). The reason why I say that is because when first starting out with this command one thing that will happen when using this without nay options of nay kind is that it will just start recursively outputting the file sizes of all items from the current working folder. Unless this is what you actually want, more often than not you will want to at least use the -d option to limit that, if not give a file name actually.

Also it is nice to use the human readable option to get outputs as K, M, G and so forth. These are the base 2 values which means that 1K should be 1024 bytes, and so forth rather than the base 10 system often used by hard drive vendors.

## Check the size of all items in home folder without going recursive

If I just want to get a quick list of all the top level items in my home folder I can do so by setting a value of 1 for the df command. This might take a moment but if i have a fair about of items in the home folder of the current user, but it will give sizes of everything there without looping over every single item.
```
$ cd ~
$ du -h -d 1
```

## Conclusion

There is taking some more time at some point to look into the du and df commands when and if I get to it. For the most part it seems like they both do the same thing in some cases actually, however there are [still very much differences as outlined in this post](https://www.cyberciti.biz/tips/freebsd-why-command-df-and-du-reports-different-output.html). So one thing to look into more would be the lsof command that has to do with finding out the current state of open files.

