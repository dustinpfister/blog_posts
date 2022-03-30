---
title: Swap File Size and Raspberry PI OS
date: 2020-09-07 14:12:00
tags: [linux]
layout: post
categories: linux
id: 702
updated: 2022-03-30 14:37:19
version: 1.6
---

This month I have set up a new image on an sd card for my raspberry PI 3B+ and aim to start to transition into seeing if I can use a raspberry PI to get work done over my old windows 10 computer that is causes me a great deal a grief. So the new image I am working with is a clean Raspberry PI OS desktop image without the recommended software, so far I think going with this kind of image is best when it comes to just getting going with raspberry PI OS, but one thing that I see that I would like to adjust is the swap file size. I was able to find a [decent post on swap file size in rasbian](https://www.bitpi.co/2015/02/11/how-to-change-raspberry-pis-swapfile-size-on-rasbian/) that still seems to work okay for me if I just want to increase the size a little. However I thought I would write my own post on this on anyway just for the sake of having my own content on this, and to add anything more that might come up when it comes to swap files and Raspberry PI OS.

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

There is more to write about when it comes to swap files, and also swap partitions also with Raspberry PI OS and Linux in general actually. If I hook something up to the raspberry PI that has faster drive index speeds compared to the SD Card it would be nice to set up a spawn file, or swap partition on that volume to help increase speed with swap. However it is also worth mentioning that if I really need more swap space that is also an indication that I am maybe using to much memory to begin with actually. Better options compare to doing things with swap would be to have a newer raspberry PI with more RAM, or to see about what I can do to use less RAM and thus not have a need for much if any swap space to begin with.