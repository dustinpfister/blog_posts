---
title: On collision events in phaser ce
date: 2018-11-09 09:55:00
tags: [js,phaser]
layout: post
categories: phaser
id: 326
updated: 2018-11-09 09:59:21
version: 1.1
---

When making a game with [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) a common topic that comes up a lot is dealing with collision, there is detecting if a collision has occurred, and then there is doing something with that collision event. In this post I will be coving an examples of both using the default arcade physics engine in phaser ce. However the focus on this post will be on the body.onCollide event and how to use that to do something in the event of a collision.

<!-- more -->

## 1 - What to know before continuing.
