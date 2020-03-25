---
title: getting started with Raspbian Linux lite for raspberry pi
date: 2020-03-25 15:21:00
tags: [linux,js]
layout: post
categories: linux
id: 635
updated: 2020-03-25 15:50:11
version: 1.2
---

I have come to like the [Rasbian Linux OS](https://en.wikipedia.org/wiki/Raspbian), and my [raspberry pi 3B+](https://en.wikipedia.org/wiki/Raspberry_Pi). When it comes to looking for a new computer less is more for me these days as I have found that everything that I really want and need to do with a computer does not require a whole lot of overhead. In addition I would like to start writing at least a little more content on Linux, so todays post will be on getting started with Raspbian Linux lite.

<!-- more -->

## 1 - Download an up to date Raspbian Linux lite image

First off download an up to date image of the [Raspbian OS from the raspberrypi.org website](https://www.raspberrypi.org/downloads/raspbian/). There should be some other options there that have more features pre installed, but I like to start with the lite package as I do not use a lot of the software that the full desktop ones use. It is also possible to upgrade to one of them at a later point if you change your mind anyway.

## 2 - Burn the Raspbian Linux lite image to an SDCARD

I will now need to burn the image to a [blank microSD card](https://en.wikipedia.org/wiki/SD_card#Physical_size) that will be used for the raspberry pi. The typical program used for this is [Balena Etcher](https://www.balena.io/etcher/), there are ports for windows, MACOS, and of course Linux.

## 3 - Mount boot partition and write a wpa_supplicant.conf

I want to set up wifi before I even boot up the os image on the pi. One way to do that is to mount the boot partition of the os image that I just burned to the sd card, and then [write a wpa_supplicant.conf file to the root folder of the boot partition](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md). It is formated fat32 so it should just mount when I remove and re-insert the sd card without having to install any special drivers for mounting the other partition.

The file that I write to the boot partition should be called wpa_supplicant.conf , and the contents of the file look like this for me.

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
 ssid="dustins"
 psk="my-wifi-password"
}
```

If you live in a county other than the US will will want to set the right county code for your county, set the ssid and psk values for your local network also of course. When I boot the os image for the first time the wifi settings will be updated and then this file should be deleted from the boot folder.