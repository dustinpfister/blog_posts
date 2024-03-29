---
title: Raspberry PI OS setup bash script example
date: 2022-03-25 13:22:00
tags: [linux]
layout: post
categories: linux
id: 972
updated: 2022-03-27 12:16:10
version: 1.15
---

I like working with [Raspberry PI single board computers](https://en.wikipedia.org/wiki/Raspberry_Pi), not so much when it comes to making hardware projects but actually using them as a replacement for what would otherwise be an energy hogging desktop computer when it comes to getting work done. 

Anyway when it comes to using a Raspberry PI in general I often find myself re-imaging sd cards a lot, and each time I do so I need to setup everything the way that I want it again which can get a bit annoying. I have to set a background image that pertains to a certain use case for the OS image of the sd card so I know right away what kind of setup I am dealing with for example. That is that I like to have a single background image, or set of background images that I would want to have on the screen to let me know that the current sd card that I am using is an OS image that is setup for getting work done rather than doing something fun, or experimental. Another thing that I often like to change is the value of the \$PS1 variable that is set in a bashrc file, so I have a custom command prompt each time I open a new terminal window as I do not like the default one with a clean Raspberry PI OS install.

In this post then I will be going over some bash scripts that have to do with a setup script that will automate this process of setting up a new sd card just the way that I like it. There is a main setup.sh file that can be called that will run over each part script that preforms some kind of task such as copying over and setting a background image, or backing up and creating a custom bashrc file at the home path. However if I do things the way I that they should be done each part script should also work on its own if I just want to do one little thing in this collection of setup scripts.

<!-- more -->

## My Raspberry PI OS bash script setup file, and what to know first

This is a post on the state of a bash script that I use to setup a Raspberry PI OS image on an sd card after imaging it from one of the image options that can be found on the Raspberry PI foundation website. I assume that you know enough to get that far at least when it comes to getting started with a clean OS Image. This post is also not a [getting started type post with bash scripts in general](/2020/11/27/linux-bash-script/) as well, I have wrote a post to that effect before hand. This is then a slightly more advanced post then when it comes to what the next step is once one starts to learn the basics of bash scripts which is of course to start using bash to automate work that would otherwise have to be done manually, such as all the various actions that need to be preformed to set up an OS image the way that one likes it, which is what this post is about.

### - Full source and other assets are up on Github

All of the scripts as well as additional assets and notes can be found in a folder in my [demos Linux Github repository](https://github.com/dustinpfister/demos_linux/tree/master/forpost/linux-bash-script-example-raspberry-pi-os-setup).

## 1 - The main setup.sh script

This is the state of the main setup.sh script that I have at the root of the project folder which I would call in order to run the full setup process. When calling the setup script from the command line the first argument that I give is the setup type which I default to 'work'. The other options are 'exper' which means experimental as in setting up and OS image to try something out that might end up messing up the OS image such as building and installing custom software, and 'play' which means installing software like [retroarch](https://en.wikipedia.org/wiki/RetroArch).

```
#!/bin/bash

# What kind of setup? options are 'work', 'exper', and 'play'
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

This is the part script that has to do with copying over a background image that is in the project folder, over to the home folder location. On top of that the only other thing this script does is also set that image that gets copied over to the current desktop background image, and also set any other additional values such as the wallpaper mode such as 'center' or 'fit'.

Copying over the image file from the project folder to a home folder location is simple enough I just need to use the [Linux cp command](/2021/06/29/linux-cp/) to do so and there is not much to wrote about when it comes to using that one. I just need to have the path to the source image as the first argument, and then the location to copy to as the second argument. Things might just get a little tricky when it comes to setting the image that is copied to the home folder as the background image from the command line. In Raspberry PI OS the [pcmanfm command](https://manpages.debian.org/testing/pcmanfm/pcmanfm.1.en.html) is what I can use to set that image as the wallpaper, while I am at it I can also use this command to set the wallpaper mode as well. There are a few options for this, but for my set of setup scripts I just went with fit mode. The main options for pcmanfm are --set-wallpaper which is what to use to set the location of a file to use for the wallpaper, and then there is also the --wallpaper-mode option to set the mode to something like the 'fit' mode.



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

For part2 of my setup scripts there is the question of the [bashrc file](https://www.journaldev.com/41479/bashrc-file-in-linux) which is one of many little files throughout a Raspberry PI OS image that I would like to customize at least a little. This is a script is used for a wide range of things that have to do with setting up a terminal session such as how to format the bash prompt, [setup aliases](/2020/11/30/linux-bashrc-aliases/) for lengthy commands that I type often, and much more. A default bashrc file is setup for the pi user in a clean Raspberry PI OS image, so part of the process of writing my own bashrc file would involve renaming that file to something like .bashrc_backup before writing over the file. So then the general idea of this script is to just backup any bashrc file that might all ready be there, and then create a copy of a source file writing over the bashrc file with that source.

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

I opted to use the Linux cat command with redirection over the cp command for writing over the bashrc file as I was thinking in terms of doing something more than just copying the file. However as of this writing I am not doing anything more than that, so I could change that back to just using the cp command if I can not think of

## 3 - Conclusion

The setup script thus far seems to work okay when it comes to the parts that I have authored thus far. Of course I have plans for additional parts, and in time I might want to make this a stand alone repository rather than a part of my demos Linux repository.