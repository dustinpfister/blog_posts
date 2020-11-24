---
title: The Linux nano editor
date: 2020-11-24 10:50:00
tags: [linux]
layout: post
categories: linux
id: 748
updated: 2020-11-24 11:26:32
version: 1.2
---

There is a massive world of editors to use in Linux, many of which need to be used in a desktop enviorment. However there are also a lot of editors that are used in a bash command shell. There is of course vim which is one well know such editor, however if you are new to editing text in a bash shell it might be best to start with nano. Also I still like nano over others when it comes to a command line interface style text editor, so it is something that is not just for beginners.

There is just the very basuics of how to get started with nano, that is just opening up a file, or creating a file with it. However there is also using it as a way to end up with some text that is the result of another command via piping, and other little things about nano that might justafy writing a quick post on the editor. So in this post I will be going over every little detail that I think is worth mentioning when it comes to using nano as a test editor, and also some relateed topics that might also be worth mentioning here.

<!-- more -->

## 1 - Just start nano, and create a file

One way to use nano is to just go to a working path such as the home folder, and then just start nano in the command line


```
$ cd ~
$ nano
```

I can then just use nano to write some text such as "Hello World" and then save it by pressing ctrl+o which is the write out option that is displayed at the bottom of the console window. When doing so it will prompt for a file name to which I can give something like "hello.txt" and hit return to save the file. A message will then be displayed as to the outcome of the process of writing the file to the current working path. At which point I can then exit the editor by pressing ctrl+x which is aslo one of the options displayed at the bottom of the console window.

Once back on the command line I can use commands like ls and cat to confirm that nano works as exspetced as an editor

```
$ ls h*
hello.txt
$ cat hello.txt
Hello World
```

So that is one way to go about using nano. Just like any other editor I can just start the programe, and then create a new file within the programe. However there is also opening a file that is all ready at a certin location, and also how to go about opening up nano with some text from the standard input. So maybe there is a need for at least one or two more examples of the Linux nano command.

## 3 - Soft Wrapping of Text

So what abount using soft wrapping of text? Well when in the editor press the ESC key, that is press and release the key first. Then we are going to want to press the dollar sign key so in other words shift+4 at least on my US layout keyboard anyway. The process can then be repeated to set things back to the default way of things where each line is not wrapped.
