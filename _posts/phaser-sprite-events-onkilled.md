---
title: The Sprite onKilled event in phaser
date: 2018-09-13 20:54:00
tags: [js,phaser]
layout: post
categories: phaser
id: 278
updated: 2018-09-14 12:57:44
version: 1.1
---

When making a [Phaser ce](https://photonstorm.github.io/phaser-ce/) powered javaScript game project there are of course sprites, and when working with sprites there are useful events. In this post the focus will be on the onKilled event in phaser ce. This is a signal that will fire when the sprite.kill method is called, which is very different from sprite.destroy. The kill method is what I would call if I want to set certain values to what would be appropriate if the sprite has been killed, but I do not want to actually destroy the sprite completely. So in this post I will be coving some use case examples for this method.

<!-- more -->

## 1 - Start here

In this post I am writing about the onKilled event that is fired when a sprite is killed with the sprite.killed method in phaser ce. There is also the onDestroy event that is fired when a sprite is completely removed from the game world, and cache completely. In most projects I like to have a pool of sprite objects that I reuse, rather than the alternative which would be a mechanic where there is no set maximum of enemies that can be in the world. In any case it is good to be ware of both of these events, as well as the many other events that are fired by game objects in phaser ce.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser ce 2.11.0, not the newer phaser 3.x major release.