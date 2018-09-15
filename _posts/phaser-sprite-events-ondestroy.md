---
title: The Phaser on destroy event
date: 2018-09-15 15:04:00
tags: [js,phaser]
layout: post
categories: phaser
id: 280
updated: 2018-09-15 15:13:29
version: 1.0
---

Recently I wrote a post on the onKilled event that can be used to attach event handlers to display objects in [Phaser ce](https://photonstorm.github.io/phaser-ce/) that will fire when the kill method is called. In phaser ce the kill method is very different from the destroy method in that the kill method will just put a sprite in a dead state, while the destroy method will completely destroy a sprite all together.

<!-- more -->
