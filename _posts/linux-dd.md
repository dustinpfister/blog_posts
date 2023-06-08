---
title: Linux dd command and files
date: 2023-06-08 10:32:00
tags: [linux]
layout: post
categories: linux
id: 1049
updated: 2023-06-08 11:08:28
version: 1.2
---

The man page for the Linux dd command just simply says that it is used to convert and copy files. In a nutshell that is more or less all that it does, but it seems that it comes up all the time when working out something in the command prompt. Also it is a command that I have found that I want to use with a degree of caution. The reason why is because if I get careless with it I can end up doing weird things to the file system. Still there is how to go about getting started with the dd command in a safe way by just learning how to use it in a safe way. There is just reading the man pages, various blogs, and other sources to know what to do, and what to avoid. As for this post I just wanted to have a place to park some notes on this command while I look into this one more. 

<!-- more -->


## 1 - Start out with just the standard in and standard out.

The main concern with the dd command might be with making sure that I am not doing anything weird, or dangerous when it comes to the output file option. So one way to make sure that I will not do anything that will hurt my file system would then be to just not use the out file command at all and just start out with the default in place of that which would be to just spit things out to the standard output. In other words what ends up in the console output when I am using it there.

### 1.1 - Using Ehco, and piping to get started with dd

So by default if I give no out file option dd will spit out results to the standard output. Also by default if I give no in file, then it will read data from the standard input. So I can start out with the dd command by using a command like the [echo command](/2019/08/15/linux-echo/) to echo a little bit of text that I directly type into the command line, and then [pipe that to the standard input](/2020/10/09/linux-pipe/) of dd, which in turn will spit that out to the standard output of the console as I did not give any options at all

```
$ echo -n "foobar" | dd
foobar0+1 records in
0+1 records out
6 bytes copied, 0.000450683 s, 13.3 kB/s
```

Notice that the dd command also piped out not just the output, but a bunch of status text along with it. The status text tells me how many types where copied which in this case is 6. The reason why is because I used the echo command with the -n option that suppresses the default end of line byte in the output so it is just the text foobar. The status text also tells me how long this took, and also the speed in terms of data per second. For this reason the dd command is often used as a way to benchmark file io, there are better tools for that sort of thing though. More on that latter, but for now lets look at a few more basic commands of dd where I am just spit things out to standard output.

### 1.2 - The bs, count, and status options

The bs option can be used to set the number of bytes to read, and write at a time. There is also the count option that can be used to limit the number of blocks of the given bs option size to read and write. So with the same example as above I can read just the first three bytes of the string foobar to get foo.

Also there is the matter of how to go about cleaning up the output here. I could use [redirection](/2020/10/02/linux-redirection/) as a way to suppress the status text that is being printed out to the standard error. However there is also the status option of the dd command that can be set to the value of none.

```
$ echo -n "foobar" | dd bs=3 count=1 status=none
foo
```


