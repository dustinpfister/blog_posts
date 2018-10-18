---
title: The Bounds component in phaser ce
date: 2018-10-18 18:04:00
tags: [js,phaser]
layout: post
categories: phaser
id: 307
updated: 2018-10-18 18:13:09
version: 1.1
---

When working with one or more sprites or display objects in [Phaser ce](https://photonstorm.github.io/phaser-ce/) there might come a time when the bounds of a sprite are of interest. These are simple values like the y position of the sprite plus its height which results in the bottom y position of the sprite. In phaser ce there is no need to write my own code to fine these values because they are part of the [bounds component](https://photonstorm.github.io/phaser-ce/Phaser.Component.Bounds.html). In some cases it might be necessary to world with these values, and if so they are there all ready at the instance of the display object thanks to this component. This component also adds two useful methods that can be used to align one display object with another as well. Although This component by itself does not do anything with collision detection, it does maintain properties that are needed for things like bounding box collision detection.

<!-- more -->
