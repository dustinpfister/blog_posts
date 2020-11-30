---
title: Linux Bashrc file command aliases
date: 2020-11-30 12:409:00
tags: [linux]
layout: post
categories: linux
id: 751
updated: 2020-11-30 12:22:30
version: 1.1
---

In the home folder of most Linuyx systems that use bash as the command shell there should be a hidden file called .bashrc. This file will be called each time I start a new terminal window, so it is a good place to do things like set what the format of the bash command prompt should be. However there are many other things that I can do with the script, and one such thing that is pretty helpful is setting up some aliases for commands.

<!-- more -->

## 1 - First off the ~/.bashrc file

First off in the home folder oof the current user there should be a hidden .bashrc file.

```
$ cd ~
$ cat .bashrc
```

I could write aliases in the .bashrc file itself, however I think that it is a good idea to keep them in one or more indepedant files. So in the .bashrc file there should be something like this:

```
# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

If this bash cdoe is there then I just need to create a .bash_aliases file, and in this file I will be setting up some aliases for commands that I find myself typing all the time.