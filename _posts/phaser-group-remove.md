---
title: Removing sprites from a Group in phaser
date: 2018-08-26 20:26:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 271
updated: 2018-08-26 19:35:02
version: 1.0
---

Today in this post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) I will be writing about removing Sprites, and other display objects from a group. There is of course the Group.remove method, but by default it will not destroy the sprite. In some cases this is desirable if I want to move the sprite from one Group to another, or just remove it from a group in place it directly in the world. However it other projects, where Sprites are something that are created and destroyed on demand, then it is important to know about the few little pitfalls when it comes to removing sprites from a group in phaser.

<!-- more -->

## 1 - What to know before continuing
