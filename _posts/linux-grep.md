---
title: linux grep command for finding text in files and directories
date: 2020-09-14 18:07:00
tags: [linux]
layout: post
categories: linux
id: 705
updated: 2020-09-14 18:26:34
version: 1.1
---

In a linux enviorment there is the [Linux grep](https://man7.org/linux/man-pages/man1/grep.1.html) command that is useful for finding text in a file, or a bunch of files in a directory. I have been starting to write a few posts on various commands that often are part of linux, or can be easily added to linux, and grep is certainly one such command that I should write a quick post on becuase I am sure it will come in handy now and then with what I often work on when it comes to lengthly collections of text files.

<!-- more -->

## 1 - Basic grep command on a single file

```
$ grep "id:" ./_posts/linux-grep.md
id: 705
```

## 2 - more that once file

### 2.2 - Uisng glob pattens with the file path

```
$ grep "id:" ./_posts/linux-*
./_posts/linux-echo.md:id: 523
./_posts/linux-grep.md:id: 705
./_posts/linux-grep.md:$ grep "id:" ./_posts/linux-grep.md
./_posts/linux-grep.md:id: 705
./_posts/linux-keep-process-running.md:id: 703
./_posts/linux-nodejs-cli-tools-getting-started.md:id: 90
./_posts/linux-ps.md:id: 524
./_posts/linux-raspberry-pi-os-swap-file.md:id: 702
./_posts/linux-raspberry-pi-os-turrn-off-screen-blanking.md:id: 704
./_posts/linux-raspbian-lite-getting-started.md:id: 635
./_posts/linux-raspbian-lite-xserver-xorg.md:id: 637
```

### 2.1 - recustive flag

```
$ grep -r "var" ./
```