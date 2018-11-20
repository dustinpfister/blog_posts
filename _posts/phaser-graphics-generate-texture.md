---
title: Generating a texture with graphics to use with sprites in phaser ce
date: 2018-11-20 16:17:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 334
updated: 2018-11-20 17:30:24
version: 1.1
---

So I have wrote a post on how to make sprite sheets with canvas, which seems to work okay as a way to generate graphics to use in a [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) game project without loading an external image. However in this post I will be writing about how to go about doing so with phaser graphics display objects. Also for whatever the reason it might be nice to just generate textures in generate for whatever the reason using phaser graphics, so in this post I will be writing about some use examples of the [generateTexture method](https://photonstorm.github.io/phaser-ce/Phaser.Graphics.html#generateTexture) of the Phaser Graphics class.

<!-- more -->

## 1 - what to know

In the content of this post I am writing about a method in the graphics class of phaser ce that can be used to convert the current state of a graphics display object to a texture that can then be used to skin sprites. If you are new to phaser ce you might want to start with [my getting started post on phaser ce](/2017/10/04/phaser-getting-started/), also if you are new to using graphics display objects you might want to start with my [post on graphics in general](/2017/10/21/phaser-graphics/) as well.

