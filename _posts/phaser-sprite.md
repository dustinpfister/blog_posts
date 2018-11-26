---
title: Sprites in phaser ce, what to know.
date: 2018-11-26 11:46:00
tags: [js,phaser]
layout: post
categories: phaser
id: 337
updated: 2018-11-26 12:00:50
version: 1.3
---

When it comes to making an html 5 game with javaScript and [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) as a front end game framework, [Sprites](https://photonstorm.github.io/phaser-ce/Phaser.Sprite.html) are central to just about any kind of game project. There is a lot to cover with sprites when it comes to creating Sprite sheets, hit detection, motion and physics, handing groups of sprites, among many other topics as well. So I can not possible cover everything there is to write about when it comes to sprites, but I can at least cover the basics, as well as link to other posts on my site that might help cover most of what there is to know about sprites in phaser ce.

<!-- more -->

## 1 - What to know before hand

In this post I am writing about the basics of sprites, and in addition this post acts as a central index for many other topics surrounding the use of Sprite display objects in phaser ce, the javaScript powered html5 game framework. This is not a getting started post with phaser ce, or javaScript in general so I trust that you have logged at least some time with phaser, and maybe even have some experience with them so far and just want to know some more about them. If you are new to phaser ce you might want to start with [my post on getting started with phaser ce](/2017/10/04/phaser-getting-started/).

## 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](https://phaser.io/). If you run into problems reproducing the code examples here be sure to start with the version number first. As of this writing phaser ce 2.x is not the latest major release of phaser and the code here might break on newer major release of phaser.