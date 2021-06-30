---
title: Linux mkdir -p and making folders in general
date: 2021-06-30 10:38:00
tags: [linux]
layout: post
categories: linux
id: 900
updated: 2021-06-30 11:25:29
version: 1.1
---

In Linux there is the bash command mkdir that can be used to make a directory, or folder if you prefer in the command line. However theer are also a few more options to write about when it comes to this command alone such as the mkdir -p command that can be used to create nested folders as needed if they are not there. There is also the midir -m options that will allow for me to set what the file access permissions are for the folder. Speaking of permissions there are also maybe a few more things to write about when it comes to other commands that will typically be used in conjunction with mkdir such as chmod as a way to set permissions of folders without the -m option, and contents of files, as well as the ls command to list folders, permissions of folders and the contents of such folders.

<!-- more -->

## 1 - Linux mkdir basic example

```
$ mkdir "foo"
$ ls -d f*
foo
$ rm -d "foo"
```

## 2 - The mkdir -p command

```

mkdir "foo"
mkdir "foo" 
# mkdir: cannot create directory ‘foo’: File exists

mkdir -p "foo"
mkdir -p "foo/bar/baz"

ls -d f*

rm -rd "foo"
```

## 3 - Setting the permissions for the new folders with mkdir -m

```
$ mkdir -p "foo"
$ ls -ld foo
drwxr-xr-x 2 pi pi 4096 Jun 30 09:53 foo
$ chmod 777 foo
$ ls -ld foo
drwxrwxrwx 2 pi pi 4096 Jun 30 09:53 foo
$ mkdir -p -m 777 "bar"
$ ls -ld bar
drwxrwxrwx 2 pi pi 4096 Jun 30 09:53 bar
$ rm -rd "foo"
$ rm -rd "bar"
```

