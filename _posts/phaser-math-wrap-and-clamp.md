---
title: Setting boundaries in Phaser with wrap, and clamp
date: 2018-07-22 14:00:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 239
updated: 2021-12-17 13:49:01
version: 1.3
---

When making a [phaser](http://phaser.io) game, with many projects there might be a need to wrap, or clamp a sprite or other display object to a set of boundaries. There are also all kinds of other situations in which such a method would prove to be useful when it comes to things like parsing index values for array elements that might go out or range or something to that effect. 

Because wrapping and clamping values is a typical scenario with most games, phaser includes some methods it the [Phaser Math object](https://phaser.io/docs/2.6.2/Phaser.Math.html) to help with this, mainly [wrap](https://phaser.io/docs/2.6.2/Phaser.Math.html#wrap), and [clamp](https://phaser.io/docs/2.6.2/Phaser.Math.html#clamp). So then in this post I will be going over a few quick examples that make use of these methods in a phaser CE project.

<!-- more -->

## 1 - What to know

This is a post on the html5 game framework phaser CE, in this post I am using [phaser ce 2.11.0](https://github.com/photonstorm/phaser-ce/tree/v2.11.0) when making the code examples. This is not a getting started post on phaser of javaScript in general.

## 2 - A quick examples of Phaser.Math.wrap

The wrap method is a static method of the Phaser Math Object. It can be accessed directly via Phaser.Math, or from inside a game object instance via game.Math. In any case just call the method, and give the current value that you want warped, alone with min, and max values for the value. When called with those arguments what is returned is the wrapped value.

```js
var xMax = 100,
xMin = 0,
x = -15;
console.log(Phaser.Math.wrap(x, xMin, xMax)); // 85
```

This is useful for a game like asteroids where there you want a player controlled display object to enter from the opposite side of the screen as the leave the screen.

## 3 - A quick, short example of Phaser.Math.clamp

The Phaser.Math.clamp method accepts the same arguments, in the same order compared to wrap, however the value will be clamped to the min or max value when it goes out of range.

```js
var xMax = 100,
xMin = 0,
x = -15;
console.log(Phaser.Math.clamp(x, xMin, xMax)); // 0
```

This is useful if you are making some kind of game where a character is in a room, and you do not want the character to walk through the walls.

### 4 - Conclusion

So wrap, and clamp in short are great phaser built in methods for quickly setting some rules when it comes to boundaries in a game. There are many such methods in Phaser, so it you run into any kind of problem like this make sure to check Phaser itself first if you are not aware of everything that Phaser has to offer. It is silly to waste time making your own methods, or looking into additional dependencies when what it is that you need is all ready there at your fingertips.