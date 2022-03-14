---
title: Transform and delete standard input text in bash with the Linux tr command
date: 2022-03-11 10:47:00
tags: [linux]
layout: post
categories: linux
id: 967
updated: 2022-03-14 09:06:17
version: 1.4
---

Every once in a while I want to delete end of line characters, or transform characters from some standard input when piping two or more Linux commands together. So far I have found that the [Linux awk](/2021/07/02/linux-awk/) command might be the best tool for the job when it comes to thing and just about everything else when it comes to text processing type tasks. However there are also a lot of various alternative commands that come up and one of them is the Linux tr command.

<!-- more -->

## Basic Linux tr examples

In this section I will then be starting out with just a few basic, quick examples of the Linux tr command.

### 1.1 - Just using echo to pipe something into tr

Many of these commands work by taking something in from the standard input, so in order to use it this way I must find some way to create some standard output to pipe into the tr command. One way to do so would be to use the Linux echo bash built in command.

```
$ echo -e 'foo;\nbar;\n' | tr -d '\n'
foo;bar;$
```

### 1.2 - cat

```
echo -e 'foo;\nbar;\n' > mess.txt;
cat mess.txt | tr -d '\n';
foo;bar;$
```

```
$ rm mess.txt;
```

### 1.3 - xargs and stdin

```
$ echo -e 'foo;\nbar;\n' | tr -d '\n' | xargs -I stdin echo '(' stdin ')'
( foo:bar; )
$ 
```

## 2 - Remove end of line chars

### 2.1 -

```
head -c 512 /dev/random | xxd -p | tr -d '\n' > rnd.txt
du -b rnd.txt
```

## 3 - Conclusion

