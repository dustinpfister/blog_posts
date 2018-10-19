---
title: The autocull component in phaser ce
date: 2018-10-19 17:09:00
tags: [js,phaser]
layout: post
categories: phaser
id: 308
updated: 2018-10-19 17:12:53
version: 1.0
---

The auto cull component in [Phaser ce](https://photonstorm.github.io/phaser-ce/) is a fairly simple component that just adds a two boolean values. One of which can be used to enable auto culling of sprites in a project keeping sprites that are outside of the camera from rendering, and the other is just an inCamera boolean that can be used to find out if a sprite is outside of the camera or not. In this post I will be outlining a simple example that makes use of what is added to sprites in phaser ce thanks to the auto cull component.

<!-- more -->

## 1 - What to know
