---
title: Nesting groups in groups in phaser
date: 2018-08-27 17:01:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 272
updated: 2018-08-27 18:41:08
version: 1.2
---

For the past few days I have been experimenting with [Groups](https://photonstorm.github.io/phaser-ce/Phaser.Group.html) in [Phaser ce](https://photonstorm.github.io/phaser-ce/). Today I worked out some examples that have to do with nesting groups. In other words a group is also a kind of display object, just like that of a Sprite, so another group can be added to a group, along with other display objects. So in this post I will be covering some examples of nesting groups inside of groups, from simple hello world examples, to some that are starting to resemble a game.

<!-- more -->

## 1 - What to know before continuing

This is a post on nesting groups in phaser ce, the community edition of the [phaser](https://phaser.io/) javaScript powered game framework. This is not event a comprehensive post on groups in general, let alone phaser, let alone javaScript, and any additional skills required. However This post might give a few pointers when it comes to nesting groups. If you are new to phaser, you might want to start with my [getting started post on phaser](/2017/10/04/phaser-getting-started/).