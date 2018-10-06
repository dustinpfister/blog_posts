---
title: Input down events for all children in a group in phaser ce
date: 2018-08-27 17:01:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 298
updated: 2018-10-05 20:04:47
version: 1.0
---

These days I have been playing around with groups in phaser ce, and have learned a lot about what there is to work with in the Phaser.Group class allowing me to make smarter decisions when developing a project with phaser ce. For example when it comes to attaching an event hander for sprites, I can attach one for each sprite in a group. However if it is something that applys to all of the children in a group, I can use Group.onChildInputDown.

<!-- more -->

## 1 - What to know before continuing

