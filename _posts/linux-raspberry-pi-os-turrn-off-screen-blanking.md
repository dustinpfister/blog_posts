---
title: Turn off screen blanking in Raspberry PI OS
date: 2020-09-10 13:30:00
tags: [linux]
layout: post
categories: linux
id: 704
updated: 2020-09-10 14:21:25
version: 1.2
---

One of the little things that I like to have control over after setting up a clean raspberry PI OS image is to turn off, or at least have control over screen blanking. That is after a few minutes of leaving the raspberry pi alone the screen will go blank rather than continuing to display whats going on. There are many use case examples of using a raspbery pi to run some kind of applaction where I would like the output to continue to be displayed on a monater without me having to move the mouse or touch the keybaord. 

The rason why the screen blanking happens is becuase screen saver settings cause the screen to go blank afetr a few minutes by default, but there is not software installed to easly control these settings by default. So in this post I will be going over some options for having control over this including th use of the [linux xset](https://linux.die.net/man/1/xset) command.

<!-- more -->

## 1 - Uisng xset to just turn off screen blanking right now

So if I want to just turn off the screen blanking right now, and not nessecrly make the chnages permanate each time I rebut the py then I can just use the xset command. In fact all settings that I change with just xset will be set back to default when I log out, or rebut the pi. However what is nice about this is that I can just turn it off for not without installing any additional frojnt ends, or digging thre any kind fo configuration files as the xset command should be there to work with to begibn with in a clan Raspberry PI OS install.

### 1.1 - Uisng xset q to qurry what the current status is with screensave settings

```
$ xset q
Keyboard Control:
  auto repeat:  on    key click percent:  0    LED mask:  00000000
  XKB indicators:
    00: Caps Lock:   off    01: Num Lock:    off    02: Scroll Lock: off
    03: Compose:     off    04: Kana:        off    05: Sleep:       off
    06: Suspend:     off    07: Mute:        off    08: Misc:        off
    09: Mail:        off    10: Charging:    off    11: Shift Lock:  off
    12: Group 2:     off    13: Mouse Keys:  off
  auto repeat delay:  500    repeat rate:  33
  auto repeating keys:  00ffffffdffffbbf
                        fadfffefffedffff
                        9fffffffffffffff
                        fff7ffffffffffff
  bell percent:  50    bell pitch:  400    bell duration:  100
Pointer Control:
  acceleration:  20/10    threshold:  10
Screen Saver:
  prefer blanking:  yes    allow exposures:  yes
  timeout:  600    cycle:  600
Colors:
  default colormap:  0x20    BlackPixel:  0x0    WhitePixel:  0xffffff
Font Path:
  built-ins
DPMS (Energy Star):
  Standby: 600    Suspend: 600    Off: 600
  DPMS is Enabled
  Monitor is On
```

### 1.2 The xset -dpms and s options

So the two xset options of interste in the man page here are -dpms that will disable DPMS, and the s option that can be used to set values for the screen saver. There are several values that can be used for the s option, but one of them is simply off that will work just fine if I just want to turn the screen blanking off.

```
$ xset -dpms
$ xset s off
```

Now lets to another querry and see what changed.

```
$ xset q
Keyboard Control:
  auto repeat:  on    key click percent:  0    LED mask:  00000000
  XKB indicators:
    00: Caps Lock:   off    01: Num Lock:    off    02: Scroll Lock: off
    03: Compose:     off    04: Kana:        off    05: Sleep:       off
    06: Suspend:     off    07: Mute:        off    08: Misc:        off
    09: Mail:        off    10: Charging:    off    11: Shift Lock:  off
    12: Group 2:     off    13: Mouse Keys:  off
  auto repeat delay:  500    repeat rate:  33
  auto repeating keys:  00ffffffdffffbbf
                        fadfffefffedffff
                        9fffffffffffffff
                        fff7ffffffffffff
  bell percent:  50    bell pitch:  400    bell duration:  100
Pointer Control:
  acceleration:  20/10    threshold:  10
Screen Saver:
  prefer blanking:  yes    allow exposures:  yes
  timeout:  0    cycle:  600
Colors:
  default colormap:  0x20    BlackPixel:  0x0    WhitePixel:  0xffffff
Font Path:
  built-ins
DPMS (Energy Star):
  Standby: 600    Suspend: 600    Off: 600
  DPMS is Disabled
```

So yes not DPMS is disabled, and the timeout for the screen saver is now zero.

## 2 - So then there is trying xscreensaver

In Raspberry Pi OS the package [xscreensaver](https://en.wikipedia.org/wiki/XScreenSaver) is not installed by default. This package alone is the most basic striped down package for screen savers. This package alone can be installed, and by doing so I will then have a graphic front end for changing screen saver settings in the preferences menu. Also chnages that I make in the front end will remain afer I log out or reboot.

So For starrtets I just need to install the package

```
$ sudo apt-get install xscreensaver
```

Doing so will eat up about 8MB of space, and I might need to reboot to get the menu to appear in prefernces. However once I can get to it I can use that to just disable the screen saver, and keep it disabled once and for all.

## 3 - Conclsuion

So having control over this is just one of those many little things that I like to tweak and have control over whe it comes to setting up a clean Raspberry PI OS install.