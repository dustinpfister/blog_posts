---
title: More than one version of nodejs in Raspberry PI OS
date: 2021-09-24 06:37:00
tags: [linux]
layout: post
categories: linux
id: 930
updated: 2021-09-25 09:12:52
version: 1.21
---

Today I would like to write about a topic that I have been putting off for too long which is how to go about having more than one binary of [nodejs](/2017/04/05/nodejs-helloworld/) to work with in [Raspberry Pi OS](/2020/03/25/linux-raspbian-lite-getting-started/). When first setting up a clean image of raspberry pi os one of the first things I would like to do is install nodejs, and the typical way of doing so would be to just install whatever version of nodejs there is to work with by way of apt. The problem with doing this though is that the version of nodejs is often very out of date, in fact as of this writing it is a version of nodejs that is no longer supported. Also often I might want to have more than one version of nodejs installed actually, and have a way to switch between them. For example I might want to write a script that I want to work on a wide range of nodejs versions, going as far back as say maybe nodejs 8.x. So then I would want to test out the script on nodejs 8.x, 9.x, 10.x, ..., 16.x as such I would need to have some way to not just have an up to date version of nodejs when it comes to the latest version, I would also want the latest version of each major release going back to whatever point I want to push backward compatibility to.

So then in this post I will be going over one way to go about having two or more nodejs binaries to work with in a Raspberry pi os environment.

<!-- more -->


## 1 - Using the arch command to confirm what arch the PI is using

When it comes to downloading the proper pre compiled binary from the nodejs website I just need to know which files are the ones that I need to download for the raspberry pi system architecture. One way to confirm what is being used by raspberry pi os, or for any Linux system is to use the arch command.

```
$ arch
armv7l
```

The result is armv7l which means [ARM7](https://en.wikipedia.org/wiki/ARM7) actually even though the original raspberry pi has newer arm11 processor, and the pi4 has ARM Cortex-A72 processor. This is because the result that the arch command gives reflects what is being used by the kernel, and not what the actual physical hardware is. For example when it comes to Intel Linux distributions I can run an i385 kernel image on a 64bit processor, but I can not run a 64 bit OS on a old i386 computer. 

## 2 - Downloading binaries from nodejs.org

Anyway on just about all raspberry pi I should get this kind of result of arm71 for system architecture, and as such that is what I need to look for when it comes to downloading pre compiled binaries from nodejs.org. For example if I want to download the last binary for nodejs.8.x I will want [node-v8.17.0-linux-armv7l.tar.gz from https://nodejs.org/dist/latest-v8.x/](https://nodejs.org/dist/latest-v8.x/). Once I download that fil I will want to use the tar command, or whatever front end to uncompress the file to get a folder. Inside the folder there is a bin path, and in that bin path would be a binary for nodejs v8.17.0 which was the last version of the specific major release of nodejs. I can now do the same, for nodejs 9, 10, 11, ect however there is now the question of how to go about calling the binaries from the command line.

## 3 - Calling a specific binary from the command line.

One way would be th just cd into one of the bin folders for the version I want to run and just do

```
$ ./node
```

This might work okay when it comes to just running a binary in a certain folder in a certain path, but if I want to run it from any location the binaries will need to be in the /usr/bin folder or another option would be to make use of bashrc file aliases.

## 4 - Using bashrc file and aliases to use more than one version of node

I have wrote a post a while back on the [bashrc file and setting up some aliases](/2020/11/30/linux-bashrc-aliases/) for various things that I type in the command line often. However I will quickly go over how to go about doing this here in this section. The basic idea here is that I can just have all these various folders in a home folder, and then just set up aliases in the bashrc file to make it so that when I call node8:

```
$ node8
```

In the bash command prompt that will be the same as calling:

```
/home/pi/node/node-v8.17.0-linux-armv7l/bin/node'
```

So to do this I just need to set up an aliases in the .bash\_aliases file or in the .bashrc file directly maybe in some situations in which there is no .bashrc file for the current user. However when it comes to what the situation is with clean image of raspberry pi os things are set up all ready when it comes to a .bashrc file, and that file fill look for a .bash\_aliases file so I will be using that.

### 4.1 - The .bash_aliases file

So then I will want to add a few lines to the .bash\_aliases file, or create one to begin with if there is not one there. This file will need to be located in the home folder of the user in which I want to use the binaries. For example if I am just using the default pi user account I will want to have this file located at \/home\/pi\/.bash\_aliases. Also these are hidden files of course so if you are having a hard time finding them that is why.

```
# nodejs bins
alias node8='/home/pi/node/node-v8.17.0-linux-armv7l/bin/node'
alias node14='/home/pi/node/node-v14.17.6-linux-armv7l/bin/node'
alias node16='/home/pi/node/node-v16.9.1-linux-armv7l/bin/node'
```

### 4.2 - The .bashrc file

There should be a .bashrc file, if not I will want to create one and do something that will test for the presence of a bash\_aliases file and if it is there call it.

```
# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.
 
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

Another alternative would be to just make the aliases in the .bashrc file directly. However I have to say that I do like doing things this way as it helps to keep all the aliases I am using isolated in a separate file.

Although this kind of approach of placing two or more binaries in a home folder, and setting up aliases for each binary might work okay, at least as far as I can tell, this might not be the prim an proper way of going about doing this sort of thing in a Linux system. I often do things like this anyway, but the thing about it is that this is not really what the home folder is intended for. having binaries in the home folder and using aliases to call them still strikes me as a quick careless solution for a problem that might work, but there is another solution that may be a little more in line with how a Linux system is structured by having the binaries in the \/usr\/bin folder.

# 5 - Conclusion

Although What I have worked out thus far seems to work okay, at some point in the future I am going to want to edit this post a little. There is working out another section in which I am doing something to set up this kind of situation in which it should be set up by having binaries in the proper location. Also there are some additional things I would like to do when it comes to setting things up when working with a clean raspberry pi os image such as having a simple script that will automate the process of pulling down tar files, decompressing them, rename binary files, and copying them to the bin folder.