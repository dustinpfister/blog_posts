---
title: Linux wc command for getting the word count of files
date: 2020-10-13 14:02:00
tags: [linux]
layout: post
categories: linux
id: 722
updated: 2020-10-13 14:32:11
version: 1.3
---

The [Linux wc](https://en.wikipedia.org/wiki/Wc_%28Unix%29) command is one of many commands that I have become aware of when looking thru the [\/user\/bin](http://www.linfo.org/usr_bin.html) path for things to check out, and maybe write a thing or two about. This wc command can be used to get a word count of a text file where a word is a non-zero length string of charicters between whitespace.

<!-- more -->

## 1 - Linux wc Basic Example

For a basic example of the Linux wc command a good way to get started with a command like this is to use the Linux echo command to feed it some example text via the standard input via a pipe. Sp here I create some text with Linux echo and then pipe that to the Linux wc command.

```
$ echo 'Linux wc can count words' | wc
      1       5      25
```

The result if a few numbers the center of which as you can see is the word could. However what if you want to feed wc a file, or a whole bunch of files in a folder? Also what if I just want the word count, and not those other numbers for line breaks and byte size? With that said maybe just a few more examples on this command is called for then.

## 2 - Just get word count

So just get the word count only from some standard input I just need to pass the w option.

```
$ echo 'Linux wc can count words' | wc -w
5
```

For some text coming from the standard input this will work just file, but when passing one or more files in place of this I will get a file name next to each word count. Speaking of files lets get to some basic and not so basic examples of dealing with files and the Linux wc command.

## 3 - Get word count of a file

```
$ echo 'hello world this is some text' > ~/hw.txt
$ wc -w ~/hw.txt
6 /home/dustin/hw.txt
```

## 4 - Get word count of a bunch of files

```
$ pwd
/home/dustin/Documents/github_dustinpfister/blog_posts/_posts
$ find *.md | xargs wc -c
   1983 angular-$timeout.md
   1601 angular-bootstrap.md
...
   6572 vuejs-use.md
   5245 vuejs-watch.md
5303495 total
```


