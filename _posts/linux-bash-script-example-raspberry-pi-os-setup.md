---
title: Raspberry PI OS setup bash script example
date: 2022-03-25 13:22:00
tags: [linux]
layout: post
categories: linux
id: 972
updated: 2022-03-26 12:02:25
version: 1.3
---

I like working with [Raspberry PI single board computers](https://en.wikipedia.org/wiki/Raspberry_Pi), not so much when it comes to making hardware projects but actually using them as a replacement for what would otherwise be an energy hogging desktop computer when it comes to getting work done. 

Anyway when it comes to using a Raspberry PI in general I often find myself re-imaging sd cards a lot, and each time I do so I need to setup everything the way that I want it again which can get a bit annoying. I have to set a background image that pertains to a certain use case for the OS image of the sd card so I know right away what kind of setup I am dealing with for example. That is that I like to have a single background image, or set of background images that I would want to have on the screen to let me know that the current sd card that I am using is an OS image that is setup for getting work done rather than doing something fun, or experimental. Another thing that I often like to change is the value of the \$PS1 variable that is set in a bashrc file, so I have a custom command prompt each time I open a new terminal window as I do not like the default one with a clean Raspberry PI OS install.

In this post then I will be going over some bash scripts that have to do with a setup script that will automate this process of setting up a new sd card just the way that I like it. There is a main setup.sh file that can be called that will run over each part script that preforms some kind of task such as copying over and setting a background image, or backing up and creating a custom bashrc file at the home path. However if I do things the way I that they should be done each part script should also work on its own if I just want to do one little thing in this collection of setup scripts.

<!-- more -->

## 1 - The main setup.sh script

```
#!/bin/bash

# What kind of setup? options are work, experiment, and play
setup_type=${1:-work};
dir_script=$(dirname $0 | xargs realpath);
dir_home=$(echo $HOME);
 
echo "running setup for new raspberry pi image that will be used for ${setup_type}"
echo "script dir ${dir_script}"
echo "home path for current user ${dir_home}"
echo -e "\n"
 
# part1 - Copy bg images
echo "Starting part1 - copy over background images, and set background"
./parts/1-bg.sh ${setup_type}
echo -e "\n"
 
# part2 - bashrc file
echo "Starting part2 - backup/write new .bashrc file at home"
./parts/2-bashrc.sh ./bashrc.txt
echo -e "\n"
```

## 2.1 - The background image part1.sh

```
#!/bin/bash
# 1-bg.sh - set background image
# * copy over a background image from this project folder to ~/Pictures/rpi-bg.png
# * make this image at ~/Pictures/rpi-bg.png the background image
#
 
# get path to source image for setup type
setup_type=${1:-work};
dir_script=$(dirname $0 | xargs realpath);
dir_bg=$(realpath ${dir_script}/../bg);
path_source_image="${dir_bg}/bg_${setup_type}.png"
 
# echoing what is going on for this script
echo "setting background for "${setup_type}" setup"
 
echo "${path_source_image}"
 
# copy the source image to the home folder
cp "${path_source_image}" ~/Pictures/rpi-bg.png
 
# set background using pcmanfm for LXDE
# https://www.mankier.com/1/pcmanfm
# https://livingthelinuxlifestyle.wordpress.com/2019/08/12/how-to-change-the-background-wallpaper-on-an-lxde-desktop/
pcmanfm --set-wallpaper="/home/pi/Pictures/rpi-bg.png" --wallpaper-mode="fit"
```

## 2.2 - The basrc file script part2.sh

```
#!/bin/bash
# 2-bashrc.sh - check out the sich with .bashrc
#    * use the given source file path for a backrc file to set at home
#    * check for a .bashrc_backup
#        * if there is one do nothing
#        * if there is no .bashrc_backup check for a .bashrc file
#            * if there is a .bashrc create a .bashrc_backup from that file
#            * if there is no .bashrc file create a .bashrc_backup that is the same as the source file
#    * write a new .bashrc file at home
 
PATH_SOURCE=$(realpath ${1:-../bashrc.txt});
 
echo -e "Uisng source file for .bashrc found at: ${PATH_SOURCE} \n";
 
# cd to home
cd ~;
 
# check for .bashrc_backup file
if [ ! -f ".bashrc_backup" ]; then
   echo "NO .bachrc_backup file found"
   # check for a .bachrc file, if there is one create a backup
   if [ -f ".bashrc" ]; then
       echo ".bashrc file found, creating .bashrc_backup from that";
       cat .bashrc > .bashrc_backup;
   fi
   # no .bashrc!? then create one from source file
   if [ ! -f ".bashrc" ]; then
       echo "NO .bashrc file found! Creating .bashrc_backup from source file.";
       cat ${PATH_SOURCE} > .bashrc_backup;
   fi
fi
 
# now that we have a backup for .bashrc sets write a new one from the source
cat ${PATH_SOURCE} > .bashrc;
```

## 3 - Conclusion

The setup script thus far seems to work okay when it comes to the parts that I have authored thus far. Of course I have plans for additional parts, and in time I might want to make this a stand alone repository rather than a part of my demos Linux repository.