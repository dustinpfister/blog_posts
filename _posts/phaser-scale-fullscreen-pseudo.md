---
title: Pseudo full screen in phaser using that scale manager
date: 2018-08-13 17:06:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 258
updated: 2018-08-13 17:15:08
version: 1.1
---

Toggling full screen when making a [phaser](http://phaser.io) project can end up becoming a bit of a rabbit hole, at least that has been my experience with it. Never the less, I think I have worked out some solutions that seem to work okay. With the phaser Scale manager it is possible to make a request to set actual full screen mode in the browser, and with some browsers this works fine without any problems. However on some browsers it will not work, so there might be a desire of a back up plan, one that involves just simply scaling up the game to the full size of the browser window. Doing so with phaser is a little involved, but in the post I will be writing about toggling a kind of pseudo full screen mode in phaser.

<!-- more -->

## 1 - what to know about before continuing

This is an advanced post on phaser, the javaScript powered game frame work used to make web based games. In this post I will be writing about many different aspects of the framework, and web development that I will not be covering in detail. However if you have at least some background with phaser, and javaScript you might find this post useful.



