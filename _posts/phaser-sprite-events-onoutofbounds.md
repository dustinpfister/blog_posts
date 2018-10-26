---
title: Setting an out of bounds event in phaser ce
date: 2018-10-25 21:29:00
tags: [js,phaser]
layout: post
categories: phaser
id: 312
updated: 2018-10-25 21:33:32
version: 1.0
---

For this post I will be writing about a [Phaser ce](https://photonstorm.github.io/phaser-ce/) example that I built around the onOutOfBounds event for sprites. This event will fire if the sprites checkWorldBounds boolean is set to true, and can be used to define some logic that will fire each time a sprite leaves the game world. This event is useful for bringing sprites back to a pool to be reuse again when working with groups, and the example will also cover that as well. In any case this post should give readers a better sense of how to dead with sprites that go out of bounds when making a phaser ce powered game with javaScript.

<!-- more -->

## 1 - What to know
