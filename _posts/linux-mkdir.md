---
title: Linux mkdir -p and making folders in general
date: 2021-06-30 10:38:00
tags: [linux]
layout: post
categories: linux
id: 900
updated: 2021-06-30 12:58:51
version: 1.10
---

In Linux there is the command [mkdir](https://linux.die.net/man/1/mkdir) that can be used to make a directory, or folder if you prefer in the command line. However there are also a few more options to write about when it comes to this command alone such as the [mkdir -p command](https://unix.stackexchange.com/questions/84191/how-to-create-nested-directory-in-a-single-command) that can be used to create nested folders as needed if they are not there. There is also the midir -m option that will allow for me to set what the file access permissions are for the folder. Speaking of permissions there are also maybe a few more things to write about when it comes to other commands that will typically be used in conjunction with mkdir such as [chmod](https://man7.org/linux/man-pages/man1/chmod.1.html) as a way to set permissions of folders without the -m option, and contents of files, as well as the [ls command](/2020/10/14/linux-ls/) to list folders, permissions of folders and the contents of such folders.

<!-- more -->

## 1 - Linux mkdir basic example

First off a basic example of the mkdir command is in order, and for that there is just calling the command at a current working directory and passing the name of the folder that I want to create. If I just want to simply create a single empty folder, with the default file access permissions, then just calling the mkdir command followed by the name of the folder will do. To confirm that the folder was created I can use the ls command with the -d options followed by the name of the folder. After that if for some reason I want to delete the folder I can use the Linux rm command with the -d option and pass the name of the folder.

```
$ mkdir "foo"
$ ls -d f*
foo
$ rm -d "foo"
```

## 2 - The mkdir -p command

One major option of the mkdir command is the -p option that stands for parent. The deal with this is that when I attempt to create a folder that is all ready there, this will result in an error. Also if I want to create not just one folder but a path of folders some of which may or may not be there this too will not work without the -p option.

```

mkdir "foo"
mkdir "foo" 
# mkdir: cannot create directory ‘foo’: File exists

mkdir -p "foo"
mkdir -p "foo/bar/baz"

ls -d f*

rm -rd "foo"
```

So then the mkdir -p command saves me the trouble of creating a folder, then using the cd command to change the current working path to that new folder, call the mkdir command again, and so forth, for any and all nested folders that I want to make.

## 3 - Setting the permissions for the new folders with mkdir -m

Yet another option of interest would be the -m option of the mkdir command. This command allows for me to set what the file access permissions would be without having to bother with the chmod command. I will not be getting into the details of what file access permissions are in detail here as I have all ready done so in my post on the [Linux chmod](/2020/11/13/linux-chmod/) command. However I will say that the default permissions of the mkdir command seem to be 755, if for example I want to set the permissions to 777 which would be full permissions, then one way to do so would be to use this -m option of the command to overred that default permission setting.

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

## 4 - Conclusion

The Linux mkdir command is then how to go about creating a new folder in a command line interface, and it is then also a way to go about creating one or more folders in [bash scripts](/2020/11/27/linux-bash-script/) also. The command is typically not used by itself though the ls command with the -l and -d options can eb used to list folders,the chmod command can be used to set permissions for any folders that have been created before hand, and the rm command is hot to go about deleting them.
