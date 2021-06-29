---
title: Copying files in Linux with the cp command
date: 2021-06-29 11:46:00
tags: [linux]
layout: post
categories: linux
id: 899
updated: 2021-06-29 12:22:45
version: 1.9
---

The [Linux cp](https://man7.org/linux/man-pages/man1/cp.1.html) command can be used to copy files from one folder to another, and for the most part it is just a question of setting the source path as the first options, and the target name as the second option. However there are a number of things that might come up when copying files in the command line, or when creating a bash script to automate some work. For example one might also need to copy a whole bunch of files in a folder recursively, or create a folder in the event that it is not there to begin with. So it would make sense to look into what the options are with the cp command, and also become aware of other useful options in other commands that can be used such as the mkdir command with the -p option.

<!-- more -->


## 1 - Basic example of the Linux cp command

In order to use the Linux cp command to copy one or more source files I am going to need, well one or more source files. For a quick way to go about creating some source content for the sake of just testing out the Linux cp command I am going to make use of the [Linux echo](/2019/08/15/linux-echo/) command, and [bash redirection](/2020/10/02/linux-redirection/). The echo command is a way to go about creating some standard output from the command line, and redirection is a way to go about saving that standard output to a file. I then have my source file that I can then copy using the Linux cp command.

So then now that I have my source file if I just want to make a single copy of a file I can just call the cp command, and then give the path to the source file as the first argument, followed by the path that I want for the copy of the file.

```
$ echo -n "foobar" > foo.txt
$ cp foo.txt "./foo_copy.txt"
```

## 2 - Use mkdir -p to create a target folder if it is not there to begin with

In some case I might want to [create a nested target folder in the event that it is not there to begin with](https://stackoverflow.com/questions/1529946/linux-copy-and-create-destination-dir-if-it-does-not-exist) when copying some files. It would seem that there is no such option to do so with the cp command. However in just about every Linux system there should be the mkdir command also which can be used with the -p option.

```
$ echo -n "foobar" > foo.txt
$ mkdir -p './copy' && cp foo.txt "./copy/foo_copy.txt"
```

## 3 - Copy files recursively

To copy a whole folder recursively I will just need to use the -r option of the Linux cp command. So for this example I am once again using the Linux mkdir -p command to create a folder, and another nested folder within the folder. I am then using my Linux echo and redirection trick to create a few files in the root folder as well as the nested folder. So now I just want to copy the full contents of this source folder that I have created, for this I just use the Linux cp command with the -r option, then give the name of the root folder as the first argument, followed by the name of the root folder for the copy of the source folder.

```
mkdir -p "./text/foo"
echo -n "foobar" > "./text/foo/foo1.txt"
echo -n "foobar" > "./text/foo/foo2.txt"
echo -n "foobar" > "./text/bar1.txt"
cp -r "text" "text_copy"
```

## 4 - Conclusion

That will be it for now when it comes to the Linux cp command, that covers at least the basics of copying files in the command line in Linux to say the least. There may be some more advanced things that will come up once in a while though that might have to do with things like file access permissions, filtering, and other things that I might want to do when it comes to writing bash scripts.

Although I do Like to write bash scripts now and then part of me understand that there is the potential to make scripts that are more cross platform by copying files within nodejs, or python rather than working with Linux commands. So I might get around to expanding this post a little now and then as needed if I get around to making some more examples for this sort of think when it comes to coping files in general in Linux.
