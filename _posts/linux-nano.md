---
title: The Linux nano editor
date: 2020-11-24 10:50:00
tags: [linux]
layout: post
categories: linux
id: 748
updated: 2020-11-24 20:25:40
version: 1.8
---

There is a massive world of editors to use in Linux, many of which need to be used in a desktop environment. However there are also a lot of editors that are used in a bash command shell. There is of course vim which is one well know such editor, however if you are new to editing text in a bash shell it might be best to start with the [Linux nano](https://linuxcommand.org/lc3_man_pages/nano1.html) command line based text editor. Also I still like nano over others when it comes to a command line interface style text editor, so it is something that is not just for beginners.

There is just the very basics of how to get started with nano, that is just opening up a file, or creating a file with it. However there is also using it as a way to end up with some text that is the result of another command via piping, and other little things about nano that might justify writing a quick post on the editor. So in this post I will be going over every little detail that I think is worth mentioning when it comes to using nano as a test editor, and also some related topics that might also be worth mentioning here.

<!-- more -->

## 1 - Just start nano, and create a file

One way to use nano is to just go to a working path such as the home folder, and then just start nano in the command line

```
$ cd ~
$ nano
```

I can then just use nano to write some text such as "Hello World" and then save it by pressing ctrl+o which is the write out option that is displayed at the bottom of the console window. When doing so it will prompt for a file name to which I can give something like "hello.txt" and hit return to save the file. A message will then be displayed as to the outcome of the process of writing the file to the current working path. At which point I can then exit the editor by pressing ctrl+x which is aslo one of the options displayed at the bottom of the console window.

Once back on the command line I can use commands like ls and cat to confirm that nano works as expected as an editor

```
$ ls h*
hello.txt
$ cat hello.txt
Hello World
```

So that is one way to go about using nano. Just like any other editor I can just start the program, and then create a new file within the program. However there is also opening a file that is all ready at a certain location, and also how to go about opening up nano with some text from the standard input. So maybe there is a need for at least one or two more examples of the Linux nano command.

## 2 - opening a file from the command line

To open a file I just need to give the file name or path to the file as the first, and often only argument. The text will then load up in the nano editor, and when I go to save the file name will default to the name of the file that was opened when using the write out command. There is also doing ctrl+s to save that also seems to work when it comes to writing over an existing file.

```
$ cd ~
$ echo -n "Hello world this is some text" > hello.txt
$ nano hello.txt
```

## 3 - Starting with some text piped in from the standard input

To pipe in some text from another command I just need to give a dash in place of what would otherwise be a file name.

```
$ ls /bin | nano -
```

## 4 - Soft Wrapping of Text

So what about using soft wrapping of text? Well when in the editor press the ESC key, that is press and release the key first. Then we are going to want to press the dollar sign key so in other words shift+4 at least on my US layout keyboard anyway. The process can then be repeated to set things back to the default way of things where each line is not wrapped.

## 5 - Conclusion

So if I am working with a very striped down distribution of Linux in which not even xorg is installed I would use a text editor like nano to edit files. The Linux nano command is often there to work with in many distributions and is often a binary that is found in the main bin folder. Any Linux system should have a basic text editor to work with in the system, if not nano something like vim. There are only so many other options to work with if there is no editor at all to making any changes to files that need to happen.

Nano is a nice little editor that seems to work okay when it comes to making quick little changes to config files and so forth. However when it comes to getting real work done with editing text or doing some programing I would still prefer to use something that would be used in a desktop environment. [Mousepad](https://www.commandlinux.com/man-page/man1/mousepad.1.html) is a nice basic editor that I would prefer to use in most cases where I just need very basic features.