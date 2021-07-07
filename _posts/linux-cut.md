---
title: The Linux Cut command for cutting a string in bash
date: 2020-11-19 12:19:00
tags: [linux]
layout: post
categories: linux
id: 745
updated: 2021-07-07 12:57:59
version: 1.16
---

The [Linux cut](https://linuxize.com/post/linux-cut-command/) command is the standard tool for cutting a string into one or more sub strings. The first and for most way of using cut as I see it at least is by field and delimiter, that is using a delimiter like a line break or a space as a way to split a string into fields, and then using a field index to get the sub string value that I want.

There are a few other options with The Linux cut command, but I will just be sticking to a few basic examples that actually come into play when writing bash scripts. So in this post I will not be going over every little detail about the Linux cut command, when it comes to that there is always the [man page on Linux cut](https://man7.org/linux/man-pages/man1/cut.1.html), as well as many other blog posts on Linux cut that go over all the features and options. Here in this post I will just be going over the options that I am using thus far, and give some actually use case examples for the Linux Cut command. I will also be touching base one many other Linux commands and features such as echo, piping, basic bash files, and the [basename command](/2021/07/07/linux-basename/) to just name a few things.

<!-- more -->

## 1 - Cutting by delimiter and field

I am going to start off with Linux cut examples that have to do with using the delimiter option \( -d \) to set a char that is to be used to break a string down into fields. Once a delimiter is given the the field option \( -f \) can be used to set what the field index is that I want.

The cut command can be given a file as a way to supply content that is to be cut, but if no file is given then content can be piped into it via the standard input. All the examples in this section are doing just that by making use of the echo command to create an example string.

### 1.1 - Basic example of using delimiter and field options with Linux Cut

For a basic example say I have a bunch of values separated by a comma as a string. With this kind of string I can use a comma as a delimiter to break the string down into fields. The field option can then be used as a way to get the field that I want by way of a one relative index value. In other words the index values start with one rather than zero

```
$ echo "[1a,2b,3c,4d,5e,6f,7g,8h,9i]" | cut -d , -f 3
3c
```

### 1.2 - More than one field index can be given

When using the field option it is possible to give more than one index value. Just pass the index values from left to right separated by commas, the result will be the fields in the order of the given field index values.

```
$ echo "[1a,2b,3c,4d,5e,6f,7g,8h,9i]" | cut -d , -f 8,2,6
2b,6f,8h
```

### 1.3 - Be sure to use quotes when needed

Quotes may have to be used when dealing with white space as a delimiter. For example if I have a sentence and I want the delimiter to be a space, then I will want to have a space between to double quotes.

```
$ echo "this is some text to cut for example" | cut -d " " -f 6
cut
```

## 2 - Change the output delimiter

In some cases I might want to change the output delimiter. To do so I just need to use the --output-delimiter option. If I want for there to be no delimiter at all between fields in the output then I just need to give an empty string as the output delimiter. So when it comes to one of my simple examples from above I can use the -d option to set a delimiter for the source, and the -f option to select the fields that I want, and then the --output-delimiter option to change the output delimiter to something other than a comma.

```
$ echo "[1a,2b,3c,4d,5e,6f,7g,8h,9i]" | cut -d , -f 8,2,6 --output-delimiter=''
2b6f8h
```

## 3 - Get the basename of a file with cut by itself, and with the basename command

One thing that I have been using the Linux cut command for thus far is to get the base name of a file name. This might work okay, but there are other options and commands to work with often. I will be getting to the basename command later in this section, but for now lets start out just with cut. The Linux cut command will work okay when it comes to getting the basename from a path or filename, but there are some situations in which I can lead to making a solution that is more complex than it needs to be for this.

Still when it comes to something like this:

```
$ echo 'filename.txt.b64' | cut -d . -f 1
filename
```

The Linux cut command works just fine if I have the file name first of course. If however I have a long path name that has dots in any of the folders before hand, that will throw a wrench in the works and give me a wring result. To help with that it, and using the Linux cut command without looking into the basename command, I might have to create a bash script like this:

```
#!/bin/bash
filepath="/home/pi/foo.bar/.fonts/filename.txt.b64"
fcount=$( echo -n $filepath | grep -o "\/" | wc -w )
filename=$( echo -n $filepath | cut -d '/' -f $(( $fcount + 1)) )
basename=$( echo -n $filename | cut -d '.' -f 1 )
echo $basename
```

If I save the above bash as something like filename_last.sh I can then make it executable or call it with bash.

```
$ bash filename_last.sh
filename
```

I have not tested this with every little possible thing when it comes to path names, but so far it seems to work. However I would say that this is more or less making something very simple far more complex than it needs to be if the Linux basename command is there to work with in the system. Using that command with the path string will give me the file name to which I can then pipe to Linux cut to get the base name of the file less the file extensions.

```
$ basename "/home/pi/foo.bar/.fonts/filename.txt.b64" | cut -d . -f 1
filename
```

It would make sense for there to be a base name command because this is something that I find myself running into often. In fact if I know the full extension of the file I can give that as an option to the basename command, in which case I do not even need to bother with cut.

```
$ basename -s .txt.b64 "/home/pi/foo.bar/.fonts/filename.txt.b64"
filename
```

It might take time to learn all these little commands, but once I know a lot of them it helps to make quick work of trivial tasks such as this.

## 3 - Conclusion

The Linux cut command seems to come up now and then when writing bash scripts. I often want to cut the extension off of a file name to get the base of the filename to which I then create a new file with the same base name but a new extension. The cut command also will come into play when I want to do anything else that might be needed when working with string values in a Linux and bash environment.
