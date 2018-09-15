---
title: Phaser Sprite data objects
date: 2018-09-14 22:18:00
tags: [js,phaser]
layout: post
categories: phaser
id: 279
updated: 2018-09-14 22:24:48
version: 1.0
---

When making sprites for a game using [Phaser ce](https://photonstorm.github.io/phaser-ce/) as a framework, there is a standard way of setting some data on a per sprite bases. This is the sprite.data object, an object that defaults to just a plain old javaScript object literal, and is not used my phaser itself internal. So when making a game this is what should be used to park any data, or methods that is part of the game logic that makes up the essence of the project for the sprites. For example if I am making some kind of strategy game that involves the use of a custom Enemy class that I made, then chances are I will be storing an instance of that Enemy Class as a property of sprite.data, or maybe even make sprite.data an instance of that class. In this post I will be writing about an example that will help explain this further.

<!-- more -->
