---
title: Linux redirection of standard output to a file
date: 2020-10-02 13:15:00
tags: [linux]
layout: post
categories: linux
id: 714
updated: 2020-11-28 10:48:48
version: 1.13
---

One thing that comes up for me often when working something out with one or more Linux commands is to have a way to write the standard output of what happens to a file rather than the console window. I guess if I wanted to I could just copy and paste the output to a text editor, but there must be a more professional way to do it in the command line right? 

When it comes to [piping](https://opensource.com/article/18/8/introduction-pipes-linux) I guess I could pipe the output alone to a text editor such as [nano](/2020/11/24/linux-nano/), but there is another option called [Linux redirection](https://en.wikipedia.org/wiki/Redirection_%28computing%29) where I would not need to bother with an editor. 

So in this post I will be writing a thing or two about redirection in Linux. and how it can be used with, or as a replacement to a Linux pipeline of two or more commands to and editor.

<!-- more -->

## 1 - Linux redirection and what to know first

There are maybe a few basic things to cover first before getting into redirection. That is before getting into how to go about redirecting standatd output of a command to a file it is first important to know a thing or two about what standard output is to begin with. There are also some related topics that I should at least touch base on before continuing on to redirection such as knowing what piping is, and how it can be used to pipe two or more commands togeather.

So in this section I will be going over some quck basics of what to knwo before getting into redirection.

### 1.1 - The basic idea of standard output

One way to create standard output is to use the Linux Echo command, this command will just echo a string value given as an argument as standard output.

```
$ echo "hello world"
hello world
```

There are all kinds of commnands that will produce standard output, it is the standard stream where the result of a command will be spit out to. With this simple hello world example of the Linux echo command the standard output of the command is ending up in the console, howeher that does not need to be the final place that it goes to. The standard output of this command could be piped to another command that would in turn place it somewhere other than the console depeding on the nature of the command.

For example I can take the standard output of the echo command, and pipe it into the standard input of the nano text editor.

```
$ echo "I want to pipe this into nano ==> " | nano -
```

This will result in the string value that I have cerated with the Linux Echo command to be the opening text in the nano text editor. In the editor I can make any changes that I want to the text, and then save the file at any location within the editor. So then this is one way to go about creating a file with some output from a Linux command, however there is another way that one might like better in most situstions and that is of course redirection which I will be getting to of course. First however I think that I should also touch base on standard input, and standard error a bit more before getting into some redurection examples.

### 1.2 - Standard input

```
$ cat | grep -e ".js$" | xargs echo "javaScript files: $1"
foo.js
hello there
bar.js
I like the linux
```

When done press ctrl+d, and then the output should be soemthing like this.

```
javaScript files:  foo.js bar.js
```

Tne standard input does not always have to be from the keyboard though, it can also be from another command, or it can be feed infrom a file or some other kind of stream. Linux redirection can also be used as a way to redirect standard inoput to come into a command from a file rather than the keyboard or a command.

## 2 - Basic Linux redirection of standard output using echo

So for this section I will be starting out with redirection and the [Linux echo](/2019/08/15/linux-echo/) command to just start out with the very basic of what redirection is all about. If you are not familiar with the echo command it is just a way to spit out text that I give via the command line as the output to the standard output of the console. This nature of the Linux echo command makes it a good command for working out very basic stuff with commands before moving on to something that actually solves a problem that I am having.

### 2.1 - Using echo to redirect to a file that will be created or written over

So to just simple redirect the text foo for example to a file rather than the standard output I just need to use a greater than symbol once between the command and then a path to the file that I want to create or write over again.

```
$ echo 'foo' > ~/foo.txt
```

So then this is the basic idea of what redirection is I take the standard output and have it stored in a file in my home path rather than the standard output. With something like this if the file is not there it will be created, and if it is there the text foo will replace anything else that might be there.

### 2.1 - appending to a file

Sometimes I might want to append what is in a file rather than just write over the file. To append I just need to use two greater than symbols rather than just one.

```
$ echo 'foo' >> ~/foo.txt
```

## 3 - redirect standard input from a file

I can also redirect the standard input just like I am doing with the standard output. The only thing I need to do is just use a less than symbol rather than a greater than symbol. So say I have a file with a list of id numbers I can use linux redirection to use the data in that file as the standard input of a command like cat, and then from there I can pipe the results of that to soemthing else.

```
$ cat < ~/post_id.txt | grep 'id: [0-9]*'
```

## 4 - redirection of standard error

## 5 - Linux redirection example uisng grep to get a list of blog post id numbers

Here is a real example that involves using [Linux grep](/2020/09/14/linux-grep/) to create a list of blog post id numbers. That is I have a whole bunch of markdown files that have id numbers at the top of each file, and I want a list of file names and id numbers. I use the Linux grep command to create the list that I want, but now I need a way to save that list to a file rather than just have it in the console window. So one way to go about doing this would be to use Linux redirection.

So each markdown file has some info about the file at the top like this:

```
---
title: Post 0 here we go!
id: 0
---
 
This is post id 0, this is just a demo post of a blog post mark down file.
 
<!-- more -->
 
Now lets get to the point here.
```

I can use grep to get a list of each file name, and the id feild of each set of data at the top like this.

```
$ grep '^id: [0-9]*' *.md > ./post_id.txt
```

Which will result in the list that I want in post\_id.txt.

```
post0.md:id: 0
post1.md:id: 1
```

I could then do additional checks to make sure that there are not any gaps, or more than one instance of the same id, but you get the basic idea. Linux redirection can be used in conjunction with the whole world of linux commands including grep to create usful lists and reports.

## 6 - Conclusion

[Linux redirection](https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-i-o-redirection) is yet another one of those things in Linux that I feel that I just need to take a moment to write a post on it in order to get everything solid with it, and to also have a resource that I can revise from time to time as I continue to learn more about how to go about taking things to the next level when it comes to becoming Linux competent. 

Linux redirection can be used with or in some cases as a replacement for Linux pipelines where I am piping the standard output as the input of another command. In addition redirection can be used to redirect bolt the standard output as well as the standard input of commands.