---
title: getting started with Raspbian Linux lite for raspberry pi
date: 2020-03-25 15:21:00
tags: [linux,js]
layout: post
categories: linux
id: 635
updated: 2020-03-25 16:10:10
version: 1.5
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

## 4 - Boot for the first time, and login

So now when I place the micoSD card into the pi, and start up for the first time, it should start up just fine and connect to my local wifi. I will end up getting to a login screen where I will need to give a default login and password. the defaults for a Raspbian linux install is pi for the username, and raspberry for the password.

```
login: pi
password: raspberry
```

once I log in I should end up at a bash prompt, and I can start to get going with further configurations, and start to install software. From now on I will be going over some things that are typical for me, but will not be getting into install a desktop, or anything to that effect.

## 3 - Set keyboard layout to US

If you live in the UK and type in UK English chances are you can skip this section. However I live in the US and would like to type using my US English layout keyboard so one of the first things I do is this.

```
$ sudo dpkg-reconfigure keyboard-configuration
```

After doing so there will be terminal based menus that I just need to go threw to set up my keyboard to work the way that it should. In order for these things to tack effect I will need to restart though.

## 4 - Preforming a graceful restart from the command line

I come across all kinds of people that restart something like to router or something to that effect by just unplugging the thing, and then plug it back in. I am of the mind set that doing that should only be a last resort if you can not find a way to do so gracefully. One of the first commands to become familiar with should be the shutdown command. By default calling the shutdown command and passing now as the first option will shut down the pi, but the r option can be used to preform a restart like so.

```
$ shutdown -r now
```

## 5 - Install aptitude

Raspbian lite comes with apt-get, but I like to use aptitude as a terminal based package manager. It allows for me to explore packages with a terminal interface, but if you like just using apt-get then there is no need for this.

```
$ sudo apt-get install aptitude
```