---
title: File Space usage with Linux du command
date: 2023-06-21 10:47:00
tags: [linux]
layout: post
categories: linux
id: 1053
updated: 2023-06-21 12:19:58
version: 1.1
---

The [Linux du](https://man7.org/linux/man-pages/man1/du.1.html) command can be used to get an idea of what is going on with file space usage from the command line. This command is then similar to that of the [df command](/2020/11/23/linux-df) only it world seem that it is more geared for getting a breakdown on how much one or more files use rather than what the state of a whole file system is. With the use of the proper options it might be possible to get similar results in some cases, but not with others. In any case in this post I will be writing more so about what the Linux du command is about rather than df. However I am sure that there will be a bot of overlap here and there.

<!-- more -->


## Human readable and depth options 

Some good options to start out with when it comes to using this command would be the human readable option \( -h \), and the depth option \( -d \). The reason why I say that is because when first starting out with this command one thing that will happen when using this without nay options of nay kind is that it will just start recursively outputting the file sizes of all items from the current working folder. Unless this is what you actually want, more often than not you will want to at least use the -d option to limit that, if not give a file name actually.

## Check the size of all items in home folder without going recursive

If I just want to get a quick list of all the top level ietms in my home folder I can do so by setting a value of 1 for the df command.
```
$ cd ~
$ du -h -d 1
```

## Conclusion

There is taking some more time at some point to look into the du and df commands when and if I get to it. For the most part it seems like they both do the same thing in some cases actually, however there are [still very much differences](https://www.cyberciti.biz/tips/freebsd-why-command-df-and-du-reports-different-output.html).

