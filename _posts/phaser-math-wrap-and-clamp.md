---
title: Setting boundaries in Phaser with wrap, and clamp
date: 2018-07-22 14:00:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 239
updated: 2021-12-17 14:03:54
version: 1.7
---

When making a [phaser](http://phaser.io) game, with many projects there might be a need to wrap, or clamp a sprite or other display object to a set of boundaries. There are also all kinds of other situations in which such a method would prove to be useful when it comes to things like parsing index values for array elements that might go out or range or something to that effect. 

In lodash there is a [lodash clamp](/2021/12/17/lodash_clamp/) method but oddly enough there is no wrap method at least not when it comes to wrapping numbers so if I want one in lodash I need to add one to it as a mixin. However this is a post on the javaScript game framework known as phaser, and because wrapping and clamping values is a typical scenario with most games, phaser includes some methods it the [Phaser Math object](https://phaser.io/docs/2.6.2/Phaser.Math.html) to help with this, mainly [wrap](https://phaser.io/docs/2.6.2/Phaser.Math.html#wrap), and [clamp](https://phaser.io/docs/2.6.2/Phaser.Math.html#clamp). So then in this post I will be going over a few quick examples that make use of these methods in a phaser CE project.

<!-- more -->

## 1 - What to know

This is a post on the html5 game framework phaser CE, in this post I am using [phaser ce 2.11.0](https://github.com/photonstorm/phaser-ce/tree/v2.11.0) when making the code examples. This is not a [getting started post on phaser](/2017/10/04/phaser-getting-started/) or on getting started with [javaScript in general](/2018/11/27/js-getting-started/). So I assume hat you have at least some experience when it comes to the very basics of client side javaScript and how to make use of an external framework such as phaser.

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

If you enjoyed this read then I have wrote a lot of other [posts on Phaser CE](/categories/phaser) that might also be work checking out. However even tho using a framework wil help save a lot of time there is also a lot to be said about vanilla javaScript development from the ground up also. With that said there is also reading some of my [canvas example type posts](/2020/03/23/canvas-example/), as well as my [javaScript example](/2021/04/02/js-javascript-example/) series of posts that have to do with making projects from the ground up. When it comes to my javaScript series of posts I have a [general unities library javaScript example](/2021/08/06/js-javascript-example-utils/) that I have put together than includes wrap and clamp methods.

