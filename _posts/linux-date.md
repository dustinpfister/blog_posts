---
title: Linux date command and date string formating
date: 2021-07-01 08:26:00
tags: [linux]
layout: post
categories: linux
id: 901
updated: 2021-07-01 12:40:27
version: 1.25
---

This is a post on another basic command that I would like to write about real quick called the [Linux date](https://man7.org/linux/man-pages/man1/date.1.html) command. As one might suspect this is a command where a string value of the current date and time is spit out into the standard output, however there is also how to go about formatting that output. When it comes to formating the output the same standard is used when it comes to customizing the date and time is displayed in the panel in Raspberry pi OS for example.

So then this will be a post on the date command, and how to use that to work with date strings, and formatting the output. There are then a number of other related commands, and features of commands that I might also be able to get to when it comes to working with dates and time in general in a Linux system.

<!-- more -->

## 1 - Basic date example

When it comes to getting started with the date command, doing so is simple enough, just open a terminal window, type date in, and hit return. The result of doing so will then be the current system time paused out into the standard output of the terminal window, with the default format for the output string.

```
date
# Thu 01 Jul 2021 11:14:15 AM EDT
```

There are then two general things that come to mind after this, one of which is how to format the output to something other than the default, and the other is how to do something with a date and time other than the current time. So lets take a look at some additional examples that involve getting into doing that with the date command.

## 2 - Setting the format of the output

In order to set the format of the output to something other than the default I just need to use a string value that begins with a plus sign. After the plus sign I can then make the string value more or less anything that I want, and I can use a bunch of special values that will result in the injection of a desired value of the date time stamp.

```
date "+ The Date is: %m/%d/%Y, and the time is %I:%M %p"
The Date is: 07/01/2021, and the time is 11:14 AM
```

## 3 - Setting the time of the date to something other than the current time

I can also use a date time stamp that is something other than the current system tie by just making use of the -d option. When using the -d option I just need to pass a string value that contains the data for the date, and time of day for that date that I want to use when it comes to formating the ending output for that specific moment it time. For example if I want to know what day of the week a given date was I can do something like this:

```
date -d "1993-04-06 10:05:00" "+%A - %H"
#Tuesday - 10
```

## 4 - Setting the date with the date command with the -s option

On some systems it might be possible to set the system time by using the -s option of the date command, assuming that the user has permissions to do so by using the sudo command.

```
sudo date -s "Thu Jul  1 11:00:00 UTC 2021"
#Thu 01 Jul 2021 07:00:00 AM EDT
```

This might not work on all systems though, for example on my raspberry pi it would seem that it does not work. However there is also no need for the most part because as long as I have an Internet connection setting of the system time will happen automatically.

## 5 - Getting the current time in various programing languages

There is using the date command to work with dates in Linux, which works just fine when we are talking about Linux systems, and most posix systems that have the date command that will work in more or less the same way. So then the date command should be fairly safe to use in bash scripts because it is a fairly common command that should be there to work with in most posix systems. However in some cases I might want to write scripts that work with time, and will do so in a wider range of platforms beyond that of just Linux. To do this there is also using a programing language such as javaScript, or python, and using the binaries that can be installed on Linux, but also not so posix friendly systems like Windows.

## 5.1 - Getting date info with javaScript using Nodejs and the Date Class

If nodejs is installed on the system then javaScript would be one programing language that can be used to work with dates. When working out a little javaScript code there is the native [javaScript Date](/2019/02/14/js-javascript-date/) constructor that can be used to create a date object. The to string method of the date object is one way to go about creating a string value of the date object that can then be sent to the standard output. In node there is the console log method that is one way to go about sending some data to the standard output, but there is also the [process stdout write](/2021/03/18/nodejs-process-stdout/) method that might prove to be a slightly more professional way to do so as I have more control over the output when it comes to line breaks.

```js
let d = new Date();
process.stdout.write(d.toString() + '\n');
```

Once I have a javaScript file to call I can just call node, and then use the javaScript file name that contains the code to get the date info in the standard output.

```
$ node node_date.js
Thu Jul 01 2021 11:36:38 GMT-0400 (Eastern Daylight Time)
```

## 5.2 - Getting date info with Python and the datetime standard library

When it comes to python there is the [date time standard library](/2021/01/21/python-standard-library-datetime/) that is the usual goto library when it comes to working with dates. Like the Date Class in javaScript this date time library is built into python itself, so I do not need to bother with any kinds of additional external asset also. In order to send something to the standard output in python I can use the print [built in function](/2020/12/15/python-built-in-functions/) to do so, which is great as it gives me a good deal of control like that of the process stdout write method in node.

```python
import datetime as date
d = date.datetime.now()
print(d)
```

Just like with node I omly need to pass the source code file to the python binary.

```
$ python3 python_date.py
2021-07-01 11:40:39.060294
```

## 6 - Conclusion

So the Linux date command is one way to go about working with dates in a Linux system or any posix system that has this date command. However the date command is not the end all solution for working with dates in Linux, there is making use of the javaScript Date class if nodejs is installed, and the date time standard library in the event that python is there to work with. In additional there are other commands to be aware of when it comes to setting the system time in a Linux system.

