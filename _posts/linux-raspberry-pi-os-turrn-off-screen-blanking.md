---
title: Turn off screen blanking in Raspberry PI OS
date: 2020-09-10 13:30:00
tags: [linux]
layout: post
categories: linux
id: 704
updated: 2020-09-10 13:37:07
version: 1.0
---

One of the little things that I like to have control over after setting up a clean raspberry PI OS image is to turn off, or at least have control over screen blanking. That is after a few minutes of leaving the raspberry pi alone the screen will go blank rather than continuing to display whats going on. There are many use case examples of using a raspbery pi to run some kind of applaction where I would like the output to continue to be displayed on a monater without me having to move the mouse or touch the keybaord. 

The rason why the screen blanking happens is becuase screen saver settings cause the screen to go blank afetr a few minutes by default, but there is not software installed to easly control these settings by default. So in this post I will be going over some options for having control over this including th use of the [linux xset](https://linux.die.net/man/1/xset) command.

<!-- more -->
