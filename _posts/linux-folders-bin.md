---
title: The Linux Bin Folder
date: 2021-11-15 12:23:00
tags: [linux]
layout: post
categories: linux
id: 938
updated: 2021-11-15 13:49:21
version: 1.17
---

I think that in order to learn more about how to use a Linux system one thing that should happen is to become more familiar with the various folders that branch off from root in a Linux system, such as the [\/bin folder](https://ostoday.org/linux/what-is-bin-in-linux.html) which is what I will be writing about in todays post. Do not get me wrong I think there is a whole lot more that needs to happen beyond just that, such as learning at least a thing or two about bash, and maybe [writing a bash script or two](/2020/11/27/linux-bash-script/). However the thing about that is the bash is one of many commands that are in, you guessed it, the bin folder. 

The bin folder is one of several typical folders that contain binaries, or programs that are used from the bash command line, the one thing that makes the bin folder stand out from the others is that it would seem that many of the binaries in this folder seem to be very important with respect to starting and using Linux itself. Without the bin folder there is no way that there would be a function system, however many binaries in other folders such a the \/usr\/sbin\/ folder many not be so critical the the functionally of Linux itself.

<!-- more -->

## 1 - Basics of the \/bin folder in Linux

In this section I will just be going over a few key points about the \/bin folder in Linux. This will mostly be just about a few commands that are located in the bin folder that are helper for figuring out of a command is located there or not. By taking a moment to find out what commands are in the bin folder compared to other folders it should start to get clear as to what the bin folder is for compared to other locations. Speaking of other locations I think I should also take a moment to write about a few things when it comes to certain [environment variables](/2020/10/29/linux-environment-variables/), mainly the \$PATH variable.

### 1.1 - Using the type bash built in command to find out if a command is a \/bin folder command or not

There are a number of commands that are built into bash actually, many of which are very useful and the [type command](/2021/02/11/linux-type/) is without question one of them. For example if I use the type command and pass the bash command as the first and only positional argument I will get a file path location to the bash command. As such the bash command is indeed in the \.bin folder, and ash such bash is one great example of what the \/bin folder is all about. The bash command is pretty important in order to do much of anything at all with Linux, even if you do not use it by way of the command line it is safe to say that you would not have a functioning system without it.

```
$ type -a bash
bash is /usr/bin/bash
bash is /bin/bash
```

### 1.2 - The \$PATH environment variable

For this example I am using the [Linux echo bash built in command](/2019/08/15/linux-echo/) to print the value of the \$PATH environment variable. This is a collection of paths to which bash will look for binaries in, and of course the \/bin folder is one of the paths in this \$PATH environment variable.

```
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games
```

### 1.3 - Path and the Linux cut command

This example might prove to be a little off topic but maybe not actually if I frame it the right way. Here I am once again using the ehco command to print the contents of the \$PATH environment variable to the standard output. However now I am [piping the string](/2020/10/09/linux-pipe/) to the [Linux cut](/2020/11/19/linux-cut/) command and using the -d option of cut to define the \: character as a delimiter, at which point I can just print a certain field in this string.

```
#!/bin/bash
echo $PATH | cut -d ':' -f 6
#/bin
type -a cut
#cut is /usr/bin/cut
#cut is /bin/cut
```

So then is the cut command yet another command that is in the bin folder? Once again I use the type command with the -a option to find all the locations in which this binary is. It would seem that the cut command is another command that shows up in the \/bin folder but also the \/usr/bin/folder also. So it would seem that the cut command is another command that is considered fairly important then, or at least I am assuming that as it is located in similar locations to that of bash.


## 2 - Conclusion

There is a whole lot more ground to cover when it comes to the various commands that can be found in the bin folder. However for the most part I think I have at least touched base on what the bin folder is all about for now, and that is all I really wanted to do when writing this post. I have all ready wrote a post on the [home folder in Linux systems](/2021/11/12/linux-folders-home/), and as time goes by I am planing to write at least a few more posts on the various folders in Linux.

However there is not just looking into the various folders, there is also taking the time to start to look into all the various commands in these various folders. There is also looking into what locations are in fact actually binaries and what locations are just symbolic links to binaries in other folders actually.



