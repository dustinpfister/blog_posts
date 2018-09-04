---
title: Enabling frame by frame stepping in phaser
date: 2018-09-04 15:18:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 276
updated: 2018-09-04 15:23:34
version: 1.0
---

When making a game using [Phaser ce](https://photonstorm.github.io/phaser-ce/) as a framework, there might comes a time that for one reason of another I will want to have the game run in a frame by frame basis. For the sake of some kind of turn based game, or I need to hunt down a hard to find bug, there comes a time that I need to do this now and then. In phaser ce there is the game.enableStep method along with game.step, that can be used to enable frame by frame stepping in phaser ce. In this post I will be writing about a quick demo I put together to help show how easy this is.

<!-- more -->

## 1 - What to know

