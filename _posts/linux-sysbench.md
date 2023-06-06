---
title: Linux sysbench command for benchmarking a file system
date: 2023-06-06 09:30:00
tags: [linux]
layout: post
categories: linux
id: 1047
updated: 2023-06-06 11:03:43
version: 1.1
---

When it comes to using a raspberry PI as a Personal Computer I do end up running into a lot of roadblocks with various things. That is of course to be expected as the Single Board Computers do very much have there limitations. One issue of concern that comes up often seems to be with the read and write speeds of the sd card that is typically used to house the operating system image that is used with the raspberry pi. Often the typical sequential read speeds clock in at around 10MBs, which is still plenty fast sense most of the software used is very light weight to begin with. Still I remember having traditional hard disk speeds that are much faster than that, and this is solid state. This then brings up the question as to if it is possible to get faster disk io pref romance by way of the USB3 Ports of a raspberry pi 4 rather than that of the SD card. With that said if I do have a USB3 drive I would like to test and compare that to a test preformed with the sd card I will need some kind of program to preform such a test such as [sysbench](https://en.wikipedia.org/wiki/Sysbench)

There are a whole lot of other options of course, I see a lot of similar posts on this topic using the [dd command as a way to gauge file io](https://www.cyberciti.biz/faq/howto-linux-unix-test-disk-performance-with-dd-command/) for example. One nice thing about using dd is that it is making use of a command that will be there in any flavor of Linux, but it is also limited as it is only good for sequential io testing. When it comes to using something to hold an OS image random io pref romance is of greater interest. Also for those of us that are still new to Linux, or still not as proficient as we would like to be the use of dd can be dangerous if we get careless with it. With that said sysbech can not only do sequential io testing, but also the random io testing that I am more interested in. Also sysbench is useful for testing other components of the raspberry pi such as CPU performance and so forth.

<!-- more -->

## 1 - Installing sysbench

### 1.1 - Check if it is installed all ready

The first thing that I do before installing a command is to first check if by change the command is all ready installed. From one distro to the next what the os will come with will change. The basic tool that helps with this is the Linux type command that will tell me if I all ready have the command of interest or not.


So if I have sysbench installed all ready I will get the locaion of the binary in the usr folder.

```
$ type sysbench
sysbench is /usr/bin/sysbench
```

If sysbench is not installed I will get a not found message.

```
$ type sysbench
bash: type: sysbench: not found
```

### 1.1 - Check if sysbech can be installed by way of apt, and if so what version

The next step is to check if I can install sysbench by way of apt or not, and if so what version do I get if I do. The way to go about doing this would be to use the apt show command.

```
$ apt show sysbench
Package: sysbench
Version: 0.4.12-1.2+b1
Priority: extra
Section: misc
Source: sysbench (0.4.12-1.2)
Maintainer: Hendrik Frenzel <hfrenzel@scunc.net>
Installed-Size: 118 kB
Depends: libc6 (>= 2.17), libmariadb3 (>= 3.0.0)
Homepage: http://sourceforge.net/projects/sysbench
Download-Size: 55.7 kB
APT-Manual-Installed: yes
APT-Sources: http://raspbian.raspberrypi.org/raspbian buster/main armhf Packages
Description: Cross-platform and multi-threaded benchmark tool
 SysBench is a modular, cross-platform and multi-threaded benchmark tool for
 evaluating OS parameters that are important for a system running a database
 under intensive load.
 .
 The idea of this benchmark suite is to quickly get an impression about system
 performance without setting up complex database benchmarks or even without
 installing a database at all.
 .
 Current features allow to test the following system parameters:
 .
  * file I/O performance
  * scheduler performance
  * memory allocation and transfer speed
  * POSIX threads implementation performance
  * database server performance (OLTP benchmark)
 .
 Primarily written for MySQL server benchmarking, SysBench will be further
 extended to support multiple database backends, distributed benchmarks and
 third-party plug-in modules.
```

### 1.1 - Install sysbench by way of APT

So sense sysbech can be installed by way of APT, and the version will work well enough for what I want to use this for I can do the usual apt-get install with sudo to install sysbench.

```
$ sudo apt-get install sysbench
```


## 2 - Using sysbench to preform a random read test

For this section I will be using sysbench to preform a random read test on my sd card, and also preform such a test on a USB3 external hard drive that I have as well. To cut to the chase the sd card was clocking in as around 450-500+ Mb/sec while the USB3 Hard disk was preforming at 375-430+ Mb/sec with random read. So I can not say that I will be exploring using an external USB device as a replacement for using the SD card any time soon as things will slow down rather than the alternative. At least with what I have on hand anyway, there is looking into other options with both USB3 drives as well as SD cards. In any case the bottom line is to just have a way to test whatever it is that I have to work with, and use whatever preforms best.

### 2.1 - Create a folder on the sdcard, and prepare some files

The first step is to prepare the files that will be used for the random read test. Sense I want to test my sd card first I will want to create these files at a file system location that is part of the sd card. So creating a folder at the home folder location will work just fine in this regard. However when it comes to testing the USB3 device of interest I will need to do this in the /media folder in raspberry pi os and I am sure that this kind of location will change a little from one distro to the next.

Anyway once I have a location figured out I can cd to it, create a folder, cd into that and then call the sysbench with the options that I want and finish with the prepare command. I will want to make sure that I set 'fileio' for the --test option, and also 'rndrd' for the --file-test-mode option as I want to do a random read file io test. 

Another thing that I might want to do is set the total size of the files to 32M rather than the default 2G as that will take a fair amount of time to set up. From what I have gathered thus far it seems like lower total sizes do not result in much of an impact in test results, at least as far as random read tests are concerned. I am sure that if I make the file sizes too small though that will make an impact if not with random read certainly other tests such as a sequential test.


```
$ cd ~
$ mkdir sysbench
$ cd sysbench
$ sysbench --test=fileio --file-test-mode=rndrd --file-total-size=32M prepare
sysbench 0.4.12:  multi-threaded system evaluation benchmark

128 files, 256Kb each, 32Mb total
Creating files for the test...
```

### 2.2 - run the random read test

Once the files are set up I can just do the same command as before, but now I will just want to end with 'run' rather than 'prepare'

```
$ sysbench --test=fileio --file-test-mode=rndrd --file-total-size=32M run
sysbench 0.4.12:  multi-threaded system evaluation benchmark
 
Running the test with following options:
Number of threads: 1
 
Extra file open flags: 0
128 files, 8Mb each
1Gb total file size
Block size 16Kb
Number of random requests for random IO: 10000
Read/Write ratio for combined random IO test: 1.50
Periodic FSYNC enabled, calling fsync() each 100 requests.
Calling fsync() at the end of test, Enabled.
Using synchronous I/O mode
Doing random read test
Threads started!
Done.
 
Operations performed:  10000 Read, 0 Write, 0 Other = 10000 Total
Read 156.25Mb  Written 0b  Total transferred 156.25Mb  (504.13Mb/sec)
32264.48 Requests/sec executed
 
Test execution summary:
    total time:                          0.3099s
    total number of events:              10000
    total time taken by event execution: 0.2953
    per-request statistics:
         min:                                  0.02ms
         avg:                                  0.03ms
         max:                                  0.36ms
         approx.  95 percentile:               0.06ms
 
Threads fairness:
    events (avg/stddev):           10000.0000/0.00
    execution time (avg/stddev):   0.2953/0.00
```

### 2.3 - Clean up

There is also a 'cleanup' command which might prove to be useful if running this command in a folder other than an empty folder that I set up just for this test. However sense I did not do that the other option would be to just delete the test folder by any means such as linux rm -r, or just doing it in a file manager normie style.

```
$ sysbench --test=fileio --file-test-mode=rndrd --file-total-size=32M cleanup
sysbench 0.4.12:  multi-threaded system evaluation benchmark

Removing test files...
$ cd ..
$ rmdir sysbench
```

## Conclusion

So for now I have to say that this might prove to be my preferred go to solution for bench making on a Linux system, at least when it comes to file io, and maybe a few other things too if I get more time to play with this at some point. When it comes to testing any kind of [non volatile data storage medium](https://en.wikipedia.org/wiki/Non-volatile_memory) I just need something to do sequential and random io testing. Sequential is more important for transferring large volumes of data, but random is far more important if the aim is to use if to store an OS image that I am to run.

