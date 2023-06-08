---
title: Linux dd command and files
date: 2023-06-08 10:32:00
tags: [linux]
layout: post
categories: linux
id: 1049
updated: 2023-06-08 12:04:00
version: 1.4
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

## 2 - Using dd to benchmark file io, and why not to.

When I was looking into what there is to work with when it comes to file system io benchmark software I saw a lot of blog posts that where outlining the use of dd as a way to do so. As I have covered in the first section of this post there is a output text in the standard error that shows the speed at which the dd operation was preformed. Although using this output as a way to bench file io might be okay with certain file sizes, and with the expectation of just having a sequential file io test, it is not at all a replacement for a decent benchmark program. Sequential read and write speed might be importantly, but depending on how a volume is to be used, often random read and write is of greater concern. For this reason I am not going to go on with examples for use of dd this way in this section. However I will write a thing or two about a program that I like to use thus far for file io bench making called [sysbench](/2023/06/06/linux-sysbench).

What is great about sysbench is that I can similar results with what I would get if I where to use dd when it comes to a sequential test. However I can also to a random test as well which is far more impotent when it comes to using a volume for a whole bunch of small files that I need to read and wrote to fast, such as a volume that contains an OS Image for example.


## Conclusion

There is a great deal more that can be done with the dd command of course beyond what I wrote about in this post. However a lot of what I am reading on other sources are examples that I can not help but thing might be better preformed with a command, tool, or even specialized operating system rather than dd. 

In this post I wrote a bit about using dd for file system io bechmaking, and why it might be better to use a specialized tool such as sysbench. However it does not stop there when it comes to things that can be done with dd, but might be best done with something else. For example I have found posts in which [dd is being used to create and restore whole partitions of hard drives](https://linuxopsys.com/topics/linux-dd-command-with-examples). Sure dd might work just fine for that but why not use clonzilla, or an OS recommended disk utility tool for this sort of thing? Lots of posts going on about how dd can be used as a way to not just delete files, but also blank the area where the file was with zeros, or various random patterns over and over again. Sure again dd can be used to do this but there is also [DBAN](https://en.wikipedia.org/wiki/Darik's_Boot_and_Nuke) and a [whole lot of other similar tools](https://en.wikipedia.org/wiki/List_of_data-erasing_software) that might be better for that sort of thing.

I am sure that dd still has its use case examples that might come in handy though. Also maybe some of the things that I mentioned might still be good ideas if I am in a situation in which I have no alternative. It is just that I think that I am going to be a little more reserved about expanding this post when it comes to any future edits that may or may not come to pass.



