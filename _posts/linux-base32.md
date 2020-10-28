---
title: Linux base32 encoding and decoding on the command line
date: 2020-10-28 14:42:00
tags: [linux]
layout: post
categories: linux
id: 731
updated: 2020-10-28 16:55:41
version: 1.8
---

The the usr bin folder on most Linux systems there should be a base32 and base64 commands that can be used to do quick, simple base32 and 64 encodings and decodings in the command line. The commands can be fed some input via the standard input when it cokes to piping in what I want to encode to base32, the result is then a base32 encoding of what I piped in when it is not used with any options. Speaking of options what if I have some base32 or 64 code and I want to decoded it back, for this there is the -d option that will decode base32 or 64 into its original form.

So in todays Linux post I will be checking out the base32 command as well as the base64 command for doing this sort of thing on the command line in a Linux operating system environment. I will of course also be touching base on a few other things when it comes to using these commands to create a collection of files such as piping, redirection, and other commands that can come into play with this. 

<!-- more -->

## 1 - A basic base32 example with echo and piping

So for starters there is using the Linux echo command to just create some standard output, and then pipe that output to the base32 command. If I just want to encode rather than decode I do not need to give any option to base32 or base64, the default behavior is to encode to base32

```
$ echo 'this is some text I want to encode' | base32
ORUGS4ZANFZSA43PNVSSA5DFPB2CASJAO5QW45BAORXSAZLOMNXWIZIK
```

if I want to decode then I just need to give the -d option.

```
$ echo 'ORUGS4ZANFZSA43PNVSSA5DFPB2CASJAO5QW45BAORXSAZLOMNXWIZIK' | base32 -d
this is some text I want to encode
```

## 2 - basic example to encode and decode files with base32

I can just give a file, and file as the first argument, and base32 coded will be the result in the standard output

```
$ base32 foo.txt
```

I can do the same if I come across a file that is base32 encoded

```
$ base32 -d foo.txt.b32
```

The result can then be piped to some command that can work with the result, or I can use redirection as a way to create a file.

## 3 - redirection and base32

Redirection is a way to go about creating a file from standard output, so for example I can use the echo command and redirect the standard output of that to a file such as test.txt.

```
$ echo 'this is just a test' > test.txt
$ cat test.txt
this is just a test
```

So I can then also use redirection with other commands such as base32. For example I can use my test.txt file with base32 and then redirect the result to another file such as test.txt.b32. That file will then have a base32 encoding of test.txt as the content of the file

```
$ base32 test.txt > test.txt.b32
$ cat test.txt.b32
ORUGS4ZANFZSA2TVON2CAYJAORSXG5AK
```

I can then remove the old file that is not encoded and just have the base32 encoded file remain. 

```
$ rm test.txt
$ ls test*
test.txt.b32
```

However there us nothing to fear as I can do the same thing to get the file back by just doing the same thing again. However this time I will want to give test.txt.b32 as the file for base32, and be sure to set the -d option to decode rather than encode. I then just redirect the output of that to a new test.txt, and I have my old file back.

```
$ base32 -d test.txt.b32 > test.txt
$ test*
test.txt  test.txt.b32
$ cat test.txt
this is just a test
```

## 4 - Uisng the wc command to get the size in bytes of output

Another useful command that comes up often actually is the Linux wc command. The Linux wc command is used to get a word count of text, but it can also be used to count lines, and in this case the size of text in bytes.

```
$ echo 'this is some text I want to encode' | wc -c
35
$ echo 'this is some text I want to encode' | base32 | wc -c
57
$ echo 'this is some text I want to encode' | base64 | wc -c
49
```

## 5 - Conclusion, and creating a bunch of files

It would have been nice to work out some examples that have to do with creating a collection of base64 files from a source folder and then back again but I ran into a problem. I was able to figure out this much when it comes to using the Linu find command to get a list of files and then use the exec option of find to create base 64 files.

```
$ find -type f -name '*.md' -exec bash -c 'base64 {} > {}.b64' ';'
```

This will result in a bunch of files with the b64 extension appended on the end and the content of each being base64 encoded. However the problem then is how do I go about creating a collection of files where each file is then just the original extension. I got as far as becoming aware of certain other commands such as cut, but gave up after a while.

So I have not yet discovered a way to go about quickly creating a bunch of files with base64 and then convert them back again with the original files names. At least I have not found a way to do so with bash commands alone anyway, there is a [nodejs project that I made a while ago](/2019/10/29/nodejs-cli-hexer/) where I as able to get something together that did just that.