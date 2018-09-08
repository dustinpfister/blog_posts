---
title: The deal with Pausing a game in phaser
date: 2018-09-08 10:50:00
tags: [js,phaser]
layout: post
categories: phaser
id: 277
updated: 2018-09-08 10:57:49
version: 1.0
---

So when making a game with [Phaser ce](https://photonstorm.github.io/phaser-ce/) one of the many subjects that come up is how to handle pausing the game. There are many ways to do this such as having an array of update methods, and have it so that there is a string value that will result in a different update method that will not update or change the game state in any way. However there is also of course a phaser ce built in way to pause the game as well, it is just a simple boolean value in the game object instance. There is also the pause method of a state object that can be used to define some logic that will be called once this boolean is set true by whatever means. In any case this post will be an overview of what to know about when it comes to making a pause feature in a phaser ce project.

<!-- more -->

## 1 - What to know
