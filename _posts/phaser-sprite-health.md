---
title: Using Sprite.health to manage hit point in phaser ce.
date: 2018-09-15 15:04:00
tags: [js,phaser]
layout: post
categories: phaser
id: 281
updated: 2018-09-17 20:08:44
version: 1.0
---

With [Phaser ce](https://photonstorm.github.io/phaser-ce/) sprite objects there is a health property, this property can be used in conjunction with methods like Sprite.damage to manage hit points for the Sprite. Many kinds of games involve the use of hit points, and when these hit point values reach zero or lower, that often will trigger death animations, and other events. ALthout it is fine to make hit points part of my own separate game logic, the built in health property can be used in conjunction with other properties and methods to help speed things along with managing health. In this popst I will be writng about managing hit points in a phaser ce game using the Sprite.health property, and a few closly releated methods and properties like Sprite.damage, and Sprite.events.onKilled.

<!-- more -->

## 1 - What to know
