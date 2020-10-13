---
title: Linux wc command for getting the word count of files
date: 2020-10-13 14:02:00
tags: [linux]
layout: post
categories: linux
id: 722
updated: 2020-10-13 14:23:52
version: 1.1
---

The [Linux wc](https://en.wikipedia.org/wiki/Wc_%28Unix%29) command is one of many commands that I have become aware of when looking thru the [\/user\/bin](http://www.linfo.org/usr_bin.html) path for things to check out, and maybe write a thing or two about. This wc command can be used to get a word count of a text file where a word is a non-zero length string of charicters between whitespace.

<!-- more -->

## 1 - Linux wc Basic Example

```
$ echo 'Linux wc can count words' | wc
      1       5      25
```

## 2 - Just get word count

```
$ echo 'Linux wc can count words' | wc -w
5
```

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


