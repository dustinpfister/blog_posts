---
title: Linux ls command and listing contents of folders
date: 2020-10-14 12:56:00
tags: [linux]
layout: post
categories: linux
id: 723
updated: 2021-07-05 16:02:33
version: 1.8
---

The [Linux ls](https://www.thegeekdiary.com/basic-ls-command-examples-in-linux/) command is one of the first basic commands that a Linux user should be aware of when it comes to working in the command line. There is just knowing how to change the current working path, know what the current working path is, and also listing what is in a given path. So when it comes to listing what is in a given folder that is where the Linux ls command will come into play.

There is much more to the Linux ls command beyond just listing what folders and files are in a given path location. There is listing hidden folders and files, and not doing so, there is listing file access permissions for a file, and there is not doing so. So there is not just typing the Linux ls command in and that is that, there are a few options that one should know about when it comes to Linux ls.

Also there is of course the limits of the Linux ls command, it is not like Linux ls is the only option when it comes to getting lists of files in one or more paths. There are other commands such as the Linux find method, and also using Linux ls with other commands such as cat and grep to do a better job of finding what one might be looking for in a file system. SO lets get stared with the basics, and not so basics when it comes to using the Linux ls command.

<!-- more -->

## 1 - Get started with Linux ls

So for this example I will not just be covering a basic example of the Linux ls command, but a whole bunch of other basic commands that come up all the time when using bash. Here I am starting out by using the mkdir command to create a new folder called foo in the home path of the current user. I then use the cd command to make the current working path this folder that I just made. In this foo folder I am using the [echo command](/2019/08/15/linux-echo/) and something called [redirection](/2020/10/02/linux-redirection/) to create a new file with the text _hello world_ with a file name called _hello.txt_.

I can not use the Linux ls command to list the contents of this folder by just calling the command without any additional arguments if I just want to confirm that I have a single file in this foo folder called hello.txt, and sure enough I do. I can not use a command such as cat to print out the contents of this file that I just made and sure enough it is what I have cerated using the Linux echo command.

```
$ mkdir ~/foo
$ cd ~/foo
$ echo "hello world" > hello.txt
$ ls
hello.txt
$ cat hello.txt
hello world
```

So now we have the basic idea of the Linux ls command worked out. I have a folder with just a single file in it called hello.txt and when I use the Linux ls command I get that file listed in the standard output. However what about hidden files? Also is it not true that there is this thing called file access permissions? What about creating a list of files and then piping that to another command? Well with that all said maybe it is called for to look at least a few more examples of Linux ls.

### 1.1 - Listing folders only

To list folders only with the ls command I will need to use the -d option, however on top of that it seems that I also need to given something for a path.

```
$ mkdir foo
$ ls -d */
$ rm -d foo
```

## 2 - Show Hidden files

So it is possible to have hidden files and folders inn a path, these folder and files names begin with a period. So if I use my echo and redirection trick to create another file but with a starting period in the file name such a file will be hidden. So if I just use the Linux ls command without any options of any kind the file will not show up.

```
$ echo "I hide things" > .hide.txt
$ ls
hello.txt
```

The hidden file that I just made will not show up. That is to be expected sense it is indeed a hidden file after all. STill there should be ways of listing everything that is in a folder. So lets look at some options for listing hidden files and folders.

### 2.1 - The list all option

So there is the list all option for the ls command that will list all contents for a folder, even folders such as dot and double dot that just mean the current folder, and up one folder.

```
$ ls -a
.  ..  hello.txt  .hide.txt
```

So this is a good option to be aware of, and I generally always use it with the ls command to make sure that I am seeing everything there is in a folder. However what if I just want to list hidden files? Well regular expressions come to mind so lets look at least one more example on listing hidden files and folders with the Linux ls command.

### 2.2 - Use regular expressions

Another option for listing hidden files and folders in a path would be to get into using regular expressions. Learning a thing or two about regular expressions is not just a good idea for using the Linux ls command too, as all kinds of commands in Linux such as find and grep just to name a few also can make use of regular expressions.

```
$ ls .[^.]*
.hide.txt
```

## 3 - Long listing format

The long listing format option can be used to get more detailed information about the contents of a folder. This detailed information can be used to get a better idea of what is going on with file access permissions, and other useful data about each file.

```
$ ls -la
total 16
drwxr-xr-x  2 dustin dustin 4096 Oct 14 13:59 .
drwxr-xr-x 20 dustin dustin 4096 Oct 14 13:55 ..
-rw-r--r--  1 dustin dustin   12 Oct 14 13:10 hello.txt
-rw-r--r--  1 dustin dustin   14 Oct 14 13:44 .hide.txt
```

When it comes to making chnages to file access permsions then the [command to use would be chmod](/2020/11/13/linux-chmod/). Use of ls -l, chmod, and sometimes sudo or su are needed to have control over file access permissions.

## 4 - Uisng ls with additional commands

So one of the cool things about learning all these little Linux commands is that they can all be used together by way of piping and redirection. The Linux ls command is a great way to go about getting a list of files, but then there is piping that list of files to another command.

If I use piping to pipe the output of ls to a command like cat then it will just be the list of files as usual. This is because I am piping a list of files to the standard output of cat, rather than feeding the files as arguments to cat. If I pipe this list of files to a command like xargs then use cat with [xargs](/2020/09/26/linux-xargs/) this will result in the content of all the files being concatenated together. This can then be piped once more to yet even another command and so on such as the [wc command](/2020/10/13/linux-wc/) that will give a word count of the text thus far.

```
$ echo 'one' > file1.txt
$ echo 'two' > file2.txt
$ echo 'three' > file3.txt
$ ls file* | cat 
file1.txt
file2.txt
file3.txt
$ ls file* | xargs cat
one
two
three
$ ls file* | xargs cat | wc -w
3
```

## 5 - Conclusion

So the Linux ls command is one of those commands that a Linus user should know about just to gain that basic degree of understanding when it comes to navigating around the command line. There is still a few things to be aware of even when it comes to just a basic command such as this. Hopefully this post has covered at least the basics of the Linux ls command, but also a bit more than just that also.