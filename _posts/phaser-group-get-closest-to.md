---
title: Getting a sprite that is closest to another sprite in a group in phaser
date: 2018-09-29 11:02:00
tags: [js,phaser]
layout: post
categories: phaser
id: 292
updated: 2018-09-29 11:06:09
version: 1.0
---

When working with a group of sprites in a [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) project a common task that comes up is to get a reference to a sprite in a group that is closest to another sprite. There are many ways of doing this that involve using a distance formula when looping over all active children in the group, however there is also a group method called group.getClosestTo that can be used to quickly get that sprite in question.

<!-- more -->
