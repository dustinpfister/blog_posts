---
title: Create textures in phaser with game.create
date: 2018-10-06 11:42:00
tags: [js,phaser]
layout: post
categories: phaser
id: 299
updated: 2018-10-06 11:48:53
version: 1.0
---

So when making a project with [Phaser ce](https://photonstorm.github.io/phaser-ce/) I often go with solutions for graphics that do not involve loading an external sprite sheet. Do not get me wrong that is a great way of handling it, and I have written a post on how to do that in phaser. However for simple hyper casual style games, it is often possible to just quickly throw together some simple graphics with one of the assetless solutions available in phaser ce for making on the fly graphics for a game. I have all ready wrote a post on the graphics display objects, and how to make sprite sheets with a canvas element, and the 2d drawing canvas api. However in this post I will be writing about another option for doing this in phaser ce which is the Create.texture method.

<!-- more -->

## 1 - What to know
