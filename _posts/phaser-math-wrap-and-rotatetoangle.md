---
title: Rotating a sprite from one angle to another in phaser
date: 2018-10-21 20:04:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 309
updated: 2018-10-21 20:17:47
version: 1.1
---

In many phaser ce projects there will come a time where I will want to rotate a sprite from one angle to another. When doing so i will want to have the sprite rotate in a direction that is the shortest angular distance. Thankfully there is a Math Class method in phaser ce that is there for this very purpose called Phaser.Math.rotateToAngle, in this post i will be covering a quick example that makes use of this method.

<!-- more -->

## 1 - what to know

This is a post on using a Math class method to rotate a sprite from a starting angle, to a target angle in the fastest direction in phaser ce the javaScript powered game framework. This is not a getting started post on phaser ce, or javaScript in general, so I hope that you have at least some background with phaser before hand.

