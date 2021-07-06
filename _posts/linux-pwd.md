---
title: Linux pwd command, and other things path related
date: 2021-07-06 11:52:00
tags: [linux]
layout: post
categories: linux
id: 904
updated: 2021-07-06 12:47:45
version: 1.16
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

So then there is knowing how to change the current working path to the home folder of the current user. Speaking of the current user the who am i command can be used to find out who the current user is. So in this example I am calling who am i to know the name of the current user, and then using the cd command with \~ to change to the home path for the current user. I am then using the pwd command to log the current working path ans sure enough it is the home folder for the current user.

```
$ whoami
pi
$ cd ~
$ pwd
/home/pi
```

### 2.2 - Back one from the current path or relative path

What if I am at a current location and I just want to go to a location that is one folder down from where I am now? The way to do that would be to use cd .. to go down one level.

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

Changing to the root path would be cd \/ which would also be an example of an absolute rather than relative path. That is that being at a current location and then using a path involving .. or a folder name that does not begin with \/ can be though of a kind of relative path, as I am changing to a location that should be relative to another location. ANy path  that begins with \/ is then not an example of this kind of relative path but an absolute path in which is is just simple the absolute path to a location rather than a relative one and changing to root would be the most basic example of such a path.

```
$ cd /
$ pwd
/
```

### 2.4 - folder with spaces

One thing that I got stuck on once was how to change the current working path to a folder that contains spaces. The trick here is to just think more in terms of a string value as a single argument, rather than something that can be interpreted as more than one argument. So the folder name just needs to be contained in a set of quotation marks.

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

The pwd command is one way to go about getting the current working path, but another is to make use of the environment variable that should contain the same value. In this example I am using the [Linux echo](/2019/08/15/linux-echo/) command to echo back the current value of the $PWD environment variable that should be the same value that is returned by the Linux pwd command.

```
$ cd /usr/bin
$ echo $PWD
```

## 4 - Bash scripts

It might be called for now and then to just call the Linux pwd command now and then when working in a command line interface just to known what the current working path is. However the command will also come in handy when it comes to working out things that have to do with piping the output of the pwd command to another command, and also in the process of creating bash scripts.

### 4.1 - is home file

In this example I am making a bash script that will return 0 in the event that the current working path is contained in the home folder, and 1 if it is not. I am doing this my piping the output of the Linux pwd command into the standard output of grep, and then using that to check if the path starts off with home or not.

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

