---
title: Swap File Size and Raspberry PI OS
date: 2020-09-07 14:12:00
tags: [linux]
layout: post
categories: linux
id: 702
updated: 2022-03-30 14:59:57
version: 1.10
---

This month I have set up a new image on an sd card for my raspberry PI 3B+ and aim to start to transition into seeing if I can use a raspberry PI to get work done over my old windows 10 computer that is causing me a great deal a grief. So the new image I am working with is a clean Raspberry PI OS desktop image without the recommended software, so far I think going with this kind of image is best when it comes to just getting going with raspberry PI OS, but there are always at least a few things that I like to adjust. One thing that I see that I would like to adjust is the swap file size, as I would say the default size of it is to small. 

I was able to find a [decent post on swap file size in rasbian](https://www.bitpi.co/2015/02/11/how-to-change-raspberry-pis-swapfile-size-on-rasbian/) that still seems to work okay for me if I just want to increase the size a little. However I thought I would write my own post on this anyway just for the sake of having my own content on this topic.

<!-- more -->

## 1 - To increase the size of swap beyond 100 MB

I know that it is a raspberry pi, and that the swap file is on a SD card typically which would tend to be slow. Still I would say that 100MB of spawn space is just not enough. I am not sure if I would always just set it to twice the size as the amount of physical RAM, but I would like to make it a little higher at least. So to do so I just need to change one little value in an etc folder file called dphys-swapfile.

```js
$ cd /etc
$ ls dphys*
dphys-swapfile
$ sudo nano dphys-swapfile
```

When I open this file up there are a few values of interest actually, looks like there is one value that will allow me to set the location of where the swap file will be if I have some other volume connect to the PI that might prove to be faster then the SD card. However for the sake of just increasing there size of the spawn file the value I want to change is the CONF_SWAPSIZE value. In a clean install this would have a value of 100, but I set it to 1024 to give myself at least one GB of swap file head space rather than the default 100 MB. In addition I might set it is high as 2GB which is what the max is set for for this file, and would also be the amount that is generally recommended for a system that has one GB of RAM such as the raspberry PI 3b+.

```
# /etc/dphys-swapfile - user settings for dphys-swapfile package
# author Neil Franklin, last modification 2010.05.05
# copyright ETH Zuerich Physics Departement
#   use under either modified/non-advertising BSD or GPL license
 
# this file is sourced with . so full normal sh syntax applies
 
# the default settings are added as commented out CONF_*=* lines
 
 
# where we want the swapfile to be, this is the default
#CONF_SWAPFILE=/var/swap
 
# set size to absolute value, leaving empty (default) then uses computed value
#   you most likely don't want this, unless you have an special disk situation
CONF_SWAPSIZE=1024
 
# set size to computed value, this times RAM size, dynamically adapts,
#   guarantees that there is enough swap without wasting disk space on excess
#CONF_SWAPFACTOR=2
 
# restrict size (computed and absolute!) to maximally this limit
#   can be set to empty for no limit, but beware of filled partitions!
#   this is/was a (outdated?) 32bit kernel limit (in MBytes), do not overrun it
#   but is also sensible on 64bit to prevent filling /var or even / partition
#CONF_MAXSWAP=2048
```

## 2 - Conclusion

There is more to write about when it comes to swap files, and also swap partitions also with Raspberry PI OS. If I hook something up to the raspberry PI that has faster drive index speeds compared to the SD Card it would be nice to set up a swap file, or swap partition on that volume to help increase speed with swap. However it is also worth mentioning that if I really need more swap space that is also an indication that I am maybe using to much memory to begin with actually. Better options compared to doing things with swap would be to have a newer raspberry PI model with more RAM, or to see about what I can do to use less RAM and thus not have a need for much if any swap space to begin with. 

When I first wrote this post I was using a Raspberry PI 3 that has only 1 GB or RAM which is still a lot if I just use very simple tools for what I want to do with it, but I would run out of ram now and then using it with the kinds of programs I would like to use. At the time of this writing I am not using a Raspberry PI 4 with 8GB of RAM, and I have to say that now I do not even think about swap space that much as I have more than enough head room with physical RAM.

I might get around to editing this post again at some point, I often do sooner or later with much of  my content on this site. For now if you enjoyed reading this you might want to check out one of my [many other posts on Linux in general](/categories/linux/). There are a lot of other various little tasks that I would like to do when setting up a new RaspberryOS Image beyond just adjusting the spawn file size such as [setting up bash command aliases](/2020/11/30/linux-bashrc-aliases/). When it comes to [learning a think or two about write bash scripts](/2020/11/27/linux-bash-script/) you might even go so far as learning how to write a bash script that can be used to automate the process of setting up a Raspberry PI OS sd card just the way that you like it. When it comes to that kind of script I have [started a version of that kind of script for myself](/2022/03/25/linux-bash-script-example-raspberry-pi-os-setup/).
