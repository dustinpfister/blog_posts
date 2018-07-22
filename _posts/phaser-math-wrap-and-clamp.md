---
title: Setting boundaries in Phaser with wrap, and clamp
date: 2018-07-22 14:00:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 239
updated: 2018-07-22 14:25:43
version: 1.1
---

When making a [phaser](http://phaser.io) game, with many projects there might be a need to wrap, or clamp a sprite or other display object to a set of boundaries. Because this is a typically scenario with most games, phaser includes some methods it the [Phaser Math object](https://phaser.io/docs/2.6.2/Phaser.Math.html) to help with this, mainly [wrap](https://phaser.io/docs/2.6.2/Phaser.Math.html#wrap), and [clamp](https://phaser.io/docs/2.6.2/Phaser.Math.html#clamp).

<!-- more -->

## 1 - What to know

This is a post on the html5 game framework phaser CE, in this post I am using [phaser ce 2.11.0](https://github.com/photonstorm/phaser-ce/tree/v2.11.0) when making the code examples. This is not a getting started post on phaser of javaScript in general.

### 2 - A quick examples of Phaser.Math.wrap

The wrap method is a static method of the Phaser Math Object. It can be accessed directly via Phaser.Math, or from inside a game object instance via game.Math. In any case just call the method, and give the current value that you want warped, alone with min, and max values for the value. When called with those arguments what is returned is the wrapped value.

```js
var xMax = 100,
xMin = 0,
x = -15;
console.log(Phaser.Math.wrap(x, xMin, xMax)); // 85
```

This is useful for a game like asteroids where there you want a player controlled display object to enter from the opposite side of the screen as the leave the screen.


