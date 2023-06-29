---
title: Linux Sudo command
date: 2023-06-29 05:28:00
tags: [linux]
layout: post
categories: linux
id: 1056
updated: 2023-06-29 06:19:13
version: 1.1
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

## Setting up a new sudo user, the /etc/sudoers file, and visudo command

The process of setting up a new user will have to involve editing a file in the etc folder at /etc/sudoers. As you might suspect, yes in order to edit, or even view this file you must have root permission to do so to begin with. I might not get into every detail about setting up a new user to use sudo here, as it would seem that much of that might be a matter for another post, or maybe a future edit of this one. However there is still at least being aware of what files need to be edited in order to set, change, or in this case just view the current status of users and the use of sudo.

### Using the Linux cat command to view the contents

Before Even geting into how to set up a new user as a sudoer one might want to just check out the state of the files that store data that is used by sudo to know if a user has permission to do admin stuff or not. Once typical command that is used to read the state of text files and spit it out to the standard output would be the [cat command](/2020/11/11/linux-cat). However if you do this without sudo, or without root permission by any means you will of course get a permission error.

```
$ cat /etc/sudoers
cat: /etc/sudoers: Permission denied
```

If you are logged in as a user that is set up as a sudoer to begin with you can once agai use sudo with cat to read this restricted file.

```
$ sudo cat /etc/sudoers
#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
 
# Host alias specification
 
# User alias specification
 
# Cmnd alias specification
 
# User privilege specification
root	ALL=(ALL:ALL) ALL
 
# Allow members of group sudo to execute any command
%sudo	ALL=(ALL:ALL) ALL
 
# See sudoers(5) for more information on "#include" directives:
 
#includedir /etc/sudoers.d
```

Notice that the sudoers file says to use the visudo command to edit this file. After reading over the man page it would seem that it would be a good idea to use that command rather than editing this kind directly. Also you will notice that there is not just this file, but also a sudoers.d directory in the etc folder that will contain additional local files. So then it might be best to set up a new user by adding files there and leave this main sudoers file alone.

## Conclusion

The Sudo command is then what I want to use when I have to do anything that requires root level permissions. This means anything that has to do with installing, and updating software, as well as any kind of admin task. There are a lot of little uses cases beyond using apt of course such as creating a new user, and also setting up a new user to also be allowed to use sudo and so forth.