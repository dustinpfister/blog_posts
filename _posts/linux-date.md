---
title: Linux date command and date string formating
date: 2021-07-01 08:26:00
tags: [linux]
layout: post
categories: linux
id: 901
updated: 2021-07-01 10:43:23
version: 1.2
---

This is a post on another basic command that I would like to write about real quick called the [Linux date](https://man7.org/linux/man-pages/man1/date.1.html) command. As one might suspect this is a command where a string value of the current date and time is spit out into the standard output, however there is also how to go about formatting that output. When it comes to formating the output the same standard is used when it comes to customizing hoe date and time is displayed in the panel in Raspberry pi OS for example.

<!-- more -->

## 1 - Basic date example

```
$ date
```


## 2 - Setting the format of the output

```
$ date "+ The Date is: %m/%d/%Y, and the time is %I:%M %p"
```

## 3 - Setting the time of the date to something other than the current time

```
$ date -d "1983-04-06 10:05:00" "+%A"
# Wednesday
```

