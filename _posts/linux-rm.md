---
title: Linux rm command for deleting files from the command line
date: 2021-07-05 10:57:00
tags: [linux]
layout: post
categories: linux
id: 903
updated: 2021-07-05 16:25:52
version: 1.17
---

The [Linux rm](https://linux.die.net/man/1/rm) command is how to go about deleting files from the command line. The basic use case of the command is simple enough I just need to call the command and pass the path to the file that I want to delete as the first and only argument. However things might get a little complicated when it comes to things like, deleting folders, deleting files recursively, or running into problems with things that have to do with files access permissions. So in this post I will be going over a few simple example of the Linux rm command, and also write about some other closely related topics when it comes to creating files also.

<!-- more -->


## 1 - Basic Linux rm command example

In this example I am using the [Linux echo](/2019/08/15/linux-echo/) command, and [Linux redirection](/2020/10/02/linux-redirection/) to create a simple test text file. I can then use the Linux ls command as a way to list the contents of the current working folder, this will confirm that the file is there. Now to use the rm command to delete the file, for this I just need to call rm and then give a path to the file that I want to delete.

```
$ echo 'test' > test.txt
$ ls *.txt
test.txt
$ rm test.txt
$ ls *.txt
ls: cannot access '*.txt': No such file or directory
```

## 2 - Remove an empty folder

To remove an empty folder I can use the -d option to do so. In this example I am using the [Linux mkdir](/2021/06/30/linux-mkdir/) command to create an empty folder, and then then use ls to make sure it is there. I am then using the rm command with the -d option to then just go ahead and dlete the file.

```
$ mkdir "foo"
$ ls -d */
foo/
$ rm -d foo
$ ls -d */
ls: cannot access '*/': No such file or directory
```

In many cases I will want to delete not just a folder, but all the consents of the folder although though to do this I will just need to be aware of one more additional typically options that is used to preform a recursive deleting of a folder and all its contents.

## 3 Remove a folder and all of its contents

In order to delete a folder and all of its contents I will need to use the -d option as well as the -r option. This will result in deleting not just the folder itself, but recursively delete all folders and files in the folder also.

```
$ mkdir -p "foo/bar"
$ mkdir -p "foo/baz/foobar"
$ echo "foo" > "./foo/foo.txt"
$ echo "bar" > "./foo//bar/bar1.txt"
$ echo "bar" > "./foo//bar/bar2.txt"
$ echo "foobar" > "./foo//baz/foobar/foobar.txt"
$ ls foo
bar  baz  foo.txt
$ rm -rd foo
$ ls foo
ls: cannot access 'foo': No such file or directory
```

## 4 - Conclusion

So then the rm command is how to go about deleting files, folders, and all the contents of a folder including the folder. In most cases I can use just the rm command by itself in order to delete what I want to delete, but in some cases I might run into problems with file access permissions. If I have the authority to do so I can use a command like [chmod](/2020/11/13/linux-chmod/) along with sudo to change the permissions of a file, and then delete it.