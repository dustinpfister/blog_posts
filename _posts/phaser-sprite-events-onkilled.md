---
title: The Sprite onKilled event in phaser
date: 2018-09-13 20:54:00
tags: [js,phaser]
layout: post
categories: phaser
id: 278
updated: 2018-09-13 21:00:16
version: 1.0
---

When making a [Phaser ce](https://photonstorm.github.io/phaser-ce/) powered javaScript game project there are of course sprites, and when working with sprites there are useful events. In this post the focus will be on the onKilled event in phaser ce. This is a signal that will fire when the sprite.kill method is called, which is very different from sprite.destroy. The kill method is what I would call if I want to set certain values to what would be appropriate if the sprite has been killed, but I do not want to actually destroy the sprite completely. So in this post I will be coving some use case examples for this method.

<!-- more -->
