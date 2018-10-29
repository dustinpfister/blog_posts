---
title: Playing with gravity in phaser ce
date: 2018-10-28 20:58:00
tags: [js,phaser]
layout: post
categories: phaser
id: 315
updated: 2018-10-28 21:04:21
version: 1.0
---

As of late I am diving into expanding my content on [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) and have gotten into the arcade physics engine. Todays post will be on gravity, setting values for gravity is pretty straight forward if you just want to have all objects be pulled down to the ground. In that case all that is required is to set the sprite.body.gravity.y property to a desired value. However with other projects it can get a little complicated, so I have started this post for outlining some use case examples of gravity in phaser ce.

<!-- more -->

## 1 - What to know before continuing.
