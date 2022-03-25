---
title: Raspberry PI OS setup bash script example
date: 2022-03-25 13:22:00
tags: [linux]
layout: post
categories: linux
id: 972
updated: 2022-03-25 13:28:14
version: 1.0
---

I like working with raspberry pis, not so much when it comes to making hardware projects but actually using them as a replacement for what would otherwise be an energy hogging desktop computer when it comes to getting work done. Anyway when it comes to using a raspberry pi in genera I often find myself re-imaging sd cards a lot, and each time I do so I need to setup everything the way that I want it. I have to set a background image that pertains to a certain use case for the os image of the sd card so I know right away what kind of setup I am dealing with for example, but there are many other little things that I like to adjust each time also. For example changing the value of the \$PS1 variable in a bashrc file so I have a custom command prompt each time I open a new terminal window because I do not like the default one with a clean raspberry pi os install.

<!-- more -->
