---
title: Change Bash prompt in Raspberry PI OS and most Linux Systems
date: 2020-11-18 12:53:00
tags: [linux]
layout: post
categories: linux
id: 744
updated: 2020-11-18 13:18:08
version: 1.2
---

One of the many little things that I like to change when working with a clean image of Raspberry PI OS is the bash prompt format. The file of interest is the .bashrc file that should be found in the root folder of the home folder of the current user to which I would like to change the bash prompt for. There are several options when it comes to how to go about coming up with a format when it comes to having the current user, full path of the current working path, and so forth. That is of course one of the reasons why I would like to change it actually.

By default when I start a new lxterminal session I get a bash prompt that will contain the current full path of the current working directoy. Maybe this is called for when it comes to people that are new to Linux and bash, but I have been at this for a while, and long story short I know about the pwd command. So there is at least one little chnage that I would like to make this is to just have the current base name of the current working directoty in the prompt.

In any case this post will be a quick overview of how to go about [changing what the prompt is for a bash shell](https://www.cyberciti.biz/tips/howto-linux-unix-bash-shell-setup-prompt.html) session my chaning the value of the PS1 variable, and also how to make that change stick by ediitng the ~/.bashrc file. In this post I am using Raspberry PI OS, but the process should be simular in just about all Linux systems that use bash.

<!-- more -->

## 2 - Edit default ~/.bashrc file in Raspberry PI OS

```
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w \$\[\033[00m\] '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
```

### 2.1 - Just change the prompt so it will give a baseName rather than the full path name

I really just want to change that one little thing that bothers me which is the full current working path showing up in each command line prompt. This is a very simple fix as I just need to chnage the lower case \\w to an upper case \\W.

```
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\W \$\[\033[00m\] '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\W\$ '
fi
```

Ahh much better.

```
pi@raspberrypi:_posts $ 
```