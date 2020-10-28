---
title: Linux wc command for getting the word count of files
date: 2020-10-13 14:02:00
tags: [linux]
layout: post
categories: linux
id: 722
updated: 2020-10-28 13:59:04
version: 1.6
---

The [Linux wc](https://en.wikipedia.org/wiki/Wc_%28Unix%29) command is one of many commands that I have become aware of when looking thru the [\/user\/bin](http://www.linfo.org/usr_bin.html) path for things to check out, and maybe write a thing or two about. This wc command can be used to get a word count of a text file where a word is a non-zero length string of charicters between whitespace.

<!-- more -->

## 1 - Linux wc command basic Example

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

To get the word count of a file I just need to pass the file that I want the count for to wc.

```
$ echo 'hello world this is some text' > ~/hw.txt
$ wc -w ~/hw.txt
6 /home/dustin/hw.txt
```

This will give the word count only becuase of the w option, but it will also give the path to the file also. In addition what if I have a whole bunch of files in a folder? I can enter each file name one after another, but what if there is well over one hundred file names? There should be a way to just generate that and inject it right?

## 4 - Get word count of a bunch of files

So if you are not familiour with piping in Linux ut would be a good idea to look into it. With piping I can use a command like the find command to get a list of file names. I can then pipe this list of file names to a command like xargs that will use the file names from the standard input as arguments for another command. I could use xargs with Linux wc directly, but why not pipe the file names to cat to create one large text file from my large collection of text files, and then pipe that to Linux wc?

```
$ pwd
/home/dustin/Documents/github_dustinpfister/blog_posts/_posts
$ find *.md | xargs cat | wc -w
820041
```

Okay great now I have my grand word count total, or do I? These are markdown files after all, and as such there is much markdown code in the from of code examples and so forth that I might not wanted counted. So I might need to pipe things threw one or two more commands that will convert my markdown to plain text first to get another count that might be what I am actually looking for.

## 5 - Get a count of how man files there are in a folder with the linux ls and wc commands

The -l option of wc is a way to count the number of new lines in a volume of text. The text supplyed to the wc command does not have to be from a file though, it can be piped in from another command such as the Linux ls command. If you are not aware of what the ls command is, it is a way to go about listing the contents of a folder. When doing so each item is seperated with a new line charicter which of course can be counted with the wc command if the output of the Linux lc command can be piped to wc.

So in my posts folder if I use the linux ls command to find out how many mark down files I have I end up with a list like this:

```
$ ls linux*
linux-aspell.md
linux-curl.md
linux-echo.md
linux-find.md
linux-grep.md
linux-keep-process-running.md
linux-kill.md
linux-ls.md
linux-nodejs-cli-tools-getting-started.md
linux-pipe.md
linux-ps.md
linux-raspberry-pi-os-swap-file.md
linux-raspberry-pi-os-turrn-off-screen-blanking.md
linux-raspbian-lite-getting-started.md
linux-raspbian-lite-xserver-xorg.md
linux-redirection.md
linux_shebang.md
linux-tee.md
linux-wc.md
linux-xargs.md
```

If I take a moment to count them there are 20 posts on linux at the time of this writing. However how can I end up getting a count with Linux comand rather than coutning? Simple I just need to pipe this text to the Linux wc command and use the -l option to count the new lines rather than words.

```
$ ls linux* | wc -l
20
```

I can then chnage the options for the ls command to get different counts including for things like hiden files by using the -a option with the ls command. However you get the general idea here, the wc command is usful for not just counting words, but also lines, and the size of text.

## 6 - Conclusion

So the Linux wc command is useful for just getting the word count of a file, but it is also using for getting counts of other metrics such as line count, and size. It can be used with a file, but also it can be used with standard output from any other command.
