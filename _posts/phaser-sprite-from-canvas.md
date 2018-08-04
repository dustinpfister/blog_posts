---
title: Making a sprite from an html5 2d canvas element
date: 2018-08-04 12:58:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 248
updated: 2018-08-04 13:55:42
version: 1.1
---

So for todays post on the html5 game framework known as phaser ce, I will be writing about a way to go about making sprites form 2d canvas elements. This means making a sprite using the html 5 2d drawing context via a canvas element that has been made before hand elsewhere, or directly drawing to a new one. In any case the canvas can be used to make an instance of bitmap data that can then be used as a texture for a sprite, rather than an external image. I will not be getting into how to go about spritesheets for now, as I think that should be a whole other post.

<!-- more -->

## 1 - What to know before continuing

This is a post on the html 5 game framework phaser, and how to use canvas elements as a way to make static sprites. I will not be getting inot how to get started with phaser, or javaScript in general here. As such I hope you have at least some background with these things, and are now exploring ways to make assets from code. There are a few ways to do so with phaser, such as with the Graphics class, but I have come to find that I prefer to work with 2d canvas over that.
