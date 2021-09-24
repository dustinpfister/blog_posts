---
title: More than one version of nodejs in Raspberry PI OS
date: 2021-09-24 06:37:00
tags: [linux]
layout: post
categories: linux
id: 930
updated: 2021-09-24 14:11:19
version: 1.1
---

Today I would like to write about a topic that I have been putting off for too long which is how to go about having more than one binary of nodejs to work with in Raspberry Pi OS. When first setting up a clean image of raspberry pi os one of the first things I would like to do is install nodejs, and the typical way of doing so would be to just install whatever version of nodejs there is to work with by way of apt. The problem with doing this though is that the version of nodejs is often very out of date, in fact as of this writing it is a version of nodejs that is no longer supported. Also often I might want to have more than one version of nodejs installed actually, and have a way to switch between them. For example I might want to write a script that I want to work on a wide range of nodejs versions, going as far back as say maybe nodejs 8.x. So then I would want to test out the script on nodejs 8.x, 9.x, 10.x, ..., 16.x as such I would need to have some way to not just have an up to date version of nodejs when it comes to the latest version, I would also want the latest version of each major release going back to whatever point I want to push backward compatibility to.

<!-- more -->
