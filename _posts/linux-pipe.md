---
title: Linux pipe redirection of standard output
date: 2020-10-09 12:27:00
tags: [linux]
layout: post
categories: linux
id: 720
updated: 2023-07-03 09:56:52
version: 1.10
---

A [Linux pipe](http://www.linfo.org/pipe.html) is a form of redirection of standard output of one command into the standard input of another command. This process can then be used in a kind of chain actually, which can result in a kind of pipe where once command creates some kind of raw form of data that then gets passed into another the preforms some kind of first action on this raw data, and then so one with the next command and so forth as many times as needed. So then piping allows for breaking something down into a bunch of steps where one program does just one thing and then the output of that command is then passed on to another command that accepts that result as input to which it then uses to preform yet another result.

There is also [Linux redirection](/2020/10/02/linux-redirection/) that is similar to a Linux pipe, but works a little differently. With Linux pipes two commands can run in parallel with each other, and data is transferred in a per buffer basis. With Linux redirection one command must complete, before the next can start.


<!-- more -->

## 1 - Basic Linux pipe example using ps and grep

With a Linux pipe I can pipe the output of one command to another, and then from the output of that to yet another command. For example I can use the ps command to get a list of all processes running at the moment, and then I can pipe that list to grep where I can filter everything but instances of kworker. I can then pipe the output yet again, say I just want kworker events listed, for this I can pipe once more to grep yet again to the that list.

```
$ ps -e | grep kworker | grep events
 5311 ?        00:00:00 kworker/u8:0-events_unbound
 5398 ?        00:00:00 kworker/1:1-events
 5407 ?        00:00:00 kworker/3:2-events
 5596 ?        00:00:00 kworker/2:0-events
 5635 ?        00:00:00 kworker/0:1-events
 5651 ?        00:00:00 kworker/2:2-events
 5654 ?        00:00:00 kworker/1:0-events
 5663 ?        00:00:00 kworker/2:1-events
 5696 ?        00:00:00 kworker/0:0-events
```

## 2 - Using cat to pipe a list of file names to xargs and then cat again

There is piping the output of one command to the standard input of another command, but what if I want to pipe the output of a command not to the standard input of another, but to use that output as arguments for another command. This subject deserves a post of its own, and I did just that when writing my post on a [Linux command know as xargs](/2020/09/26/linux-xargs/). I will not be getting into the use of this command in detail then as I have done that in that post, but I should at least mention a basic example of it here in my post on piping in general.

So say I have a text file called file\_list.txt that is a list of file names like this that are also in the same working directory

```
file1.txt file2.txt
```

file1.txt just contains the text _foo_

```
foo
```

file2.txt just contains the text _bar_ plus a like break at the end

```
bar
 
```

I can then use the cat command to read the file_list.txt file and then pipe that text to the Linux xargs command, with that the file names are then used as arguments for the cat command again. As a result the text of file1.txt and file2.txt are concatenated into a single stream in the order in which the files are in the file\_list.txt file. 

```
$ cat file_list.txt | xargs cat | tee >(cat >build.txt)
foobar
```

The result of the xargs cat command can then be piped yet again to the Linux tee command where I can then use redirection to write the ending result to a single output file as well as continue things on to the standard output as usual.

So the result off all of this is the text of file1.txt and file2.txt combined together as one and spit out to the console as well as the build.txt file. This might just be a silly string value, but in a real example not so different from this could be a build of many source code files into a single package file. I could pipe things threw some additional commands that might compact the source code into a minified rather than development form.

## 3 - Conclusion

So Linux piping is one of several things about the command line that come into play when learning to become more professional when it comes to using Linux. There is not just working with Linux command alone when it comes to all of this of course, Linux commands can be combined with a little light programming now and then in an environment such as JavaScript, or a more appropriate form when it comes to this sort of thing.