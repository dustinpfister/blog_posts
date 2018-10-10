---
title: Setting sprite lifespan in phaser ce
date: 2018-10-10 13:23:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 302
updated: 2018-10-10 13:27:40
version: 1.0
---

When making some games with [Phaser ce](https://photonstorm.github.io/phaser-ce/) there might come a time when it is necessary to set a millisecond time limit to the existence of a sprite until it is killed. This will come up with things like particles and other short lived sprites that are to just exist on the screen for a short while and then end up in a killed state to be revived later when needed. This is where the lifespan property can be of use to quickly get this working in a project compared to making a custom solution for this. In this post I will be covering a simple example that makes use of the lifespan property of sprites to set a time limit for how long a sprite will be at play.

<!-- more -->

## 1 - What to know before continuing
