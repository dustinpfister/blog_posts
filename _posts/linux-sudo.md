---
title: Linux Sudo command
date: 2023-06-29 05:28:00
tags: [linux]
layout: post
categories: linux
id: 1056
updated: 2023-06-29 05:51:52
version: 1.0
---

The [Linux sudo command](https://linux.die.net/man/8/sudo) is used to run a command as another user while logged in as another. Typically this is used to run a command that would need to be done while logged in as the root user, but done instead from a regular user account that is set up to do this. Such as installing or updating software by way of the apt command. However sudo can also be used to run a command as any user, assuming that permission is set up for the current user to do so.

There are alternatives to the use of the sudo command such as using the [su command](https://linux.die.net/man/1/su) to switch to the root user, or any user assuming the password is known. Then I can do whatever I want from that user account, and then call su to switch back again.

<!-- more -->


## Using apt to update software with sudo

One of the main things that I often used sudo for is to keep all the software up to date on Raspberry PI OS, or any Debian Linux based system, or any Linux System where apt is used for the package manager. If I try to do an apt update without using sudo while logged in as a non root user I will of course get errors.

```
$ apt update
Reading package lists... Done
E: Could not open lock file /var/lib/apt/lists/lock - open (13: Permission denied)
E: Unable to lock directory /var/lib/apt/lists/
W: Problem unlinking the file /var/cache/apt/pkgcache.bin - RemoveCaches (13: Permission denied)
W: Problem unlinking the file /var/cache/apt/srcpkgcache.bin - RemoveCaches (13: Permission denied)
```

Apt can not update the package lists because the regular user that I am logged into as does not have permission to do so. However this user is set up to be allowed to use sudo to do something like this. So if I do the same command, only starting to do so with the sudo command then the apt update command works just fine.

```
$ sudo apt update
Hit:1 http://raspbian.raspberrypi.org/raspbian buster InRelease
Hit:2 http://archive.raspberrypi.org/debian buster InRelease
Reading package lists... Done
Building dependency tree       
Reading state information... Done
All packages are up to date.
```

Looks like all the packages are up to date for now, but if there where updates I could install them by once again using the apt command with sudo. Only then I would do a full-upgrade rather than that of an update.

```
$ sudo apt full-upgrade
```

## Conclusion

The Sudo command is then what I want to use when I have to do anything that requires root level permissions. This means anything that has to do with installing, and updating software, as well as any kind of admin task. There are a lot of little uses cases beyond using apt of course such as creating a new user, and also setting up a new user to also be allowed to use sudo and so forth.