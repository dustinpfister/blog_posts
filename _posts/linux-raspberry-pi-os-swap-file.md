---
title: Swap File Size and Raspberry PI OS
date: 2020-09-07 14:12:00
tags: [linux]
layout: post
categories: linux
id: 702
updated: 2020-09-07 14:43:08
version: 1.2
---

This month I have set up a new image on an sd card for my raspberry PI 3B+ and aim to start to trasiation into seeing if I can use a raspberry PI to get work done over my old windows 10 computer that is causes me a great deal a greef. So the new image I am working with is a clean Raspberry PI OS desktop image without the recommeneded software, so far I think going with this kind of image is best when it comes to just getting going with raspberry PI OS, but one thing that I see that I would like to adjust is the spawp file size. I was able to find a [decent post on swap file size in rasbian](https://www.bitpi.co/2015/02/11/how-to-change-raspberry-pis-swapfile-size-on-rasbian/) that still seems to work okay for me if I just want to incress the size a little. However I thought I would write my own post on this on anyway just for the sake of having my own content on this, and to add anything more that might come up when it comes to swap files and Raspberry PI OS.

<!-- more -->

## 1 - To incress the size of swap beyond 100 MB

I know that it is a raspberry pi, and that the swap file is on a SD card typically which would tend to be slow. Still I would say that 100MB of spawn space is just not enough. I am not sure if I would always just set it to twice the size as the amount of physical RAM, but I would like to make it a little higher at least. So to do so I just need to change one little value in an etc folder file called dphys-swapfile.

```js
$ cd /etc
$ ls dphys*
dphys-swapfile
$ sudo nano dphys-swapfile
```

When I open this file up there are a few values of interest actually, looks like there is one value that will allow me to set the location of where the swap file will be if I have some other volume connect to the PI that migt prove to be faster then the SD card. However for the sake of just incressing ther size of the spawn file the value I want to change is the CONF_SWAPSIZE value. In a clean install this would have a value of 100, but I set it to 1024 to give myself at least a GB of swap file head space. In addition I might set it is high as 2GB which is what the max is set for for this file, and would also be the amount that is generatly recamened for a system that has one GB of RAM such as the raspberry PI 3b+.

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

So that is it for now when it comes to Raspberry PI os and swap file size. There is not much else that comes to mind with this one for now, but this is one little thing that I would often like to tweak when it comes to setting up a clean new image for this OS.