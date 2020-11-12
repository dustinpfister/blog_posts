---
title: Getting started with Raspbian Linux lite for raspberry pi
date: 2020-03-25 15:21:00
tags: [linux,js]
layout: post
categories: linux
id: 635
updated: 2020-11-12 11:27:13
version: 1.13
---

I have come to like the [Rasbian Linux OS](https://en.wikipedia.org/wiki/Raspbian), and my [raspberry pi 3B+](https://en.wikipedia.org/wiki/Raspberry_Pi). When it comes to looking for a new computer less is more for me these days as I have found that everything that I really want and need to do with a computer does not require a whole lot of overhead. In addition I would like to start writing at least a little more content on Linux, so todays post will be on getting started with Raspbian Linux lite.

There are three general images to choose from when it comes to downloading a Raspbain os image from the raspberry Pi website. There is the desktop with recommended software, desktop, and lite. In often will go with the desktop version as that has all the base software that I want and need, without this additional bloat for doing work that is outside of my little slice when it comes to programing. However in some situations it would make sense to do with a lite image for starters, the light version will be a very basic striped down Linux that does not even have a desktop environment installed. It is not so hard to set one up though, and when doing so I can choose to use a desktop different from the one that is used in the desktop image.

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

## 5 - Change password for pi user account and create a new sudoer account

One of the first things I will want to change for any setup that I might use for a while is to change the password for the default pi account to something other than the default that everyone on the Internet knows.

```
$ passwd
```

While I am at it I might want to create one or more additional accounts that also have the same level of permissions as the pi account when it comes to being a sudoer. First I need to create the account with the adduser command, and then I can use the command again to add that user to the sudo group.

```
$ sudo adduser dustin
$ sudo adduser dustin sudo
```

If I make a mistake I can delete an account like so.

```
$ sudo userdel -r dustin
```

## 6 - Install aptitude

Raspbian lite comes with [apt-get](https://wiki.debian.org/apt-get), but I like to use [aptitude](https://wiki.debian.org/Aptitude) as a terminal based font end for apt. It allows for me to explore packages with a terminal interface, but if you like just using apt-get then there is no need for this.

```
$ sudo apt-get install aptitude


```

Once installed I am start it with sudo and start exploring packages

```
$ sudo aptitude
```

### 6.1 - Reset the state of marked upgrades and additions

As I am using aptitude there will come a time now and then where I will want to reset the state of marked upgrades and additions. It seems like there is no way to do so in the front end, so I need to exit and do this.

```
$ sudo aptitude keep-all
```

### 6.2 - Exact-name search pattern

When I am in the command line based front end of aptitude I often use do a search by pressing the forward slash \/ key. However some times I would like to search for just a package like git rather than any and all packages that contain the text pattern git. With that said the good news is that there is a way to [use patterns for better searching in aptitude](https://www.debian.org/doc/manuals/aptitude/ch02s04s05.en.html).

```
?exact-name(git)
```

## 7 - Conclusion

So this post was meant to be just a getting start post of sorts with Raspbian lite OS and a raspberry pi. There is much more to do from this point forward such as installing xorg, and a desktop environment for example. In the Linux world there is a whole lot of options, some of them are very light weight, but require a little work when it comes to setting them up such as with the blackbox environment.
When setting up a lite environment thought I might not bother setting up a desktop environment at all though, often the reason why I might bother with a lite image is because I want a pi to just function with one little task, such as running some kind of program that automates a build process, and then uploaded the result. In that kind of situation there might just be one or two little command line tolls that I need it to run, and thats it. So in such a situation a desktop environment is not really needed, I just need the pi to run a single little process daemon and thats it.

In any case there must be a starting point when it comes to getting up off the ground with Raspbian os light, and this is all that I wanted to cover in this post at least.
