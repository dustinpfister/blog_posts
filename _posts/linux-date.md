---
title: Linux date command and date string formating
date: 2021-07-01 08:26:00
tags: [linux]
layout: post
categories: linux
id: 901
updated: 2021-07-01 12:04:43
version: 1.15
---

This is a post on another basic command that I would like to write about real quick called the [Linux date](https://man7.org/linux/man-pages/man1/date.1.html) command. As one might suspect this is a command where a string value of the current date and time is spit out into the standard output, however there is also how to go about formatting that output. When it comes to formating the output the same standard is used when it comes to customizing the date and time is displayed in the panel in Raspberry pi OS for example.

So then this will be a post on the date command, and how to use that to work with date strings, and formatting the output. There are then a number of other related commands, and features of commands that I might also be able to get to when it comes to working with dates and time in general in a Linux system.

<!-- more -->

## 1 - Basic date example

When it comes to getting started with the date command, doing so is simple enough, just open a terminal window, type date in, and hit return. The result of doing so will then be the current system time paused out into the standard output of the terminal window, with the default format for the output string.

```
$ date
```

There are then two general things that come to mind after this, one of which is how to format the output to something other than the default, and the other is how to do something with a date and time other than the current time. So lets take a look at some additional examples that involve getting into doing that with the date command.

## 2 - Setting the format of the output

In order to set the format of the output to something other than the default I just need to use a string value that begins with a plus sign. After the plus sign I can then make the string value more or less anything that I want, and I can use a bunch of special values that will result in the injection of a desired value of the date time stamp.

```
$ date "+ The Date is: %m/%d/%Y, and the time is %I:%M %p"
```

## 3 - Setting the time of the date to something other than the current time

I can also use a date time stamp that is something other than the current system tie by just making use of the -d option. When using the -d option I just need to pass a string value that contains the data for the date, and time of day for that date that I want to use when it comes to formating the ending output for that specific moment it time. For example if I want to know what day of the week a given date was I can do something like this:

```
$ date -d "1993-04-06 10:05:00" "+%A"
```

## 4 - Setting the date with the date command with the -s option

On some systems it might be possible to set the system time by using the -s option of the date command, assuming that the user has permissions to do so by using the sudo command.

```
sudo date -s "Thu Jul  1 11:00:00 UTC 2021"
#Thu 01 Jul 2021 07:00:00 AM EDT
```

This might not work on all systems though, for example on my raspberry pi it would seem that it does not work. However there is also no need for the most part because as long as I have an Internet connection setting of the system time will happen automatically.

## 5 - Getting the current time in various programing languages

There is using the date command to work with dates in Linux, which works just fine when we are talking about Linux systems, and most posix systems that have the date command that will work in more or less the same way. However in some cases I might want to write scripts that work with time, and will do so in a wider range of platforms beyond that of just Linux.

## 5.1 - Getting date info with javaScript using Nodejs and the Date Class

## 5.2 - Getting date info with Python and the datetime standard library


## 6 - Conclusion

So the Linux date command is one way to go about working with dates in a Linux system or any posix system that has this date command. However the date command is not the end all solution for working with dates in Linux, there is making use of the javaScript Date class if nodejs is installed, and the date time standard library in the event that python is there to work with. In additional there are other commands to be aware of when it comes to setting the system time in a Linux system.

