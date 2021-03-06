---
title: Creating arguments from standard input with the Linux xargs command
date: 2020-09-26 18:44:00
tags: [linux]
layout: post
categories: linux
id: 712
updated: 2020-11-27 18:54:45
version: 1.7
---

So you have some standard output from one command, and you want to use that standard output to create values for arguments to another command rather than pipe it to the standard input of that command. In other words the standard input of many commands might expect content or some other kind of data stream from the standard input, not arguments. Take for example the Linux cat command, file names can be given via arguments, but not by way of the standard input, with cat the standard input is used as an alternative to opening files and works in a similar way to that of echo when used that way. 

Still there must be a way to go about piping the output of one command as data that is to be used for one or more arguments in another command, rather than data to be sent to the standard input of this other command. One command that can be used to do so is the [Linux xargs](https://en.wikipedia.org/wiki/Xargs) command that should be there to work with on most Linux systems. In this post I will be covering all the basic examples that come to mind when using this kind of command such as using data from a command for just one argument, as well as more than one.

<!-- more -->

## 1 - Just pipe something into a single argument at the end of a command line

So when it comes to just piping the standard input into a command I can just call call xargs followed by the command. I can then write some additional options for the command, and then just stop when it comes to where I want the standard input to go.

```
$ echo B | xargs echo A C
A C B
```

So that might work okay in some situations where I want the output of one command to be used just at the end of a commands arguments for another. However what if I need to pipe the data into an argument that comes before some other arguments? Also what if I need to pipe data into more than one argument? So with that said letsb look at some more examples of the linux xargs command.

## 2 - Have a string for the standard input when writing the command

There is an option for the xargs command that will allow for setting a string value in the command that will be used as a place to inject the input from the other command that I am piping from.

```
$ echo B | xargs -I stdin echo A stdin C
A B C
```

However there is another option for doing this that I have found is more versatile that will allow for more than one argument to be used.

## 3 - two or more arguments

So what if you [have two or more arguments](https://stackoverflow.com/questions/3770432/xargs-with-multiple-arguments) that you want to pass for each command?

```
$ echo -e 'f *.js\nd lib' | xargs -l bash -c 'find . -maxdepth 3 -type $0 -name $1'
```

## 4 - Conclusion

So the Linux xargs command is there for these kinds of situations where I need to use the output of a command for arguments for another rather than just sending it to the standard input of another command. I did not cover every little use case, and also there are additional options for this kind of thing that many mind proves to be a better option for one reason or another. Still if you find yourself trying to find an option in a command for changing what the standard input of that command is used for, stop doing that right now. Often there is no such option in a command and for good reason these kinds of things are what commands like xargs are used for.

In addition to xargs there are additional options for using the standard output of one ore more commands to create argumnets for another command. One such command as awk, which is more than just a command but also a whole lanague that can beused for this sort of thing, as well as a wide range of other simular tasks. If I wheer to get into that I would need to writ a lot of posts on it, and it would take a while to learn.