---
title: Phaser Buttons
date: 2018-08-14 08:45:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 258
updated: 2018-08-14 15:55:16
version: 1.14
---

This post is on [buttons](https://photonstorm.github.io/phaser-ce/Phaser.Button.html) in [phaser](http://phaser.io) that javaScript powered game framework for making web based games. In phaser there is a special type of display object called a button, that is very mush like a sprite in many ways, but is geared towards the role of a button. Sprite sheets are handled a little differently, there is not just one frame index, but four indexes to set one for each button state (hover,out,down, and up). Input is enabled be default, and there are also a call back, and a context to set for it. In this post I will be covering buttons, and will also be putting together a basic clicker type game. These buttons are a great way to quickly implement a button compared to using just a plain old sprite, so lets take a look at buttons in phaser.

<!-- more -->


{% phaser 'phaser-buttons/main.js' %}


## 1 - what to know

This is a post on using buttons in phaser ce, it would be a good idea to gain some background in phaser in general if you have not done so before hand, the best place for that might be the [phaser ce docs](https://photonstorm.github.io/phaser-ce/). I have a [getting started post on phaser](/2017/10/04/phaser-getting-started/) that you might want to try, it would also be a good idea to learn a bit about [state machines](/2017/10/05/phaser-state-manager/), and [making sprite sheets with canvas](/2018/08/04/phaser-sprite-from-canvas/) as well. I will be using these things in this post, on top of buttons of course.

