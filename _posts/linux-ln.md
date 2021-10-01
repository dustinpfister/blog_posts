---
title: The Linux ln command for creating soft and hard links to files and folders
date: 2021-10-01 06:37:00
tags: [linux]
layout: post
categories: linux
id: 931
updated: 2021-10-01 12:10:46
version: 1.19
---

In todays post on Linux commands I will be going over a few quick examples of the [Linux ln command](https://linux.die.net/man/1/ln) that is used to create soft and hard links to files and folders in a Linux system. Say you are in a situation in which you have some kind of actual resource in one location, but you also want to have the same resource in another location in the same file system. One way would be to use the Linux cp command to just make one or more copies of the resource I suppose, however there are some draw backs to this. For one thing I edn up with redundant copes of the same resource. Another draw back is that if I make changes to the original copy of the resource that will not effect the copy. In some cases I guess that is a good thing as that is one of the major reason why to make a copy of something after all, however what if I want to just make a link to the same resource at another location? The way to do so in Linux would be to make a hard or soft link.

<!-- more -->

## 1 - Soft or Symbolic links using the Linux ln command

Although the default is hard links actually it might be a good idea to start out with soft links. The main difference between soft links and hard links is that a soft link will just store a location to a file, and not a link to the actual data. So then when a source file is deleted that will in turn effect the soft link as the resource is no longer there. More on this when it comes to getting into hard links but for now lets just start out with this simple kind of link.

### 1.1 - Basic soft link example

First off here is a basic example of making a soft link to a text file. I start out by using the [cd command](/2021/02/10/linux-cd/) to change the current working folder to the home folder of the current user as that is one place where it is okay to create temporary files for any user. Anyway the next step might be to create some kind of simple test file to just serve as a resource to create a soft link to, in this case I am using the [Linux echo](/2019/08/15/linux-echo/) command combined with [redirection](/2020/10/02/linux-redirection/) to quickly create such a file from the command line.

Now that I am in a place to create resources and links, and I have something to link to, I can now go ahead and create a link. So now I call the ln command and make sure to pass the -s option to indicated that I want to make a soft link to a file. The next [position parameter](/2020/12/10/linux-bash-script-parameters-positional/) to give is the path to the resource that I want to link to in this case the foo.txt file that is in the same location as this link I am making. After that I given a name for the symbolic or soft link if you prefer in this case I went with fooLink.

```
$ cd ~
$ echo "hello world" > foo.txt
$ ln -s foo.txt fooLink
$ cat fooLink
hello world
$ rm fooLink
$ rm foo.txt
```

So now I have a soft link to to the text file that I made, as such I just want to do something to make sure that it is working. So I used the [Linux cat command](/2020/11/11/linux-cat/) to read whatever the fooLink points to and spit it out to the standard output of the console. If all goes well it should have the same result as directly using the foo.txt file as what I am given to the cat command, and it would seem that it does because that is the result that I get in the console. AFter that it is just a question of cleaning up the test files that I have made so for that I use the rm command to remove the source file and link to it.

### 1.2 - list symbolic links

So now that I know how to create a symbolic link there is now the question of how to go about listing and testing for symbolic links. There is a lot to know about the [ls command](/2020/10/14/linux-ls/) actually. Sure for the most part one just types ls at a bash prompt and the contents of the current working directly is what ends up being listen. However there is still a create deal to write about when it comes to the various options, and the format of the output.

Other useful topics to get into in detail would be the topic of [piping](/2020/10/09/linux-pipe/) and the [grep command](/2020/09/14/linux-grep/). However I do not want to get to far off topic, and if you need or want to read up more on these commands in detail I have wrote posts on them, and if all else fails there is the man pages.

Anyway when it comes to getting back to the topic of listing links there is using the ls command with the -l, and -a options. When doing so a link will be shown with a certain pattern. So then that output of the ls command with the -la options can be piled to the standard input of the grep command, that can then filter the output to just show lines with that patten.

```
$ echo "hello world" > foo.txt
$ ln -s foo.txt fooLink
$ ls -la | grep "\->"
lrwxrwxrwx 1 pi pi    7 Sep 25 10:50 fooLink -> foo.txt
$ rm fooLink
$ rm foo.txt
```

### 1.3 - Testing for a soft link

When it comes to testing for a soft link there is using the Linux test command.

```
$ echo "hello world" > foo.txt
$ ln -s foo.txt fooLink
$ test -h foo.txt; echo $?
1
$ test -h fooLink; echo $?
0
$ rm fooLink
$ rm foo.txt
```

## 2 - Hard Links using Linux ln

Now that I have got soft links out of the way there is now the topic of hard links. Both soft links and hard links do more or less the same thing, but with one very important difference. A soft link is just a link to a path, but not the actual data in the file system.

### 2.1 - Basic hard link example

So then a basic hard link example might be more or less the same as a soft link example however I omit the -s option as the default for the ln command is actually a hard link. Testing out the hard link though might involve deleting the test resource, and doing so should still result in the hard link working actually.

```
$ echo "hello world" > foo.txt
$ ln foo.txt fooLink
$ rm foo.txt
$ cat fooLink
hello world
$ rm fooLink
```

## 3 - The force option

In some cases I might want to use the force option of the ln command. This is what will need to be used in order to overwrite a link. If I create a link to a file and then try to create the same link over but to a new file that will result in an error. There are then two options I can delete the link and create it again, or I can use, you guessed it the force option.

### 3.1 - Basic force option example

To force the creating of a link I just need to use the -f option along with any additional options I want to set before giving the resource and link paths.

```
$ echo "hello world" > foo.txt
$ echo "hello other World" > foo2.txt
$ ln -s foo.txt fooLink
$ cat fooLink
hello world
$ ln -sf foo2.txt fooLink
$ cat fooLink
$ rm fooLink
$ rm foo.txt
$ rm foo2.txt
```

## 4 - Conclusion

The Linux ln command is then something that will come in handy now and then when I want to create a link to a resource rather than a redundant copy of it. There is not just making links but also testing for them, and finding out if it is a soft or hard link. When it comes to looking in the \/usr\/bin folder many of the binaries there are not binaries but links to binaries that are located in other folders. Some times doing something like this is called for when it comes to having more than one version of the same binary on a system, for example say I have node14 and not16 binaries located in a folder on a system, in such a case there is the question of what version of node should be the \/usr\/bin\/node binary. It count be an actual binary file sure, or it could be a symbolic link to such a binary located elsewhere.

As with many of my posts on Linux thus far I have a [github repository](https://github.com/dustinpfister/demos_linux/tree/master/forpost/linux-ln) in which I park my files that I have made that I am writing about for this post.
