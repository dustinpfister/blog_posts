---
title: The Linux head command
date: 2021-03-10 12:07:00
tags: [linux,js]
layout: post
categories: linux
id: 820
updated: 2021-03-10 15:30:17
version: 1.21
---

The [Linux head](https://man7.org/linux/man-pages/man1/head.1.html) command is a way to just print the first few lines, or the first few bytes of some output rather than the whole thing. In addition there is also the tail command that can be used as a way to print just the last few lines, or bytes of some output. In some situations this is just what I would want to do with some command output rather than make use of some other options, such as the less command, or redirection of output to a file that I can then option with a text editor like nano. However if I just want to not have everything spit out at me into the console, there are additional options that allow for me to just look over the full output. Still in this post I will be going over some examples of the head command in Linux, and also a whole bunch of other little related commands and examples that might come up in the process of doing so.

<!-- more -->

## 1 - Linux head basic examples

In this section I will be starting out with just some basic examples of the head command, and some related commands, and bash features such as piping, and the echo built in command. There are two general ways of going about using the head command, one is to get the first few lines of output, and the other is to get the first few bytes of output.

The echo built in command is just a way to go about creating some standard output, for the sake of just getting to know how to use the head command this command will work for the sake of just creating some dummy test output. In some real use case examples the output that I am piping into the Linux Head command might come from some other command such as the Linux ps command, or any number of other commands.

In these examples I am also making use of pipping as a way to pipe the standard output of the echo command into the standard input of the head command. I will not be getting into pipping and redirection in detail here, but if you are not up to speed with this part of working with bash I suggest to read up on this, and many other basic bash features.
### 1.1 - First few lines of standard output with the Linux Head -n option

First off lets start off with a basic example of the Linux echo command to create some test output that is a bunch of lines o text. Many Linux commands produce output in the form of some text that is then terminated with a line feed character, which composes a line of output. The echo command can be used to reproduce this with an argument in string form. The -e option can be used to evaluate the string and convert instances of the pattern \\n to a line feed character.

So then something like this:

```
$ echo -e "one\ntwo\nthree"
one
two
three
```

Will give me a few lines of some simple test output. I can then pipe this to the standard input of th head command and use the -n option of the head command to set the number of lines that I want from the top.

```
$ echo -e "one\ntwo\nthree" | head -n 1
one
```

So then that is the basic idea of the head command, it will give me a number of lines from the top. However it can also give me a set number of bytes also when using another option.

### 1.2 - First few bytes of standard output with the Linux Head -c option

The -c option of the Linux head command will also give me some data from the top of some output, however the -c option is what I can use to go with bytes of data, rather than lines of data.


```
$ echo "12345678" | head -c 1; echo ""
1
```

## 2 - The Linux cut command and head

The head command with the -n option will give me the first few lines, but what if I want just one string value in each line? For these kinds of situations the Linux head command can be used in conjunction with the Linux cut command.

For the sake of just a simple example of this once I again I am going to just use the Linux echo command to create some output. However now I am not just going to have one string value per line, but a few text values separated with a space between each value. I want to have just the first two lines, but I also only want to have the last string value of each line. For this I can of course pipe the output into the head command to get the first two lines, but then I can pipe the result of that once again into the Linux cut command to get just the last bit of text from each line of three strings where each string is separated by a space.

```
$ echo -e "1 a foo\n2 b bar\n3 c foobar" | head -n 2 | cut -d " " -f 3
foo
bar
```

The -d option of the cut command can be used to set what the delimiter is, which in this case is a space. The -f option of the cut command is then what I can use to set which string in the line that I want. So then the cut command along with the head command are two basic command line tools for formating command output into something that is a little more clean and gives me only what I want to know.

## 3 - Using ps, and sort to get a top ten processes that are eating up CPU run time

The [Linux ps](/2019/08/16/linux-ps/) command is one command that just about any Linux user should be aware of as a basic tool to check out what is going on with processes. In windows systems there is the task monitor, and in Linux desktop environments there is often many such tools that will give an idea of what one is dealing with in terms of background processes in a graphical interface type package also. However when it comes to working with what is built into Linux itself, that will be in just about every Linux system, even ones that do not have a desktop environment there is the Linux ps command.

I could go on about the Linux ps command in detail, but for the sake of this post I will just be going over one little example that of course makes use of the Linux head command.

```
$ ps -e -o pcpu,pid,comm | sort -rg | head -n 10
```

This will create a custom output of the Linux ps command that is the percent of CPU run time of a process along with the process id and name of the command for all processes running on the system. This output is then piped to the [Linux sort command](/2021/03/09/linux-sort/) to preform a general number sort for the first field in the output which is CPU run time and reverse the order. The full amount of this output will typically be a long list of processes, but I only want to know what the top 10 processes that are eating up CPU overhead are, so I can pipe the output once more to the Linux head command to get that shor list of processes.

## 4 - What if I want the full output, just not all at once

Sometimes I might not want to cut away all but the first few lines or bytes of output, sometimes I might just not want a whole bunch of output spit out at me all at once. When it comes to a desktop environment, I can often use th mouse as a way to scroll back threw the output, however if I am using a command line only environment that would not be an option. If I do a ps -e command the whole list of process on the system will be thrown out at me, and I can not go back to look at what is going on from the top down to the bottom. So then in this section I will be going over some options for taking a look at the full output of a command.

### 4.1 - Using the less command

One way to take a look at the full output of a command in a terminal only environment would be to pipe the output into the less command. When doing so I can then use the up and down arrows on my keyboard to take a look at the full output, once I am done I can then use the q key on the keyboard to quit.

```
$ ps -e | less
```

### 4.1 - Redirection

Another option in these kinds of situations is to make use of bash redirection. This feature of bash can be used to redirect the standard output of a command into a file, rather than the console. Once that is done I can then read the contents with a command line text editor such as vim, or nano.

```
$ ps -e > ~/out.txt; nano ~/out.txt
```

## 5 - The tail command

So then because there is a head command it would make sense that there is a command that will get the few last lines of bytes of some output also. Well there is and the name of that command is the Linux tail command. This command will take the same options for numbers of lines, or a count of bytes, however it will give that about that is at the end rather than the begging of some output.

```
$ echo -e "one\ntwo\nthree" | tail -n 1
three
```

## 6 - Using grep to get lines that fit a pattern rather than just what is at the start or end

Well I have covered how to get the first few lines of some output as well as the last few lines. I have covered many other commands that have to do with sorting, and current out unwanted content from some lines of output also. However there should also be a way to go about getting not just the first few lines, or the last few lines, but all lines that fit some kind of pattern. When it comes to doing this the first and foremost command that comes to mind is the [Linux grep](/2020/09/14/linux-grep/) that can be used to preform pattern matching tasks.

```
$ echo -e "one bar\n2 foo\nthree foobar\n4 baz" | grep -E '^[0-9]'
2 foo
4 baz
```

Getting into grep in depth would require a whole other post on the topic, and maybe even a few posts actually. This is one of those commands that will come up all the time in bash examples as it is the most flexible way to go about getting at just what it is that I want in a collection of output or content. Grep could be used to replace the head command, and the tail command while also providing everything in between. However it is a little involves to work with, there is not just using the command with a few options, learning a thing or two about regular expressions is required in order to use it effectively.

## 7 - Conclusion

So if I am ever in a situation in which I have a whole lot of output but I only want the top few lines or bytes of that output then the Linux head command is one command that I can use to get just that top about of data. The tail command will work with the same options, only it will give the last few lines or bytes of some output. There are also additional options when it comes to cutting out some output, or redirecting some output to a fine that I can then browser over when it comes to redirecting and things like the less command.

