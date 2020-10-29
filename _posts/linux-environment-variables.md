---
title: Linux Environment Variables
date: 2020-10-29 13:53:00
tags: [linux]
layout: post
categories: linux
id: 732
updated: 2020-10-29 14:24:50
version: 1.2
---

When taking the time to get a little more into how to work with Linux, and Bash, the topic of [enviornement variabules](https://en.wikipedia.org/wiki/Environment_variable) will come up from time to time. These are bash values that can effect how programes work in Linux. For example there is a $HOME enviornement variabule that is the home path for the current user, many programes will use this value to know where to place a hidden config file for user settings then. There are many other such enviorment variabules, and there are also ways of creating ones own such variables when doing so is called for, often when working out some kind of bash script.

There is knowing how to at [least list, and set enviornement variabules](https://linuxize.com/post/how-to-set-and-list-environment-variables-in-linux/) for starters. However there is also doing a few simple bash comands, and maybe event go so far as to make a programe or two to really know why they are usfule.

In this post I will be starting out with the basics when it comes to enviorment varaibles in Linux. This is just listing what the current variables are, and setting and eleteing such variables.

<!-- more -->

## 1 - List current Linux Enviorement Variables

First things first, how does one know what the current state of enviorment varaibles are on a system? One such command for getting such a list would be the [linux printenv](https://man7.org/linux/man-pages/man1/printenv.1.html) command.

```
$ printenv
```

This will spit out all of the current enviorment varibels that there are. Take a monent to look over them and you should see a few of interest such as HOME, PATH, USER, PWD, and SHELL just to name a few. These variables store values that are inporatnt as they help to give programes a way to know things like the current user, and where to store files for this user.

## 2 - Printing the value of a Variable

If you know the Enviorment variable that you want to print that can be passed as an argument to printenv and just the value of that variable will be logged to the standard output.

```
$ printemv HOME
/home/dustin
```

However it might be best to get familout with how to go about pritning them in string values that can then be passed to any argument such as echo. To do this I just need to use the dollar sign symbol followed by the name of the variable, however if I am going to use it in a string I will want to place currly brackerts around the varaible name.

```
$ echo $HOME
/home/dustin
$ echo "The Home path is: ${HOME} and all is well"
The Home path is: /home/dustin and all is well
```