---
title: Linux Root Folders
date: 2023-08-01 09:38:00
tags: [linux]
layout: post
categories: linux
id: 1064
updated: 2023-08-01 10:56:53
version: 1.2
---

I have been taking a little break from javaScript and threejs related content now and then to start learning more about Linux kernel based operating systems. For the most part this has been with the Debian Linux based Raspberry PI OS as I like working with the Raspberry PI 4 Single Board Computers, but I am sure that much of what I run into with that OS can also be found in many other Linux Distributions as well. Anyway there are a whole lot of ways of getting started learning a thing or two more about Linux, after getting an OS up and running to begin with, such as using a package manager like apt, pr learning more about bash and with that aliases and bash scripts. However another thing that comes to mind is learning more about the various folders at the root name space of the OS.

At the root name space there are folders like bin, sbin, usr, etc, home and so forth. With that said there is taking some time to look into more about what these various folders are used for. It can prove to be very time consuming to really start to know a thing or two about every little typical file in every little location. Also things will differ a little from one Linux system to the next, but still there are some common folders that can be found in just about any Linux System. So I thought I would start doing some research, and write done some notes in the from of a blog post on these various folders and what they are for.

<!-- more -->


## 1 - The /bin folder

The [bin folder](/2021/11/15/linux-folders-bin/) contains binaries, hashes, and links to binaries that are must have programs to use Linux at all in any capacity. it would seem that there might be some exceptions to this though, but in any case many of the most important programs are here in one way or another. For example in order to use Linux even in a command line only way I will still need a shell such as bash, and with that said bash can be found here.

## 2 - The /dev folder

This [dev folder](/2021/11/17/linux-folders-dev/) is where one fill find a whole bunch of device folders.

## 3 - The /home use folder

The [home folder](/2021/11/12/linux-folders-home/) is where I will find a folder for each non root user for the system. The home folder is then a good place to park local copies of data that I am working on. However it is more than just a place to park personal data as there are other locations that can often be used for that alone. With that said this is also a location where a lot of user specific application configurations end up being stored. One great example of this would be the bashrc file that I can use to set up bash aliase commands.

## Conclusion

I did not cover all of the typical folders, as well as even many of the additional folders that might pop up from one system to another. I just wanted to start a post on this subject at least that I will likely come around to edit more now and then as I write more posts on the various folders where I get more into depth on each.
