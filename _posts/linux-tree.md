---
title: The Linux tree command
date: 2021-11-23 11:52:00
tags: [linux]
layout: post
categories: linux
id: 941
updated: 2021-11-24 11:29:20
version: 1.9
---

The [Linux tree command](https://linux.die.net/man/1/tree) is a way to go about listing the contents of a folder in a tree like format. So then the tree command is an alternative command to that of the [Linux ls command](/2020/10/14/linux-ls/) that is another way to go about listing folder contents. By default it would seem like the Linux tree command will list contents of folders recursively when it comes to nested folders and the contents of such folders, which is one reason why one of the first options that one should be familiar with when using the Linux tree command would be the -L option which can be used to set a depth for this recursive listing of contents. Another major thing that comes to mind is the subject of short and hard links that can be created with the [Linux ln](/2021/10/01/linux-ln/) command, and what happens when the tree command follows one that links to the folder itself. So then there are are few things to cover in this post when it comes to the Linux tree command as well as a number of things that will come up when using such a command.

<!-- more -->


## 1 - The basics of the Linux tree command

In this section I will be starting out with just a few quick, basic examples of the Linux tree command. While I am at it I will also be working with some additional commands as well as bash features on top of just that of the tree command. In most Linux systems the tree command should all ready be there to being with, bit in some cases it might need to be installed first.

### 1.1 - basic lodash tree example

For this example of the Linux tree command I am using the [Linux mkdir](/2021/06/30/linux-mkdir/) command to create a path that consists of a root folder called foo and a single sub folder called bat within this foo folder. I am then using the [Linux echo](/2019/08/15/linux-echo/) command combined with [redirection](/2020/10/02/linux-redirection/) to create files in these folders. AFyer that I call the tree command and pass the foo folder as the first and only argument and the result is a tree like structure that shows what is going on with this simple example folder thus far.

```
$ mkdir -p foo/bar
$ echo "Hello" > foo/f1.txt
$ echo "World" > foo/f2.txt
$ echo "Hello World" > foo/bar/f3.txt
$ tree foo
foo
├── bar
│   └── f3.txt
├── f1.txt
└── f2.txt

1 directory, 3 files
```

### 1.2 - Setting the depth of the Linux tree command

When it comes to calling the Linux tree command in a new folder that might just have a few files and thats it, or maybe just one nested folder that will result in a manageable amount of information being spit out to the console. However it the command is used in a folder in which a great deal of content branches off from that location that can result in a whole lot being spit out to the console. So then one of the first options to be aware of to help with this might be the -L option that can be used to set the depth of recursive listing of contents.

```
$ cd ~
$ tree -L 1
```

### 1.3 - Symbolic links and Linux tree

There might be a degree of concern when it comes to symbolic links, mainly symbolic links the will result in recursively looping. However it would seem that by default the Linux tree command will not follow symbolic links, and that and option needs to be used in order to get the Linux tree command to follow links. Even then I have found that when the -I option is used it will not result in infinite recursion.

```
$ mkdir -p foo/bar
$ echo "Hello" > foo/f1.txt
$ echo "World" > foo/f2.txt
$ echo "Hello World" > foo/bar/f3.txt
$ cd foo
$ ln -s . baz
$ tree -I foo
foo
├── bar
│   └── f3.txt
├── f1.txt
└── f2.txt

1 directory, 3 files
```

## 2 - Conclusion

That will be it for now when it comes to the Linux tree command for this post at least when it comes to having a way to check out what is going on with a folder. The other main command that comes to mind would of course be the ls command which is often the first and for most command to go about listing the contents of folders actually. I did not cover every little detai when it comes to the Linux tree command in this post, but when it comes to that there is also look into into the man page. When I often like to do with these posts is to not just cover the use of a single command, but also at least touch base on all kinds of other features of bash while I am at it to help get a better idea of how a command can be used in certain situations.


