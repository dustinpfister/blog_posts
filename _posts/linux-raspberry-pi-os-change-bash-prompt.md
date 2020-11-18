---
title: Change Bash prompt in Raspberry PI OS and most Linux Systems
date: 2020-11-18 12:53:00
tags: [linux]
layout: post
categories: linux
id: 744
updated: 2020-11-18 15:33:41
version: 1.7
---

One of the many little things that I like to change when working with a clean image of Raspberry PI OS is the bash prompt format. The file of interest is the .bashrc file that should be found in the root folder of the home folder of the current user to which I would like to change the bash prompt for. There are several options when it comes to how to go about coming up with a format when it comes to having the current user, full path of the current working path, and so forth. That is of course one of the reasons why I would like to change it actually.

By default when I start a new lxterminal session I get a bash prompt that will contain the current full path of the current working directory. Maybe this is called for when it comes to people that are new to Linux and bash, but I have been at this for a while, and long story short I know about the pwd command. So there is at least one little change that I would like to make this is to just have the current base name of the current working directory in the prompt.

In any case this post will be a quick overview of how to go about [changing what the prompt is for a bash shell](https://www.cyberciti.biz/tips/howto-linux-unix-bash-shell-setup-prompt.html) session my changing the value of the PS1 variable, and also how to make that change stick by editing the ~/.bashrc file. In this post I am using Raspberry PI OS, but the process should be similar in just about all Linux systems that use bash.

<!-- more -->

## 1 - Change the $PS1 variable to work out a new bash prompt

First things first I need to know how to change the command prompt without making the changed fixed. To do this I just need to edit the value of the $PS1 variable. I also need to know what the current value of this variable is. In this section I will be going over the very basics of how to change the bash prompt format without getting into how to make the changes stay when opening a new terminal window or rebooting.

### 1.1 - Use echo to find out what the current value of $PS1 is

The Linux echo command is the basic tool that is used to log something to the standard output of a terminal. For the sake of this post I just need to know how to use it to get the current value of the $PS1 variable, do for that I just call echo followed by $PS1.

```
pi@raspberrypi:~/Documents $ echo $PS1
${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w \$\[\033[00m\]
```

it looks like a bit of a mess, but a lot of that has to do with the fact that I pulled this in lxterminal that supports color. Much of that has to do with setting, and reseting the current text color for the terminal window.

### 1.2 - Change it to whatever

I can add any kind of text that I want to make a weird, and fun prompt if I want actually. If I want my prompt to me some kind of text art type thing I can.

```
pi@raspberrypi:~/Documents $ PS1="(☞ ͡° ͜ʖ ͡°)☞< check it ☞) \$ "
(☞ ͡° ͜ʖ ͡°)☞<check it) $ 
```

The good thing about this is that any change made this way will not last. All I have to do to go back to the way things are is to just close the terminal window, and start up a new one. The changes will only be made fixed if I take a moment to edit a config file or two. More on that later, but for now lets take a look at some more practical command prompts.

## 1.3 - Supper minimal $ only

At a minimum a prompt should have at least the $ symbol as long as this is the bash prompt for a non root user such as pi. The \\S backslash-escaped special character should do just that for the .bashrc file in the home folder for the default pi user name. In addition it should also print the \# symbol for root but I do not think I have to worry about that here in the .bashrc file for a non root user.

```
pi@raspberrypi:Documents $ PS1="\$ "
$ 
```

I do like this kind of prompt, but often I think that I should have at least a little info right there in the prompt, so lest look at least one more example.

### 1.4 - This looks good

This kind of prompt looks good for me, it just gives the current user, and just the base name of the current working path.

```
pi@raspberrypi:~/Documents $ PS1="\u@\W>:\$ "
pi@Documents>:$ 
```

## 2 - The full List of backslash-escaped special character

There are a whole bunch of backslash-escaped special characters that can be used in the string for the $PS1 variable. I will just place the list of options as I know it here.

```
* \a : an ASCII bell character (07)
* \d : the date in “Weekday Month Date” format (e.g., “Tue May 26”)
* \D{format} : the format is passed to strftime(3) and the result is inserted into 
    the prompt string; an empty format results in a locale-specific time representation. 
    The braces are required
* \e : an ASCII escape character (033)
* \h : the hostname up to the first ‘.’
* \H : the hostname
* \j : the number of jobs currently managed by the shell
* \l : the basename of the shellâ€™s terminal device name
* \n : newline
* \r : carriage return
* \s : the name of the shell, the basename of $0 (the portion following the final slash)
* \t : the current time in 24-hour HH:MM:SS format
* \T : the current time in 12-hour HH:MM:SS format
* \@ : the current time in 12-hour am/pm format
* \A : the current time in 24-hour HH:MM format
* \u : the username of the current user
* \v : the version of bash (e.g., 2.00)
* \V : the release of bash, version + patch level (e.g., 2.00.0)
* \w : the current working directory, with $HOME abbreviated with a tilde
* \W : the basename of the current working directory, with $HOME abbreviated with a tilde
* \! : the history number of this command
* \# : the command number of this command
* \$ : if the effective UID is 0, a #, otherwise a $
* \nnn : the character corresponding to the octal number nnn
* \\ : a backslash
* \[ : begin a sequence of non-printing characters, which could be used to embed a terminal control sequence into the prompt
* \] : end a sequence of non-printing characters
```

## 3 - Edit default ~/.bashrc file in Raspberry PI OS

In the default .bashrc file found as /home/pi/.bashrc where pi is the user of interest, or ~/.bashrc if you prefer. In any case there should be a hidden ./bashrc file for the current user, and in this file there are a few lines of interest that should look something like this:

```
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w \$\[\033[00m\] '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
```

This is of course where the $PS1 variable is being set each time I start a new interactive bash session in a terminal such as lxterminal. This is then where I would want to make changes to make any prompt format that I worked out stick each time I start a new terminal window, and reboot.

By Default if I do to to a path like ~/Documents/github\_dustinpfister/blog\_posts/\_posts then I end up getting a command prompt that looks like this:

```
pi@raspberrypi:~/Documents/github_dustinpfister/blog_posts/_posts $ 
```

This gets a little annoying for me, and as such I would like to change it to something else. There are a few options that come to mind, but I might not want to just go with them just yet. In this section I will be going over a few changes that I experimented with. I guess I will also be going over a few quick basics when it comes to editing bash scripts such as this.

### 3.1 - Just change the prompt so it will give a baseName rather than the full path name

I really just want to change that one little thing that bothers me which is the full current working path showing up in each command line prompt. This is a very simple fix as I just need to change the lower case \\w to an upper case \\W.

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

### 3.2 - Commneting things out and going for something real streamlined

If I do not want to mess up the default to much and try something else, I can always just comment out the PS1 line, and then make it whatever I want. Such as my minimal $ only prompt.

```
if [ "$color_prompt" = yes ]; then
    # PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\W \$\[\033[00m\] '
    PS1='\[\033[01;32m\]\u@\W>\[\033[00m\]:\[\033[01;34m\]\$\[\033[00m\] '
else
    # PS1='${debian_chroot:+($debian_chroot)}\u@\h:\W \$ '
    PS1='\u@\W>:\$ '
fi
```

## 4 - Conclusion

So for the most part I am just interested in tweaking what the prompt is for a non root user. There is getting into how to have a separate prompt for root, a sudo user, and just a plain old user. If it is a user that has a home folder then there is the .bashrc file for each user that can be edited for each user. There is a .bashrc in the /root folder that would be one way to set what the prompt is for root. There are some additional files in the etc folder that are of interest when it comes to this, but most of that may be a topic for another post.