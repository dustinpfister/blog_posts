---
title: The Linux Cut command for cutting a string in bash
date: 2020-11-19 12:19:00
tags: [linux]
layout: post
categories: linux
id: 745
updated: 2020-11-19 14:07:17
version: 1.9
---

The [Linux cut](https://linuxize.com/post/linux-cut-command/) command is the standard tool for cutting a string into one or more sub strings. The first and for most way of using cut as I see it at least is by feild and delimiter, that is using a delimiter like a line break or a space as a way to split a string into feilds, and then using a feild index to get the sub string value that I want.

There are a few other options with The Linux cut command, but I will just be sticking to a few basic examples that actaully come into play when writing bash scripts. So in this post I will not be going over every little detail about the Linux cut command, when it comes to that there is always the [man page on Linux cut](https://man7.org/linux/man-pages/man1/cut.1.html), as well as many other blog posts on Linux cut that go over all the features and options. Here in this post I will just be going over the options that I am using thus far, and give some actualy use case examples for the Linux Cut command.

<!-- more -->

## 1 - Cutting by delimiter and feild

I am going to start off with Linux cut examples that have to do with using the delimiter option \( -d \) to set a char that is to be used to break a string down into feilds. Once a delimiter is given the the feild option \( -f \) can be used to set what the feild index is that I want.

### 1.1 - Basic example of using delimiter and feild options with Linux Cut

For a basic example say I have a bunch of values seperated by a commoa as a string. With this kind of string I can use a comma as a delimiter to break the string down into feilds. The feild option can then be used as a way to get the feild that I want by way of a one relative index value. In other words the index values start with one rather than zero

```
$ echo "[1a,2b,3c,4d,5e,6f,7g,8h,9i]" | cut -d , -f 3
3c
```

### 1.2 - More than one index can be given

When using the feild option it is possible to give more than one index value. Just pass the index values from left to right sepeaterd by commas, the result will be the feilds in the order of the given feild index values.

```
$ echo "[1a,2b,3c,4d,5e,6f,7g,8h,9i]" | cut -d , -f 8,2,6
2b,6f,8h
```

### 1.3 - Be sure to use quotes when needed

quotes may have to be used when delaing with white space as a delimiter

```
$ echo "this is some text to cut for example" | cut -d " " -f 6
cut
```

## 2 - Change the output delimiter

In some cases I might want to change the output delimiter. To do so I just need to use the --output-delimiter option. If I want for there to be no delimiter at all between feilds in the output then I just need to give an empty string as the output delimiter. So when it comes to one of my simple examples from above I can use the -d option to set a delimiter for the source, and the -f option to select the feilds that I want, and then the --output-delimiter option to change the output delimiter to something other than a comma.

```
$ echo "[1a,2b,3c,4d,5e,6f,7g,8h,9i]" | cut -d , -f 8,2,6 --output-delimiter=''
2b6f8h
```

## 3 - Get the basename of a file with cut by itself, and with the basename command

One thing that I have been using the Linuc cut command for thus far is to get the base name of a file name. 

```
$ echo 'filename.txt.b64' | cut -d . -f 1
filename
```

This works if I just have the file name first of course, becuase if it is a path that has dots in any of the folders before hand that will throw a wrentch in the works. To help with that it, and using the Linuc cut command to do so, might require creating a bash script like this:

```
#!/bin/bash
filepath="/home/pi/foo.bar/.fonts/filename.txt.b64"
fcount=$( echo -n $filepath | grep -o "\/" | wc -w )
filename=$( echo -n $filepath | cut -d '/' -f $(( $fcount + 1)) )
basename=$( echo -n $filename | cut -d '.' -f 1 )
echo $basename
```

```
$ bash filename_last.sh
filename
```

I have not tested this with every little possible thing when it comes to path names, but so far it seems to work. However I would say that this is more or less making something very simple far more complex than it needs to be if the Linux basename command is there to work with in the system.

```
$ basename "/home/pi/foo.bar/.fonts/filename.txt.b64" | cut -d . -f 1
filename
```

It woukld make sense for there to be a basename command becuase this is seomthing that I find myself running into often.

## 3 - Conclusion

The Linux cut command seems to come up now and then when writng bash scripts. I often want to cut the extension off of a file name to get the base of the filename to which I then create a new file with the same base name but a new extension. The cut command also will come into play when I want to do anything else that might be needed when working with string values in a Linux and bash enviorment.
