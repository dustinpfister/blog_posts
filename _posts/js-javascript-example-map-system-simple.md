---
title: Simple map system for level selection javaScript example
date: 2021-04-06 14:36:00
tags: [js]
layout: post
categories: js
id: 839
updated: 2021-04-06 14:47:24
version: 1.1
---

This week I am continuing to work on one of my canvas examples that is just simply called turret defense because I am really bad at names. Anyway for the game I would like to have a level selection map where there are a bunch of display objects for each level in the game. There are a lot of ideas that come up when it comes to just having this kind of system in a game, but for the sake of this post I would like to have just a simple basic system for this sort of thing.

The general idea is to just have a collection of display objects, one for each level, and then at least two states in a crude yet effective state machine. When I click on one of these display objects in the map state I then go to the game state, but with the game state object created with custom options set by way of a game options object that is part of the level selection object in this map system. So then in this post I will be going over a very simple example of this kind of system, and for the game object I will just be using what I worked out in yesterdays post on working out a system for rotation and fire control. So then this will be yet another one of my [javaScript example](/2021/04/02/js-javascript-example/) posts.

<!-- more -->
