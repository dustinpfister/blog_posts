---
title: Phaser Buttons
date: 2018-08-14 08:45:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 258
updated: 2018-08-14 15:44:50
version: 1.13
---

This post is on buttons in [phaser](http://phaser.io) that javaScript powered game framework for making web based games. In phaser there is a special type of display object called a button, that is very mush like a sprite in many ways, but is geared towards the role of a button. Sprite sheets are handled a little differently, there is not just one frame index, but four indexes to set one for each button state (hover,out,down, and up). Input is enabled be default, and there are also a call back, and a context to set for it. In this post I will be covering buttons, and will also be putting together a basic clicker type game. These buttons are a great way to quickly implement a button compared to using just a plain old sprite, so lets take a look at buttons in phaser.

<!-- more -->


{% phaser 'phaser-buttons/main.js' %}


## 1 - what to know

