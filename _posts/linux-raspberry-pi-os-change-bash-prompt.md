---
title: Change Bash prompt in Raspberry PI OS and most Linux Systems
date: 2020-11-18 12:53:00
tags: [linux]
layout: post
categories: linux
id: 744
updated: 2020-11-18 14:43:20
version: 1.4
---

One of the many little things that I like to change when working with a clean image of Raspberry PI OS is the bash prompt format. The file of interest is the .bashrc file that should be found in the root folder of the home folder of the current user to which I would like to change the bash prompt for. There are several options when it comes to how to go about coming up with a format when it comes to having the current user, full path of the current working path, and so forth. That is of course one of the reasons why I would like to change it actually.

By default when I start a new lxterminal session I get a bash prompt that will contain the current full path of the current working directoy. Maybe this is called for when it comes to people that are new to Linux and bash, but I have been at this for a while, and long story short I know about the pwd command. So there is at least one little chnage that I would like to make this is to just have the current base name of the current working directoty in the prompt.

In any case this post will be a quick overview of how to go about [changing what the prompt is for a bash shell](https://www.cyberciti.biz/tips/howto-linux-unix-bash-shell-setup-prompt.html) session my chaning the value of the PS1 variable, and also how to make that change stick by ediitng the ~/.bashrc file. In this post I am using Raspberry PI OS, but the process should be simular in just about all Linux systems that use bash.

<!-- more -->

## 1 - Change the $PS1 variable to work out a new bash prompt

### 1.1 - Use echo to find out what the current value of $PS1 is

```
pi@raspberrypi:~/Documents $ echo $PS1
${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w \$\[\033[00m\]
```

### 1.2 - Change it to whatever

I can add any kind of text that I want to make a weird, and fun prompt if I want actually. If I want my prompt to me some kind of text art type thing I can.

```
pi@raspberrypi:~ $ $ PS1="(☞ ͡° ͜ʖ ͡°)☞< check it ☞) \$ "
(☞ ͡° ͜ʖ ͡°)☞<check it) $ 
```

The good thing about this is that any change made this way will not last. All I have to do to go back to the way things are is to just close the terminal window, and start up a new one. The chnages will only be made fixed if I take a moment to edit a condif file or two. More on that later, but for now lets take a look at some more practical command prompts.

## 1.3 - Supper minimal $ only

At a minamum a prompt should have at least the $ symbol as long as this is the bash prompt for a non root user such as pi.

```
pi@raspberrypi:Documents $ PS1="\$ "
$ 
```

## 2 - Edit default ~/.bashrc file in Raspberry PI OS

In the default .bashrc file found as /home/pi/.bashrc where pi is the user of interest, or ~/.bashrc if you prefer. In any case there should be a hidden ./bashrc file for the current user, and in this file there are a few lines of interest that should look something liek this:

```
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w \$\[\033[00m\] '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
```

This is of cousre where the $PS1 varibel is being set each time I start a new interactive bash session in a termianl such as lxterminal. This is then where I would want to make changes to make any prompt format that I worked out stick each time I start a new terminal window, and reboot.

By Default if I do to to a path like ~/Documents/github\_dustinpfister/blog\_posts/\_posts then I end up getting a command prompt that looks like this:

```
pi@raspberrypi:~/Documents/github_dustinpfister/blog_posts/_posts $ 
```

This gets a little annoying for me, and as such I would liek to change it to something else. There are afew options that come to mind, but I might not want to just go with them just yet. In this section I wil be going over a few chnages that I experamented with. I guess I will also be going over a few quick basics whe it comes to editing bash scripts such as this.

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

However I might like to go with a yet even cleaner look actually. Do I really need the hostname there every time? I would have to say no. Often I only just have the one pi user account for a setup also, and even if I make some new users for a system I do know how to use the whoami command. So maybe it would be nice to go with a yet even cleaner look than this.