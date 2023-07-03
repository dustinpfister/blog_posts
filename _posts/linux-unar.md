---
title: Extracting rar files with Linux unar command
date: 2023-07-03 09:19:00
tags: [linux]
layout: post
categories: linux
id: 1057
updated: 2023-07-03 09:45:22
version: 1.0
---

The [rar file format](https://en.wikipedia.org/wiki/RAR_%28file_format%29) is a proprietary data compression archive file format. Often I will end up comming accross this kind of archive file and would like to extract it in a Linux system without having to boot to windows, or by one means or another using [winrar to do so](https://en.wikipedia.org/wiki/WinRAR). The good news here is that there is a popular linux deal that can be used to make quick work of this [called unar](https://linux.die.net/man/1/unrar). On the Debian based distros that I work with thus far it would seem that this is not backed into the OS image, however it can easly be added by way of apt.

<!-- more -->

## Install unar by way of apt

How to go about installing unar if it is not there to begin with will as always deped on what distro you are using. I like to stick with debian based binary distros such as Debian, Ubuntu, and in late years Raspberry PI OS actaully. So then for me I have found that I can just add this one by the ushual apt install deal. However Often I will use the type command to see of a command is installed at all to begin with. After that I like to use the show sub command of apt to see of the command can be installed by way of apt, and if so what version.

```
$ sudo apt show unar
Package: unar
Version: 1.10.1-2+b4
Priority: optional
Section: utils
Source: unar (1.10.1-2)
Maintainer: Matt Kraai <kraai@debian.org>
Installed-Size: 3,923 kB
Provides: theunarchiver
Pre-Depends: dpkg (>= 1.15.6~)
Depends: gnustep-base-runtime (>= 1.26.0), libbz2-1.0, libc6 (>= 2.11), libgcc1 (>= 1:3.5), libgnustep-base1.26 (>= 1.26.0), libicu63 (>= 63.1-1~), libobjc4 (>= 4.2.1), libstdc++6 (>= 5), libwavpack1 (>= 4.40.0), zlib1g (>= 1:1.2.0)
Conflicts: theunarchiver
Replaces: theunarchiver
Homepage: http://unarchiver.c3.cx/
Download-Size: 978 kB
APT-Manual-Installed: yes
APT-Sources: http://raspbian.raspberrypi.org/raspbian buster/main armhf Packages
Description: Unarchiver for a variety of file formats
 The Unarchiver is an archive unpacker program with support for the popular
 zip, RAR, 7z, tar, gzip, bzip2, LZMA, XZ, CAB, MSI, NSIS, EXE, ISO, BIN, and
 split file formats, as well as the old Stuffit, Stuffit X, DiskDouble, Compact
 Pro, Packit, cpio, compress (.Z), ARJ, ARC, PAK, ACE, ZOO, LZH, ADF, DMS, LZX,
 PowerPacker, LBR, Squeeze, Crunch, and other old formats.
 .
 This package contains the lsar tool which lists the contents of archives and
 the unar tool which extracts those contents.
```

Thus far I have found that I can just install unar by the typical suco apt install line.

```
$ sudo apt install unar
```

### Extract a file

The main reason why I installed unar is to extract sound font files that I would like to use with MuseScore. The files that I find are often in rar or some other compression format that I can not just extract with an out of the box install of what there is to work with. Anyway once unar is installed all I have to do is just type unar, and then pass the path to the rar file as the first positional argument. After that unar will do its magic and extract what it is that I am after.

```
$ ls *.rar
20-synth-sf.rar
$ unar 20-synth-sf.rar
20-synth-sf.rar: RAR
  20 Synth Soundfonts/Acid SQ Neutral.sf2  (796896 B)... OK.
  20 Synth Soundfonts/Analog Saw.sf2  (353496 B)... OK.
  20 Synth Soundfonts/Beeper.sf2  (995340 B)... OK.
  20 Synth Soundfonts/Candy Bee.sf2  (2595422 B)... OK.
  20 Synth Soundfonts/Dance Trance.sf2  (1590694 B)... OK.
  20 Synth Soundfonts/Dirty Sub.sf2  (399990 B)... OK.
  20 Synth Soundfonts/FM Modulator.sf2  (598404 B)... OK.
  20 Synth Soundfonts/Happy Mellow.sf2  (399958 B)... OK.
  20 Synth Soundfonts/Hyper Saw.sf2  (3202672 B)... OK.
  20 Synth Soundfonts/Kaputt Sine.sf2  (194734 B)... OK.
  20 Synth Soundfonts/Perfect Sine.sf2  (1139346 B)... OK.
  20 Synth Soundfonts/Plastic Strings.sf2  (20163902 B)... OK.
  20 Synth Soundfonts/Poly Special Mono.sf2  (2781398 B)... OK.
  20 Synth Soundfonts/Pulse Wobbler.sf2  (7801986 B)... OK.
  20 Synth Soundfonts/Sine Wave.sf2  (1193790 B)... OK.
  20 Synth Soundfonts/Solar Wind.sf2  (1590692 B)... OK.
  20 Synth Soundfonts/Super Saw 1.sf2  (4590502 B)... OK.
  20 Synth Soundfonts/Super Saw 2.sf2  (5507782 B)... OK.
  20 Synth Soundfonts/Super Saw 3.sf2  (3336852 B)... OK.
  20 Synth Soundfonts/Synth E.sf2  (1193788 B)... OK.
  20 Synth Soundfonts/  (dir)... OK.
Successfully extracted to "./20 Synth Soundfonts".
```

## Conclusion

What is great about unar is that it is pretty brainless to use once installed, so far it does that what I need it to do. So then there might only be so much to write about with this one. I looks like there are a whole lot of other formats that unar will work great for when it comes to extracting at least with with other formats such as 7zip and so forth. However there might be more to write about when it comes to making a compressed file rather than extracting one in the rar format.





