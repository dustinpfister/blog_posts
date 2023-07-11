---
title: Linux apt Debian package manager
date: 2023-07-11 10:26:00
tags: [linux]
layout: post
categories: linux
id: 1059
updated: 2023-07-11 11:52:32
version: 1.2
---

The Advanced package tool, or [apt for short command in Linux](https://en.wikipedia.org/wiki/APT_%28software%29) is the standard go to software package manager in Debian Linux as well as just about any Linux Distribution Based off of Debian. For the most part if I want to install, uninstall, or update software in a Debian Based system I will want to do so at least in park by way of apt.

<!-- more -->


## Checking if something in installed first

When I learn about a new command that I would like to look into more the first thing that I like to do is find out if the command is installed to begin with. If the command is installed to begin with I would also like to find out what the version number of that command might in fact be as well. If the command is not installed at all I might want to to check if it is available by way of the Linux Apt command, and if so install it. In the event that it is not available by way of apt I can look into other ways to get the software installed. So then in this section I will be going over a few things that have to do with a command that I always want to have installed and updated in a Linux system and that would be node.js.

### Using the type bash built in command to check if a command is installed

The [Linux type command](/2021/02/11/linux-type/) which is one of the many commands that come with Linux bash can be used to find out if a command is installed or not to begin with. So in this case I can use the type command to check what the deal is with node.

```
$ type node
node is hashed (/usr/local/bin/node)
```

The output that I get with type shows me that node, or some binary called node is installed. It also shows be the location of the binary, symbolic link or whatever the case might be for the node command which also proves to be useful for many other reasons. However as far as I am concerned for this matter I know that I all ready have node installed. However there is still the matter of the version that is installed and how that may compared to what I can use by way of apt.


### Checking the versions node -v, and apt show

So I have found that I have node installed, but I need to know what the version number is. Also I would like to know what version I can use by way of apt to see if they match up or not. So then there is using whatever option there might be with the command to get the version number of the binary. The option for this will change from one binary to the next but in this case with node at least it is the -v option. There is then using the apt show command to find out what version of node I can get by way of apt.


So then I can just call node with the -v option to get the version of node

```
$ node -v
v18.14.2
```

Looks like I am using 8.14.2, okay great now I just need to check what the version is by way of apt by using the apt-show command. In order to do this I will need to know what the name of the command is to begin with. In this case I know that it is nodejs sense there is another package called node that is something else completely.

```
$ apt show nodejs
Package: nodejs
Version: 10.24.0~dfsg-1~deb10u3
Priority: optional
Section: javascript
Maintainer: Debian Javascript Maintainers <pkg-javascript-devel@lists.alioth.debian.org>
Installed-Size: 154 kB
Depends: libatomic1 (>= 4.8), libbrotli1 (>= 0.6.0), libc-ares2 (>= 1.7.0), libc6 (>= 2.4), libgcc1 (>= 1:3.0), libicu63 (>= 63.1-1~), libnode64 (= 10.24.0~dfsg-1~deb10u3), libssl1.1 (>= 1.1.0), libstdc++6 (>= 4.1.1), libuv1 (>= 1.20.0~), zlib1g (>= 1:1.1.4)
Recommends: ca-certificates, nodejs-doc
Suggests: npm
Conflicts: nodejs-legacy
Replaces: nodejs-legacy
Homepage: http://nodejs.org/
Download-Size: 87.9 kB
APT-Manual-Installed: yes
APT-Sources: http://raspbian.raspberrypi.org/raspbian buster/main armhf Packages
Description: evented I/O for V8 javascript - runtime executable
 Node.js is a platform built on Chrome's JavaScript runtime for easily
 building fast, scalable network applications. Node.js uses an
 event-driven, non-blocking I/O model that makes it lightweight and
 efficient, perfect for data-intensive real-time applications that run
 across distributed devices.
 .
 Node.js is bundled with several useful libraries to handle server
 tasks:
 .
 System, Events, Standard I/O, Modules, Timers, Child Processes, POSIX,
 HTTP, Multipart Parsing, TCP, DNS, Assert, Path, URL, Query Strings.
```

Anyway it looks like the version of node that I am using is more up to date than that of what I can get threw apt. The reason why is because I installed the 10.24.0 version first, and then use the [n npm package](https://www.npmjs.com/package/n) to update from that version of nodejs to the version that I am using now. With that said I will not be moving forward with using apt to install or update this version of node as I am using a more up to date version that I installed by another means.

This is also one of the draw backs of using apt that I have found, at least with the typical default repositories that are set up with apt to say the least. The version numbers of packages are often far out of date and I need to use something else outside of apt to install or in this case update software. When it comes to nodejs there are a lot of great options out there that help to make this easy, but some times it is not so easy. 

In any case it is always a good idea to check if something is there to begin with before installing something. With this case I all ready have what I want. Also if I where to install I would end up downgrading what I have which I do not want to do of course.

## Update and full-upgrade

One of the major functions of apt is to use it to make sure all the various binaries and libraries of the underlying operating system are up to date. To do this I just need to call apt update with the [sudo command](/2023/06/29/linux-sudo/) as this is very much something that I need root level permission to do so.


```
$ sudo apt update
Hit:1 http://raspbian.raspberrypi.org/raspbian buster InRelease
Hit:2 http://archive.raspberrypi.org/debian buster InRelease
Reading package lists... Done
Building dependency tree       
Reading state information... Done
All packages are up to date.
```

In this case all the packages are up to date. However if there where some updates to install I would want to use full-upgrade to do so. There is also the upgrade option as well. However full-upgrade will also remove software as well if that is what is needed in order to [fully upgrade the system](https://forums.raspberrypi.com/viewtopic.php?t=264816).

```
$ sudo apt full-upgrade
```

## Install if you know the package to install

If you know the name of the package that you want to insatll in apt, doing so is often just a matter of calling apt install and then just typing in the name of the package.

```
$ sudo apt install package-name
```

However what if you do not know what the package name is? Well for that there is the apt search, apt list, or using one of the many options out there when it comes to front ends for apt such as aptitude which is a nice command line option for that. Just about every Debian Base Linux distribution comes with some kind of front end as a way to browse. You might have noticed that in this post I am using Raspberry PI OS and for that one there is pi-packages. This can be used by clicking Add / Remove software in Preferences menu, for whatever distribution you are using there is just making use of whatever front end it comes with to browse that way.

## Using the apt search command to kind packges

Although it might be best to use some kind of front end to search for what there is to install, there are of course CLI tools to do this sort of thing. One useful command might prove to be the [apt search command](https://askubuntu.com/questions/160897/how-do-i-search-for-available-packages-from-the-command-line). For this I can type apt search, and then give one or more keywords to look for. The search will then be preformed on names of the package itself, as well as any text in the description as well.

```
 $ apt search "python3 Documentation"
Sorting... Done
Full Text Search... Done
python3-sbml5-doc/oldstable 5.17.2+dfsg-3 all
  System Biology Markup Language library - Python3 documentation
```

## Conclusion

Although apt is a great tool for installing and update software it does have a few draw backs, at least when it comes to how it is set up to begin with at least. One major thing that I have found is that software is often out of date, however that might not always be such a bad thing in some cases. New versions of Debian come out every few years, and it would seem that packages get frozen at a certain point and stay fixed at those version numbers until a new major version of Debian comes out. Often the versions of the packages still wok just fine until it is time to update to a new major version of Debian, or in my case a Debian based system. 

If I really need a newer version there is looking into other options for installing software, or figuring out how to built from source. In some cases I can even find pre compiled binaries from trusted sources, but that is not often the case. 


