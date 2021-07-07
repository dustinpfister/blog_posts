---
title: Linux basename command to get just the file name of a path
date: 2021-07-07 12:54:00
tags: [linux]
layout: post
categories: linux
id: 905
updated: 2021-07-07 13:53:32
version: 1.16
---

When working out a bash script I might want to get just the base name of a path to a file or folder, one way to do so might be to use the [linux cut](/2020/11/19/linux-cut/) command, but there is also the [linux basename](https://www.geeksforgeeks.org/basename-command-in-linux-with-examples/) command that can be used for this task. The command works by passing a single argument to the command that should be a string value of a path to a file, the result that will be spit out to the standard output will then just be the base name of the path. So then this is a fairly basic command, but when it comes to writing bash scripts, or using it in conjunction with other scripts things might get a little confusing. So I thought I would write a quick post on this command, and also a few other commands that might end up being used in conjunction with it. Also there is making mentioning of some alternatives to using the basename command such as the linux cut command, and tools that there are to work with in programing environments such as the [path module in nodejs](/2017/12/27/nodejs-paths/).


<!-- more -->

## 1 - Basic example of the Linux basename command

In this section I will be starting out with just some basic examples of the basename command. There is just using the command by itself with a given path, and then there is also looking into some of the options that do not require that much more effort.

### 1.1 - Just using the basename command with no options

To start of with there is just calling the name name and typing in the path to a file as the first and only argument to the command. The result that will be spit out to the standard output of the command line should just then be the base name of the path and nothing more. So if I give an absolute path to a text file, then the result will just be the name of the text file with the file extension.

```
$ basename /foo/bar/baz.txt
baz.txt
```

So that is all fine and good, but when it comes to some kind of real use case example I am going to want to feed the path to the file to the base name command from the output of another command, a shell or environment variable, or some other kind of data from a file or something to that effect. So I think some additional examples are called for here.

## 2 - Piping a url to the basename command with xargs

In this section I will be getting into some examples that [involve piping](/2020/10/09/linux-pipe/), and the xargs command as a way to pipe one or more paths to the basename command to get a collection of base names for each path piped in. The input can be created from a long list of commands but for this section I will be sticking to using the [Linux echo](/2019/08/15/linux-echo/) command as a way to simulate some input. In other real use case examples this input could be some data in a file or something to that effect.

### 2.1 - A Basic xargs example using echo

So now when it comes to getting into using the basename command with other commands this is a good time to write about another very useful command [called xargs](/2020/09/26/linux-xargs/). Most of the time I can pipe something into a command from the standard output of another command, but it would seem that I can not do that with the basename command.

```
$ echo /foo/bar/baz.txt | xargs basename
baz.txt
```

### 2.1 - Echo with the -e option, piping and the -a all option with basename

In this example I am once again using the Linux echo command to simulate a collection of paths in the from of some text where a line feed is used as a separator between each path. When it comes to piping this to the basename command I can use the -a option of the basename command as a way to get what would be a typically desired result in this kind of situation.

```
$ echo -e "/foo/bar\n/foo/baz" | xargs basename -a
bar
baz
```

## 3 - Using the find command with exec option

Another command that I might want to use with base name is the Linux find command that I can use to look for files that fit a given pattern. When it comes to using the find command there is an exec option that allows for me to define a command to run for each file path found that fits the pattern. This can then be used as a way to get just the base name of each file found.

```
$ find /usr/lib/nodejs -name "*.js" -exec basename {} ';'
```

Although something like this might work to just get the base name for a file, I might still also want to have the full path at the ready also. See I might want just the base name to make some kind of comparison, but once I have that done I might want to do something with the full path to the file also. So it might be called for at some point to get into writing a few more examples that have to do with writing a bash script or two.

## 4 - Conclusion

That will be it for today when it comes to the basename command, it is a fairly simple command so there is only so much to say about it. I might get around to expanding this post some more at some time though, but at this time I think that will mainly just be some alternatives to the base name command that can be used to do the same thing. WHen it comes to writing scripts to automate work I am often torn between writing bash scripts, and working something out in nodejs so that the script might prove to be a little more portable when it comes to using it on non Linux systems. When it comes to writing a little javaScript code there is using the path module of nodejs which has a basename method that works just like this native Linux basename command. So there might be more to wrote about when it comes to those kind of topics.