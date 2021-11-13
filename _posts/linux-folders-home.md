---
title: The Linux Home Folder
date: 2021-11-12 11:23:00
tags: [linux]
layout: post
categories: linux
id: 937
updated: 2021-11-13 08:56:55
version: 1.10
---

In a Linux system the [Linux home](https://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/home.html) folder is where all the personal files are stored for each user of a system. This is not just a place to store data files like documents, pictures, and so forth but also things like user configuration settings, and bash scripts that are to run when the user first logs in. There is also thinking not just in terms of this kind of folder in terms of a Linux system but also what the [equivalent home folder location](https://en.wikipedia.org/wiki/Home_directory) is for this kind of folder on other operating systems also.

<!-- more -->

## 1 - Linux home basics

There are a few things to cover when it comes to the very basics of the home folder in Linux systems. For one thing there is just simply knowing how to get to it in a bash console for one thing. There is also at least a few more things to write about when it comes to someone who is new to bash and Linux such as the Home environment variable and how to use other commands and bash features to list the contents of the home folder.

### 1.1 - Using the cd command to change the working folder to the home folder

There are a few ways of how to go about changing the current working directory to the home folder, one of which would be to type in an absolute path to it with the [Linux cd](/2021/02/10/linux-cd/) command in you know the user name of the current user. However another way to go about doing so is to use a ~ for the path to given to the cd command. This will always change the current working folder to the home folder of the current user.

```
$ cd ~
$ pwd
```

### 1.2 - The \$HOME environment variable

There is also a \$HOME [environment variable](/2020/10/29/linux-environment-variables/) that is a string value for the current home path. So then this can be used with a command like the [Linux echo](/2019/08/15/linux-echo/) command as a way to spit out the home path to the standard output.

```
$ echo $HOME
```

### 1.3 - Using the Linux ls command to list the contents of the home folder

To list the contents of the home folder I can use the [Linux ls](/2020/10/14/linux-ls/) command and just use a ~ for the path to give when calling ls, on top of that I might want to use the -a option to list everything that is located in the root level of the home folder, including hidden files and folders.

```
$ ls ~ -a
```


## 2 - The .bashrc file

One thing I think I should write about when it comes to the home folder is the .bashrc file that should be located at the root of a users home folder. This is a real impotent file so of course I am going to write a section on it. Simply put this is a bash file in which the code will run each time for a new shell instance for the user in which this file is placed. There are a number of things that can be done with this file such as customizing the the command prompt, as well as setting up command aliases so a lengthly command can instate just be a single word, or even letter.

### 2.1 - basic .bashrc file example

```
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

### 2.2 - basic .bash\_aliases example

```
# some more ls aliases
alias ll='ls -l'
alias la='ls -A'
alias l='ls -CF'
```

## 3 - Using nodejs

As much as I love Linux and bash I am always thinking more in terms of how to go about writing scripts that will work in operating systems in general beyond just that of Linux systems. So with that said there is writing scripts not in bash, but javaScript and making use of features in nodejs such as the home dir method of the built in os module as a way to get the hoe folder.

### 3.1 - The os module home dir method

```js
#!/bin/node
const os = require('os');
console.log(os.homedir());
```

## 4 - Conclusion

The home folder is just one of many note worthing folders at the root folder of a Linux system. So there are a whole lot more posts like this to write in the future when it comes to learning more about the various folders and what they are used for.

