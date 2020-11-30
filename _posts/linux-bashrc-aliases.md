---
title: Linux Bashrc file command aliases
date: 2020-11-30 12:409:00
tags: [linux]
layout: post
categories: linux
id: 751
updated: 2020-11-30 16:33:35
version: 1.9
---

In the home folder of most Linux systems that use bash as the command shell there should be a hidden file called .bashrc. This file will be called each time I start a new terminal window, so it is a good place to do things like set what the format of the bash command prompt should be. However there are many other things that I can do with the script, and one such thing that is pretty helpful is setting up some [bash aliases](https://opensource.com/article/19/7/bash-aliases) for commands.

Often there might be a command that I use with a bunch of options that take a long time to type over again. There are also a number of situstions in which I can produce a result that I want, but not with a single command, rather a long string of commands involving piping of standard output to the standard input of another. So with many of these it makes sense to create a line in a file where I assign a command with a long string of options, and or a buch of commands piped togeather that wull result in just one command with a short name. I can then just call that single short command name each time, rather than typeing the same long string of text each time.

I can also make it so an alias is a call to a bash script, and from there I can use positional argumnets, look at enviorment variables, and so forth in order to amek thing that look and work like real commands.

<!-- more -->

## 1 - First off the ~/.bashrc file

First off in the home folder of the current user there should be a hidden .bashrc file, if not one should be written however at least some care shpuld be taken when doing so. having such a file will override any system wide files for what is going on so they should be looked at as a way to know how to get started with such a file at a user level.

In any case if the file is there it would be a good idea to start out by taking a look at it.

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

If this bash code is there then I just need to create a .bash\_aliases file, and in this file I will be setting up some aliases for commands that I find myself typing all the time. If the code is not there, or something like it at least, then place an if statement that will look for and call a .bash_aliases file.

## 2 - Some .bash_aliases basic alias commands with ls

So in the bash aliases file lets start out with at least a few basic commands that are just aliases for other Linux commands such as ls.

```
# list dirs
alias ldir='ls -p | grep -e / | cut -d / -f 1'
alias ldira='ls -ap | grep -e / | cut -d / -f 1'
 
# some more ls aliases
alias ll='ls -l'
alias la='ls -A'
alias l='ls -CF'
```

So now I can just type la for a quicker way to type ls -A.

```
$ la
.asoundrc         Desktop           gPodder     Public
.aspell.en.prepl  .dillo            .lesshst    radio
.aspell.en.pws    .dmrc             .local      Templates
.bash_aliases     Documents         .mozilla    .thumbnails
.bash_history     Downloads         Music       Videos
.bash_logout      .elementary       .npm        .Xauthority
.bashrc           .fltk             Pictures    .xscreensaver
Bookshelf         .gitconfig        .pki        .xsession-errors
.cache            .git-credentials  .pp_backup  .xsession-errors.old
.config           .gnupg            .profile
```

Maybe this is not the most compelling example of an alias, but the basic idea is there. If I am doing something that involves a lone string of commands using piping and redirection, and it is something that I find myself doing often, then maybe it is a good idea to turn that into an alias. So lets look at some more examples of linux aliases to get a better idea of why these can often help to save a lot of time typing.

## 3 - Creating some for git

I use the source control command git all the time, not just for projects, but also for maintaing the mark down files of these blog posts. So of course I take a moment to set up at least a few for common git tasks such as pushing and pulling. 

I just need to make sure I am not taking any kind of command that is not taken all ready. For example when I am making an alias for git status, I can not use stat as that is a command for displaying file, and file system info at least for me on the system I am using. However it would seem that status is free, so it makes sense to take a look in the bin, sbin and usr/sbin, ect folders to make sure I am not taking a command that is in use.

```
# git
alias status='git status'
alias pull='git pull'
alias push='git push'
alias gitl='git log -n 100 --format="%H : %s"'
```

## 4 - Making a bash folder and adding some bash scripts

Another thing that I can do when it comes to setting up some aliases is to have a bash folder, and write a few scripts that I can then also turn into my own commands. When it comes to anything that I find myself doing over and over again in the command line as a long series of commands, chances are that is a good example of something that I can turn into a script. I can then place that script in a main folder in my home path, and set up some aliases so that I can call them from any location in a terminal window.

For example say I have a whole bunch of git folders in a certian path and I find myself going threw each of them to do a git pull to make sure they are all up to date. Say I would also like to do the same for push, status, and maybe a few other git sub commands. I could just repeat that over and over again each time I starting workong on things, or I could write one or more scripts for a bash folder in my home path. I could also have a bash\_aliases file for the collection of scripts and make that something that I call from my main bash\_aliases file in the home folder.

### 4.1 - The main git-all.sh file

The first script that I am going to want it one that will get the contents of a folder of git folders, and then for each folder switch to that folder as the current working path, and call a given git command for it.

```
#!/bin/bash
 
# path where git folders are ( "/home/pi/Documents/github_dustinpfister" )
gitpath=$1
 
# git sub command (pull push status)
gitcomm=$2
 
folders=$( ls -p $gitpath | grep -e / | cut -d / -f 1 )
cpwd=$( pwd );
for folder in $folders; do
  cd "${gitpath}/${folder}"
  echo -e "----------\n"
  echo -e "running a git ${gitcomm} for ${folder} \n\n"
  git $gitcomm
  echo -e "----------\n"
done
cd $cpwd
```

I can then save this file as something like git-all.sh in a bash folder in my home folder, and make it exacytabule with chmod.

```
$ cd ~/bash
$ chmod 755 *.sh
```

I can then call the script like this:

```
$ ./git-all.sh "/home/pi/Documents/github_dustinpfister" pull 
----------

running a git pull for blog_posts 


Already up to date.
----------

----------

running a git pull for canvas-examples 


Already up to date.
----------

----------

running a git pull for demos_linux 


Already up to date.
----------

----------

running a git pull for test_vjs 


Already up to date.
----------
```

Hey all right seems to work great.

So then it is just a question of making additional scripts or aliases for this so I can just type a few keys into bash, and preform a pull request for all git folders in my github folder. Or any git command for that matter.

### 4.2 - git-folder.sh, and git-base.sh

git-folder.sh

```
#!/bin/bash
echo -n "/home/pi/Documents/github_dustinpfister"
```


git-base.sh

```
#!/bin/bash
~/bash/git/git-all.sh $(~/bash/git/git-folder.sh) $1
```

### 4.3 - git-all-push.sh, git-all-pull.sh, and git-all

```
#!/bin/bash
~/bash/git/git-all-base.sh pull
```

### 4.4 - bash aliases file

```
# git script aliases
alias pullall='~/bash/git/git-all-pull.sh'
alias pushall='~/bash/git/git-all-push.sh'
alias statall='~/bash/git/git-all-status.sh'
alias gitall='~/bash/git/git-all-base.sh'
```

```
# alias for pullall pushall, statall
. ~/bash/git/bash_aliases
```

## 5 - Conclusion

So I am sure that I will be fidning more to write about with Linux aliases as time goes by. However this really is something that should be fugured out on a per user basis. Whatever a single users work flow is that is what should be created in a bash script, or aliase type form. One user might use a diferent set of command line tools, or they might be using a sligtly diferent distarbution. However the basic idea of aliases should be more or less the same in most Linux systems where bash is used as the command line interafce shell.