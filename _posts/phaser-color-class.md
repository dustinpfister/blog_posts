---
title: The Color class in Phaser for quick color conversion
date: 2018-07-17 14:01:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 235
updated: 2018-07-21 20:42:37
version: 1.3
---

When making a game with [phaser](http://phaser.io), or with javaScript in general I sometimes come around to the issue of converting color values from one format to another. It is not hard to find or make methods that can be used to convert a decimal color value to a web friendly rgba string format, but still I can help but one can help but think that this should be part of the Phaser framework, well good news, [it is](https://photonstorm.github.io/phaser-ce/Phaser.Color.html).

<!-- more -->

## 1 - What to know

This is a post on the phaser color class that has a whole bunch of static methods that can be helpful for color conversion. This class is helpful for say converting a color value like 0x00ff00 to 'rgba(0,255,0,1)', which can be helpful for making quick work of this without wasting time writing such methods from the ground up, or copying and pasting a solution for stack overflow. There is of course no need for that if a solution is in the framework itself, and this is the case with phaser.

### 1.1 - I am using phaser 2.x, AKA Phaser CE

As of this writing I am using [phaser 2.11.0](https://github.com/photonstorm/phaser-ce/tree/v2.11.0) when making this demo. In other words what is now known as Phaser Community Edition. So far I have not made the switch to Phaser 3, and I do not plan on doing so any time soon, as long as Phaser CE is still supported.


## 2 - getWebRGB

The getWebRgb Method of the Color class is one of the methods that comes in hady when working with color in a phaser project. Often I am working with plain canvas, and some methods in phase can accept a canvas as an argument. So there is a need to convert a phaser friendly color to a canvas friendly color, quickly. This is where getWebRgb comes in handy.

```js
console.log(Phaser.Color.getWebRGB(0x00ff00)); // 'rgb(0,255,0)';
```