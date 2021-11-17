---
title: The Linux Dev Folder
date: 2021-11-17 14:18:00
tags: [linux]
layout: post
categories: linux
id: 939
updated: 2021-11-17 15:55:09
version: 1.13
---

As of late I have been looking into the various folders off of a root file system when it comes to typical Linux systems. One of these folders is the [Linux \/dev folder](https://tldp.org/LDP/sag/html/dev-fs.html) that contains [device files](https://en.wikipedia.org/wiki/Device_file). You see it would seem that in Linux file systems everything is treated as a file event hardware. What is nice about this is that it make the process of reading data from a device, as well as writing to it very easy. On top of device files that are ways of interacting with things like a USB mouse there are also a number of pseudo devices also. These pseudo devices are great ways to go about just getting some random data, filling something with zeros, or writing some error output from a command to a void rather than the standard error.

<!-- more -->


## 1 - Basics of the \/dev folder in Linux

In this section I will be starting out with just a few basic examples that have to do with working with device files in the \/dev folder in Linux. These examples will involve the use of commands like the [Linux head](/2021/03/10/linux-head/) command which is a command that can be used to read just the first few bytes of a stream from a file, including device files. There is also using commands like the [Linux xxd](https://linux.die.net/man/1/xxd) command which is like the [Linux cat](/2020/11/11/linux-cat/) command but it will dump hex rather than raw text, so it is saver to use when spring things out to the standard output. The examples in this section, and the reast of the post outside of this section, will also involve [piping](/2020/10/09/linux-pipe/) and [redirection](/2020/10/02/linux-redirection/) which you might also want to read up more on if you are still new to playing around with bash.

### 1.1 - Simple read random example with xxd

First off there is using the Linux head command to read just one byte from \/dev\/random which will be a single random byte. However there is a problem when it comes to just printing something like this out to the standard output as this random byte might end up being some kind of control character. So then after reading a ramdom byte I will then want to pipe this ramdom byte to a command like the xxd command so that I end up spiting out hex to the standard output.

```
$ head -c 1 /dev/random | xxd -p
```

### 1.2 - Reading the mouse

This example again makes use of the Linux xxd command, this time I am using it to just start reading data from the mouse. For me the mouse is located at \/dev\/input\/mouse0 but it may be different if you have more than one mouse connected. There is a lot more to cover when it comes to this input folder in the dev folder when it comes to events and other kinds of input devices that can end up being connected to a computer. So I will be getting into this sub folder of the dev folder more in a later section.

For now there is just doing something like this:

```
$ xxd -p /dev/input/mouse0
```

And then move the mouse around, when done press control + c to break out of this.


## 2 - Pseudo devices

Now all devices files in the dev folder are files that can be used to work with physical devices. Some of them are so called pseudo device. These kinds of files in the dev folder can be usd for things like reading a stream of null bytes, or random bytes. The can also be used for tasks such as redirecting some error output from an application to a void rather than the standard error, or a log file.

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

When it comes to working with the mouse, keyboard, and any other input devices that may be connected to a Linux system there is the input folder in the dev folder. When it comes to this folder there may be one ore more move files, and there is also going to be at least a few event files. One or more of these event files can end up being the keyboard, as well as the mouse but the truck is knowing which event is mapped to what.

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

There is a great deal more to write about when it comes to the various folders off of the root folder in a Linux system. I would say that taking the time to look into each of them is a good way to gain a deeper level of knowledge as to how to work with a Linux system, as well as how to look into things and learn a thing or two about how to use Linux. There is also the idea of just starting to look into all the various commands there are to work with, but even then it still makes sense to look into the various folders and paths to know what there is to work with because that will change from one system to another. With that said there is taking a look into the [bin folder](/2021/11/15/linux-folders-bin/) which is a good place to start to see what commands there are to work with, and also using the [Linux type](/2021/02/11/linux-type/) bash built in command when it comes to testing if a command is installed or not.
