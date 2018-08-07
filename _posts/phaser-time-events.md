---
title: Using Phaser time events
date: 2018-08-07 10:54:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 252
updated: 2018-08-07 11:00:19
version: 1.0
---

So there are many ways to go about working with time in Phaser. Yes if I really want to I can just create my own date objects, and use them as a way to control frame rate, and when certain events will happen when making a project. That is a fine and good when it comes to making a game vanilla js style, however if I am using a frame work I should use what is given in that in order to help save time with making my own solutions. In most cases the framework built in solution for something works just fine, and I should only bother making my own solutions if doing so is called for. In any case this post is about time events in phaser, and how working with them can help make quick work of setting up things that need to happen every now and then when making my game logic.


<!-- more -->
