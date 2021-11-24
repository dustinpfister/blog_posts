---
title: The Linux tree command
date: 2021-11-23 11:52:00
tags: [linux]
layout: post
categories: linux
id: 941
updated: 2021-11-24 11:18:50
version: 1.5
---

The [Linux tree command](https://linux.die.net/man/1/tree) is a way to go about listing the contents of a folder in a tree like format. So then the tree command is an alternative command to that of the [Linux ls command](/2020/10/14/linux-ls/) that is another way to go about listing folder contents. By default it would seem like the Linux tree command will list contents of folders recursively when it comes to nested folders and the contents of such folders, which is one reason why one of the first options that one should be familiar with when using the Linux tree command would be the -L option which can be used to set a depth for this recursive listing of contents. Another major thing that comes to mind is the subject of short and hard links that can be created with the [Linux ln](/2021/10/01/linux-ln/) command, and what happens when the tree command follows one that links to the folder itself. So then there are are few things to cover in this post when it comes to the Linux tree command as well as a number of things that will come up when using such a command.

<!-- more -->


## 1 - The basics of the Linux tree command

In this section I will be starting out with just a few quick, basic examples of the Linux tree command.

### 1.1 - basic lodash tree example

For this example of the Linux tree command I am using the Linux mkdir command to create a path that consists of a root folder called foo and a single sub folder called bat within this foo folder. I am then using the Linux echo command combined with redirection to create files in these folders. AFyer that I call the tree command and pass the foo folder as the first and only argument and the result is a tree like structure that shows what is going on with this simple example folder thus far.

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

That will be it for now when it comes to the Linux tree command  for this post at least.

