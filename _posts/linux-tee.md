---
title: Linux tee command and redirecting output to more than one command and file.
date: 2020-10-08 14:44:00
tags: [linux]
layout: post
categories: linux
id: 719
updated: 2020-10-08 16:27:10
version: 1.4
---

The [Linux tee](https://linuxize.com/post/linux-tee-command/) command can be used to redirect the standard output of one command to [one or more files and or commands](https://unix.stackexchange.com/questions/28503/how-can-i-send-stdout-to-multiple-commands). In this post I will be going over several examples of the Linux tee command combined with both pupping and redirection of standard out pout two many files at once in one command line.

<!-- more -->


## 1 - Linux tee basic example

In order to use The Linux tee command first I need some standard output. So for the sake of an example say I just want to create a file called disk.txt from the output of the df command, but I also want to standard output of the df command to continue along to the console on top of that. For that I just need to pipe the output of the df command to the tee command, and then just give one file name to which I want the output of df saved. 

```
$ df -h / | tee disk.txt
```

This will result in the standard output of df saved in the disk.txt file, and on top of that the output will continue on to the console as ushual. So it results in a tee of sorts, there the standatd output of df is going from df to the file disk.txt, and along to the output of the console on top of that.

## 2 - Two or more files with Linux tee

If I want to write to more than one file then I just need to give more file names.

```
$ df -h / | tee disk1.txt disk2.txt disk3.txt
```

However if I want to run the outout from df threw some commands first for each file that can be done, it just means I need to do a little redirection.

## 3 - Two or more files with redirection threw commands first

The Linux tee command can be used in combination with piping and redirection to create two or more files from the standard output of one command. In addition I can not just redirect to files but also run the results threw some additional commands like grep

```
$ free -m | tee >(grep Mem > mem.txt) >(grep Swap > swap.txt) > free.txt
```

Contents of mem.txt:
```
Mem:            925         364          94          96         466         411
```

Contents of swap.txt:
```
Swap:          1023           7        1016
```

Contents of free.txt:
```
              total        used        free      shared  buff/cache   available
Mem:            925         364          94          96         466         411
Swap:          1023           7        1016
```

## 4 - Conclusion

To the Linux tee command is one of several commands that come to mind when it comes to learning a thing or two about piping, and redirection of standard output from a command.  One post of mine that is worth checking out is one the [Linux xargs](/2020/09/26/linux-xargs/) command that has to do with using standard output from a command as argumnets for a command rather than piping it to the standard input of a command. Another related post that is worth cheking out would be my post on [linux redirection](/2020/10/02/linux-redirection/) of standard output.