---
title: The Linux Home Folder
date: 2021-11-12 11:23:00
tags: [linux]
layout: post
categories: linux
id: 937
updated: 2021-11-13 13:44:09
version: 1.17
---

In a Linux system the [Linux home](https://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/home.html) folder is where all the personal files are stored for each user of a system. This is not just a place to store data files like documents, pictures, and so forth but also things like user configuration settings, and bash scripts that are to run when the user first logs in. There is also thinking not just in terms of this kind of folder in terms of a Linux system but also what the [equivalent home folder location](https://en.wikipedia.org/wiki/Home_directory) is for this kind of folder on other operating systems also.

In this post I will be going over some basic things that center around the home folder in Linux then, as well as other topics of concern when it comes to how to work out code that will store settings, and open and create files in an operating system independent kind of way.

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

One thing I think I should write about when it comes to the home folder is the [.bashrc file](https://www.journaldev.com/41479/bashrc-file-in-linux) that should be located at the root of a users home folder. This is a real impotent file so of course I am going to write a section on it. Simply put this is a [bash file](/2020/11/27/linux-bash-script/) in which the code will run each time for a new shell instance for the user in which this file is placed. There are a number of things that can be done with this file such as customizing the the command prompt, as well as setting up command aliases so a lengthly command can instate just be a single word, or even letter.

### 2.1 - Using the .bashrc file to load a bash aliases file

A .bashrc file should all ready be there to begin with, if so, an you do not know much about these kinds of files, it might be best to just leave it alone. However it can not hut to just look at it if you are still new to this sort of thing. With that said when it comes to taking a moment to look over the .bashrc file in a home folder for a user you might see something that looks like this.

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

I could just call the alias bash built in command directly in the .bashrc file, but often some starting scripts with various systems will do something like this that involves placing command alises in another hidden file that is septate from the bashrc file which is what this does.

### 2.2 - basic .bash\_aliases example

So then the .bash\_aliases files is where I can write aliases for commands for example I can have a ll command that will be a short hand for ls -l. This can also prove to be very useful for very long commands that have many options that I call often. In such a case it is silly to type such lengthy commands, over an over again when I can just have that as an alias.

```
# some more ls aliases
alias ll='ls -l'
alias la='ls -A'
alias l='ls -CF'
```

## 3 - Using nodejs

As much as I love Linux and bash I am always thinking more in terms of how to go about writing scripts that will work in operating systems in general beyond just that of Linux systems. So with that said there is writing scripts not in bash, but javaScript and making use of features in [nodejs](/2017/04/05/nodejs-hello-world/) such as the home dir method of the built in os module as a way to get the hoe folder.

### 3.1 - The os module home dir method

The home dir method of the os module can be used to get the hold folder for the current user in A Linux system. However what is great about this is that if I run this same script in Windows of MaxOS I will get the equivalent location in the Users folders in such systems.

```js
#!/bin/node
const os = require('os');
console.log(os.homedir());
```

## 4 - Conclusion

The home folder is just one of many note worthing folders at the root folder of a Linux system. So there are a whole lot more posts like this to write in the future when it comes to learning more about the various folders and what they are used for. For example there is looking into what the \/bin folder is all about and how that compared to the \/sbin folder. It would seem that the difference has a lot to do with binaries that are very closely tied to starting and using Linux by itself in a very striped down way, and additional binaries that are not so critical to Linux itself. However getting into all of that would be a matter of a whole other post on Linux folders.

