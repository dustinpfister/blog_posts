---
title: Linux pwd command, and other things path related
date: 2021-07-06 11:52:00
tags: [linux]
layout: post
categories: linux
id: 904
updated: 2021-07-06 12:26:11
version: 1.6
---

In [Linux the pwd command](https://man7.org/linux/man-pages/man1/pwd.1.html) can be used as one way to find out what the current working directly is in a command line interface. There are also a number of other ways to go about knowing this such as taking a look at the current state of a corresponding environment variable, or making use of a feature in a programing environment to do so. There is no just knowing what the current working directory is, but also how to go about changing what that directly is, with that said I have all ready wrote a quick post on the Linux cd command, however I think I should also wrte about that here also. 

The pwd command is fairly simple, there is not a great deal to wrote about the command itself, but there might be a bit more to write about when it comes to all kinds of little things that might surround the use of the pwd command. So in order to keep this post from being to thin I think I am going to have to write a little bit about how to get the current working path in some various programing languages also, and any other various topics that might come up. One important thing that comes to mind is knowing the difference between absolute and relative paths when changing the current working path, and other little details such as how to change to a folder that has spaces in it which I remember was a brief time sucker when I was first leaning a thing or two about bash.


<!-- more -->

## 1 - Linux pwd basic example

So first of maybe it would be best to start oit with just a basic example of the pwd command where I am just using the Linux cd command to change to a certain path, and then just call pwd to confirm that the current path is the path that I have changed to.


```
$ cd /usr/bin
$ pwd
/usr/bin
```

## 2 - More on the cd command

I have wrote a post on the Linux cd command in which I get into this topic in detail also, however I think I should also write a quick section on the cd command when writing about the pwd command. This is because I can not say that the pwd command is something that I ever just use on its own, it is always use in conjunction with other commands. With that said the first and foremost command that comes to mind with pwd is the cd command because there is not just knowing the current working path but also knowing how to change it.

### 2.1 - To the home folder of the current user

```
$ whoami
pi
$ cd ~
$ pwd
/home/pi
```

### 2.2 - Back one from the current path or relative path

```
$ whoami
pi
$ cd ~
$ pwd
/home/pi
$ cd ..
$ pwd
/home
```


### 2.3 - to root or absolute path

```
$ cd /
$ pwd
/
```

### 2.4 - folder with spaces

```
$ cd ~
$ mkdir "folder with space"
$ cd "folder with space"
$ pwd
/
$ cd ..
$ rm -d "folder with space"
```

## 3 - Environment variables

```
$ cd /usr/bin
$ echo $PWD
```

## 4 - Bash scripts

### 4.1 - is home file

```
pwd | grep -q "^/home"; echo $?
```

## 5 - javascript example using node

### 5.1 - Using process cwd method

```js
console.log( process.cwd() );
```

```
$ node pwd-node.js
```

## 6 - Conclusion

