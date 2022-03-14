---
title: Transform and delete standard input text in bash with the Linux tr command
date: 2022-03-11 10:47:00
tags: [linux]
layout: post
categories: linux
id: 967
updated: 2022-03-14 09:18:02
version: 1.8
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

### 1.2 - The cat command

The echo command is great for creating some standard output from the command line, however often the text source that I want to use is in a file. In that situation I will then want to use some kind of command to read the contents of that fle and then pipe that into the tr command. A common command that is often used for that kind of task would be the cat command.

```
echo -e 'foo;\nbar;\n' > mess.txt;
cat mess.txt | tr -d '\n';
foo;bar;$
```

```
$ rm mess.txt;
```

### 1.3 - xargs and stdin

What if I want to use the tr command to strip away an end of line character and then use that as part of some text that will the be used as part of an argument for another command. This is where things might get a little tricky, but there are tools for this kind of job, more than one actually. It might be best to look into learning more about [using something called awk](/2021/07/02/linux-awk/) for this kinds of things, but another option that I see popping up here and there is the [xargs command](/2020/09/26/linux-xargs/).

```
$ echo -e 'foo;\nbar;\n' | tr -d '\n' | xargs -I stdin echo '(' stdin ')'
( foo:bar; )
$ 
```

## 2 - Remove end of line chars

The major thing that came up for me that lead me to using the Linux tr command for the first time is how to go about removing end of line characters from text, and also tasks that have to do with replacing that that with something else. In this section then I will be going over some examples that have to do just with this specific topic then.

### 2.1 - Using the head command with the random pseudo device

Here I am use the linux head command to generate some random bytes of data that I am then piping into the xxd command.

```
$ head -c 512 /dev/random | xxd -p | tr -d '\n' > rnd.txt
$ du -b rnd.txt
```

## 3 - Conclusion

That is if for the Linux tr command, at least for now anyway until the  next time that I come around to do a little editing with this post.
