---
title: The Linux Dev Folder
date: 2021-11-17 14:18:00
tags: [linux]
layout: post
categories: linux
id: 939
updated: 2021-11-17 15:31:13
version: 1.8
---

As of late I have been looking into the various folders off of a root file system when it comes to typical Linux systems. One of these folders is the [Linux \/dev folder](https://tldp.org/LDP/sag/html/dev-fs.html) that contains [device files](https://en.wikipedia.org/wiki/Device_file). You see it would seem that in Linux file systems everything is treated as a file event hardware. What is nice about this is that it make the process of reading data from a device, as well as writing to it very easy. On top of device files that are ways of interacting with things like a USB mouse there are also a number of pseudo devices also. These pseudo devices are great ways to go about just getting some random data, filling something with zeros, or writing some error output from a command to a void rather than the standard error.

<!-- more -->


## 1 - Basics of the \/dev folder in Linux

In this section I will be starting out with just a few basic examples that have to do with working with device files in the \/dev folder in Linux. These examples will involve the use of commands like the [Linux head](/2021/03/10/linux-head/) command which is a command that can be used to read just the first few bytes of a stream from a file, including device files. There is also using commands like the [Linux xxd](https://linux.die.net/man/1/xxd) command which is like the [Linux cat](/2020/11/11/linux-cat/) command but it will dump hex rather than raw text, so it is saver to use when spring things out to the standard output. The examples in this section, and the reast of the post outside of this section, will also involve [piping](/2020/10/09/linux-pipe/) and redirection which you might also want to read up more on if you are still new to playing around with bash.

### 1.1 - Simple read random example with xxd

First off there is using the Linux head command to read just one byte from \/dev\/random which will be a single random byte. However there is a problem when it comes to just printing something like this out to the standard output as this random byte might end up being some kind of control character. So then after reading a ramdom byte I will then want to pipe this ramdom byte to a command like the xxd command so that I end up spiting out hex to the standard output.

```
$ head -c 1 /dev/random | xxd -p
```

### 1.2 - Reading the mouse

```
$ xxd -p /dev/input/mouse0
```


## 2 - Pseudo devices

### 2.1 - \/dev\/null

```
$ cat notthere.txt
cat: notthere.txt: No such file or directory
$ cat notthere.txt 2> /dev/null
```

### 2.2 - \/dev\/zero

```
$ head -c 5 /dev/zero | xxd -p
0000000000
```

### 2.3 - \/dev\/random

```
$ head -c 1 /dev/random | xxd -p
```

## 3 - Reading \/dev\/input devices like the mouse and keyboard

### 3.1 - Reading from the mouse

```
$ xxd -p /dev/input/mouse0
```

### 3.2 - the event x and the by-id folder

```
$ ls -l /dev/input/by-id
total 0
lrwxrwxrwx 1 root root 9 Nov 16 17:23 usb-413c_Dell_KB216_Wired_Keyboard-event-if01 -> ../event3
lrwxrwxrwx 1 root root 9 Nov 16 17:23 usb-413c_Dell_KB216_Wired_Keyboard-event-kbd -> ../event2
lrwxrwxrwx 1 root root 9 Nov 16 17:23 usb-Microsoft_Comfort_Mouse_6000-event-if00 -> ../event0
rwxrwxrwx 1 root root 9 Nov 16 17:23 usb-Microsoft_Comfort_Mouse_6000-event-mouse -> ../event1
lrwxrwxrwx 1 root root 9 Nov 16 17:23 usb-Microsoft_Comfort_Mouse_6000-mouse -> ../mouse0
$ ls -l /dev/input/by-id | tr '[:upper:]' '[:lower:]' | grep 'keyboard'  | grep -o 'event[0-9]'
event3
event2
```

## 4 - Conclusion

